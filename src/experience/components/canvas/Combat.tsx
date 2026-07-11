import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { scrollState } from "@/lib/scroll";
import { combatState } from "@/lib/combat";
import { createEnemyHull } from "@/lib/rocketModel";
import { makeGlowTexture } from "@/lib/textures";
import {
  createRocketPlumeGeometry,
  createRocketPlumeMaterial,
  ROCKET_EXHAUSTS,
} from "@/lib/rocketExhaust";

/**
 * Combat — an optional, playful layer over the flight: enemy ships drift
 * through the scene, and clicking fires a laser from the main ship toward
 * the cursor. A hit detonates the enemy, which respawns moments later.
 *
 * Everything runs on preallocated pools mutated inside useFrame, so there
 * are no per-frame allocations and no React re-renders.
 */

const ENEMY_COUNT = 4;
const LASER_POOL = 32;
const ENEMY_LASER_POOL = 24;
const BURST_POOL = 12;

const LASER_SPEED = 120; // world units / sec
const LASER_LIFE = 1.8; // seconds
const ENEMY_LASER_SPEED = 85;
const ENEMY_LASER_LIFE = 2.2;
const HIT_RADIUS = 2.6; // laser–enemy kill distance
const ENEMY_SCALE = 0.5;
const SPAWN_MIN = 26;
const SPAWN_MAX = 60;
const DESPAWN_DIST = 92;

/** Major bodies enemies must not fly through (world center + radius). */
const PLANETS: { c: THREE.Vector3; r: number }[] = [
  { c: new THREE.Vector3(-24, 5, -70), r: 12 }, // Earth / about
  { c: new THREE.Vector3(-4, -3, -186), r: 14 }, // projects planet
  { c: new THREE.Vector3(28, 9, -262), r: 8 }, // contact sun
  { c: new THREE.Vector3(86, 38, -158), r: 10 }, // Mars
  { c: new THREE.Vector3(-112, -34, -200), r: 9 }, // Saturn
  { c: new THREE.Vector3(58, -26, -248), r: 8 }, // Jupiter
  { c: new THREE.Vector3(-70, 38, -280), r: 14 }, // gray giant
];
const PLANET_MARGIN = 2.5;

const UP = new THREE.Vector3(0, 1, 0);
/** The rocket hull's nose points along local +Y. */
const NOSE = new THREE.Vector3(0, 1, 0);
const _v1 = new THREE.Vector3();
const _v2 = new THREE.Vector3();
const _camDir = new THREE.Vector3();
const _right = new THREE.Vector3();
const _up = new THREE.Vector3();
const _aim = new THREE.Vector3();
const _ndc = new THREE.Vector2();
const _ray = new THREE.Raycaster();
const _q = new THREE.Quaternion();

type Enemy = {
  group: THREE.Group;
  pos: THREE.Vector3;
  vel: THREE.Vector3;
  plumesOuter: THREE.Mesh[];
  plumesInner: THREE.Mesh[];
  glows: THREE.Sprite[];
  engineLight: THREE.PointLight;
  alive: boolean;
  respawn: number; // seconds until respawn when dead
  spin: number;
  bob: number;
  thrustPhase: number;
  shotTimer: number;
};

type Laser = {
  mesh: THREE.Mesh;
  pos: THREE.Vector3;
  dir: THREE.Vector3;
  life: number;
  active: boolean;
};

type Burst = {
  sprite: THREE.Sprite;
  pos: THREE.Vector3;
  age: number;
  active: boolean;
};

/** Enemy nose direction reference (local +Y), for facing travel. */

