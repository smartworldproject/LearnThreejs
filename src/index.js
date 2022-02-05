import "./styles.css";
import createCube from "./createCube";
import createLight from "./createLight";
import animate from "./animate";
import createCamera from "./createCamera";
import createRenderer from "./createRenderer";
import createScene from "./createScene";
import { InteractionManager } from "three.interactive";
import * as TWEEN from "@tweenjs/tween.js";
import { Vector3 } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

function getCenterPoint(mesh) {
  var geometry = mesh.geometry;
  geometry.computeBoundingBox();
  var center = new Vector3();
  geometry.boundingBox.getCenter(center);
  mesh.localToWorld(center);
  return center;
}

const renderer = createRenderer();

const scene = createScene();

const camera = createCamera();
const interactionManager = new InteractionManager(
  renderer,
  camera,
  renderer.domElement
);

let controls = new OrbitControls(camera, renderer.domElement);

renderer.domElement.addEventListener("click", (event) => {
  console.log(event.target);
  if (event.target) return;
  event.stopPropagation();
  console.log(`Miss Click cube was clicked`);
  const coords = {
    x: camera.position.x,
    y: camera.position.y,
    z: camera.position.z
  };
  new TWEEN.Tween(coords)
    .to({ x: 0, y: 0, z: 0 })
    .easing(TWEEN.Easing.Quadratic.Out)
    .onUpdate(() => {
      camera.position.set(coords.x, coords.y, coords.z);
      controls.target = new Vector3();
      camera.lookAt({ x: 0, y: 0, z: 0 });
    })
    .start();
});

const cubes = {
  pink: createCube({ color: 0xff00ce, x: -1, y: -1 }),
  purple: createCube({ color: 0x9300fb, x: 1, y: -1 }),
  blue: createCube({ color: 0x0065d9, x: 1, y: 1 }),
  cyan: createCube({ color: 0x00d7d0, x: -1, y: 1 })
};

const light = createLight();

for (const [name, object] of Object.entries(cubes)) {
  object.addEventListener("click", (event) => {
    event.stopPropagation();
    console.log(`${name} cube was clicked`);
    const cube = getCenterPoint(event.target);
    const coords = {
      x: camera.position.x,
      y: camera.position.y,
      z: camera.position.z
    };
    new TWEEN.Tween(coords)
      .to({ x: cube.x, y: cube.y, z: Math.PI - cube.z })
      .easing(TWEEN.Easing.Quadratic.Out)
      .onUpdate(() => {
        camera.position.set(coords.x, coords.y, coords.z);
        controls.target = cube;
        camera.lookAt(cube);
      })
      .start();
  });
  interactionManager.add(object);
  scene.add(object);
}

scene.add(light);

animate((time) => {
  renderer.render(scene, camera);
  interactionManager.update();
  controls.update();
  TWEEN.update(time);
});
