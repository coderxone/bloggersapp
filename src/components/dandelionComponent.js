import React, { useRef,useEffect, useState,useMemo } from 'react';
import { Canvas, useFrame } from 'react-three-fiber';
import * as THREE from "three";
// import {
//   Mesh, Vector3, SplineCurve, Geometry, Color,
// } from 'three';

import { MeshLine, MeshLineMaterial, MeshLineRaycast } from 'three.meshline';
import sample from '../images/sample1.jpeg';
import sample2 from '../images/sample2.jpg';
import instagramIcon from '../images/instagram.png';
import YoutubeIcon from '../images/youtube.png';
import FacebookIcon from '../images/facebook.png';
import TiktokIcon from '../images/tiktok.png';
import Peoples from '../images/peoples.png';
import '../css/MainComponent.scss';
import fontStylesD from '../fonts/helvetiker_regular_typeface.json';
import  Earthtexture from '../3dmodels/earth_texture_two.png';
import VideocamIcon from '../images/camera.png';
import config from '../config/config';


const backgroundColor = "#ffffff";
const TextColor = "#0083ff";
const BusinessEllipseColor = "#0083ff";
const PersonCircleColor = "#0083ff";
const PersonTextColor = "white";

//const AnimationLineColor = "rgba(255,251,36,0.36)";
const AnimationLineColor = "rgba(0,131,255,0.08)";
//const AnimationLineColor = "#fffb24";
const AnimationLineColorOriginal = "#e3e3e3";
//const AnimationLineColorOriginal = "rgba(0,131,255,0.08)";
//const AnimationLineColorOriginal = "#0083ff";

const ASPECT_RATIO = window.innerWidth / window.innerHeight;
const WIDTH = ( window.innerWidth ) * window.devicePixelRatio;
const HEIGHT = ( window.innerHeight ) * window.devicePixelRatio;

const group = new THREE.Object3D();
const scene = new THREE.Scene();
const width = window.innerWidth;
const height = window.innerHeight;
const camera = new THREE.PerspectiveCamera(45,ASPECT_RATIO, 1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true })
//var viewPosition = {x:0,y:-150,z:200};
var viewPosition = {x:0,y:-150,z:550};//for mobiles
if(config.getDeployData().deployPlatform == "android"){
  viewPosition = {x:0,y:-150,z:800};//for android
}

console.log(viewPosition);
var viewPositionAnimation = {x:0,y:0,z:0};