export default function Combat() {
  const { camera, gl } = useThree();

  const enemyThrust = useMemo(() => {
    const geometry = createRocketPlumeGeometry();
    const outerMaterial = createRocketPlumeMaterial(
      new THREE.Color(2.2, 1.2, 0.65),
      new THREE.Color(2.0, 0.35, 0.12),
      new THREE.Color(0.9, 0.03, 0.01),
      0.9
    );
    const innerMaterial = createRocketPlumeMaterial(
      new THREE.Color(2.8, 2.2, 1.5),
      new THREE.Color(2.4, 0.8, 0.25),
      new THREE.Color(1.5, 0.12, 0.03),
      1
    );
    const glowTexture = makeGlowTexture("rgba(255,72,32,1)");
    const glowMaterial = new THREE.SpriteMaterial({
      map: glowTexture,
      transparent: true,
      opacity: 0.72,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      fog: false,
    });
    return { geometry, outerMaterial, innerMaterial, glowTexture, glowMaterial };
  }, []);

  /* ---- enemy pool (red rocket hull) ---- */
  const enemies = useMemo<Enemy[]>(() => {
    return Array.from({ length: ENEMY_COUNT }, () => {
      const group = new THREE.Group();
      const model = createEnemyHull();
      model.scale.setScalar(ENEMY_SCALE);
      const exhaustRoot = new THREE.Group();
      const plumesOuter: THREE.Mesh[] = [];
      const plumesInner: THREE.Mesh[] = [];
      const glows: THREE.Sprite[] = [];

      exhaustRoot.scale.setScalar(ENEMY_SCALE);
      for (const exhaust of ROCKET_EXHAUSTS) {
        const nozzle = new THREE.Group();
        nozzle.position.set(...exhaust.pos);
        nozzle.scale.setScalar(exhaust.scale);

        const outer = new THREE.Mesh(enemyThrust.geometry, enemyThrust.outerMaterial);
        outer.renderOrder = 10;
        outer.frustumCulled = false;
        plumesOuter.push(outer);
        nozzle.add(outer);

        const inner = new THREE.Mesh(enemyThrust.geometry, enemyThrust.innerMaterial);
        inner.scale.set(0.5, 0.5, 0.5);
        inner.renderOrder = 10;
        inner.frustumCulled = false;
        plumesInner.push(inner);
        nozzle.add(inner);

        const glow = new THREE.Sprite(enemyThrust.glowMaterial);
        glow.position.set(0, -0.08, 0);
        glow.scale.set(0.8, 0.8, 1);
        glow.renderOrder = 11;
        glows.push(glow);
        nozzle.add(glow);

        exhaustRoot.add(nozzle);
      }

      const engineLight = new THREE.PointLight("#ff4820", 4, 9, 2);
      engineLight.position.set(0, -1.9, 0);
      exhaustRoot.add(engineLight);
      group.add(model, exhaustRoot);
      group.visible = false;
      return {
        group,
        pos: new THREE.Vector3(),
        vel: new THREE.Vector3(),
        plumesOuter,
        plumesInner,
        glows,
        engineLight,
        alive: false,
        respawn: Math.random() * 1.5,
        spin: 0,
        bob: Math.random() * Math.PI * 2,
        thrustPhase: Math.random() * Math.PI * 2,
        shotTimer: 1 + Math.random() * 3,
      };
    });
  }, [enemyThrust]);

  /* ---- laser pool (tapered additive bolt) ---- */
  const lasers = useMemo<Laser[]>(() => {
    const geo = new THREE.CylinderGeometry(0.05, 0.14, 2.8, 6);
    const mat = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#8ff6ff"),
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      toneMapped: false,
    });
    return Array.from({ length: LASER_POOL }, () => {
      const mesh = new THREE.Mesh(geo, mat);
      mesh.visible = false;
      mesh.frustumCulled = false;
      return {
        mesh,
        pos: new THREE.Vector3(),
        dir: new THREE.Vector3(),
        life: 0,
        active: false,
      };
    });
  }, []);

  /* ---- cosmetic enemy laser pool ---- */
  const enemyLasers = useMemo<Laser[]>(() => {
    const geo = new THREE.CylinderGeometry(0.04, 0.12, 2.5, 6);
    const mat = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#ff4b2b"),
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      toneMapped: false,
    });
    return Array.from({ length: ENEMY_LASER_POOL }, () => {
      const mesh = new THREE.Mesh(geo, mat);
      mesh.visible = false;
      mesh.frustumCulled = false;
      return {
        mesh,
        pos: new THREE.Vector3(),
        dir: new THREE.Vector3(),
        life: 0,
        active: false,
      };
    });
  }, []);

  /* ---- explosion pool (expanding additive sprite) ---- */
  const bursts = useMemo<Burst[]>(() => {
    const tex = makeGlowTexture("rgba(255,150,60,0.95)");
    return Array.from({ length: BURST_POOL }, () => {
      const sprite = new THREE.Sprite(
        new THREE.SpriteMaterial({
          map: tex,
          transparent: true,
          opacity: 0,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
          toneMapped: false,
        })
      );
      sprite.visible = false;
      return { sprite, pos: new THREE.Vector3(), age: 0, active: false };
    });
  }, []);

  const laserCursor = useRef(0);
  const enemyLaserCursor = useRef(0);
  const burstCursor = useRef(0);

  useEffect(() => {
    return () => {
      enemyThrust.geometry.dispose();
      enemyThrust.outerMaterial.dispose();
      enemyThrust.innerMaterial.dispose();
      enemyThrust.glowMaterial.dispose();
      enemyThrust.glowTexture.dispose();
    };
  }, [enemyThrust]);

  /** Position an enemy at a random point in the volume ahead of the camera. */
  const spawnEnemy = (e: Enemy) => {
    camera.getWorldDirection(_camDir);
    _right.crossVectors(_camDir, UP).normalize();
    _up.crossVectors(_right, _camDir).normalize();
    const dist = SPAWN_MIN + Math.random() * (SPAWN_MAX - SPAWN_MIN);
    const lateral = (Math.random() - 0.5) * 46;
    const vert = (Math.random() - 0.5) * 26;
    e.pos
      .copy(camera.position)
      .addScaledVector(_camDir, dist)
      .addScaledVector(_right, lateral)
      .addScaledVector(_up, vert);
    // Gentle drift, biased sideways so they cross the view
    e.vel
      .set(
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 1.2,
        (Math.random() - 0.5) * 2
      )
      .addScaledVector(_right, (Math.random() - 0.5) * 6);
    e.alive = true;
    e.spin = (Math.random() - 0.5) * 0.8;
    e.shotTimer = 1.2 + Math.random() * 3.5;
    e.group.visible = true;

    // Don't spawn inside a planet — nudge out to the surface if we did.
    const enemyR = ENEMY_SCALE * 3;
    for (const pl of PLANETS) {
      _v2.copy(e.pos).sub(pl.c);
      const minDist = pl.r + enemyR + PLANET_MARGIN;
      const d = _v2.length();
      if (d < minDist && d > 1e-3) {
        e.pos.copy(pl.c).addScaledVector(_v2.divideScalar(d), minDist);
      }
    }
  };

  const detonate = (at: THREE.Vector3) => {
    const b = bursts[burstCursor.current % BURST_POOL];
    burstCursor.current++;
    b.pos.copy(at);
    b.age = 0;
    b.active = true;
    b.sprite.visible = true;
    b.sprite.position.copy(at);
  };

  /* ---- fire on click/tap, aimed from the ship toward the cursor ---- */
  useEffect(() => {
    const el = gl.domElement;
    const onDown = (ev: PointerEvent) => {
      if (!combatState.ready) return;
      // Ignore the finale, where the ship is being consumed by the sun.
      if (scrollState.impact > 0.5) return;
      const rect = el.getBoundingClientRect();
      _ndc.x = ((ev.clientX - rect.left) / rect.width) * 2 - 1;
      _ndc.y = -((ev.clientY - rect.top) / rect.height) * 2 + 1;
      _ray.setFromCamera(_ndc, camera);
      _ray.ray.at(160, _aim);

      const laser = lasers[laserCursor.current % LASER_POOL];
      laserCursor.current++;
      laser.pos.copy(combatState.shipPos);
      laser.dir.copy(_aim).sub(combatState.shipPos).normalize();
      laser.life = LASER_LIFE;
      laser.active = true;
      laser.mesh.visible = true;
    };
    el.addEventListener("pointerdown", onDown);
    return () => el.removeEventListener("pointerdown", onDown);
  }, [gl, camera, lasers]);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);
    const t = state.clock.elapsedTime;
    camera.getWorldDirection(_camDir);
    enemyThrust.outerMaterial.uniforms.uTime.value = t;
    enemyThrust.outerMaterial.uniforms.uThrust.value = 1;
    enemyThrust.innerMaterial.uniforms.uTime.value = t;
    enemyThrust.innerMaterial.uniforms.uThrust.value = 1;

    /* -------- enemies -------- */
    for (const e of enemies) {
      if (!e.alive) {
        e.respawn -= dt;
        if (e.respawn <= 0) spawnEnemy(e);
        continue;
      }
      e.pos.addScaledVector(e.vel, dt);
      // gentle bob so they feel alive
      e.bob += dt;
      e.pos.y += Math.sin(e.bob * 1.6) * dt * 0.6;

      // Keep enemies out of the planets: if one enters a body, push it back
      // to the surface and deflect its velocity along the surface normal.
      const enemyR = ENEMY_SCALE * 3;
      for (const pl of PLANETS) {
        _v2.copy(e.pos).sub(pl.c);
        const minDist = pl.r + enemyR + PLANET_MARGIN;
        const d = _v2.length();
        if (d < minDist && d > 1e-3) {
          _v2.divideScalar(d); // surface normal
          e.pos.copy(pl.c).addScaledVector(_v2, minDist);
          const vn = e.vel.dot(_v2);
          if (vn < 0) e.vel.addScaledVector(_v2, -vn * 1.6); // bounce outward
        }
      }

      // Respawn when they drift too far or fall behind the camera.
      _v1.copy(e.pos).sub(camera.position);
      if (_v1.length() > DESPAWN_DIST || _v1.dot(_camDir) < 2) {
        spawnEnemy(e);
      }

      e.group.position.copy(e.pos);
      // face travel direction + slow roll
      if (e.vel.lengthSq() > 1e-4) {
        _v2.copy(e.vel).normalize();
        _q.setFromUnitVectors(NOSE, _v2);
        e.group.quaternion.slerp(_q, 0.05);
      }
      e.group.rotateY(e.spin * dt);

      e.shotTimer -= dt;
      if (
        e.shotTimer <= 0 &&
        combatState.ready &&
        scrollState.impact <= 0.5
      ) {
        const laser =
          enemyLasers[enemyLaserCursor.current % ENEMY_LASER_POOL];
        enemyLaserCursor.current++;
        _v2.copy(e.vel).normalize();
        laser.pos.copy(e.pos).addScaledVector(_v2, ENEMY_SCALE * 1.7);
        laser.dir.copy(combatState.shipPos).sub(laser.pos).normalize();
        laser.life = ENEMY_LASER_LIFE;
        laser.active = true;
        laser.mesh.visible = true;
        e.shotTimer = 2 + Math.random() * 4;
      }

      const thrust = 0.88 + Math.sin(t * 18 + e.thrustPhase) * 0.12;
      const plumeLen = 1.7 + thrust * 0.75;
      for (const plume of e.plumesOuter) {
        plume.scale.y = plumeLen;
      }
      for (const plume of e.plumesInner) {
        plume.scale.y = plumeLen * 0.72;
      }
      for (const glow of e.glows) {
        const scale = 0.7 + thrust * 0.45;
        glow.scale.set(scale, scale, 1);
      }
      e.engineLight.intensity = 3.5 + thrust * 2.5;
    }

    /* -------- lasers + collisions -------- */
    for (const l of lasers) {
      if (!l.active) continue;
      l.pos.addScaledVector(l.dir, LASER_SPEED * dt);
      l.life -= dt;

      let hit = false;
      for (const e of enemies) {
        if (!e.alive) continue;
        if (l.pos.distanceToSquared(e.pos) < HIT_RADIUS * HIT_RADIUS) {
          e.alive = false;
          e.group.visible = false;
          e.respawn = 1.2 + Math.random() * 1.8;
          detonate(e.pos);
          hit = true;
          break;
        }
      }

      if (hit || l.life <= 0) {
        l.active = false;
        l.mesh.visible = false;
        continue;
      }

      l.mesh.position.copy(l.pos);
      _q.setFromUnitVectors(UP, l.dir);
      l.mesh.quaternion.copy(_q);
    }

    /* -------- cosmetic enemy lasers -------- */
    for (const l of enemyLasers) {
      if (!l.active) continue;
      l.pos.addScaledVector(l.dir, ENEMY_LASER_SPEED * dt);
      l.life -= dt;

      if (l.life <= 0) {
        l.active = false;
        l.mesh.visible = false;
        continue;
      }

      l.mesh.position.copy(l.pos);
      _q.setFromUnitVectors(UP, l.dir);
      l.mesh.quaternion.copy(_q);
    }

    /* -------- explosions -------- */
    for (const b of bursts) {
      if (!b.active) continue;
      b.age += dt;
      const k = b.age / 0.55;
      if (k >= 1) {
        b.active = false;
        b.sprite.visible = false;
        continue;
      }
      const scale = 2 + k * 14;
      b.sprite.scale.setScalar(scale);
      (b.sprite.material as THREE.SpriteMaterial).opacity = (1 - k) * 0.95;
    }

    // brief flicker keeps the bolts lively under bloom
    const flick = 0.85 + Math.sin(t * 40) * 0.15;
    for (const l of lasers) {
      if (l.active) (l.mesh.material as THREE.MeshBasicMaterial).opacity = flick;
    }
    for (const l of enemyLasers) {
      if (l.active) (l.mesh.material as THREE.MeshBasicMaterial).opacity = flick;
    }
  });

  return (
    <group>
      {enemies.map((e, i) => (
        <primitive key={`enemy-${i}`} object={e.group} />
      ))}
      {lasers.map((l, i) => (
        <primitive key={`laser-${i}`} object={l.mesh} />
      ))}
      {enemyLasers.map((l, i) => (
        <primitive key={`enemy-laser-${i}`} object={l.mesh} />
      ))}
      {bursts.map((b, i) => (
        <primitive key={`burst-${i}`} object={b.sprite} />
      ))}
    </group>
  );
}
