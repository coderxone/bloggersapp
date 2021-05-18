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
import Logo_Echohub_1_part from '../../images/main/animationtwo/business.png';
import Person from '../../images/main/animationtwo/person.png';
import CloudImage from '../../images/main/animationtwo/cloud.png';
import Lines4Image from '../../images/main/animationtwo/lines4.png';
import { Interaction } from 'three.interaction';
import StripesImage from '../../images/main/newImages/scheme.png';
import TextWindow4 from '../../images/main/newImages/they_would.png';
import Lines3Image from '../../images/main/newImages/video_scheme.png';
import TextWindow5 from '../../images/main/newImages/generates.png';


import fontStylesD from '../../fonts/helvetiker_regular_typeface.json';
import { MeshLine, MeshLineMaterial, MeshLineRaycast } from 'three.meshline'
import LocalizeComponent from '../../localize/LocalizeComponent';

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
const BlackTextColor = "#000000";
const BlueTextColor = "#54b0dc";
//const LinesColor = "rgb(3, 148, 252)";//2090cc
// viewport
let insetWidth;
let insetHeight;
const firstPagePosition = -150;
const secondPagePosition = -666;
//const secondPagePosition = -606;
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

  const font = new THREE.FontLoader().parse(fontStylesD);

  function init() {

		renderer = new THREE.WebGLRenderer( { antialias: true } );
		renderer.setPixelRatio( window.devicePixelRatio );
		renderer.setClearColor( 0x000000, 0.0 );
		renderer.setSize( window.innerWidth, window.innerHeight );


		scene = new THREE.Scene();
		scene2 = new THREE.Scene();

		camera = new THREE.PerspectiveCamera( 45,ASPECT_RATIO, 1, 1000);
		//camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 1000 );
    var Deep = 700;
    //var Deep = 550;
    // if((window.innerWidth < 376) && (window.innerHeight > 650) && (window.innerHeight < 850)){
    //   Deep = 700;
    //
    // }
    // if((window.innerWidth < 376) && (window.innerHeight > 630) && (window.innerHeight < 650)){
    //     Deep = 550;
    // }
    //
    // if((window.innerWidth < 450) && (window.innerHeight > 850) && (window.innerHeight < 900)){
    //     Deep = 700;
    // }
    //
    // if((window.innerWidth < 450) && (window.innerHeight > 850) && (window.innerHeight < 930)){
    //     Deep = 700;
    // }
    //console.log(Deep);
    if(props.page == 1){
      camera.position.set( 0, firstPagePosition, Deep );
      //camera.position.set( 0, firstPagePosition, 550 );
    }else if(props.page == 2){
      camera.position.set( 0, secondPagePosition, Deep );
    }else if(props.page == 3){
      camera.position.set( 0, thirdPagePosition, Deep );
    }else if(props.page == 4){
      camera.position.set( 0, fourthPagePosition, Deep );
    }else if(props.page == 5){
      camera.position.set( 0, fifthPagePosition, Deep );
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


    var businessPosition = {x:0,y:60};



        if(props.page == 2){




        //Lines3Image
          const Stripes_a = new THREE.MeshBasicMaterial({
              map:new THREE.TextureLoader().load(StripesImage)
          });
          Stripes_a.map.needsUpdate = true; //ADDED
          var Stripes_mesh = new THREE.Mesh(new THREE.PlaneGeometry(934, 668),Stripes_a);
          Stripes_mesh.overdraw = true;
          Stripes_mesh.geometry.center();
          // cloud_mesh.material.needsUpdate = true;
          Stripes_mesh.position.x = 0;
          Stripes_mesh.position.y = -465;
          Stripes_mesh.scale.set(0.24,0.24,0.24);
          scene.add(Stripes_mesh);
          //Lines3Image
          //text


          const textOptionsBelow = {
            font,
            size: 36, // font size
            height: 5, // how much extrusion (how thick / deep are the letters)
          };

          var textMaterialBelow = new THREE.MeshBasicMaterial(
            { color: BlackTextColor }
          );

          var textGeometryBelow = new THREE.TextGeometry(LocalizeComponent.followers, textOptionsBelow);
          var TextmeshBelow = new THREE.Mesh( textGeometryBelow, textMaterialBelow );
          TextmeshBelow.geometry.center();
          TextmeshBelow.position.y = -380;
          TextmeshBelow.position.x = 280;
          Stripes_mesh.add(TextmeshBelow);
          //text
        }



        if(props.page == 2){
          //TextWindow4
          const TextWindow4_a = new THREE.MeshBasicMaterial({
              map:new THREE.TextureLoader().load(TextWindow4)
          });
          TextWindow4_a.map.needsUpdate = true; //ADDED
          var TextWindow4_mesh = new THREE.Mesh(new THREE.PlaneGeometry(918, 274),TextWindow4_a);
          TextWindow4_mesh.overdraw = true;
          TextWindow4_mesh.geometry.center();
          // cloud_mesh.material.needsUpdate = true;
          TextWindow4_mesh.position.x = rightWindowPosition;
          TextWindow4_mesh.position.y = -595;
          TextWindow4_mesh.layers.set(0);
          TextWindow4_mesh.scale.set(0.24,0.24,0.24);
          scene.add(TextWindow4_mesh);

          //text
          const textOptionsThey = {
            font,
            size: 28, // font size
            height: 5, // how much extrusion (how thick / deep are the letters)
          };



          var textGeometryThey = new THREE.TextGeometry(LocalizeComponent.they_would, textOptionsThey);
          var TextmeshThey = new THREE.Mesh( textGeometryThey, textMaterialBelow );
          TextmeshThey.geometry.center();
          TextmeshThey.position.y = 15;
          TextmeshThey.position.x = -15;
          TextWindow4_mesh.add(TextmeshThey);

          var textGeometryIn = new THREE.TextGeometry(LocalizeComponent.in_a, textOptionsThey);
          var TextmeshIn = new THREE.Mesh( textGeometryIn, textMaterialBelow );
          TextmeshIn.geometry.center();
          TextmeshIn.position.y = -38;
          TextmeshIn.position.x = -15;
          TextWindow4_mesh.add(TextmeshIn);
          //text
          //TextWindow4

          //Lines3Image
          const Lines3_a = new THREE.MeshBasicMaterial({
              map:new THREE.TextureLoader().load(Lines3Image)
          });
          Lines3_a.map.needsUpdate = true; //ADDED
          var Lines3_a_mesh = new THREE.Mesh(new THREE.PlaneGeometry(1018, 568),Lines3_a);
          Lines3_a_mesh.overdraw = true;
          Lines3_a_mesh.geometry.center();
          // cloud_mesh.material.needsUpdate = true;
          Lines3_a_mesh.position.x = 0;
          Lines3_a_mesh.position.y = -713;
          Lines3_a_mesh.scale.set(0.24,0.24,0.24);
          scene.add(Lines3_a_mesh);
          //text
          var textMaterialY_R = new THREE.MeshBasicMaterial(
            { color: BlueTextColor }
          );

          const textOptionsContent = {
            font,
            size: 28, // font size
            height: 5, // how much extrusion (how thick / deep are the letters)
          };

          var textGeometryContent = new THREE.TextGeometry(LocalizeComponent.you_r, textOptionsContent);
          var TextmeshContent = new THREE.Mesh( textGeometryContent, textMaterialY_R );
          TextmeshContent.geometry.center();
          TextmeshContent.position.y = 282;
          TextmeshContent.position.x = 0;
          Lines3_a_mesh.add(TextmeshContent);
          //Content Quality
          const textOptionsCont = {
            font,
            size: 29, // font size
            height: 5, // how much extrusion (how thick / deep are the letters)
          };

          var textGeometryCon = new THREE.TextGeometry(LocalizeComponent.content, textOptionsCont);
          var TextmeshCont = new THREE.Mesh( textGeometryCon, textMaterialY_R );
          TextmeshCont.geometry.center();
          TextmeshCont.position.y = 170;
          TextmeshCont.position.x = -345;
          Lines3_a_mesh.add(TextmeshCont);

          var textGeometryF = new THREE.TextGeometry(LocalizeComponent.f_reach, textOptionsCont);
          var TextmeshF = new THREE.Mesh( textGeometryF, textMaterialY_R );
          TextmeshF.geometry.center();
          TextmeshF.position.y = 170;
          TextmeshF.position.x = 0;
          Lines3_a_mesh.add(TextmeshF);

          var textGeometryE = new THREE.TextGeometry(LocalizeComponent.eng, textOptionsCont);
          var TextmeshE = new THREE.Mesh( textGeometryE, textMaterialY_R );
          TextmeshE.geometry.center();
          TextmeshE.position.y = 170;
          TextmeshE.position.x = 345;
          Lines3_a_mesh.add(TextmeshE);
          //text
          //Lines3Image

        }


//xx
        if((props.page == 2) || (props.page == 3)){
              if(Deep <= 550){
                      //TextWindow5
                      const TextWindow5_a = new THREE.MeshBasicMaterial({
                          map:new THREE.TextureLoader().load(TextWindow5)
                      });
                      TextWindow5_a.map.needsUpdate = true; //ADDED
                      var TextWindow5_mesh = new THREE.Mesh(new THREE.PlaneGeometry(828, 134),TextWindow5_a);
                      TextWindow5_mesh.overdraw = true;
                      TextWindow5_mesh.geometry.center();
                      // cloud_mesh.material.needsUpdate = true;
                      TextWindow5_mesh.position.x = 0;
                      TextWindow5_mesh.position.y = -813;
                      TextWindow5_mesh.layers.set(0);
                      TextWindow5_mesh.scale.set(0.24,0.24,0.24);
                      scene.add(TextWindow5_mesh);
                      //text


                      const textOptionsVideo = {
                        font,
                        size: 60, // font size
                        height: 15, // how much extrusion (how thick / deep are the letters)
                      };

                      var textMaterialY_Video = new THREE.MeshBasicMaterial(
                        { color: BlackTextColor }
                      );

                      var textGeometryV = new THREE.TextGeometry(LocalizeComponent.video_g, textOptionsVideo);
                      var TextmeshV = new THREE.Mesh( textGeometryV, textMaterialY_Video );
                      TextmeshV.geometry.center();
                      TextmeshV.position.y = -10;
                      TextmeshV.position.x = 0;
                      TextWindow5_mesh.add(TextmeshV);

                      //text
                      //TextWindow5
                      //Lines4Image
                      const Lines4_a = new THREE.MeshBasicMaterial({
                          map:new THREE.TextureLoader().load(Lines4Image)
                      });
                      Lines4_a.map.needsUpdate = true; //ADDED
                      var Lines4_a_mesh = new THREE.Mesh(new THREE.PlaneGeometry(903, 266),Lines4_a);
                      Lines4_a_mesh.overdraw = true;
                      Lines4_a_mesh.geometry.center();
                      // cloud_mesh.material.needsUpdate = true;
                      Lines4_a_mesh.position.x = 0;
                      Lines4_a_mesh.position.y = -858;//-31
                      Lines4_a_mesh.scale.set(0.22,0.22,0.22);
                      scene.add(Lines4_a_mesh);
                      //Lines4Image
            }
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


  return <div className="vis scrollChange secondAnimation"  ref={mount}/>;
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

  if(planetAnimation == 1){
    earthmesh.rotation.y += 0.02;
  }

  if(turnFourthAnimation == 1){
    t += NearestRandomPoints(0.02);
    t2 += NearestRandomPoints(0.022);
    t3 += NearestRandomPoints(0.015);;
    var yR = -1299;
    var xR = 0;
    var circleARadius = 54;

    circleA.position.x =  xR + (circleARadius * Math.cos(t));
    circleA.position.y = yR + (circleARadius * Math.sin(t));

    var circleARadiusB = 69;

    circleB.position.x =  xR + (circleARadiusB * Math.cos(t2));
    circleB.position.y = yR + (circleARadiusB * Math.sin(t2));

    var circleARadiusC = 37;

    circleC.position.x =  xR + (circleARadiusC * Math.cos(t3));
    circleC.position.y = yR + (circleARadiusC * Math.sin(t3));
  }




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
