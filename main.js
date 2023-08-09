import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import * as dat from "dat.gui";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import './style.css';


// Documentation 3d model adding
const scene = new THREE.Scene();

const spaceTexture = new THREE.TextureLoader();
scene.background = spaceTexture.load('pexels-.jpg');

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

camera.position.set(0, 4, 4);

// Sets a 12 by 12 gird helper
const gridHelper = new THREE.GridHelper(12, 12);
scene.add(gridHelper);

// Sets the x, y, and z axes with each having a length of 4
const axesHelper = new THREE.AxesHelper(8);
scene.add(axesHelper);

//GLTF Load obj
const loader = new GLTFLoader();
let char;
loader.load(
  "./free_concept_car_cc0.glb",
  function (gltf) {
    const model = gltf.scene;
    scene.add(model);
    char = model;
    // char.position.x = 1
    char.position.y = 0.3;
  },
  undefined,
  function (error) {
    console.error(error);
  }
);


//GLTF Load obj
const loader2 = new GLTFLoader();
let char2;
loader2.load(
  "./statue_of_a_priest.glb",
  function (gltf) {
    const model2 = gltf.scene;
    scene.add(model2);
    char2 = model2;
    // char.position.x = 1
    char2.position.y = 2.3;
    char2.position.x = 2.3;
  },
  undefined,
  function (error) {
    console.error(error);
  }
);


//Cube
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
cube.position.x = -4;
cube.position.y = 3.5;
cube.position.z = -3;
scene.add(cube);
cube.castShadow = true;



//SPHERE
const sphereGeometry = new THREE.SphereGeometry(1, 50, 50);
const sphereMaterial = new THREE.MeshStandardMaterial({
    color: 0x0000FF,
    wireframe: false});
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
scene.add(sphere);
sphere.position.set(-3, 1, 2);
sphere.castShadow = true;


//Bottom Plane
const planeGeometry = new THREE.PlaneGeometry(30, 30);
const planeMaterial = new THREE.MeshStandardMaterial({
  color: 0x545241,
  side: THREE.DoubleSide,
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(plane);
plane.rotation.x = -0.5 * Math.PI;
plane.receiveShadow = true;

//Backside plane
const planeGeometry2 = new THREE.PlaneGeometry(30, 30);
const planeMaterial2 = new THREE.MeshStandardMaterial({
  color: 0x545241,
  side: THREE.DoubleSide,
});
const plane2 = new THREE.Mesh(planeGeometry2, planeMaterial2);
plane2.position.z = -6;
scene.add(plane2);

//LIGHTS

const ambientLight = new THREE.AmbientLight(0xffffff, 5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 10);
directionalLight.position.set(-15, 50, 0);
scene.add(directionalLight);
directionalLight.castShadow = true

// const directionalLight2 = new THREE.DirectionalLight(0xffffff, 10);
// directionalLight2.position.set(10, 5, 10);
// scene.add(directionalLight2);

//LIGHT HELPERS
const dLightHelper = new THREE.DirectionalLightHelper(directionalLight, 5);
scene.add(dLightHelper);

const dLightShadowHelper = new THREE.CameraHelper(
  directionalLight.shadow.camera
);
scene.add(dLightShadowHelper);

// const dLightHelper2 = new THREE.DirectionalLightHelper(directionalLight2, 5);
// scene.add(dLightHelper2);

// const dLightShadowHelper2 = new THREE.CameraHelper(directionalLight2.shadow.camera);
// scene.add(dLightShadowHelper2);



function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(2000).fill().forEach(addStar);





//ORBIT CONTROLS
const controls = new OrbitControls(camera, renderer.domElement);
controls.update(); // Make sure to call this after any change to the controls

function animate(time) {
  requestAnimationFrame(animate);
  //what is "time" here in parameters
  if (char) char.rotation.y = -time / 3000;

  cube.rotation.y += 0.08;
  renderer.render(scene, camera);
}
animate();
// renderer.setAnimationLoop(animate);
