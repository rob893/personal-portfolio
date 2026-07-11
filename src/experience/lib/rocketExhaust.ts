import * as THREE from "three";

/** Nozzle assemblies in rocket-local space: main engine plus three boosters. */
export const ROCKET_EXHAUSTS: ReadonlyArray<{
  pos: [number, number, number];
  scale: number;
}> = [
  { pos: [0, -1.44, 0], scale: 1 },
  { pos: [0, -1.08, -0.55], scale: 0.5 },
  { pos: [-0.476, -1.08, 0.275], scale: 0.5 },
  { pos: [0.476, -1.08, 0.275], scale: 0.5 },
];

const PLUME_VERT = /* glsl */ `
  uniform float uTime;
  varying vec2 vUv;
  varying float vFres;
  void main() {
    vUv = uv;
    vec3 p = position;
    float tail = uv.y;
    float wob =
      sin(uv.x * 18.849 + uTime * 9.0 + tail * 8.0) +
      0.5 * sin(uv.x * 31.415 - uTime * 14.0 + tail * 12.0);
    p.x += normal.x * wob * 0.05 * tail;
    p.z += normal.z * wob * 0.05 * tail;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    vec3 n = normalize(normalMatrix * normal);
    vec3 v = normalize(-mv.xyz);
    vFres = pow(abs(dot(n, v)), 1.35);
    gl_Position = projectionMatrix * mv;
  }
`;

const PLUME_FRAG = /* glsl */ `
  uniform float uTime;
  uniform float uThrust;
  uniform float uAlpha;
  uniform vec3 uCore;
  uniform vec3 uMid;
  uniform vec3 uEdge;
  varying vec2 vUv;
  varying float vFres;
  void main() {
    float tail = vUv.y;
    float flick = 0.82 + 0.18 *
      sin(uTime * 21.0 + vUv.x * 12.566) *
      sin(uTime * 15.0 - tail * 10.0);
    vec3 col = mix(uCore, uMid, smoothstep(0.02, 0.38, tail));
    col = mix(col, uEdge, smoothstep(0.42, 0.95, tail));
    float alpha = 1.0 - smoothstep(0.12, 1.0, tail);
    alpha *= vFres * flick * uAlpha * clamp(uThrust, 0.0, 1.0);
    gl_FragColor = vec4(col * flick, alpha);
  }
`;

/** Creates the shared teardrop geometry used by rocket exhaust plumes. */
export function createRocketPlumeGeometry(): THREE.LatheGeometry {
  const points = [
    new THREE.Vector2(0.02, 0),
    new THREE.Vector2(0.13, -0.03),
    new THREE.Vector2(0.185, -0.12),
    new THREE.Vector2(0.21, -0.26),
    new THREE.Vector2(0.19, -0.42),
    new THREE.Vector2(0.14, -0.6),
    new THREE.Vector2(0.08, -0.78),
    new THREE.Vector2(0.03, -0.92),
    new THREE.Vector2(0.001, -1),
  ];
  return new THREE.LatheGeometry(points, 28);
}

/**
 * Creates an additive animated plume material.
 *
 * @param core Color at the nozzle.
 * @param mid Color through the body of the plume.
 * @param edge Color at the plume tip and edge.
 * @param alpha Maximum material opacity.
 * @returns A shader material whose time and thrust uniforms drive animation.
 */
export function createRocketPlumeMaterial(
  core: THREE.Color,
  mid: THREE.Color,
  edge: THREE.Color,
  alpha: number
): THREE.ShaderMaterial {
  return new THREE.ShaderMaterial({
    vertexShader: PLUME_VERT,
    fragmentShader: PLUME_FRAG,
    uniforms: {
      uTime: { value: 0 },
      uThrust: { value: 0 },
      uAlpha: { value: alpha },
      uCore: { value: core },
      uMid: { value: mid },
      uEdge: { value: edge },
    },
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
  });
}
