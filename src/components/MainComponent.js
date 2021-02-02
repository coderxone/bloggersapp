import React, { Component } from 'react';
import * as THREE from "three";
import sample from '../images/sample1.jpeg';
import sample2 from '../images/sample2.jpg';
import '../css/MainComponent.css';


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

class App_d extends Component {
  componentDidMount() {

    // var lineVertShader = ` attribute float lineDistance; varying float vLineDistance; void main() { vLineDistance = lineDistance; vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 ); gl_Position = projectionMatrix * mvPosition; } `;
    //
    //  var lineFragShader = ` uniform vec3 diffuse; uniform float opacity; uniform float time; // added time uniform uniform float dashSize; uniform float gapSize; uniform float dotSize; varying float vLineDistance; void main() { float totalSize = dashSize + gapSize; float modulo = mod( vLineDistance + time, totalSize ); // time added to vLineDistance float dotDistance = dashSize + (gapSize * .5) - (dotSize * .5); if ( modulo > dashSize && mod(modulo, dotDistance) > dotSize ) { discard; } gl_FragColor = vec4( diffuse, opacity ); } `;


    var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
    var scene = new THREE.Scene();


    scene.add(new THREE.AmbientLight(5263440));
      var light = new THREE.SpotLight(16777215, 1.5);
      light.position.set(0, 500, 200);
      light.castShadow = true;
      light.shadow.camera.near = 200;
      light.shadow.camera.far = camera.far;
      light.shadow.camera.fov = 50;
      light.shadow.bias = - 0.000022;
      light.shadow.mapSize.width = 2048;
      light.shadow.mapSize.height = 2048;
      scene.add(light);
    var renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setClearColor(15790320);
      renderer.setPixelRatio( window.devicePixelRatio );
      renderer.setSize( window.innerWidth, window.innerHeight );
      renderer.sortObjects = false;
      //document.body.appendChild( renderer.domElement );

      // var camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 500 );
      camera.position.set( 0, 0, 100 );
      camera.lookAt( 0, 0, 0 );

      var scene = new THREE.Scene();
       this.mount.appendChild( renderer.domElement );


       const curve = new THREE.EllipseCurve(
          	0,  60,            // ax, aY
          	30, 10,           // xRadius, yRadius
          	0,  2 * Math.PI,  // aStartAngle, aEndAngle
          	false,            // aClockwise
          	0                 // aRotation
          );

        const points = curve.getPoints( 50 );
        const geometry = new THREE.BufferGeometry().setFromPoints( points );

        const material = new THREE.LineBasicMaterial( { color : 0xff0000 } );

        // Create the final object to add to the scene
        const ellipse = new THREE.Line( geometry, material );

        var group = new THREE.Group();
      //  group.add( ellipse );

        //text
        //// Start of TextGeometry
          var loader = new THREE.FontLoader();
          loader.load( 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/fonts/helvetiker_bold.typeface.js', function ( font ) {
            var textGeo = new THREE.TextGeometry( "THREE.JS", {
                font: font,
                size: 20, // font size
                height: 10, // how much extrusion (how thick / deep are the letters)
                curveSegments: 12,
                bevelThickness: 1,
                bevelSize: 1,
                bevelEnabled: true,

            });
            textGeo.computeBoundingBox();
            var textMaterial = new THREE.MeshPhongMaterial( { color: 0xff0000, specular: 0xffffff } );
            var mesh = new THREE.Mesh( textGeo, textMaterial );
            mesh.position.x = 0;
            mesh.position.y = 0;
            mesh.position.z = 200;
            mesh.castShadow = true;
            mesh.receiveShadow = true;
          //  group.add( mesh );
          scene.add( mesh );
          });
          // End TextGeometry



        // Create the final object to add to the scene

        //insert block




      var clock = new THREE.Clock();
      var time = 0;




      render();

      function render() {

        renderer.render(scene, camera);

      }




  }
  render() {
    return (
      <div className="ShapePosition" ref={ref => (this.mount = ref)} />
    )
  }
}

export default App_d;
