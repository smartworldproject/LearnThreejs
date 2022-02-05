import * as THREE from "three";

export default function createRenderer() {
  const root = document.getElementById("app");
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  root.appendChild(renderer.domElement);
  return renderer;
}
