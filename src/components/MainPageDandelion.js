import React, { useRef,useEffect, useState,useMemo } from 'react';
import { Canvas, useFrame } from 'react-three-fiber';
import * as THREE from "three";

// import {
//   Mesh, Vector3, SplineCurve, Geometry, Color,
// } from 'three';

import { MeshLine, MeshLineMaterial, MeshLineRaycast } from 'three.meshline';

import Logo_Echohub_1_part from '../images/main/dandelion_stick.jpg';
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
const camera = new THREE.PerspectiveCamera(45,ASPECT_RATIO, 1, 2000);
const renderer = new THREE.WebGLRenderer({ antialias: true,alpha: true })
//const renderer = new THREE.WebGLRenderer({ antialias: true })

var AnimationParams = {
  //color: "white",
   color: "#38b0fa",
  opacity:1,
  transparent:true
}
//var BackgroundColor = "white";
//var BackgroundColor = "#0181C2";

var AnimationControl = 0;

var moveInsideX = 80;
var moveInsideY = 80;

var movingPointX = -125;
var movingPointY = 300;

var echoX = -112 + movingPointX;
var hubX = 195 + movingPointX;
var animX = 0 + movingPointX;
var animY = 0 + movingPointY;
var xViewMobile = 1650;
//var xViewMobile = 550;

if((width < 376) && (height > 650) && (height < 850)){
  //xViewMobile = 300;
  xViewMobile = 2000;
  movingPointY = 400;
  animY = 0 + movingPointY;
}
//xx
// if(height < 1200){
//   animY = 0;
// }

var viewPosition = {x:0,y:0,z:xViewMobile};//for mobiles
if(config.getDeployData().deployPlatform == "android"){
  //viewPosition = {x:0,y:50,z:xViewMobile};//for android
}

