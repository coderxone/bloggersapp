import React, { useRef,useEffect, useState,useMemo } from 'react';
import { Canvas, useFrame } from 'react-three-fiber';
import * as THREE from "three";
// import {
//   Mesh, Vector3, SplineCurve, Geometry, Color,
// } from 'three';

import { MeshLine, MeshLineMaterial, MeshLineRaycast } from 'three.meshline';
import sample from '../images/sample1.jpeg';
import sample2 from '../images/sample2.jpg';
import Logo_Echohub_1_part from '../images/main/animationtwo/business.png';
import Person from '../images/main/animationtwo/person.png';

import '../css/MainComponent.scss';
import fontStylesD from '../fonts/helvetiker_regular_typeface.json';
import VideocamIcon from '../images/camera.png';
import config from '../config/config';


const backgroundColor = "#ffffff";
const TextColor = "#0083ff";
const WhiteTextColor = "#ffffff";
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
  viewPosition = {x:0,y:-150,z:590};//for android
}

//console.log(viewPosition);
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

    SetCameraPosition();
    //scene.background = new THREE.Color('black' );
    //scene.fog = new THREE.Fog( 0xffffff, 1000, 4000 );

    scene.add(camera); //add group with camera to scene
    // LIGHTS
    scene.add(new THREE.AmbientLight(0x333333));

    const light = new THREE.DirectionalLight( 0xffffff, 2 );
    light.position.set(-40,10,100);
    scene.add(light);

    var businessPosition = {y:60};




    // LIGHTS
    //business side ellipse
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
       linewidth:2,
       wireframe: true,
       linecap: 'round', //ignored by WebGLRenderer
      	linejoin:  'round' //ignored by WebGLRenderer

     } );

     const ellipse = new THREE.MeshBasicMaterial({
         map:new THREE.TextureLoader().load(Logo_Echohub_1_part)
     });


     ellipse.map.needsUpdate = true; //ADDED
     var imgEcho1_mesh = new THREE.Mesh(new THREE.PlaneGeometry(150, 30),ellipse);
     imgEcho1_mesh.overdraw = true;
     imgEcho1_mesh.geometry.center();
     imgEcho1_mesh.material.needsUpdate = true;
     imgEcho1_mesh.position.y = businessPosition.y;

     scene.add(imgEcho1_mesh);
    //ellipse
    //text
    const font = new THREE.FontLoader().parse(fontStylesD);

    // configure font geometry
    const textOptions = {
      font,
      size: 9, // font size
      height: 5, // how much extrusion (how thick / deep are the letters)

    };

    var textGeometry = new THREE.TextGeometry( "Business", textOptions);

    var textMaterial = new THREE.MeshBasicMaterial(
      { color: WhiteTextColor }
    );

    var Textmesh = new THREE.Mesh( textGeometry, textMaterial );
    Textmesh.geometry.center();
    imgEcho1_mesh.add(Textmesh);
    //business side text

    //persons

    const downloadperson = new THREE.MeshBasicMaterial({
        map:new THREE.TextureLoader().load(Person)
    });

    var personPosition = {x:-100,y:-130};

    downloadperson.map.needsUpdate = true; //ADDED
    var person_mesh = new THREE.Mesh(new THREE.PlaneGeometry(25, 60),downloadperson);
    person_mesh.overdraw = true;
    person_mesh.geometry.center();
    person_mesh.material.needsUpdate = true;
    person_mesh.position.x = personPosition.x;
    person_mesh.position.y = personPosition.y;

    scene.add(person_mesh);

    var Persons = [];
    var originalPersonPositionX = personPosition.x;
    var originalPersonPositionY = personPosition.y;
    for(var i = 0;i < 5;i++){
      Persons[i] = person_mesh.clone();
      if((i > 0) && (i < 3)){
        Persons[i].position.y = originalPersonPositionY + 40;
      }

        Persons[i].position.x = originalPersonPositionX += 40;

      scene.add(Persons[i]);
    }



    //persons


//xx
    //var iterator = 0;
    function animate() {
        renderer.render(scene, camera)
        requestAnimationFrame(animate);



      }
      animate();



      function getRandomFloat() {
        return (Math.random() * (0.001 - 0.006) + 0.006).toFixed(4)
      }

      const runAgain = () => {

      }





  }

  const StartApp = () => {
    setTimeout(function(){
      //setManageStep(1);
    },3000)

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
