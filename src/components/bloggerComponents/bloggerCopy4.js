import React, { useRef,useEffect, useState,useCallback } from 'react';
import * as THREE from 'three';
import Stats from '../../../node_modules/three/examples/jsm/libs/stats.module.js';

import { GUI } from '../../../node_modules/three/examples/jsm/libs/dat.gui.module.js';
import { OrbitControls } from '../../../node_modules/three/examples/jsm/controls/OrbitControls.js';
import { Line2 } from '../../../node_modules/three/examples/jsm/lines/Line2.js';
import { LineMaterial } from '../../../node_modules/three/examples/jsm/lines/LineMaterial.js';
import { LineGeometry } from '../../../node_modules/three/examples/jsm/lines/LineGeometry.js';
import { GeometryUtils } from '../../../node_modules/three/examples/jsm/utils/GeometryUtils.js';

//import { MeshLine, MeshLineMaterial, MeshLineRaycast } from 'three.meshline';
import Logo_Echohub_1_part from '../../images/main/bloggeranimation/mainBlogger.png';


import { Interaction } from 'three.interaction';
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
const LinesColor = "rgb(3, 148, 252)";
// viewport
let insetWidth;
let insetHeight;
const firstPagePosition = -150;
const secondPagePosition = -606;
const thirdPagePosition = -1060;
const fourthPagePosition = -1515;

const rightWindowPosition = 19;
const leftWindowPosition = -19;

const planetAnimation = 0;

const NewComponent = (props) => {
  const mount = useRef(null);

  const history = useHistory();

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
//xx
		camera = new THREE.PerspectiveCamera( 45,ASPECT_RATIO, 1, 1000);
		//camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 1000 );
    if(props.page == 1){
      camera.position.set( 0, firstPagePosition, 550 );
    }else if(props.page == 2){
      camera.position.set( 0, secondPagePosition, 550 );
    }else if(props.page == 3){
      camera.position.set( 0, thirdPagePosition, 550 );
    }else if(props.page == 4){
      camera.position.set( 0, fourthPagePosition, 550 );
    }else{
      camera.position.set( 0, firstPagePosition, 550 );
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


    var bloggerPosition = {x:0,y:-596};
    //Logo_Echohub_1_part
    const backgroundI = new THREE.MeshBasicMaterial({
        map:new THREE.TextureLoader().load(Logo_Echohub_1_part)
    });

    backgroundI.map.needsUpdate = true; //ADDED
    var backgroundI_mesh = new THREE.Mesh(new THREE.PlaneGeometry(1244, 6157),backgroundI);
    backgroundI_mesh.overdraw = true;
    //backgroundI_mesh.geometry.center();
    // cloud_mesh.material.needsUpdate = true;
    backgroundI_mesh.position.x = bloggerPosition.x;
    backgroundI_mesh.position.y = bloggerPosition.y;
    backgroundI_mesh.scale.set(0.22,0.22,0.22);
    scene.add(backgroundI_mesh);




    // youtube_a_mesh.on('click', function(ev) {
    //
    //   window.open(
    //     'https://www.youtube.com/channel/UC-tvKHO66_pcfeOrh1n2YQg',
    //     '_blank' // <- This is what makes it open in a new window.
    //   );
    //
    // });


//finish
		window.addEventListener( 'resize', onWindowResize );
		onWindowResize();

		stats = new Stats();
		//mount.current.appendChild( stats.dom );


	}


  useEffect(() => {

    init();

    var textureLoader = new THREE.TextureLoader();
    textureLoader.load(Logo_Echohub_1_part,
        function ( texture ) {
            animate();
        }
    );

    //document.body.appendChild( renderer.domElement );
    mount.current.appendChild(renderer.domElement)

    return () => {

      mount.current.removeChild(renderer.domElement)

    }


  }, [])


  return <div className="vis scrollChange"  ref={mount}/>;
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
  // matLins.map((item) => {
  //   //console.log(item);
  //   item.resolution.set( window.innerWidth, window.innerHeight ); // resolution of the viewport
  // })
  // matLinsB.map((item) => {
  //   item.resolution.set( window.innerWidth, window.innerHeight ); // resolution of the viewport
  // })

  //renderer.autoClear = true;

	renderer.render( scene, camera );

  //renderer.autoClear = false;

	//renderer.render( scene2, camera );

	// inset scene

	//renderer.setClearColor( 0x222222, 1 );
	renderer.setClearColor( backgroundColor );

	renderer.clearDepth(); // important!

	renderer.setScissorTest( true );

	renderer.setScissor( 20, 20, insetWidth, insetHeight );

	renderer.setViewport( 20, 20, insetWidth, insetHeight );


//https://stackoverflow.com/questions/54455270/three-js-change-camera-position-on-page-scroll
	// renderer will set this eventually
  // matLins.map((item) => {
  //   item.resolution.set( insetWidth, insetHeight ); // resolution of the inset viewport
  // })
  // matLinsB.map((item) => {
  //   item.resolution.set( insetWidth, insetHeight ); // resolution of the inset viewport
  // })




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
