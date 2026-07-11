import * as THREE from "three";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";

/**
 * A red-tinted enemy variant of the main rocket. It reuses the exact same
 * hull geometry as the hero ship (Rocket.tsx) so enemies read as hostile
 * copies of your craft. To keep draw calls low for many enemies, every part
 * is merged per-material into a handful of meshes, cached once, and cloned.
 *
 * The main Rocket component is intentionally left untouched — this is a
 * standalone rebuild of its shapes for the combat layer.
 */

const BOOSTER_ANGLES = [Math.PI / 2, (Math.PI * 7) / 6, (Math.PI * 11) / 6];
const FIN_ANGLES = [Math.PI / 6, (Math.PI * 5) / 6, (Math.PI * 3) / 2];

type MatKey = "hull" | "dark" | "metal" | "glow" | "glass";

/** The rocket's individual part geometries (mirrors Rocket.tsx). */
function buildGeometry() {
  const bodyPts = [
    new THREE.Vector2(0.001, -1.18),
    new THREE.Vector2(0.26, -1.18),
    new THREE.Vector2(0.315, -1.13),
    new THREE.Vector2(0.34, -1.06),
    new THREE.Vector2(0.35, -0.98),
    new THREE.Vector2(0.365, -0.8),
    new THREE.Vector2(0.385, -0.62),
    new THREE.Vector2(0.402, -0.45),
    new THREE.Vector2(0.413, -0.3),
    new THREE.Vector2(0.419, -0.16),
    new THREE.Vector2(0.42, -0.02),
    new THREE.Vector2(0.418, 0.12),
    new THREE.Vector2(0.412, 0.26),
    new THREE.Vector2(0.402, 0.4),
    new THREE.Vector2(0.386, 0.54),
    new THREE.Vector2(0.362, 0.68),
    new THREE.Vector2(0.335, 0.8),
    new THREE.Vector2(0.315, 0.87),
    new THREE.Vector2(0.3, 0.9),
  ];
  const nosePts = [
    new THREE.Vector2(0.305, 0.86),
    new THREE.Vector2(0.295, 0.94),
    new THREE.Vector2(0.275, 1.03),
    new THREE.Vector2(0.245, 1.12),
    new THREE.Vector2(0.205, 1.2),
    new THREE.Vector2(0.16, 1.27),
    new THREE.Vector2(0.11, 1.33),
    new THREE.Vector2(0.06, 1.38),
    new THREE.Vector2(0.025, 1.41),
    new THREE.Vector2(0.001, 1.42),
  ];

  const finShape = new THREE.Shape();
  finShape.moveTo(0, 0.18);
  finShape.quadraticCurveTo(0.42, 0.06, 0.62, -0.42);
  finShape.quadraticCurveTo(0.69, -0.6, 0.55, -0.62);
  finShape.quadraticCurveTo(0.26, -0.56, 0.02, -0.34);
  finShape.lineTo(0, 0.18);
  const fin = new THREE.ExtrudeGeometry(finShape, {
    depth: 0.05,
    bevelEnabled: true,
    bevelThickness: 0.015,
    bevelSize: 0.02,
    bevelSegments: 2,
    curveSegments: 16,
  });
  fin.translate(0, 0, -0.025);

  const bellPts = [
    new THREE.Vector2(0.1, 0),
    new THREE.Vector2(0.092, -0.05),
    new THREE.Vector2(0.098, -0.1),
    new THREE.Vector2(0.125, -0.16),
    new THREE.Vector2(0.165, -0.22),
    new THREE.Vector2(0.205, -0.27),
    new THREE.Vector2(0.215, -0.29),
  ];

  return {
    body: new THREE.LatheGeometry(bodyPts, 64),
    nose: new THREE.LatheGeometry(nosePts, 64),
    antenna: new THREE.CylinderGeometry(0.008, 0.014, 0.16, 10),
    boosterRing: new THREE.TorusGeometry(0.133, 0.011, 8, 24),
    rim: new THREE.TorusGeometry(0.155, 0.032, 10, 32),
    rimSmall: new THREE.TorusGeometry(0.082, 0.02, 8, 24),
    glass: new THREE.SphereGeometry(0.15, 20, 14),
    glassSmall: new THREE.SphereGeometry(0.08, 16, 10),
    booster: new THREE.CapsuleGeometry(0.13, 0.6, 6, 16),
    boosterTip: new THREE.SphereGeometry(0.128, 16, 12),
    strut: new THREE.CylinderGeometry(0.02, 0.02, 0.22, 8),
    fin,
    bell: new THREE.LatheGeometry(bellPts, 40),
    nozzleBooster: new THREE.CylinderGeometry(0.07, 0.105, 0.14, 20),
    band: new THREE.CylinderGeometry(0.402, 0.412, 0.09, 40),
    collar: new THREE.TorusGeometry(0.303, 0.012, 8, 40),
    beacon: new THREE.SphereGeometry(0.045, 12, 10),
  };
}

