import * as THREE from "three";

export default function createCube({ color, x, y }) {
  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshLambertMaterial({ color });
  const cube = new THREE.Mesh(geometry, material);
  cube.position.set(x, y, 0);

  return cube;
}
