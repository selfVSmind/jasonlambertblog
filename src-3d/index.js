import * as THREE from 'three'
import { Text } from 'troika-three-text'
const articleData = require('./article-data.json');

let scene, camera, renderer, geometry, articleText;

const add3dText = () => {
  const loader = new THREE.FontLoader();

  loader.load( 'fonts/Turok_Regular.typeface.json', function ( font ) {
  
    let textGeometry = new THREE.TextGeometry( '{jason:lambert}', {
      font: font,
      size: 10,
      height: 1,
      curveSegments: 12,
      bevelEnabled: true,
      bevelThickness: 1,
      bevelSize: 1,
      bevelOffset: 0,
      bevelSegments: 5
    } );

    textGeometry.computeBoundingBox();

    let textMaterial = new THREE.MeshPhongMaterial( { color: 0xff00ff, specular: 0xffffff } );
   
    // let textTexture = new THREE.TextureLoader().load('textures/bacon-me-crazy.jpg');
    // textTexture.repeat.set(0.1, 0.1);
    // let textMaterial = new THREE.MeshBasicMaterial({ map: textTexture });

    geometry = new THREE.Mesh( textGeometry, textMaterial );
    geometry.position.x -= textGeometry.boundingBox.max.x / 2;
    geometry.position.y += 10;
    scene.add(geometry);
    animate();

  } );

}

const articleWidth = 100;

const addArticleTitle = () => {
  articleText = new Text();
  scene.add(articleText);

  // Set properties to configure:
  console.log(articleData)
  articleText.text = articleData[0].content[1].data.text;
  articleText.fontSize = 2;
  articleText.textAlign = 'justify';
  articleText.maxWidth = articleWidth;
  articleText.position.x = -(articleWidth / 2);
  articleText.color = 0x9966FF;

  // Update the rendering:
  articleText.sync();
}

const init = () => {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 1000);
  renderer = new THREE.WebGLRenderer();

  // renderer.setSize( window.innerWidth, window.innerHeight );
  onWindowResize();

  document.body.appendChild( renderer.domElement );

  var light = new THREE.DirectionalLight( 0xffffff );
  light.position.set( 1, 1, 1 );
  scene.add( light );

  addArticleTitle();
  add3dText();

  camera.position.z = 100;
  renderer.setClearColor(15790320);
  renderer.setPixelRatio(window.devicePixelRatio);

};

let theta = 0.0;
let vel = 0.01;

const animate = () => {
  requestAnimationFrame(animate);

  geometry.rotation.x = theta;
  mesh.rotation.x = theta;
  mesh.rotation.y = theta;
  articleText.rotation.y = theta/2;
  theta += vel;
  if(theta > 1 || theta < -1) vel *= -1;

  renderer.render( scene, camera );
};

const onWindowResize = () => {
  camera.aspect = window.innerWidth / window.innerHeight;

  const fov = 35;
  const planeAspectRatio = 16 / 9;

  const cameraHeight = Math.tan(THREE.MathUtils.degToRad(fov / 2));
  const ratio = camera.aspect / planeAspectRatio;
  const newCameraHeight = cameraHeight / ratio;
  camera.fov = THREE.MathUtils.radToDeg(Math.atan(newCameraHeight)) * 2;

  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
};

let yPos = 0;
let yPosTheta = 0.05;
let yPosMax = 5;
let yPosMin = -40;

const onMouseWheel = (event) => {
  yPos -= event.deltaY * yPosTheta;
  updateScroll();
}

const updateScroll = () => {
  if(yPos > yPosMax) yPos = yPosMax;
  if(yPos < yPosMin) yPos = yPosMin;
  camera.position.y = yPos;
}

let yTouch;

const onTouchStart = (event) => {
  event.preventDefault();
  yTouch = event.touches[0].pageY;
}

const onTouchMove = (event) => {
  let yTouchDelta = event.touches[0].pageY - yTouch;
  yPos += (yTouchDelta * 0.01);
  updateScroll();
}

window.addEventListener('resize', onWindowResize, false);
window.addEventListener( 'wheel', onMouseWheel, false );
window.addEventListener('touchmove', onTouchMove, false);
window.addEventListener('touchstart', onTouchStart, false);
// window.addEventListener('touchcancel', onTouchCancel, false);
// window.addEventListener('touchend', onTouchEnd, false);



init();

let texture = new THREE.TextureLoader().load("articles/first-post/jasonlambertchive.jpg");
let boxGeometry = new THREE.BoxGeometry( 10, 10, 10 );
// Create a MeshBasicMaterial with a loaded texture
let material = new THREE.MeshBasicMaterial( { map: texture} );

// Combine the boxGeometry and material into a mesh
let mesh = new THREE.Mesh( boxGeometry, material );
// Add the mesh to the scene
scene.add( mesh );