//console.log(viewPosition);
//var viewPositionAnimation = {x:0,y:0,z:0};
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

    //renderer.setClearColor(backgroundColor);
    //renderer.setClearColor(0x000000, 0)
    renderer.setSize(width, height);
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

  const [fixSave,setFixSave] = useState(0);
  const [OriginalStateArray,SetOriginalStateArray] = useState([]);
  var copyArray = [];
  var randomIncreaser = [];


  const Core = () => {


    //circles
    SetCameraPosition();
    //scene.background = new THREE.Color('black' );
    //scene.fog = new THREE.Fog( 0xffffff, 1000, 4000 );

    scene.add(camera); //add group with camera to scene
    // LIGHTS
    //scene.add(new THREE.AmbientLight(0x333333));

    const light = new THREE.DirectionalLight( 0xffffff, 2 );
    light.position.set(-40,10,100);
    //scene.add(light);

//xx
      var imgEcho1 = new THREE.MeshBasicMaterial({
          map:THREE.ImageUtils.loadTexture(Logo_Echohub_1_part, {}, function() {
          })
      });
      imgEcho1.map.needsUpdate = true; //ADDED
      var imgEcho1_mesh = new THREE.Mesh(new THREE.PlaneGeometry(114, 189),imgEcho1);
      imgEcho1_mesh.overdraw = true;
      imgEcho1_mesh.geometry.center();
      imgEcho1_mesh.material.needsUpdate = true;
      imgEcho1_mesh.position.x = echoX;;
      imgEcho1_mesh.position.y = -195 + movingPointY;
      imgEcho1_mesh.rotation.y = -0.9;

      //imgEcho1_mesh.rotation.x = -0.4;
      scene.add(imgEcho1_mesh);





    const plane = new THREE.Object3D();
    plane.position.x = animX;
    plane.position.y = animY;
    plane.scale.set(1.5,1.5,1.5);
    scene.add(plane);

    //create rectangle geometry

    //circles
    const geometryCircle17 = new THREE.CircleGeometry( 15, 32 );
    const material17 = new THREE.MeshBasicMaterial( AnimationParams );
    const circle17 = new THREE.Mesh( geometryCircle17, material17 );
    circle17.position.x = 47 - moveInsideX;
    circle17.position.y = 70 - moveInsideY;
    plane.add( circle17 );
    circle17.geometry.attributes.position.needsUpdate = true;

    const geometryCircle16 = new THREE.CircleGeometry( 9.25, 32 );
    const material16 = new THREE.MeshBasicMaterial( AnimationParams );
    const circle16 = new THREE.Mesh( geometryCircle16, material16 );
    circle16.position.x = 71.5 - moveInsideX;
    circle16.position.y = 52 - moveInsideY;
    plane.add( circle16 );
    circle16.geometry.attributes.position.needsUpdate = true;

    const geometryCircle15 = new THREE.CircleGeometry( 7.93, 32 );
    const material15 = new THREE.MeshBasicMaterial( AnimationParams );
    const circle15 = new THREE.Mesh( geometryCircle15, material15 );
    circle15.position.x = 71.5 - moveInsideX;
    circle15.position.y = 87 - moveInsideY;
    plane.add( circle15 );
    circle15.geometry.attributes.position.needsUpdate = true;

    const geometryCircle14 = new THREE.CircleGeometry( 7.26, 32 );
    const material14 = new THREE.MeshBasicMaterial( AnimationParams );
    const circle14 = new THREE.Mesh( geometryCircle14, material14 );
    circle14.position.x = 97.14 - moveInsideX;
    circle14.position.y = 91 - moveInsideY;
    plane.add( circle14 );
    circle14.geometry.attributes.position.needsUpdate = true;

    const geometryCircle30 = new THREE.CircleGeometry( 3.96, 32 );
    const material30 = new THREE.MeshBasicMaterial( AnimationParams );
    const circle30 = new THREE.Mesh( geometryCircle30, material30 );
    circle30.position.x = 69.5 - moveInsideX;
    circle30.position.y = 70 - moveInsideY;
    plane.add( circle30 );
    circle30.geometry.attributes.position.needsUpdate = true;

    const geometryCircle29 = new THREE.CircleGeometry( 4.62, 32 );
    const material29 = new THREE.MeshBasicMaterial( AnimationParams );
    const circle29 = new THREE.Mesh( geometryCircle29, material29 );
    circle29.position.x = 99.1 - moveInsideX;
    circle29.position.y = 70 - moveInsideY;
    plane.add( circle29 );
    circle29.geometry.attributes.position.needsUpdate = true;

    const geometryCircle28 = new THREE.CircleGeometry( 5.94, 32 );
    const material28 = new THREE.MeshBasicMaterial( AnimationParams );
    const circle28 = new THREE.Mesh( geometryCircle28, material28 );
    circle28.position.x = 84.1 - moveInsideX;
    circle28.position.y = 68.5 - moveInsideY;
    plane.add( circle28 );
    circle28.geometry.attributes.position.needsUpdate = true;

    const geometryCircle31 = new THREE.CircleGeometry( 6.6, 32 );
    const material31 = new THREE.MeshBasicMaterial( AnimationParams );
    const circle31 = new THREE.Mesh( geometryCircle31, material31 );
    circle31.position.x = 4.83 - moveInsideX;
    circle31.position.y = 38.5 - moveInsideY;
    plane.add( circle31 );
    circle31.geometry.attributes.position.needsUpdate = true;

    const geometryCircle27 = new THREE.CircleGeometry( 6.6, 32 );
    const material27 = new THREE.MeshBasicMaterial( AnimationParams );
    const circle27 = new THREE.Mesh( geometryCircle27, material27 );
    circle27.position.x = 27.83 - moveInsideX;
    circle27.position.y = 36.5 - moveInsideY;
    plane.add( circle27 );
    circle27.geometry.attributes.position.needsUpdate = true;

    const geometryCircle26 = new THREE.CircleGeometry( 3.96, 32 );
    const material26 = new THREE.MeshBasicMaterial( AnimationParams );
    const circle26 = new THREE.Mesh( geometryCircle26, material26 );
    circle26.position.x = -3.83 - moveInsideX;
    circle26.position.y = 50.5 - moveInsideY;
    plane.add( circle26 );
    circle26.geometry.attributes.position.needsUpdate = true;

    const geometryCircle25 = new THREE.CircleGeometry( 3.3, 32 );
    const material25 = new THREE.MeshBasicMaterial( AnimationParams );
    const circle25 = new THREE.Mesh( geometryCircle25, material25 );
    circle25.position.x = 25.83 - moveInsideX;
    circle25.position.y = 23 - moveInsideY;
    plane.add( circle25 );
    circle25.geometry.attributes.position.needsUpdate = true;

    const geometryCircle32 = new THREE.CircleGeometry( 2.64, 32 );
    const material32 = new THREE.MeshBasicMaterial( AnimationParams );
    const circle32 = new THREE.Mesh( geometryCircle32, material32 );
    circle32.position.x = 14.5 - moveInsideX;
    circle32.position.y = 28 - moveInsideY;
    plane.add( circle32 );
    circle32.geometry.attributes.position.needsUpdate = true;

    const geometryCircle24 = new THREE.CircleGeometry( 2.64, 32 );
    const material24 = new THREE.MeshBasicMaterial( AnimationParams );
    const circle24 = new THREE.Mesh( geometryCircle24, material24 );
    circle24.position.x = 69.5 - moveInsideX;
    circle24.position.y = 36 - moveInsideY;
    plane.add( circle24 );
    circle24.geometry.attributes.position.needsUpdate = true;

    const geometryCircle41 = new THREE.CircleGeometry( 9.91, 32 );
    const material41 = new THREE.MeshBasicMaterial( AnimationParams );
    const circle41 = new THREE.Mesh( geometryCircle41, material41 );
    circle41.position.x = 45.5 - moveInsideX;
    circle41.position.y = 130 - moveInsideY;
    plane.add( circle41 );
    circle41.geometry.attributes.position.needsUpdate = true;

    const geometryCircle49 = new THREE.CircleGeometry( 4.62, 32 );
    const material49 = new THREE.MeshBasicMaterial( AnimationParams );
    const circle49 = new THREE.Mesh( geometryCircle49, material49 );
    circle49.position.x = 116.5 - moveInsideX;
    circle49.position.y = 132 - moveInsideY;
    plane.add( circle49 );
    circle49.geometry.attributes.position.needsUpdate = true;

    const geometryCircle48 = new THREE.CircleGeometry( 5.94, 32 );
    const material48 = new THREE.MeshBasicMaterial( AnimationParams );
    const circle48 = new THREE.Mesh( geometryCircle48, material48 );
    circle48.position.x = 140.5 - moveInsideX;
    circle48.position.y = 187 - moveInsideY;
    plane.add( circle48 );
    circle48.geometry.attributes.position.needsUpdate = true;

    const geometryCircle46 = new THREE.CircleGeometry( 5, 32 );
    const material46 = new THREE.MeshBasicMaterial( AnimationParams );
    const circle46 = new THREE.Mesh( geometryCircle46, material46 );
    circle46.position.x = 107.5 - moveInsideX;
    circle46.position.y = 215 - moveInsideY;
    plane.add( circle46 );
    circle46.geometry.attributes.position.needsUpdate = true;

    const geometryCircle45 = new THREE.CircleGeometry( 10.57, 32 );
    const material45 = new THREE.MeshBasicMaterial( AnimationParams );
    const circle45 = new THREE.Mesh( geometryCircle45, material45 );
    circle45.position.x = 94 - moveInsideX;
    circle45.position.y = 167 - moveInsideY;
    plane.add( circle45 );
    circle45.geometry.attributes.position.needsUpdate = true;

    const geometryCircle44 = new THREE.CircleGeometry( 6, 32 );
    const material44 = new THREE.MeshBasicMaterial( AnimationParams );
    const circle44 = new THREE.Mesh( geometryCircle44, material44 );
    circle44.position.x = 50 - moveInsideX;
    circle44.position.y = 170 - moveInsideY;
    plane.add( circle44 );
    circle44.geometry.attributes.position.needsUpdate = true;

    const geometryCircle40 = new THREE.CircleGeometry( 3.3, 32 );
    const material40 = new THREE.MeshBasicMaterial( AnimationParams );
    const circle40 = new THREE.Mesh( geometryCircle40, material40 );
    circle40.position.x = 77 - moveInsideX;
    circle40.position.y = 117 - moveInsideY;
    plane.add( circle40 );
    circle40.geometry.attributes.position.needsUpdate = true;

    const geometryCircle39 = new THREE.CircleGeometry( 3.96, 32 );
    const material39 = new THREE.MeshBasicMaterial( AnimationParams );
    const circle39 = new THREE.Mesh( geometryCircle39, material39 );
    circle39.position.x = 0 - moveInsideX;
    circle39.position.y = 112 - moveInsideY;
    plane.add( circle39 );
    circle39.geometry.attributes.position.needsUpdate = true;

    const geometryCircle38 = new THREE.CircleGeometry( 4.62, 32 );
    const material38 = new THREE.MeshBasicMaterial( AnimationParams );
    const circle38 = new THREE.Mesh( geometryCircle38, material38 );
    circle38.position.x = 27 - moveInsideX;
    circle38.position.y = 100 - moveInsideY;
    plane.add( circle38 );
    circle38.geometry.attributes.position.needsUpdate = true;

    const geometryCircle37 = new THREE.CircleGeometry( 5.94, 32 );
    const material37 = new THREE.MeshBasicMaterial( AnimationParams );
    const circle37 = new THREE.Mesh( geometryCircle37, material37 );
    circle37.position.x = 57 - moveInsideX;
    circle37.position.y = 104 - moveInsideY;
    plane.add( circle37 );
    circle37.geometry.attributes.position.needsUpdate = true;

    const geometryCircle36 = new THREE.CircleGeometry( 7.93, 32 );
    const material36 = new THREE.MeshBasicMaterial( AnimationParams );
    const circle36 = new THREE.Mesh( geometryCircle36, material36 );
    circle36.position.x = 18 - moveInsideX;
    circle36.position.y = 77 - moveInsideY;
    plane.add( circle36 );
    circle36.geometry.attributes.position.needsUpdate = true;


    const geometryCircle35 = new THREE.CircleGeometry( 7.26, 32 );
    const material35 = new THREE.MeshBasicMaterial( AnimationParams );
    const circle35 = new THREE.Mesh( geometryCircle35, material35 );
    circle35.position.x = 0 - moveInsideX;
    circle35.position.y = 90 - moveInsideY;
    plane.add( circle35 );
    circle35.geometry.attributes.position.needsUpdate = true;

    const geometryCircle34 = new THREE.CircleGeometry( 9.91, 32 );
    const material34 = new THREE.MeshBasicMaterial( AnimationParams );
    const circle34 = new THREE.Mesh( geometryCircle34, material34 );
    circle34.position.x = -4 - moveInsideX;
    circle34.position.y = 68 - moveInsideY;
    plane.add( circle34 );
    circle34.geometry.attributes.position.needsUpdate = true;

    const geometryCircle33 = new THREE.CircleGeometry( 9.25, 32 );
    const material33 = new THREE.MeshBasicMaterial( AnimationParams );
    const circle33 = new THREE.Mesh( geometryCircle33, material33 );
    circle33.position.x = 18 - moveInsideX;
    circle33.position.y = 56 - moveInsideY;
    plane.add( circle33 );
    circle33.geometry.attributes.position.needsUpdate = true;

    const geometryCircle23 = new THREE.CircleGeometry( 4.62, 32 );
    const material23 = new THREE.MeshBasicMaterial( AnimationParams );
    const circle23 = new THREE.Mesh( geometryCircle23, material23 );
    circle23.position.x = 36 - moveInsideX;
    circle23.position.y = 48 - moveInsideY;
    plane.add( circle23 );
    circle23.geometry.attributes.position.needsUpdate = true;

    const geometryCircle22 = new THREE.CircleGeometry( 6.6, 32 );
    const material22 = new THREE.MeshBasicMaterial( AnimationParams );
    const circle22 = new THREE.Mesh( geometryCircle22, material22 );
    circle22.position.x = 40 - moveInsideX;
    circle22.position.y = 22 - moveInsideY;
    plane.add( circle22 );
    circle22.geometry.attributes.position.needsUpdate = true;

    const geometryCircle21 = new THREE.CircleGeometry( 9.91, 32 );
    const material21 = new THREE.MeshBasicMaterial( AnimationParams );
    const circle21 = new THREE.Mesh( geometryCircle21, material21 );
    circle21.position.x = 52 - moveInsideX;
    circle21.position.y = 41 - moveInsideY;
    plane.add( circle21 );
    circle21.geometry.attributes.position.needsUpdate = true;

    const geometryCircle20 = new THREE.CircleGeometry( 4.62, 32 );
    const material20 = new THREE.MeshBasicMaterial( AnimationParams );
    const circle20 = new THREE.Mesh( geometryCircle20, material20 );
    circle20.position.x = 55 - moveInsideX;
    circle20.position.y = 21 - moveInsideY;
    plane.add( circle20 );
    circle20.geometry.attributes.position.needsUpdate = true;

    const geometryCircle19 = new THREE.CircleGeometry( 5.28, 32 );
    const material19 = new THREE.MeshBasicMaterial( AnimationParams );
    const circle19 = new THREE.Mesh( geometryCircle19, material19 );
    circle19.position.x = 68 - moveInsideX;
    circle19.position.y = 25 - moveInsideY;
    plane.add( circle19 );
    circle19.geometry.attributes.position.needsUpdate = true;

    const geometryCircle18 = new THREE.CircleGeometry( 8.59, 32 );
    const material18 = new THREE.MeshBasicMaterial( AnimationParams );
    const circle18 = new THREE.Mesh( geometryCircle18, material18 );
    circle18.position.x = 86 - moveInsideX;
    circle18.position.y = 34 - moveInsideY;
    plane.add( circle18 );
    circle18.geometry.attributes.position.needsUpdate = true;

    const geometryCircle13 = new THREE.CircleGeometry( 7.93, 32 );
    const material13 = new THREE.MeshBasicMaterial( AnimationParams );
    const circle13 = new THREE.Mesh( geometryCircle13, material13 );
    circle13.position.x = 96 - moveInsideX;
    circle13.position.y = 53 - moveInsideY;
    plane.add( circle13 );
    circle13.geometry.attributes.position.needsUpdate = true;

    const geometryCircle12 = new THREE.CircleGeometry( 7.26, 32 );
    const material12 = new THREE.MeshBasicMaterial( AnimationParams );
    const circle12 = new THREE.Mesh( geometryCircle12, material12 );
    circle12.position.x = 14 - moveInsideX;
    circle12.position.y = 132 - moveInsideY;
    plane.add( circle12 );
    circle12.geometry.attributes.position.needsUpdate = true;
    //ellipse
    //text

    function getRandomFloat(min, max) {
      return (Math.random() * (max - min) + min).toFixed(1);
    }

if(fixSave == 0){
var AnimationArrayOriginal = [ circle17, circle16, circle15, circle14, circle30, circle29, circle28, circle31, circle27, circle26, circle25, circle32, circle24, circle41, circle49, circle48, circle46, circle45, circle44, circle40, circle39, circle38, circle37, circle36, circle35, circle34, circle33, circle23, circle22, circle21, circle20, circle19, circle18, circle13, circle12 ];
setFixSave(1);

for(var c = 0;c < AnimationArrayOriginal.length;c++){
  var obj = {
    x:AnimationArrayOriginal[c].position.x,
    y:AnimationArrayOriginal[c].position.y
  }

  copyArray.push(obj);
  var randomInc = getRandomFloat(0.1,0.4);
  //console.log(randomInc);
  randomIncreaser.push(parseFloat(randomInc));
}

}


var period = 80;
var IncreaseTimeCoeffisient = 1;
var LongFly = 4;
var periodTwo = period * (2 + IncreaseTimeCoeffisient);
//console.log(periodTwo);
var periodThree = period * (3 + IncreaseTimeCoeffisient);
//console.log(periodThree);
var periodFour = period * (4 + IncreaseTimeCoeffisient + LongFly);
//console.log(periodFour);
var updatePeriod = period * (5 + IncreaseTimeCoeffisient + LongFly);
var increaseSpeed = 0.1;
var ReStartAnimation = 0;

const UpdateAnimationTime = () => {
  setTimeout(function(){
    ReStartAnimation = 0;
  },4000);
}


AnimationArrayFlying = [...AnimationArrayOriginal];

//console.log(AnimationArrayFlying);
var stepperXY = 6;

const AnimateDandelionAnimator = () => {


    if((ReStartAnimation == 0) && (AnimationControl == 1)){


    for(var i = 0;i < AnimationArrayOriginal.length;i++){

      if(step < period){

        if(i % 2 == 0){
          AnimationArrayFlying[i].position.x += randomIncreaser[i];
          AnimationArrayFlying[i].position.y += randomIncreaser[i];
        }



      }else if((step > period) && (step < periodTwo)){

        if(i % 2 == 0){
          AnimationArrayFlying[i].position.x += randomIncreaser[i];
          AnimationArrayFlying[i].position.y += randomIncreaser[i];
        }


        // AnimationArrayFlying[i].position.x += randomIncreaser[i];
        // AnimationArrayFlying[i].position.y -= randomIncreaser[i];

      }else if((step > periodTwo) && (step < periodThree)){

        if(i % 2 == 0){
          AnimationArrayFlying[i].position.x += randomIncreaser[i];
          AnimationArrayFlying[i].position.y += randomIncreaser[i];
        }


        // AnimationArrayFlying[i].position.x -= randomIncreaser[i];
        // AnimationArrayFlying[i].position.y -= randomIncreaser[i];

      }else if((step > periodThree) && (step < updatePeriod)){

        if(i % 2 == 0){
          AnimationArrayFlying[i].position.x += randomIncreaser[i];
          AnimationArrayFlying[i].position.y += randomIncreaser[i];
          AnimationArrayFlying[i].material.opacity -= 0.001;
          AnimationArrayFlying[i].material.opacity -= 0.001;
        }


        // AnimationArrayFlying[i].position.x -= randomIncreaser[i];
        // AnimationArrayFlying[i].position.y += randomIncreaser[i];
        // AnimationArrayFlying[i].material.opacity -= 0.01;
        // AnimationArrayFlying[i].material.opacity -= 0.01;

      }

      if(step > updatePeriod){
        for(var j = 0;j < AnimationArrayOriginal.length;j++){
          AnimationArrayFlying[j].position.x = copyArray[j].x;
          AnimationArrayFlying[j].position.y = copyArray[j].y;
          AnimationArrayFlying[j].material.opacity = 1;
          AnimationArrayFlying[j].material.opacity = 1;
        }

        step = 0;
        ReStartAnimation = 1;
        UpdateAnimationTime();
      }

    }

    step++;

    }





}



    //text



//xx
    //var iterator = 0;
    function animate() {
        renderer.render(scene, camera)
        requestAnimationFrame(animate);

        AnimateDandelionAnimator();

        //circle12.position.x += 1;


      }
      animate();













  }

  const startAnimation = () => {

      setTimeout(function(){
        AnimationControl = 1;
      },6000)

  }


  useEffect(() => {

    Core();
      //onWindowResize();
    startAnimation();
      //window.addEventListener( 'resize', onWindowResize, false );
    //
    mount.current.appendChild(renderer.domElement)

    return () => {

      mount.current.removeChild(renderer.domElement)

    }


  }, [])




  return <div className="dandelion"  ref={mount}/>;

}
export default NewHookComponent;
