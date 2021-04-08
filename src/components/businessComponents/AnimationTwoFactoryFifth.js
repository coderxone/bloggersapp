import React, { useRef,useEffect, useState,useCallback } from 'react';
import * as THREE from 'three';
import Stats from '../../../node_modules/three/examples/jsm/libs/stats.module.js';

import { GUI } from '../../../node_modules/three/examples/jsm/libs/dat.gui.module.js';
import { OrbitControls } from '../../../node_modules/three/examples/jsm/controls/OrbitControls.js';
import { Line2 } from '../../../node_modules/three/examples/jsm/lines/Line2.js';
import { LineMaterial } from '../../../node_modules/three/examples/jsm/lines/LineMaterial.js';
import { LineGeometry } from '../../../node_modules/three/examples/jsm/lines/LineGeometry.js';
import { GeometryUtils } from '../../../node_modules/three/examples/jsm/utils/GeometryUtils.js';
import { Interaction } from 'three.interaction';
import Arrows from '../../images/main/newImages/arrows.png';

import Pricing from '../../images/main/newImages/pricing.png';

import Join from '../../images/main/newImages/join.png';

import Lines7Image from '../../images/main/newImages/gps.png';
import fontStylesD from '../../fonts/helvetiker_regular_typeface.json';
import { MeshLine, MeshLineMaterial, MeshLineRaycast } from 'three.meshline'
import {
  useHistory,
} from "react-router-dom";



let line, renderer, scene,scene2, camera, controls;
var liness = [];
var linessB = [];
let line1;
let matLine, matLineBasic, matLineDashed;
let matLins = [];
let matLinsB = [];
let ematLineBasics = [];
let matLineDasheds = [];
let stats;
let gui;
var YPosition = -480;
var lineMeshZ;
var earthmesh;
const backgroundColor = "#ffffff";
const orbit_control = 0;
const ASPECT_RATIO = window.innerWidth / window.innerHeight;
const WhiteTextColor = "#ffffff";
const LinesColor = "rgb(32, 144, 204)";//2090cc
//const LinesColor = "rgb(3, 148, 252)";//2090cc
// viewport
let insetWidth;
let insetHeight;
const firstPagePosition = -150;
const secondPagePosition = -606;
const thirdPagePosition = -1061;
const fourthPagePosition = -1435;
const fifthPagePosition = -1890;

const rightWindowPosition = 0;
const leftWindowPosition = -19;
var circleA;
var circleB;
var circleC;
var circleD;
var turnFourthAnimation = 0;
var t = 0;
var t2 = 0;
var t3 = 0;
var planetAnimation = 0;

