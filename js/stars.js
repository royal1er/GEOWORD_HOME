import * as THREE from 'three';

export function initStars(scene) {
  var sphereGroup = new THREE.Group();

  var sphereGeometry = new THREE.SphereGeometry(0.002, 32, 32);
  var sphereMaterial = new THREE.PointsMaterial({
    color: "#fff9e8",
    size: 0.01,
    sizeAttenuation: true,
    transparent: true,
    depthWrite: false,
  });

  var spherePositions = randomInSphere(5000, 10);
  var sphere = new THREE.Points(sphereGeometry, sphereMaterial);
  sphere.geometry.setAttribute(
    "position",
    new THREE.BufferAttribute(spherePositions, 3)
  );
  sphereGroup.add(sphere);

  scene.add(sphereGroup);

  return sphereGroup;
}

function randomInSphere(numPoints, radius) {
  var positions = new Float32Array(numPoints * 3);
  for (var i = 0; i < numPoints; i++) {
    var theta = Math.random() * Math.PI * 2;
    var phi = Math.random() * Math.PI;
    var r = Math.cbrt(Math.random()) * radius;

    var x = r * Math.sin(phi) * Math.cos(theta);
    var y = r * Math.sin(phi) * Math.sin(theta);
    var z = r * Math.cos(phi);

    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;
  }

  return positions;
}
