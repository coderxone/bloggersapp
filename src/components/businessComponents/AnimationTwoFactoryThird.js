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
//import { MeshLine, MeshLineMaterial, MeshLineRaycast } from 'three.meshline';
import Logo_Echohub_1_part from '../../images/main/animationtwo/business.png';
import Person from '../../images/main/animationtwo/person.png';
import CloudImage from '../../images/main/animationtwo/cloud.png';
import Lines4Image from '../../images/main/animationtwo/lines4.png';
import Lines5Image from '../../images/main/animationtwo/lines5.png';
import instagramImage from '../../images/main/animationtwo/instagram.png';
import facebookImage from '../../images/main/animationtwo/facebook.png';
import tiktokImage from '../../images/main/animationtwo/tiktok.png';
import twitterImage from '../../images/main/animationtwo/twitter.png';
import youtubeImage from '../../images/main/animationtwo/youtube.png';
import JoinImage from '../../images/main/animationtwo/join.png';
//import Lines7Image from '../images/main/animationtwo/lines7.png';

import TextWindow6 from '../../images/main/newImages/promote.png';



import StripesImage from '../../images/main/newImages/scheme.png';
import Lines3Image from '../../images/main/newImages/video_scheme.png';
import TextWindow5 from '../../images/main/newImages/generates.png';
import Lines6Image from '../../images/main/newImages/views.png';

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


    var businessPosition = {x:0,y:60};






        if((props.page == 2) || (props.page == 3)){
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

        if(props.page == 3){

                  const InstagramIcon_a = new THREE.MeshBasicMaterial({
                      map:new THREE.TextureLoader().load(instagramImage)
                  });
                  InstagramIcon_a.map.needsUpdate = true; //ADDED
                  var InstagramIcon_a_mesh = new THREE.Mesh(new THREE.PlaneGeometry(126, 126),InstagramIcon_a);
                  InstagramIcon_a_mesh.overdraw = true;
                  InstagramIcon_a_mesh.geometry.center();
                  // cloud_mesh.material.needsUpdate = true;
                  InstagramIcon_a_mesh.position.x = -78;
                  InstagramIcon_a_mesh.position.y = -876;
                  InstagramIcon_a_mesh.scale.set(0.22,0.22,0.22);
                  scene2.add(InstagramIcon_a_mesh);

                  InstagramIcon_a_mesh.on('click', function(ev) {

                    window.open(
                      'https://instagram.com/echohub.io?igshid=fm0hdtx3u10y',
                      '_blank' // <- This is what makes it open in a new window.
                    );

                  });

                  const FacebookIcon_a = new THREE.MeshBasicMaterial({
                      map:new THREE.TextureLoader().load(facebookImage)
                  });
                  FacebookIcon_a.map.needsUpdate = true; //ADDED
                  var FacebookIcon_a_mesh = new THREE.Mesh(new THREE.PlaneGeometry(126, 126),FacebookIcon_a);
                  FacebookIcon_a_mesh.overdraw = true;
                  FacebookIcon_a_mesh.geometry.center();
                  // cloud_mesh.material.needsUpdate = true;
                  FacebookIcon_a_mesh.position.x = -38;
                  FacebookIcon_a_mesh.position.y = -876;
                  FacebookIcon_a_mesh.scale.set(0.22,0.22,0.22);
                  scene2.add(FacebookIcon_a_mesh);

                  FacebookIcon_a_mesh.on('click', function(ev) {

                    window.open(
                      'https://www.facebook.com/permalink.php?story_fbid=2446311895515266&id=100004094374192',
                      '_blank' // <- This is what makes it open in a new window.
                    );

                  });

                  const TiktokIcon_a = new THREE.MeshBasicMaterial({
                      map:new THREE.TextureLoader().load(tiktokImage)
                  });
                  TiktokIcon_a.map.needsUpdate = true; //ADDED
                  var TiktokIcon_a_mesh = new THREE.Mesh(new THREE.PlaneGeometry(185, 273),TiktokIcon_a);
                  TiktokIcon_a_mesh.overdraw = true;
                  TiktokIcon_a_mesh.geometry.center();
                  // cloud_mesh.material.needsUpdate = true;
                  TiktokIcon_a_mesh.position.x = 0;
                  TiktokIcon_a_mesh.position.y = -868;
                  TiktokIcon_a_mesh.scale.set(0.22,0.22,0.22);
                  scene2.add(TiktokIcon_a_mesh);

                  TiktokIcon_a_mesh.on('click', function(ev) {

                    window.open(
                      'https://www.tiktok.com/@echohub.io?lang=en',
                      '_blank' // <- This is what makes it open in a new window.
                    );

                  });

                  const Twitter_a = new THREE.MeshBasicMaterial({
                      map:new THREE.TextureLoader().load(twitterImage)
                  });
                  Twitter_a.map.needsUpdate = true; //ADDED
                  var Twitter_a_mesh = new THREE.Mesh(new THREE.PlaneGeometry(126, 126),Twitter_a);
                  Twitter_a_mesh.overdraw = true;
                  Twitter_a_mesh.geometry.center();
                  // cloud_mesh.material.needsUpdate = true;
                  Twitter_a_mesh.position.x = 38;
                  Twitter_a_mesh.position.y = -876;
                  Twitter_a_mesh.scale.set(0.22,0.22,0.22);
                  scene2.add(Twitter_a_mesh);
                  Twitter_a_mesh.on('click', function(ev) {

                    window.open(
                      'https://twitter.com/EchohubI',
                      '_blank' // <- This is what makes it open in a new window.
                    );

                  });

                  const youtube_a = new THREE.MeshBasicMaterial({
                      map:new THREE.TextureLoader().load(youtubeImage)
                  });
                  youtube_a.map.needsUpdate = true; //ADDED
                  var youtube_a_mesh = new THREE.Mesh(new THREE.PlaneGeometry(126, 126),youtube_a);
                  youtube_a_mesh.overdraw = true;
                  youtube_a_mesh.geometry.center();
                  // cloud_mesh.material.needsUpdate = true;
                  youtube_a_mesh.position.x = 78;
                  youtube_a_mesh.position.y = -876;
                  youtube_a_mesh.scale.set(0.22,0.22,0.22);
                  scene2.add(youtube_a_mesh);

                  youtube_a_mesh.on('click', function(ev) {

                    window.open(
                      'https://youtube.com/channel/UC-tvKHO66_pcfeOrh1n2YQg',
                      '_blank' // <- This is what makes it open in a new window.
                    );

                  });


                  //TextWindow6
                  const TextWindow6_a = new THREE.MeshBasicMaterial({
                      map:new THREE.TextureLoader().load(TextWindow6)
                  });
                  TextWindow6_a.map.needsUpdate = true; //ADDED
                  var TextWindow6_mesh = new THREE.Mesh(new THREE.PlaneGeometry(1073, 411),TextWindow6_a);
                  TextWindow6_mesh.overdraw = true;
                  TextWindow6_mesh.geometry.center();
                  // cloud_mesh.material.needsUpdate = true;
                  TextWindow6_mesh.position.x = rightWindowPosition;
                  TextWindow6_mesh.position.y = -970;
                  TextWindow6_mesh.layers.set(0);
                  TextWindow6_mesh.scale.set(0.22,0.22,0.22);
                  scene.add(TextWindow6_mesh);
                  //TextWindow6

                  //Lines5Image
                  //earth matrix
                  const Lines5_a = new THREE.MeshBasicMaterial({
                      map:new THREE.TextureLoader().load(Lines5Image)
                  });
                  Lines5_a.map.needsUpdate = true; //ADDED
                  var Lines5_a_mesh = new THREE.Mesh(new THREE.PlaneGeometry(1020, 513),Lines5_a);
                  Lines5_a_mesh.overdraw = true;
                  Lines5_a_mesh.geometry.center();
                  // cloud_mesh.material.needsUpdate = true;
                  Lines5_a_mesh.position.x = 0;
                  Lines5_a_mesh.position.y = -1067;
                  Lines5_a_mesh.scale.set(0.2,0.2,0.2);
                  scene.add(Lines5_a_mesh);
                  //earth matrix
                  //Lines5Image
                  //Lines6Image
                  //views
                  const Lines6_a = new THREE.MeshBasicMaterial({
                      map:new THREE.TextureLoader().load(Lines6Image)
                  });
                  Lines6_a.map.needsUpdate = true; //ADDED
                  var Lines6_a_mesh = new THREE.Mesh(new THREE.PlaneGeometry(1082, 409),Lines6_a);
                  Lines6_a_mesh.overdraw = true;
                  Lines6_a_mesh.geometry.center();
                  // cloud_mesh.material.needsUpdate = true;
                  Lines6_a_mesh.position.x = 0;
                  Lines6_a_mesh.position.y = -1185;
                  Lines6_a_mesh.scale.set(0.2,0.2,0.2);
                  scene.add(Lines6_a_mesh);
                  //Lines6Image
                  //views


                  //light for earth
                  var ambLight = new THREE.AmbientLight(0x333333);
                  scene2.add(ambLight);
                  const light = new THREE.DirectionalLight( 0xffffff, 2 );
                  light.position.set(-300,30,300);
                  scene2.add(light);
                  //for earth
                  var textureLoader = new THREE.TextureLoader();

                  // const textureF = textureLoader.load('https://echohub.io/videos/earth_texture_two.png',
                  //     function ( texture ) {
                  //       textureF.flipY = false;
                  //
                  //       var geometryEarth = new THREE.SphereGeometry(46, 32, 32);
                  //       var materialEarth = new THREE.MeshPhongMaterial( {
                  //           map: texture
                  //        });
                  //
                  //       //materialEarth.map.needsUpdate = true; //ADDED
                  //       earthmesh = new THREE.Mesh(geometryEarth, materialEarth);
                  //       earthmesh.position.x = 0;
                  //       earthmesh.position.y = -1071;
                  //       earthmesh.geometry.center();
                  //       earthmesh.rotation.z = 90;
                  //
                  //       scene2.add( earthmesh );
                  //
                  //       //animate();
                  //       planetAnimation = 1;
                  //     }
                  // );
                  //light for earth


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

  // if(planetAnimation == 1){
  //   earthmesh.rotation.y += 0.02;
  // }

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