const NewComponent = (props) => {
  const mount = useRef(null);

  const history = useHistory();

  // var props = {
  //   page:3
  // }

  const goToLogin = useCallback(() => {

    return history.push('/login'), [history]

  });

  function init() {

		renderer = new THREE.WebGLRenderer( { antialias: true } );
		renderer.setPixelRatio( window.devicePixelRatio );
		renderer.setClearColor( 0x000000, 0.0 );
		renderer.setSize( window.innerWidth, window.innerHeight );


		scene = new THREE.Scene();
		scene2 = new THREE.Scene();

		camera = new THREE.PerspectiveCamera( 45,ASPECT_RATIO, 1, 1000);
		//camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 1000 );
    var Deep = 550;
    if((window.innerWidth < 376) && (window.innerHeight > 650) && (window.innerHeight < 850)){
      Deep = 700;

    }
    if((window.innerWidth < 376) && (window.innerHeight > 630) && (window.innerHeight < 650)){
        Deep = 550;
    }

    if((window.innerWidth < 450) && (window.innerHeight > 850) && (window.innerHeight < 900)){
        Deep = 700;
    }
    if(props.page == 1){
      camera.position.set( 0, firstPagePosition, Deep );
    }else if(props.page == 2){
      camera.position.set( 0, secondPagePosition, 550 );
    }else if(props.page == 3){
      camera.position.set( 0, thirdPagePosition, 550 );
    }else if(props.page == 4){
      camera.position.set( 0, fourthPagePosition, 550 );
    }else if(props.page == 5){
      camera.position.set( 0, fifthPagePosition, 550 );
    }else{
      camera.position.set( 0, firstPagePosition, Deep );
    }

    const interaction = new Interaction(renderer, scene2, camera);
		//camera.position.set( 0, -250, 550 );
		//camera.position.set( 0, YPosition, 550 );
		//camera.position.set( 0, -570, 550 );
		//camera.position.set( 0, -700, 550 );
		//camera.position.set( 0, -900, 550 );
		//camera.position.set( 0, -1300, 550 );
		//camera.position.set( 0, -1600, 550 );
    //var viewPosition = {x:0,y:-150,z:550};//for mobiles
    camera.updateMatrixWorld();
    camera.layers.enable(0);
    camera.layers.enable(1);
    camera.layers.enable(2);


    if(orbit_control == 1){
      controls = new OrbitControls( camera, renderer.domElement );
  		controls.minDistance = 10;
  		controls.maxDistance = 550;
    }


        if((props.page === 4) || (props.page === 5)){
          //Pricing_a
          const Pricing_a = new THREE.MeshBasicMaterial({
              map:new THREE.TextureLoader().load(Pricing)
          });
          Pricing_a.map.needsUpdate = true; //ADDED
          var Pricing_a_mesh = new THREE.Mesh(new THREE.PlaneGeometry(351, 70),Pricing_a);
          Pricing_a_mesh.overdraw = true;
          Pricing_a_mesh.geometry.center();
          // cloud_mesh.material.needsUpdate = true;
          Pricing_a_mesh.position.x = 0;
          Pricing_a_mesh.position.y = -1605;
          Pricing_a_mesh.scale.set(0.27,0.27,0.27);
          scene.add(Pricing_a_mesh);
          //Pricing_a

          //arrows
          const Arrows_aTwo = new THREE.MeshBasicMaterial({
              map:new THREE.TextureLoader().load(Arrows)
          });
          Arrows_aTwo.map.needsUpdate = true; //ADDED
          var Arrows_aTwo_a_mesh = new THREE.Mesh(new THREE.PlaneGeometry(463, 42),Arrows_aTwo);
          Arrows_aTwo_a_mesh.overdraw = true;
          Arrows_aTwo_a_mesh.geometry.center();
          // cloud_mesh.material.needsUpdate = true;
          Arrows_aTwo_a_mesh.position.x = rightWindowPosition;
          Arrows_aTwo_a_mesh.position.y = -1620;
          Arrows_aTwo_a_mesh.layers.set(1);
          Arrows_aTwo_a_mesh.scale.set(0.24,0.24,0.24);
          scene.add(Arrows_aTwo_a_mesh);
          //arrows


        }

        if(props.page === 5){
          //Join_a
          const Join_a = new THREE.MeshBasicMaterial({
              map:new THREE.TextureLoader().load(Join)
          });
          Join_a.map.needsUpdate = true; //ADDED
          var Join_a_mesh = new THREE.Mesh(new THREE.PlaneGeometry(243, 80),Join_a);
          Join_a_mesh.overdraw = true;
          Join_a_mesh.geometry.center();
          // cloud_mesh.material.needsUpdate = true;
          Join_a_mesh.position.x = 0;
          Join_a_mesh.position.y = -1740;
          Join_a_mesh.scale.set(0.27,0.27,0.27);
          scene2.add(Join_a_mesh);

          Join_a_mesh.on('click', function(ev) {

            goToLogin();

          });

        }







		//

		window.addEventListener( 'resize', onWindowResize );
		onWindowResize();

		stats = new Stats();
		//mount.current.appendChild( stats.dom );


	}


  useEffect(() => {

    init();

    //if(props.page != 3){
      animate();
    //}


    //document.body.appendChild( renderer.domElement );
    mount.current.appendChild(renderer.domElement)

    return () => {

      mount.current.removeChild(renderer.domElement)

    }


  }, [])


  return <div className="vis scrollChange"  ref={mount}/>;
}


const turbulence = 0.04;

const NearestRandomPoints = (mainpoint) => {
  var randomValue = mainpoint + (Math.random() * (turbulence * mainpoint)) - turbulence;
  return randomValue;
}


function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;

	renderer.setSize( window.innerWidth, window.innerHeight );

	insetWidth = window.innerHeight / 4; // square
	insetHeight = window.innerHeight / 4;


}


function animate() {

	requestAnimationFrame( animate );

	stats.update();

	// main scene

	//renderer.setClearColor( 0x000000, 0 );
	renderer.setClearColor( backgroundColor );

	renderer.setViewport( 0, 0, window.innerWidth, window.innerHeight );

	// renderer will set this eventually
  matLins.map((item) => {
    //console.log(item);
    item.resolution.set( window.innerWidth, window.innerHeight ); // resolution of the viewport
  })
  matLinsB.map((item) => {
    item.resolution.set( window.innerWidth, window.innerHeight ); // resolution of the viewport
  })

  renderer.autoClear = true;

	renderer.render( scene, camera );

  renderer.autoClear = false;

	renderer.render( scene2, camera );

	// inset scene

	//renderer.setClearColor( 0x222222, 1 );
	renderer.setClearColor( backgroundColor );

	renderer.clearDepth(); // important!

	renderer.setScissorTest( true );

	renderer.setScissor( 20, 20, insetWidth, insetHeight );

	renderer.setViewport( 20, 20, insetWidth, insetHeight );


//https://stackoverflow.com/questions/54455270/three-js-change-camera-position-on-page-scroll
	// renderer will set this eventually
  matLins.map((item) => {
    item.resolution.set( insetWidth, insetHeight ); // resolution of the inset viewport
  })
  matLinsB.map((item) => {
    item.resolution.set( insetWidth, insetHeight ); // resolution of the inset viewport
  })



	renderer.setScissorTest( false );
//xx
  //console.log(matLins[0]);





  onWindowResize()
  //camera.position.set( 0, YPosition, 550 );
  //YPosition -= 1;
  //camera.position.set( 0, -480, 550 );

}

//



export default NewComponent;