/** Red-tinted material set shared by all enemies. */
function buildMaterials(): Record<MatKey, THREE.Material> {
  return {
    hull: new THREE.MeshStandardMaterial({
      color: "#4a1211",
      emissive: "#ff2a18",
      emissiveIntensity: 0.4,
      metalness: 0.5,
      roughness: 0.4,
      envMapIntensity: 0.7,
    }),
    dark: new THREE.MeshStandardMaterial({
      color: "#140809",
      metalness: 0.85,
      roughness: 0.35,
      envMapIntensity: 0.8,
    }),
    metal: new THREE.MeshStandardMaterial({
      color: "#6e5a5a",
      metalness: 1,
      roughness: 0.4,
      envMapIntensity: 1,
    }),
    glow: new THREE.MeshStandardMaterial({
      color: "#2a0808",
      emissive: "#ff3826",
      emissiveIntensity: 1.7,
      metalness: 0.2,
      roughness: 0.4,
    }),
    glass: new THREE.MeshStandardMaterial({
      color: "#3a0a0a",
      emissive: "#ff5a3a",
      emissiveIntensity: 0.5,
      metalness: 0,
      roughness: 0.12,
      envMapIntensity: 1.2,
    }),
  };
}

/** Compose a local matrix from pos/rot/scale, optionally under an outer Y spin. */
function mat(
  pos: [number, number, number] = [0, 0, 0],
  rot: [number, number, number] = [0, 0, 0],
  scl: [number, number, number] = [1, 1, 1],
  outerY = 0
): THREE.Matrix4 {
  const m = new THREE.Matrix4().compose(
    new THREE.Vector3(...pos),
    new THREE.Quaternion().setFromEuler(new THREE.Euler(...rot)),
    new THREE.Vector3(...scl)
  );
  if (outerY) m.premultiply(new THREE.Matrix4().makeRotationY(outerY));
  return m;
}

let template: THREE.Group | null = null;

function buildTemplate(): THREE.Group {
  const g = buildGeometry();
  const mats = buildMaterials();
  const buckets: Record<MatKey, THREE.BufferGeometry[]> = {
    hull: [],
    dark: [],
    metal: [],
    glow: [],
    glass: [],
  };
  const add = (key: MatKey, geo: THREE.BufferGeometry, m: THREE.Matrix4) => {
    const c = geo.clone();
    c.applyMatrix4(m);
    // Normalize to non-indexed so indexed lathe/primitive parts and the
    // non-indexed extruded fin can be merged together.
    buckets[key].push(c.index ? c.toNonIndexed() : c);
  };

  // Hull
  add("hull", g.body, mat());
  add("dark", g.nose, mat());
  add("dark", g.band, mat([0, -0.62, 0]));
  add("glow", g.collar, mat([0, 0.88, 0], [Math.PI / 2, 0, 0]));
  add("metal", g.antenna, mat([0, 1.48, 0]));
  add("glow", g.beacon, mat([0, 1.57, 0]));

  // Portholes
  const port1 = mat([0, 0.46, 0.385], [-0.18, 0, 0]);
  add("metal", g.rim, port1);
  add("glass", g.glass, port1.clone().multiply(mat([0, 0, 0], [0, 0, 0], [1, 1, 0.45])));
  const port2 = mat([0, -0.02, 0.41], [-0.02, 0, 0]);
  add("metal", g.rimSmall, port2);
  add("glass", g.glassSmall, port2.clone().multiply(mat([0, 0, 0], [0, 0, 0], [1, 1, 0.5])));

  // Boosters
  for (const a of BOOSTER_ANGLES) {
    add("hull", g.booster, mat([0.55, -0.55, 0], [0, 0, 0], [1, 1, 1], a));
    add("dark", g.boosterTip, mat([0.55, -0.14, 0], [0, 0, 0], [1, 1.9, 1], a));
    add("metal", g.boosterRing, mat([0.55, -0.44, 0], [Math.PI / 2, 0, 0], [1, 1, 1], a));
    add("metal", g.boosterRing, mat([0.55, -0.72, 0], [Math.PI / 2, 0, 0], [1, 1, 1], a));
    add("dark", g.nozzleBooster, mat([0.55, -1.0, 0], [0, 0, 0], [1, 1, 1], a));
    add("metal", g.strut, mat([0.44, -0.3, 0], [0, 0, Math.PI / 2], [1, 1, 1], a));
    add("metal", g.strut, mat([0.42, -0.82, 0], [0, 0, Math.PI / 2], [1, 1, 1], a));
  }

  // Fins
  for (const a of FIN_ANGLES) {
    add("dark", g.fin, mat([0.28, -0.72, 0], [0, 0, 0], [1, 1, 1], a));
  }

  // Main engine bell
  add("dark", g.bell, mat([0, -1.16, 0]));

  const group = new THREE.Group();
  (Object.keys(buckets) as MatKey[]).forEach((key) => {
    if (!buckets[key].length) return;
    const merged = mergeGeometries(buckets[key], false);
    if (!merged) return;
    const mesh = new THREE.Mesh(merged, mats[key]);
    mesh.frustumCulled = false;
    group.add(mesh);
  });

  // Dispose the source part geometries; merged copies own their own buffers.
  Object.values(g).forEach((geo) => geo.dispose());
  return group;
}

/**
 * Returns a clone of the merged enemy hull. Clones share the cached merged
 * geometry + materials, so N enemies cost only a few draw calls each.
 */
export function createEnemyHull(): THREE.Group {
  if (!template) template = buildTemplate();
  return template.clone(true);
}