var enableAnimation = 0;//control video animation from business to bloggers
var enableAnimationVideo = 0;//control video animation from bloggers to video
var VideoLineCoordinatesObjectAnimatedSpepper = 0;//control video animation from bloggers to video //step to step before 5
var SocialAnimLineEnable = 0;//control Social animation line from video to social networks icon
var SocialAnimLineCoordinatesObjectAnimatedStepper = 0;//control Social animation line from video to social networks icon //step to step before 5
var SocialWorldLineEnable = 0;//control Social WORLD animation line from social Networks to social earth icon
var SocialWorldLineEnableStepper = 0;//control Social WORLD animation line from social Networks to social earth icon //step to step before 3
var WorldEnable = 0;
var LineSpeed = 0.005;
const NewHookComponent = () => {
//xx
  const [ManageStep,setManageStep] = useState(0);
  var AnimationArrayFlying = [];



  useMemo(() => {
    //console.log("step");
    if(ManageStep == 1){
      enableAnimation = 1;
    }
    if(ManageStep == 2){
      enableAnimationVideo = 1;
    }
    if(ManageStep == 3){
      SocialAnimLineEnable = 1;
    }
    if(ManageStep == 4){
      SocialWorldLineEnable = 1;
    }
    if(ManageStep == 5){
      WorldEnable = 1;
    }
  },[ManageStep])

  const mount = useRef(null)
  const [isAnimating, setAnimating] = useState(true)
  const controls = useRef(null)


  const SetCameraPosition = () => {
    //camera.position.set( 0, 15, 35 );
    camera.position.set( viewPosition.x, viewPosition.y, viewPosition.z );
    camera.updateMatrixWorld();

    //camera.lookAt( viewPositionAnimation.x, viewPositionAnimation.y, viewPositionAnimation.z );

    renderer.setClearColor(backgroundColor)
    renderer.setSize(width, height)
  }

  const SetCamera = () => {
  //  camera.lookAt( viewPositionAnimation.x, viewPositionAnimation.y, viewPositionAnimation.z );
  }

  function onWindowResize() {

     camera.aspect = window.innerWidth / window.innerHeight;
     camera.updateProjectionMatrix();
     renderer.setSize( window.innerWidth, window.innerHeight );

  }

  var step = 0;

  const Core = () => {


    //circles
    SetCameraPosition();
    //scene.background = new THREE.Color('black' );
    //scene.fog = new THREE.Fog( 0xffffff, 1000, 4000 );

    scene.add(camera); //add group with camera to scene
    // LIGHTS
    scene.add(new THREE.AmbientLight(0x333333));

    const light = new THREE.DirectionalLight( 0xffffff, 2 );
    light.position.set(-40,10,100);
    scene.add(light);




    //create rectangle geometry
    const geometry = new THREE.PlaneGeometry( 600, 600, 32 );
    const material = new THREE.MeshBasicMaterial( {color: "#0181C2", side: THREE.DoubleSide} );
    const plane = new THREE.Mesh( geometry, material );
    plane.position.y = -150;
    scene.add( plane );

    //create rectangle geometry

    //circles
    const geometryCircle17 = new THREE.CircleGeometry( 15, 32 );
    const material17 = new THREE.MeshBasicMaterial( { color: "white" } );
    const circle17 = new THREE.Mesh( geometryCircle17, material17 );
    circle17.position.x = 47;
    circle17.position.y = 70;
    plane.add( circle17 );
    circle17.geometry.attributes.position.needsUpdate = true;


    const geometryCircle16 = new THREE.CircleGeometry( 9.25, 32 );
    const material16 = new THREE.MeshBasicMaterial( { color: "white" } );
    const circle16 = new THREE.Mesh( geometryCircle16, material16 );
    circle16.position.x = 71.5;
    circle16.position.y = 52;
    plane.add( circle16 );
    circle16.geometry.attributes.position.needsUpdate = true;

    const geometryCircle15 = new THREE.CircleGeometry( 7.93, 32 );
    const material15 = new THREE.MeshBasicMaterial( { color: "white" } );
    const circle15 = new THREE.Mesh( geometryCircle15, material15 );
    circle15.position.x = 71.5;
    circle15.position.y = 87;
    plane.add( circle15 );
    circle15.geometry.attributes.position.needsUpdate = true;

    const geometryCircle14 = new THREE.CircleGeometry( 7.26, 32 );
    const material14 = new THREE.MeshBasicMaterial( { color: "white" } );
    const circle14 = new THREE.Mesh( geometryCircle14, material14 );
    circle14.position.x = 97.14;
    circle14.position.y = 91;
    plane.add( circle14 );
    circle14.geometry.attributes.position.needsUpdate = true;

    const geometryCircle30 = new THREE.CircleGeometry( 3.96, 32 );
    const material30 = new THREE.MeshBasicMaterial( { color: "white" } );
    const circle30 = new THREE.Mesh( geometryCircle30, material30 );
    circle30.position.x = 69.5;
    circle30.position.y = 70;
    plane.add( circle30 );
    circle30.geometry.attributes.position.needsUpdate = true;

    const geometryCircle29 = new THREE.CircleGeometry( 4.62, 32 );
    const material29 = new THREE.MeshBasicMaterial( { color: "white" } );
    const circle29 = new THREE.Mesh( geometryCircle29, material29 );
    circle29.position.x = 99.1;
    circle29.position.y = 70;
    plane.add( circle29 );
    circle29.geometry.attributes.position.needsUpdate = true;

    const geometryCircle28 = new THREE.CircleGeometry( 5.94, 32 );
    const material28 = new THREE.MeshBasicMaterial( { color: "white" } );
    const circle28 = new THREE.Mesh( geometryCircle28, material28 );
    circle28.position.x = 84.1;
    circle28.position.y = 68.5;
    plane.add( circle28 );
    circle28.geometry.attributes.position.needsUpdate = true;

    const geometryCircle31 = new THREE.CircleGeometry( 6.6, 32 );
    const material31 = new THREE.MeshBasicMaterial( { color: "white" } );
    const circle31 = new THREE.Mesh( geometryCircle31, material31 );
    circle31.position.x = 4.83;
    circle31.position.y = 38.5;
    plane.add( circle31 );
    circle31.geometry.attributes.position.needsUpdate = true;

    const geometryCircle27 = new THREE.CircleGeometry( 6.6, 32 );
    const material27 = new THREE.MeshBasicMaterial( { color: "white" } );
    const circle27 = new THREE.Mesh( geometryCircle27, material27 );
    circle27.position.x = 27.83;
    circle27.position.y = 36.5;
    plane.add( circle27 );
    circle27.geometry.attributes.position.needsUpdate = true;

    const geometryCircle26 = new THREE.CircleGeometry( 3.96, 32 );
    const material26 = new THREE.MeshBasicMaterial( { color: "white" } );
    const circle26 = new THREE.Mesh( geometryCircle26, material26 );
    circle26.position.x = -3.83;
    circle26.position.y = 50.5;
    plane.add( circle26 );
    circle26.geometry.attributes.position.needsUpdate = true;

    const geometryCircle25 = new THREE.CircleGeometry( 3.3, 32 );
    const material25 = new THREE.MeshBasicMaterial( { color: "white" } );
    const circle25 = new THREE.Mesh( geometryCircle25, material25 );
    circle25.position.x = 25.83;
    circle25.position.y = 23;
    plane.add( circle25 );
    circle25.geometry.attributes.position.needsUpdate = true;

    const geometryCircle32 = new THREE.CircleGeometry( 2.64, 32 );
    const material32 = new THREE.MeshBasicMaterial( { color: "white" } );
    const circle32 = new THREE.Mesh( geometryCircle32, material32 );
    circle32.position.x = 14.5;
    circle32.position.y = 28;
    plane.add( circle32 );
    circle32.geometry.attributes.position.needsUpdate = true;

    const geometryCircle24 = new THREE.CircleGeometry( 2.64, 32 );
    const material24 = new THREE.MeshBasicMaterial( { color: "white" } );
    const circle24 = new THREE.Mesh( geometryCircle24, material24 );
    circle24.position.x = 69.5;
    circle24.position.y = 36;
    plane.add( circle24 );
    circle24.geometry.attributes.position.needsUpdate = true;

    const geometryCircle41 = new THREE.CircleGeometry( 9.91, 32 );
    const material41 = new THREE.MeshBasicMaterial( { color: "white" } );
    const circle41 = new THREE.Mesh( geometryCircle41, material41 );
    circle41.position.x = 45.5;
    circle41.position.y = 130;
    plane.add( circle41 );
    circle41.geometry.attributes.position.needsUpdate = true;

    const geometryCircle49 = new THREE.CircleGeometry( 4.62, 32 );
    const material49 = new THREE.MeshBasicMaterial( { color: "white" } );
    const circle49 = new THREE.Mesh( geometryCircle49, material49 );
    circle49.position.x = 116.5;
    circle49.position.y = 132;
    plane.add( circle49 );
    circle49.geometry.attributes.position.needsUpdate = true;

    const geometryCircle48 = new THREE.CircleGeometry( 5.94, 32 );
    const material48 = new THREE.MeshBasicMaterial( { color: "white" } );
    const circle48 = new THREE.Mesh( geometryCircle48, material48 );
    circle48.position.x = 140.5;
    circle48.position.y = 187;
    plane.add( circle48 );
    circle48.geometry.attributes.position.needsUpdate = true;

    const geometryCircle46 = new THREE.CircleGeometry( 5, 32 );
    const material46 = new THREE.MeshBasicMaterial( { color: "white" } );
    const circle46 = new THREE.Mesh( geometryCircle46, material46 );
    circle46.position.x = 107.5;
    circle46.position.y = 215;
    plane.add( circle46 );
    circle46.geometry.attributes.position.needsUpdate = true;

    const geometryCircle45 = new THREE.CircleGeometry( 10.57, 32 );
    const material45 = new THREE.MeshBasicMaterial( { color: "white" } );
    const circle45 = new THREE.Mesh( geometryCircle45, material45 );
    circle45.position.x = 94;
    circle45.position.y = 167;
    plane.add( circle45 );
    circle45.geometry.attributes.position.needsUpdate = true;

    const geometryCircle44 = new THREE.CircleGeometry( 6, 32 );
    const material44 = new THREE.MeshBasicMaterial( { color: "white" } );
    const circle44 = new THREE.Mesh( geometryCircle44, material44 );
    circle44.position.x = 50;
    circle44.position.y = 170;
    plane.add( circle44 );
    circle44.geometry.attributes.position.needsUpdate = true;

    const geometryCircle40 = new THREE.CircleGeometry( 3.3, 32 );
    const material40 = new THREE.MeshBasicMaterial( { color: "white" } );
    const circle40 = new THREE.Mesh( geometryCircle40, material40 );
    circle40.position.x = 77;
    circle40.position.y = 117;
    plane.add( circle40 );
    circle40.geometry.attributes.position.needsUpdate = true;

    const geometryCircle39 = new THREE.CircleGeometry( 3.96, 32 );
    const material39 = new THREE.MeshBasicMaterial( { color: "white" } );
    const circle39 = new THREE.Mesh( geometryCircle39, material39 );
    circle39.position.x = 0;
    circle39.position.y = 112;
    plane.add( circle39 );
    circle39.geometry.attributes.position.needsUpdate = true;

    const geometryCircle38 = new THREE.CircleGeometry( 4.62, 32 );
    const material38 = new THREE.MeshBasicMaterial( { color: "white" } );
    const circle38 = new THREE.Mesh( geometryCircle38, material38 );
    circle38.position.x = 27;
    circle38.position.y = 100;
    plane.add( circle38 );
    circle38.geometry.attributes.position.needsUpdate = true;

    const geometryCircle37 = new THREE.CircleGeometry( 5.94, 32 );
    const material37 = new THREE.MeshBasicMaterial( { color: "white" } );
    const circle37 = new THREE.Mesh( geometryCircle37, material37 );
    circle37.position.x = 57;
    circle37.position.y = 104;
    plane.add( circle37 );
    circle37.geometry.attributes.position.needsUpdate = true;

    const geometryCircle36 = new THREE.CircleGeometry( 7.93, 32 );
    const material36 = new THREE.MeshBasicMaterial( { color: "white" } );
    const circle36 = new THREE.Mesh( geometryCircle36, material36 );
    circle36.position.x = 18;
    circle36.position.y = 77;
    plane.add( circle36 );
    circle36.geometry.attributes.position.needsUpdate = true;


    const geometryCircle35 = new THREE.CircleGeometry( 7.26, 32 );
    const material35 = new THREE.MeshBasicMaterial( { color: "white" } );
    const circle35 = new THREE.Mesh( geometryCircle35, material35 );
    circle35.position.x = 0;
    circle35.position.y = 90;
    plane.add( circle35 );
    circle35.geometry.attributes.position.needsUpdate = true;

    const geometryCircle34 = new THREE.CircleGeometry( 9.91, 32 );
    const material34 = new THREE.MeshBasicMaterial( { color: "white" } );
    const circle34 = new THREE.Mesh( geometryCircle34, material34 );
    circle34.position.x = -4;
    circle34.position.y = 68;
    plane.add( circle34 );
    circle34.geometry.attributes.position.needsUpdate = true;

    const geometryCircle33 = new THREE.CircleGeometry( 9.25, 32 );
    const material33 = new THREE.MeshBasicMaterial( { color: "white" } );
    const circle33 = new THREE.Mesh( geometryCircle33, material33 );
    circle33.position.x = 18;
    circle33.position.y = 56;
    plane.add( circle33 );
    circle33.geometry.attributes.position.needsUpdate = true;

    const geometryCircle23 = new THREE.CircleGeometry( 4.62, 32 );
    const material23 = new THREE.MeshBasicMaterial( { color: "white" } );
    const circle23 = new THREE.Mesh( geometryCircle23, material23 );
    circle23.position.x = 36;
    circle23.position.y = 48;
    plane.add( circle23 );
    circle23.geometry.attributes.position.needsUpdate = true;

    const geometryCircle22 = new THREE.CircleGeometry( 6.6, 32 );
    const material22 = new THREE.MeshBasicMaterial( { color: "white" } );
    const circle22 = new THREE.Mesh( geometryCircle22, material22 );
    circle22.position.x = 40;
    circle22.position.y = 22;
    plane.add( circle22 );
    circle22.geometry.attributes.position.needsUpdate = true;

    const geometryCircle21 = new THREE.CircleGeometry( 9.91, 32 );
    const material21 = new THREE.MeshBasicMaterial( { color: "white" } );
    const circle21 = new THREE.Mesh( geometryCircle21, material21 );
    circle21.position.x = 52;
    circle21.position.y = 41;
    plane.add( circle21 );
    circle21.geometry.attributes.position.needsUpdate = true;

    const geometryCircle20 = new THREE.CircleGeometry( 4.62, 32 );
    const material20 = new THREE.MeshBasicMaterial( { color: "white" } );
    const circle20 = new THREE.Mesh( geometryCircle20, material20 );
    circle20.position.x = 55;
    circle20.position.y = 21;
    plane.add( circle20 );
    circle20.geometry.attributes.position.needsUpdate = true;

    const geometryCircle19 = new THREE.CircleGeometry( 5.28, 32 );
    const material19 = new THREE.MeshBasicMaterial( { color: "white" } );
    const circle19 = new THREE.Mesh( geometryCircle19, material19 );
    circle19.position.x = 68;
    circle19.position.y = 25;
    plane.add( circle19 );
    circle19.geometry.attributes.position.needsUpdate = true;

    const geometryCircle18 = new THREE.CircleGeometry( 8.59, 32 );
    const material18 = new THREE.MeshBasicMaterial( { color: "white" } );
    const circle18 = new THREE.Mesh( geometryCircle18, material18 );
    circle18.position.x = 86;
    circle18.position.y = 34;
    plane.add( circle18 );
    circle18.geometry.attributes.position.needsUpdate = true;

    const geometryCircle13 = new THREE.CircleGeometry( 7.93, 32 );
    const material13 = new THREE.MeshBasicMaterial( { color: "white" } );
    const circle13 = new THREE.Mesh( geometryCircle13, material13 );
    circle13.position.x = 96;
    circle13.position.y = 53;
    plane.add( circle13 );
    circle13.geometry.attributes.position.needsUpdate = true;

    const geometryCircle12 = new THREE.CircleGeometry( 7.26, 32 );
    const material12 = new THREE.MeshBasicMaterial( { color: "white" } );
    const circle12 = new THREE.Mesh( geometryCircle12, material12 );
    circle12.position.x = 14;
    circle12.position.y = 132;
    plane.add( circle12 );
    circle12.geometry.attributes.position.needsUpdate = true;

    //ellipse
    //text


var AnimationArrayOriginal = [ circle17, circle16, circle15, circle14, circle30, circle29, circle28, circle31, circle27, circle26, circle25, circle32, circle24, circle41, circle49, circle48, circle46, circle45, circle44, circle40, circle39, circle38, circle37, circle36, circle35, circle34, circle33, circle23, circle22, circle21, circle20, circle19, circle18, circle13, circle12 ];

AnimationArrayFlying = [...AnimationArrayOriginal];

console.log(AnimationArrayFlying);
var stepperXY = 6;

const AnimateDandelionAnimator = () => {
    for(var i = 0;i < AnimationArrayOriginal.length;i++){
      var fixGrow = 0;
      for(var j = 0;j < AnimationArrayFlying.length;j++){
        if((AnimationArrayOriginal[i].position.x + stepperXY) > AnimationArrayFlying[i].position.x){
          fixGrow = 1;

        }else if((AnimationArrayOriginal[i].position.x + stepperXY) < AnimationArrayFlying[i].position.x){
          fixGrow = 0;

        }
      }
      if(fixGrow == 1){
        AnimationArrayFlying[i].position.x += 0.5;
        AnimationArrayFlying[i].position.y += 0.5;
      }else{
        AnimationArrayFlying[i].position.x -= 0.5;
        AnimationArrayFlying[i].position.y -= 0.5;
      }
    }
}



    //text


//xx
    //var iterator = 0;
    function animate() {
        renderer.render(scene, camera)
        requestAnimationFrame(animate);

        //AnimateDandelionAnimator();
        //circle12.position.x += 1;


      }
      animate();



      function getRandomFloat() {
        return (Math.random() * (0.001 - 0.006) + 0.006).toFixed(4)
      }







  }

  const StartApp = () => {


  }

  useEffect(() => {

    Core();
    StartApp();
      //onWindowResize();

      //window.addEventListener( 'resize', onWindowResize, false );
    //
    mount.current.appendChild(renderer.domElement)

    return () => {

      mount.current.removeChild(renderer.domElement)

    }


  }, [])




  return <div className="vis" ref={mount}/>;

}
export default NewHookComponent;
