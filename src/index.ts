import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Stats from "three/examples/jsm/libs/stats.module";
import { Pane } from "tweakpane";

import "../public/img/goku.png";

const PARAMS = {
	cube1_rotationSpeed: 0.01,
	cube2_rotationSpeed: 0.01,
	color: "#0f0",
};

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 2;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

new OrbitControls(camera, renderer.domElement);

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({
	color: 0x00ff00,
	wireframe: true,
});

const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

const cube2 = new THREE.Mesh(
	geometry,
	new THREE.MeshBasicMaterial({
		color: 0xff9212,
		wireframe: true,
	})
);
scene.add(cube2);

window.addEventListener("resize", onWindowResize, false);

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
}

const stats = Stats();
document.body.appendChild(stats.dom);

const pane = new Pane();

pane.addInput(PARAMS, "cube1_rotationSpeed");
pane.addInput(PARAMS, "cube2_rotationSpeed");
pane.addInput(PARAMS, "color");

function animate() {
	requestAnimationFrame(animate);

	cube.rotation.x += PARAMS.cube1_rotationSpeed;
	cube.rotation.y += PARAMS.cube1_rotationSpeed;

	cube2.rotation.x -= PARAMS.cube2_rotationSpeed;
	cube2.rotation.y -= PARAMS.cube2_rotationSpeed;

	render();

	stats.update();
}

function render() {
	renderer.render(scene, camera);
}

animate();
