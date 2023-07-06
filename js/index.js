import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as THREE from 'three';
import { initStars } from './stars.js';

var container = document.getElementById('home');
var onCharging = document.getElementById('onCharging');
var modelLoader = document.getElementById('global-loader');
var scene, camera, renderer;
var earth; 
var starsGroup;

init();
animate();

function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  var loader = new GLTFLoader();

  loader.load('./myearth/scene.gltf', function (gltf) {
    earth = gltf.scene;
    earth.scale.set(5, 5, 5);
    earth.position.y = 0;
    earth.position.x = 6;
    

    // Configuration des matériaux
    earth.traverse(function (child) {
      if (child.isMesh) {
        child.material.envMap = null; // Supprime la réflexion de l'environnement
        child.material.needsUpdate = true; // Met à jour les matériaux
      }
    });

    scene.add(earth);
    
    modelLoader.style.display = "none";
    onCharging.style.display = "block";
    
  });

  // Ajout de la lumière ambiante
  var ambientLight = new THREE.AmbientLight(0xaad7ff);
  scene.add(ambientLight);

  // Ajout de la lumière directionnelle
  var directionalLight = new THREE.DirectionalLight(0xaad7ff, 10);
  directionalLight.position.set(1, 1, 1);
  scene.add(directionalLight);

  // Ajout des étoiles à la scène principale
  starsGroup = initStars(scene);

  camera.position.z = 10;
  
}



var isMouseDown = false; // Variable pour indiquer si la souris est enfoncée

document.addEventListener('mousedown', function() {
  isMouseDown = true;
  document.addEventListener('mousemove', function(event) {
    if (isMouseDown) {
      // Récupérer la position X de la souris
      var mouseX = event.clientX;
      
      // Effectuer la rotation de la Terre en fonction de la position X de la souris
      earth.rotation.y = (mouseX - window.innerWidth / 2) * 0.01;
    }
  });
});



document.addEventListener('mouseup', function() {
  isMouseDown = false;
});




function animate() {
  requestAnimationFrame(animate);
  animateElements();
  
  renderer.render(scene, camera);
}

function animateElements() {
  var elements = document.querySelectorAll('.animate');
  elements.forEach(function (element) {
    var rect = element.getBoundingClientRect();
    var isVisible = rect.top < window.innerHeight && rect.bottom >= 0;

    if (isVisible) {
      element.classList.add('visible');
      if (element.id === 'canvas-container' && earth) {
        earth.rotation.y += 0.001; // Ajustez la vitesse de rotation selon vos préférences
        starsGroup.rotation.x -= 0.001;
        starsGroup.rotation.y -= 0.0015;
        console.log(starsGroup.rotation.y)
      }
    } else {
      element.classList.remove('visible');
    }
  });
}


