import React, { useRef,useEffect, useState,useMemo } from 'react';
import * as THREE from 'three';

import Stats from '../../node_modules/three/examples/jsm/libs/stats.module.js';

import { GUI } from '../../node_modules/three/examples/jsm/libs/dat.gui.module.js';
import { OrbitControls } from '../../node_modules/three/examples/jsm/controls/OrbitControls.js';
import { Line2 } from '../../node_modules/three/examples/jsm/lines/Line2.js';
import { LineMaterial } from '../../node_modules/three/examples/jsm/lines/LineMaterial.js';
import { LineGeometry } from '../../node_modules/three/examples/jsm/lines/LineGeometry.js';
import { GeometryUtils } from '../../node_modules/three/examples/jsm/utils/GeometryUtils.js';


let line, renderer, scene, camera, controls;
let line1;
let matLine, matLineBasic, matLineDashed;
let stats;
let gui;

// viewport
let insetWidth;
let insetHeight;

const NewComponent = () => {
  const mount = useRef(null)

  function init() {

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setClearColor( 0x000000, 0.0 );
    renderer.setSize( window.innerWidth, window.innerHeight );


    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 1000 );
    camera.position.set( - 40, 0, 60 );



    controls = new OrbitControls( camera, renderer.domElement );
    controls.minDistance = 10;
    controls.maxDistance = 500;


    // Position and THREE.Color Data

    const positions = [];
    const colors = [];

    //const points = GeometryUtils.hilbert3D( new THREE.Vector3( 0, 0, 0 ), 20.0, 1, 0, 1, 2, 3, 4, 5, 6, 7 );
    //const points = GeometryUtils.hilbert3D( new THREE.Vector3( 0, 0, 0 ), 20.0, 1, 0, 1, 2, 3, 4, 5, 6, 7 );

    const spline = new THREE.CatmullRomCurve3( [
        new THREE.Vector3( -10, 0, 10 ),
        new THREE.Vector3( -5, 5, 5 ),
        new THREE.Vector3( 0, 0, 0 ),
        new THREE.Vector3( 5, -5, 5 ),
        new THREE.Vector3( 10, 0, 10 )
      ] );

    const points = spline.getPoints( 50 );
    const divisions = Math.round( 12 * points.length );
    const point = new THREE.Vector3();
    const color = new THREE.Color();

    for ( let i = 0, l = divisions; i < l; i ++ ) {

      const t = i / l;

      spline.getPoint( t, point );
      positions.push( point.x, point.y, point.z );

      color.setHSL( t, 1.0, 0.5 );
      colors.push( color.r, color.g, color.b );

    }


    // Line2 ( LineGeometry, LineMaterial )

    const geometry = new LineGeometry();
    geometry.setPositions( positions );
    geometry.setColors( colors );

    matLine = new LineMaterial( {

      color: 0xffffff,
      linewidth: 5, // in pixels
      vertexColors: true,
      //resolution:  // to be set by renderer, eventually
      dashed: false

    } );

    line = new Line2( geometry, matLine );
    line.computeLineDistances();
    line.scale.set( 1, 1, 1 );
    scene.add( line );


    // THREE.Line ( THREE.BufferGeometry, THREE.LineBasicMaterial ) - rendered with gl.LINE_STRIP

    const geo = new THREE.BufferGeometry();
    geo.setAttribute( 'position', new THREE.Float32BufferAttribute( positions, 3 ) );
    geo.setAttribute( 'color', new THREE.Float32BufferAttribute( colors, 3 ) );

    matLineBasic = new THREE.LineBasicMaterial( { vertexColors: true } );
    matLineDashed = new THREE.LineDashedMaterial( { vertexColors: true, scale: 2, dashSize: 1, gapSize: 1 } );

    line1 = new THREE.Line( geo, matLineBasic );
    line1.computeLineDistances();
    line1.visible = false;
    scene.add( line1 );

    //

    window.addEventListener( 'resize', onWindowResize );
    onWindowResize();

    stats = new Stats();
    //mount.current.appendChild( stats.dom );


  }


  useEffect(() => {

    init();
    animate();
    //document.body.appendChild( renderer.domElement );
    mount.current.appendChild(renderer.domElement)

    return () => {

      mount.current.removeChild(renderer.domElement)

    }


  }, [])


  return <div className="vis" ref={mount}/>;
}





function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );

  insetWidth = window.innerHeight / 4; // square
  insetHeight = window.innerHeight / 4;


}

function animate() {

  requestAnimationFrame( animate );

  stats.update();

  // main scene

  renderer.setClearColor( 0x000000, 0 );

  renderer.setViewport( 0, 0, window.innerWidth, window.innerHeight );

  // renderer will set this eventually
  matLine.resolution.set( window.innerWidth, window.innerHeight ); // resolution of the viewport

  renderer.render( scene, camera );

  // inset scene

  renderer.setClearColor( 0x222222, 1 );

  renderer.clearDepth(); // important!

  renderer.setScissorTest( true );

  renderer.setScissor( 20, 20, insetWidth, insetHeight );

  renderer.setViewport( 20, 20, insetWidth, insetHeight );



  // renderer will set this eventually
  matLine.resolution.set( insetWidth, insetHeight ); // resolution of the inset viewport



  renderer.setScissorTest( false );

}

//



export default NewComponent;
