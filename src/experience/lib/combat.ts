import * as THREE from "three";

/**
 * Shared, mutable combat state. The Rocket publishes its live world position
 * here each frame so the Combat system can fire lasers from the ship's nose
 * without a React re-render.
 */
export const combatState = {
  /** Main ship world position (updated by Rocket each frame). */
  shipPos: new THREE.Vector3(0, 0, 0),
  /** True once the Rocket has published at least one position. */
  ready: false,
};
