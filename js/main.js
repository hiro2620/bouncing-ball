import * as THREE from 'three';
import { createBallClass } from './ball';

const width = window.innerWidth;
const height = window.innerHeight;

const Ball = createBallClass(width, height);

const balls = [
  new Ball({ x: 100, y: 0 }, { vx: -1, vy: 0 }, 71, 0x0000ff, 2),
  new Ball({ x: -100, y: 0}, { vx: 1, vy: 0 }, 50, 0xff0000, 1),
  new Ball({ x: 0, y: 100}, { vx: 1, vy: 1 }, 50, 0x00ff00, 1),
  new Ball({ x: -100, y: 100}, { vx: -2, vy: 2 }, 25, 0xffff00, 0.25),
  new Ball({ x: -100, y: -100}, { vx: -3, vy: -3 }, 25, 0xff00ff, 0.25),
  new Ball({ x: 300, y: 0}, { vx: 4, vy: 0 }, 70, 0x00ffff, 2),
]

const scene = new THREE.Scene();
const camera = new THREE.OrthographicCamera( -width/2, width/2, height/2, -height/2 );

const renderer = new THREE.WebGLRenderer({
    antialias: true
});

renderer.setSize( width, height );
document.body.appendChild( renderer.domElement );

{
    const light = new THREE.AmbientLight( 0xffffff, 1);
    scene.add( light );
}

{
    const floor = new THREE.Mesh(
        new THREE.PlaneGeometry(width, height),
        new THREE.MeshBasicMaterial({
        color: 0xffffff,
        })
    );
    scene.add(floor);
}


{
  for (let i = 0; i < balls.length; i++) {
    scene.add(balls[i].mesh);
  }
}

camera.position.y = 0;
camera.position.x = 0;
camera.position.z = 250;

function animate() {
	requestAnimationFrame( animate );

  for (const ball of balls) {
    ball.prepareTick(balls);
  }

  for (const ball of balls) {
    ball.tick(balls);
  }

	renderer.render( scene, camera );
}

animate();