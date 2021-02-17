import React, { useRef,useEffect, useState,useLayoutEffect } from 'react';
import { Canvas, useFrame } from 'react-three-fiber';
import * as THREE from "three";
import sample from '../images/sample1.jpeg';
import sample2 from '../images/sample2.jpg';
import '../css/MainComponent.css';
import fontStylesD from '../fonts/helvetiker_regular_typeface.json';


function TextMesh(props) {
  const mesh = useRef(null)

  useFrame(() => {
    // animation code goes here
    // mesh.current.rotation.x += 0.01
     mesh.current.rotation.y += 0.01
     mesh.current.geometry.center()
    // mesh.current.rotation.z += 0.01

  })

  // parse JSON file with Three
  const font = new THREE.FontLoader().parse(fontStylesD);

  // configure font geometry
  const textOptions = {
    font,
    size: 3,
    height: 1
  };



  return (
    <mesh position={[-5, 0, -10]} ref={mesh}>
      <textGeometry attach='geometry' args={['Business', textOptions]} />
      <meshStandardMaterial attach='material'  />
    </mesh>
  )
}

function vertexShader() {
  return `
  attribute float lineDistance;
  varying float vLineDistance;

  void main() {
    vLineDistance = lineDistance;
    vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
    gl_Position = projectionMatrix * mvPosition;
  }
  `
}

function fragmentShader() {
  return `
      uniform vec3 diffuse;
      uniform float opacity;
      uniform float time; // added time uniform

      uniform float dashSize;
      uniform float gapSize;
      uniform float dotSize;
      varying float vLineDistance;

      void main() {
        float totalSize = dashSize + gapSize;
        float modulo = mod( vLineDistance + time, totalSize ); // time added to vLineDistance
        float dotDistance = dashSize + (gapSize * .5) - (dotSize * .5);

        if ( modulo > dashSize && mod(modulo, dotDistance) > dotSize ) {
          discard;
        }

        gl_FragColor = vec4( diffuse, opacity );
      }
  `
}

function newShaderMaterial(){
  return new THREE.ShaderMaterial({
    uniforms: {
      diffuse: {value: new THREE.Color(0xff0000)},
      dashSize: {value: 20},
      gapSize: {value: 1},
      dotSize: {value: 0.1},
      opacity: {value: 1.0},
      time: {value: 0} // added uniform
    },
    vertexShader: vertexShader(),
    fragmentShader: fragmentShader(),
    transparent: true
  });
}


const backgroundColor = "#ffffff";
const TextColor = "#3be3e3";
const BusinessEllipseColor = "#3be3e3";
const ASPECT_RATIO = window.innerWidth / window.innerHeight;
const WIDTH = ( window.innerWidth ) * window.devicePixelRatio;
const HEIGHT = ( window.innerHeight ) * window.devicePixelRatio;

const NewHookComponent = () => {

  const mount = useRef(null)
  const [isAnimating, setAnimating] = useState(true)
  const controls = useRef(null)
  const group = new THREE.Object3D();
  const scene = new THREE.Scene();
  let width = window.innerWidth;
  let height = window.innerHeight;
  const camera = new THREE.PerspectiveCamera(75,ASPECT_RATIO, 1, 1000);
  const cameraPerspective = new THREE.PerspectiveCamera( 75,ASPECT_RATIO, 150, 1000);
  const cameraPerspectiveHelper = new THREE.CameraHelper( camera );
  const renderer = new THREE.WebGLRenderer({ antialias: true })

  const SetCameraPosition = () => {
    camera.position.set( 0, 0, 100 );
    camera.updateMatrixWorld();
    camera.lookAt( 0, 0, 0 );

    renderer.setClearColor(backgroundColor)
    renderer.setSize(width, height)
  }
  useEffect(() => {

    SetCameraPosition();
    group.add( camera );//adding camera to group
    //scene.add( cameraPerspectiveHelper );
    scene.add(group); //add group with camera to scene
    //ellipse
    const curve = new THREE.EllipseCurve(
         0,  0,            // ax, aY
         30, 10,           // xRadius, yRadius
         0,  2 * Math.PI,  // aStartAngle, aEndAngle
         false,            // aClockwise
         0                 // aRotation
       );

     const points = curve.getPoints( 50 );
     const geometryEl = new THREE.BufferGeometry().setFromPoints( points );
     const materialEl = new THREE.LineBasicMaterial( {
       color : BusinessEllipseColor,
       linewidth:6,
       wireframe: true,
       linecap: 'round', //ignored by WebGLRenderer
      	linejoin:  'round' //ignored by WebGLRenderer

     } );
     const ellipse = new THREE.Line( geometryEl, materialEl );
     ellipse.position.y = 40;
     ellipse.rotation.x = 0.4;

     scene.add(ellipse);
    //ellipse

    //cube
    const geometry = new THREE.BoxGeometry(20, 20, 20)
    const material = new THREE.MeshBasicMaterial({ color: 0xff00ff })
    const cube = new THREE.Mesh(geometry, material)
    //ellipse.add( cube );
    //cube

    //text
    const font = new THREE.FontLoader().parse(fontStylesD);

    // configure font geometry
    const textOptions = {
      font,
      size: 7, // font size
      height: 7, // how much extrusion (how thick / deep are the letters)

    };

    var textGeometry = new THREE.TextGeometry( "Business", textOptions);

    var textMaterial = new THREE.MeshBasicMaterial(
      { color: TextColor }
    );

    var Textmesh = new THREE.Mesh( textGeometry, textMaterial );
    Textmesh.geometry.center();
    ellipse.add(Textmesh);



    //scene.add(group);





    //text



    function animate() {
        renderer.render(scene, camera)
        setTimeout(animate, 5);
      }
      animate();

    mount.current.appendChild(renderer.domElement)

    return () => {

      mount.current.removeChild(renderer.domElement)

    }


  }, [])









  return <div className="vis" ref={mount}  />
}


export default NewHookComponent;
