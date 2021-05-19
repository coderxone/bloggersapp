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


import StripesImage from '../../images/main/newImages/scheme.png';
import Lines3Image from '../../images/main/newImages/video_scheme.png';
import TextWindow5 from '../../images/main/newImages/generates.png';
import Lines6Image from '../../images/main/newImages/views.png';


import Lines8Image from '../../images/main/newImages/onTop.png';
import Lines8_1Image from '../../images/main/newImages/onTopSecondText.png';
import Lines8_2Image from '../../images/main/newImages/onTopSecondThird.png';
import Lines8_3Image from '../../images/main/newImages/onTopFourth.png';


import onTopLeft from '../../images/main/newImages/onTopLeft.png';
import onTopRight from '../../images/main/newImages/onTopRight.png';
import Pricing from '../../images/main/newImages/pricing.png';

import Plans1_small from '../../images/main/newImages/plans1_small.png';
import Plans2_small from '../../images/main/newImages/plans2_small.png';
import Plans3_small from '../../images/main/newImages/plans3_small.png';
import Plans4_small from '../../images/main/newImages/plans4_small.png';
import Plans1_big from '../../images/main/newImages/plans1_big.png';
import Plans2_big from '../../images/main/newImages/plans2_big.png';
import Plans3_big from '../../images/main/newImages/plans3_big.png';
import Plans4_big from '../../images/main/newImages/plans4_big.png';

import Lines7Image from '../../images/main/newImages/gps.png';
import fontStylesD from '../../fonts/helvetiker_regular_typeface.json';
import { MeshLine, MeshLineMaterial, MeshLineRaycast } from 'three.meshline'
import {
  useHistory,
} from "react-router-dom";
import LocalizeComponent from '../../localize/LocalizeComponent';



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
const BlackTextColor = "#000000";
const BlueTextColor = "#54b0dc";
const LinesColor = "rgb(32, 144, 204)";//2090cc
//const LinesColor = "rgb(3, 148, 252)";//2090cc
// viewport
let insetWidth;
let insetHeight;
const firstPagePosition = -150;
const secondPagePosition = -606;
const thirdPagePosition = -1061;
const fourthPagePosition = -1485;
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
  //xx
  const [topPosition,SetTopPosition] = useState(0);

  // var props = {
  //   page:3
  // }

  const goToLogin = useCallback(() => {

    return history.push('/login'), [history];

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


          if(props.page == 4){
            //Lines7Image
            const Lines7_a = new THREE.MeshBasicMaterial({
                map:new THREE.TextureLoader().load(Lines7Image)
            });
            Lines7_a.map.needsUpdate = true; //ADDED
            var Lines7_a_mesh = new THREE.Mesh(new THREE.PlaneGeometry(1220, 1197),Lines7_a);
            Lines7_a_mesh.overdraw = true;
            Lines7_a_mesh.geometry.center();
            // cloud_mesh.material.needsUpdate = true;
            Lines7_a_mesh.position.x = 0;
            Lines7_a_mesh.position.y = -1330;
            Lines7_a_mesh.scale.set(0.2,0.2,0.2);
            scene.add(Lines7_a_mesh);
            //Lines7Image
            //text
            const textOptionsGps = {
              font,
              size: 45, // font size
              height: 5, // how much extrusion (how thick / deep are the letters)
            };

            var textMaterialGps = new THREE.MeshBasicMaterial(
              { color: BlackTextColor }
            );

            var textGeometryGps = new THREE.TextGeometry(LocalizeComponent.gpsIn, textOptionsGps);
            var TextmeshGps = new THREE.Mesh( textGeometryGps, textMaterialGps );
            TextmeshGps.geometry.center();
            TextmeshGps.position.y = -320;
            TextmeshGps.position.x = -320;
            Lines7_a_mesh.add(TextmeshGps);

            const textOptionsGpsTwo = {
              font,
              size: 29, // font size
              height: 5, // how much extrusion (how thick / deep are the letters)
            };

            var textGeometryGpsTwo = new THREE.TextGeometry(LocalizeComponent.gpsInTwo, textOptionsGpsTwo);
            var TextmeshGpsT = new THREE.Mesh( textGeometryGpsTwo, textMaterialGps );
            TextmeshGpsT.geometry.center();
            TextmeshGpsT.position.y = -440;
            TextmeshGpsT.position.x = 0;
            Lines7_a_mesh.add(TextmeshGpsT);

            var textGeometryGps3 = new THREE.TextGeometry(LocalizeComponent.gpsInThree, textOptionsGpsTwo);
            var TextmeshGps3 = new THREE.Mesh( textGeometryGps3, textMaterialGps );
            TextmeshGps3.geometry.center();
            TextmeshGps3.position.y = -485;
            TextmeshGps3.position.x = 0;
            Lines7_a_mesh.add(TextmeshGps3);

            var textGeometryGps4 = new THREE.TextGeometry(LocalizeComponent.gpsInFour, textOptionsGpsTwo);
            var TextmeshGps4 = new THREE.Mesh( textGeometryGps4, textMaterialGps );
            TextmeshGps4.geometry.center();
            TextmeshGps4.position.y = -535;
            TextmeshGps4.position.x = 0;
            Lines7_a_mesh.add(TextmeshGps4);

            //text
          //circle animation

          const geometryA = new THREE.CircleGeometry( 10, 32 );
          const materialA = new THREE.MeshBasicMaterial( { color: "#70dfbe" } );
          circleA = new THREE.Mesh( geometryA, materialA );
          circleA.position.x = 0;
          circleA.position.y = -1389;
          scene.add( circleA );

          //text

          const textOptionsA = {
            font,
            size: 4, // font size
            height: 2, // how much extrusion (how thick / deep are the letters)
          };

          var textGeometryA = new THREE.TextGeometry("Creator", textOptionsA);

          var textMaterialA = new THREE.MeshBasicMaterial(
            { color: WhiteTextColor }
          );

          var TextmeshA = new THREE.Mesh( textGeometryA, textMaterialA );
          TextmeshA.geometry.center();
          circleA.add(TextmeshA);

          const geometryB = new THREE.CircleGeometry( 7.5, 32 );
          const materialB = new THREE.MeshBasicMaterial( { color: "#0181c2" } );
          circleB = new THREE.Mesh( geometryB, materialB );
          circleB.position.x = 0;
          circleB.position.y = -1389;
          scene.add( circleB );

          const textOptionsB = {
            font,
            size: 3, // font size
            height: 2, // how much extrusion (how thick / deep are the letters)
          };
          var textGeometryB = new THREE.TextGeometry("Creator", textOptionsB);

          var textMaterialB = new THREE.MeshBasicMaterial(
            { color: WhiteTextColor }
          );
          var TextmeshB = new THREE.Mesh( textGeometryB, textMaterialB );
          TextmeshB.geometry.center();
          circleB.add(TextmeshB);

          const geometryC = new THREE.CircleGeometry( 6.2, 32 );
          const materialC = new THREE.MeshBasicMaterial( { color: "#00002f" } );
          circleC = new THREE.Mesh( geometryC, materialC );
          circleC.position.x = 0;
          circleC.position.y = -1389;
          scene.add( circleC );

          var textGeometryC = new THREE.TextGeometry("Creator", textOptionsB);

          var textMaterialC = new THREE.MeshBasicMaterial(
            { color: WhiteTextColor }
          );

          var TextmeshC = new THREE.Mesh( textGeometryC, textMaterialC );
          TextmeshC.geometry.center();
          circleC.add(TextmeshC);

          //circle animation

//xx
          var OnTopArray = [Lines8Image,Lines8_1Image,Lines8_2Image,Lines8_3Image];
          //onTop
          const Lines8_a = new THREE.MeshBasicMaterial({
              map:new THREE.TextureLoader().load(OnTopArray[topPosition])
          });
          Lines8_a.map.needsUpdate = true; //ADDED
          var Lines8_a_mesh = new THREE.Mesh(new THREE.PlaneGeometry(620, 341),Lines8_a);
          Lines8_a_mesh.overdraw = true;
          Lines8_a_mesh.geometry.center();
          // cloud_mesh.material.needsUpdate = true;
          Lines8_a_mesh.position.x = 0;
          Lines8_a_mesh.position.y = -1505;
          Lines8_a_mesh.scale.set(0.27,0.27,0.27);
          scene.add(Lines8_a_mesh);
          //onTop
          //text
          const textOptionsAn = {
            font,
            size: 25, // font size
            height: 5, // how much extrusion (how thick / deep are the letters)
          };

          var textMaterialLeft = new THREE.MeshBasicMaterial(
            { color: BlackTextColor }
          );

          var textGeometryAn = new THREE.TextGeometry(LocalizeComponent.analyzeOne, textOptionsAn);
          var textGeometryAn2 = new THREE.TextGeometry(LocalizeComponent.analyzeOne, textOptionsAn);
          var textGeometryAn3 = new THREE.TextGeometry(LocalizeComponent.analyzeOne, textOptionsAn);
          var textGeometryAn4 = new THREE.TextGeometry(LocalizeComponent.analyzeOne, textOptionsAn);
          var textGeometryAn5 = new THREE.TextGeometry(LocalizeComponent.analyzeOne, textOptionsAn);
          var textGeometryAn6 = new THREE.TextGeometry(LocalizeComponent.analyzeOne, textOptionsAn);
          var TextmeshAn = new THREE.Mesh( textGeometryAn, textMaterialLeft );
          var TextmeshAn2 = new THREE.Mesh( textGeometryAn, textMaterialLeft );
          var TextmeshAn3 = new THREE.Mesh( textGeometryAn, textMaterialLeft );
          var TextmeshAn4 = new THREE.Mesh( textGeometryAn, textMaterialLeft );
          var TextmeshAn5 = new THREE.Mesh( textGeometryAn, textMaterialLeft );
          var TextmeshAn6 = new THREE.Mesh( textGeometryAn, textMaterialLeft );

          const FirstPartOfText = () => {
            //1 part
            Lines8_a_mesh.remove(TextmeshAn);
            Lines8_a_mesh.remove(TextmeshAn2);
            Lines8_a_mesh.remove(TextmeshAn3);
            Lines8_a_mesh.remove(TextmeshAn4);
            Lines8_a_mesh.remove(TextmeshAn5);
            Lines8_a_mesh.remove(TextmeshAn6);

            textGeometryAn = new THREE.TextGeometry(LocalizeComponent.analyzeOne, textOptionsAn);
            TextmeshAn = new THREE.Mesh( textGeometryAn, textMaterialLeft );
            TextmeshAn.geometry.center();
            TextmeshAn.position.y = 110;
            Lines8_a_mesh.add(TextmeshAn);
              //1 part
              //2 part
            textGeometryAn2 = new THREE.TextGeometry(LocalizeComponent.analyzeTwo, textOptionsAn);
            TextmeshAn2 = new THREE.Mesh( textGeometryAn2, textMaterialLeft );
            TextmeshAn2.geometry.center();
            TextmeshAn2.position.y = 70;
            Lines8_a_mesh.add(TextmeshAn2);
            //2 part
              //3 part
            textGeometryAn3 = new THREE.TextGeometry(LocalizeComponent.analyzeThree, textOptionsAn);
            TextmeshAn3 = new THREE.Mesh( textGeometryAn3, textMaterialLeft );
            TextmeshAn3.geometry.center();
            TextmeshAn3.position.y = 30;
            Lines8_a_mesh.add(TextmeshAn3);
            //3 part
              //4 part
            textGeometryAn4 = new THREE.TextGeometry(LocalizeComponent.analyzeFour, textOptionsAn);
            TextmeshAn4 = new THREE.Mesh( textGeometryAn4, textMaterialLeft );
            TextmeshAn4.geometry.center();
            TextmeshAn4.position.y = -10;
            Lines8_a_mesh.add(TextmeshAn4);
            //4part
            //5 part
            textGeometryAn5 = new THREE.TextGeometry(LocalizeComponent.analyzeFive, textOptionsAn);
            TextmeshAn5 = new THREE.Mesh( textGeometryAn5, textMaterialLeft );
            TextmeshAn5.geometry.center();
            TextmeshAn5.position.y = -50;
            Lines8_a_mesh.add(TextmeshAn5);
            //5 part
            //6 part
            textGeometryAn6 = new THREE.TextGeometry(LocalizeComponent.analyzeSix, textOptionsAn);
            TextmeshAn6 = new THREE.Mesh( textGeometryAn6, textMaterialLeft );
            TextmeshAn6.geometry.center();
            TextmeshAn6.position.y = -90;
            Lines8_a_mesh.add(TextmeshAn6);
            //6 part
          }

          const SecondPartOfText = () => {

            Lines8_a_mesh.remove(TextmeshAn);
            Lines8_a_mesh.remove(TextmeshAn2);
            Lines8_a_mesh.remove(TextmeshAn3);
            Lines8_a_mesh.remove(TextmeshAn4);
            Lines8_a_mesh.remove(TextmeshAn5);
            Lines8_a_mesh.remove(TextmeshAn6);

            const textOptionsS = {
              font,
              size: 27, // font size
              height: 5, // how much extrusion (how thick / deep are the letters)
            };
            //1 part
            textGeometryAn = new THREE.TextGeometry(LocalizeComponent.manageAd, textOptionsS);
            TextmeshAn = new THREE.Mesh( textGeometryAn, textMaterialLeft );
            TextmeshAn.geometry.center();
            TextmeshAn.position.y = 0;
            Lines8_a_mesh.add(TextmeshAn);
              //1 part
          }

          const ThirdPartOfText = () => {

            Lines8_a_mesh.remove(TextmeshAn);
            Lines8_a_mesh.remove(TextmeshAn);
            Lines8_a_mesh.remove(TextmeshAn2);


            const textOptionsS = {
              font,
              size: 27, // font size
              height: 5, // how much extrusion (how thick / deep are the letters)
            };
            //1 part
            textGeometryAn = new THREE.TextGeometry(LocalizeComponent.control, textOptionsS);
            TextmeshAn = new THREE.Mesh( textGeometryAn, textMaterialLeft );
            TextmeshAn.geometry.center();
            TextmeshAn.position.y = 0;
            Lines8_a_mesh.add(TextmeshAn);
              //1 part
          }

          const FourPartOfText = () => {

            Lines8_a_mesh.remove(TextmeshAn);
            Lines8_a_mesh.remove(TextmeshAn2);
            Lines8_a_mesh.remove(TextmeshAn3);

            const textOptionsS = {
              font,
              size: 27, // font size
              height: 5, // how much extrusion (how thick / deep are the letters)
            };
            //1 part
            textGeometryAn = new THREE.TextGeometry(LocalizeComponent.acceptT, textOptionsS);
            TextmeshAn = new THREE.Mesh( textGeometryAn, textMaterialLeft );
            TextmeshAn.geometry.center();
            TextmeshAn.position.y = 40;
            Lines8_a_mesh.add(TextmeshAn);
            //1 part
            //2 part
            textGeometryAn2 = new THREE.TextGeometry(LocalizeComponent.acceptTwo, textOptionsS);
            TextmeshAn2 = new THREE.Mesh( textGeometryAn2, textMaterialLeft );
            TextmeshAn2.geometry.center();
            TextmeshAn2.position.y = 0;
            Lines8_a_mesh.add(TextmeshAn2);
            //2 part
            //3 part
            textGeometryAn3 = new THREE.TextGeometry(LocalizeComponent.acceptThree, textOptionsS);
            TextmeshAn3 = new THREE.Mesh( textGeometryAn3, textMaterialLeft );
            TextmeshAn3.geometry.center();
            TextmeshAn3.position.y = -40;
            Lines8_a_mesh.add(TextmeshAn3);
            //3 part
          }
          var TextsArray = [
            FirstPartOfText,
            SecondPartOfText,
            ThirdPartOfText,
            FourPartOfText
          ];


          //text
          var currentPosition = 0;

          const changeNext = () => {

              currentPosition++;

              if(currentPosition > OnTopArray.length - 1){
                currentPosition = 0;
              }



            Lines8_a.map.dispose();
            Lines8_a.map = new THREE.TextureLoader().load(OnTopArray[currentPosition]);
            const callingFunc = TextsArray[currentPosition];
            callingFunc();
          }

          const changeBack = () => {

              if(currentPosition > 0){
                currentPosition--;
                Lines8_a.map.dispose();
                Lines8_a.map = new THREE.TextureLoader().load(OnTopArray[currentPosition]);
                const callingFunc = TextsArray[currentPosition];
                callingFunc();
              }


          }
          const callingFunc = TextsArray[currentPosition];
          callingFunc();

          //onTopLeft
          const onTopLeft_a = new THREE.MeshBasicMaterial({
              map:new THREE.TextureLoader().load(onTopLeft)
          });
          onTopLeft_a.map.needsUpdate = true; //ADDED
          var onTopLeft_a_mesh = new THREE.Mesh(new THREE.PlaneGeometry(126, 129),onTopLeft_a);
          onTopLeft_a_mesh.overdraw = true;
          onTopLeft_a_mesh.geometry.center();
          // cloud_mesh.material.needsUpdate = true;
          onTopLeft_a_mesh.position.x = -100;
          onTopLeft_a_mesh.position.y = -1505;
          onTopLeft_a_mesh.scale.set(0.24,0.24,0.24);
          scene2.add(onTopLeft_a_mesh);
          onTopLeft_a_mesh.on('click', function(ev) {

            changeBack();

          });
          //onTopLeft


          //onTopRight
          const onTopRight_a = new THREE.MeshBasicMaterial({
              map:new THREE.TextureLoader().load(onTopRight)
          });
          onTopRight_a.map.needsUpdate = true; //ADDED
          var onTopRight_a_mesh = new THREE.Mesh(new THREE.PlaneGeometry(125, 128),onTopRight_a);
          onTopRight_a_mesh.overdraw = true;
          onTopRight_a_mesh.geometry.center();
          // cloud_mesh.material.needsUpdate = true;
          onTopRight_a_mesh.position.x = 100;
          onTopRight_a_mesh.position.y = -1505;
          onTopRight_a_mesh.scale.set(0.24,0.24,0.24);
          scene2.add(onTopRight_a_mesh);

          onTopRight_a_mesh.on('click', function(ev) {

            changeNext();

          });
          //onTopRight

//xx
          //pricing
          const Pricing_a = new THREE.MeshBasicMaterial({
              map:new THREE.TextureLoader().load(Pricing)
          });
          Pricing_a.map.needsUpdate = true; //ADDED
          var Pricing_a_mesh = new THREE.Mesh(new THREE.PlaneGeometry(912, 76),Pricing_a);
          Pricing_a_mesh.overdraw = true;
          Pricing_a_mesh.geometry.center();
          // cloud_mesh.material.needsUpdate = true;
          Pricing_a_mesh.position.x = 0;
          Pricing_a_mesh.position.y = -1563;
          Pricing_a_mesh.scale.set(0.24,0.24,0.24);
          scene2.add(Pricing_a_mesh);

          const textOptionsSp = {
            font,
            size: 37, // font size
            height: 15, // how much extrusion (how thick / deep are the letters)
          };

          var textMaterialLeft = new THREE.MeshBasicMaterial(
            { color: BlueTextColor }
          );

          var textGeometrySP = new THREE.TextGeometry(LocalizeComponent.SubscP, textOptionsSp);
          var TextmeshSp = new THREE.Mesh( textGeometrySP, textMaterialLeft );
          TextmeshSp.geometry.center();
          TextmeshSp.position.y = 5;
          Pricing_a_mesh.add(TextmeshSp);
//xx
          var priceArray = [
            {
              name:LocalizeComponent.p1,
              compaign:LocalizeComponent.p2,
              count:LocalizeComponent.p3,
              price:LocalizeComponent.p4,
              index:1,
              s0:120,
              s1:45,
              s2:-5,
              s3:-50,
              s4:-100,
              b1:50,
              b2:-5,
              b3:-55,
              b4:-105,
            },
            {
              name:LocalizeComponent.p5,
              compaign:LocalizeComponent.p6,
              count:LocalizeComponent.p3,
              price:LocalizeComponent.p7,
              index:2,
              s0:120,
              s1:45,
              s2:-5,
              s3:-50,
              s4:-100,
              b1:50,
              b2:-5,
              b3:-55,
              b4:-105,
            },
            {
              name:LocalizeComponent.p8,
              compaign:LocalizeComponent.p6,
              count:LocalizeComponent.p3,
              price:LocalizeComponent.p9,
              index:3,
              s0:120,
              s1:45,
              s2:-5,
              s3:-50,
              s4:-100,
              b1:50,
              b2:-5,
              b3:-55,
              b4:-105,
            },
            {
              name:LocalizeComponent.p10,
              compaign:LocalizeComponent.p2,
              count:LocalizeComponent.p3,
              price:LocalizeComponent.p11,
              index:4,
              s0:120,
              s1:45,
              s2:-5,
              s3:-50,
              s4:-100,
              b1:50,
              b2:-5,
              b3:-55,
              b4:-105,
            }
          ]
          //pricing

          var smallPlansArray = [Plans1_small,Plans2_small,Plans3_small,Plans4_small];
          var bigPlansArray = [Plans1_big,Plans2_big,Plans3_big,Plans4_big];
          var objectPositions = [{x:-87,y:-1616,different:87},{x:0,y:-1616,different:87},{x:87,y:-1616,different:87},{x:164.5,y:-1616,different:87}];

          var PlansArray = [];
          var MeshArrays = [];
          //Plans1
          const Plans1_a = new THREE.MeshBasicMaterial({
              map:new THREE.TextureLoader().load(smallPlansArray[0])
          });
          Plans1_a.map.needsUpdate = true; //ADDED
          var Plans1_a_mesh = new THREE.Mesh(new THREE.PlaneGeometry(352, 366),Plans1_a);
          Plans1_a_mesh.overdraw = true;
          Plans1_a_mesh.geometry.center();
          // cloud_mesh.material.needsUpdate = true;
          Plans1_a_mesh.position.x = objectPositions[0].x;
          Plans1_a_mesh.position.y = objectPositions[0].y;

          Plans1_a_mesh.scale.set(0.21,0.21,0.21);
          scene2.add(Plans1_a_mesh);

          var textOptionsBn = {
            font,
            size: 50, // font size
            height: 5, // how much extrusion (how thick / deep are the letters)
          };
          var textOptionsQ = {
            font,
            size: 27, // font size
            height: 5, // how much extrusion (how thick / deep are the letters)
          };
          var textMaterialQ = new THREE.MeshBasicMaterial(
            { color: BlueTextColor }
          );

          var textGeometryindex = new THREE.TextGeometry("", textOptionsBn);
          var TextmeshI = new THREE.Mesh( textGeometryindex, textMaterialQ );

          var textGeometryQ = new THREE.TextGeometry("", textOptionsQ);
          var TextmeshQ = new THREE.Mesh( textGeometryQ, textMaterialQ );

          var textGeometryQ2 = new THREE.TextGeometry("", textOptionsQ);
          var TextmeshQ2 = new THREE.Mesh( textGeometryQ2, textMaterialQ );

          var textGeometryQ3 = new THREE.TextGeometry("", textOptionsQ);
          var TextmeshQ3 = new THREE.Mesh( textGeometryQ3, textMaterialQ );

          var textGeometryQ4 = new THREE.TextGeometry("", textOptionsQ);
          var TextmeshQ4 = new THREE.Mesh( textGeometryQ4, textMaterialQ );

          const setMesh = (mesh,meshObj,option) => {

              mesh.remove(TextmeshI);
              mesh.remove(TextmeshQ);
              mesh.remove(TextmeshQ2);
              mesh.remove(TextmeshQ3);
              mesh.remove(TextmeshQ4);

              var textMaterialQ = new THREE.MeshBasicMaterial(
                { color: BlueTextColor }
              );

              if(option == 2){
                textMaterialQ = new THREE.MeshBasicMaterial(
                  { color: WhiteTextColor }
                );
              }

              textGeometryindex = new THREE.TextGeometry(String(meshObj.index), textOptionsBn);
              TextmeshI = new THREE.Mesh( textGeometryindex, textMaterialQ );
              TextmeshI.geometry.center();
              TextmeshI.position.y = meshObj.s0;
              mesh.add(TextmeshI);

              textGeometryQ = new THREE.TextGeometry(meshObj.name, textOptionsQ);
              TextmeshQ = new THREE.Mesh( textGeometryQ, textMaterialQ );
              TextmeshQ.geometry.center();
              TextmeshQ.position.y = meshObj.s1;
              mesh.add(TextmeshQ);

              textGeometryQ2 = new THREE.TextGeometry(meshObj.compaign, textOptionsQ);
              TextmeshQ2 = new THREE.Mesh( textGeometryQ2, textMaterialQ );
              TextmeshQ2.geometry.center();
              TextmeshQ2.position.y = meshObj.s2;
              mesh.add(TextmeshQ2);

              textGeometryQ3 = new THREE.TextGeometry(meshObj.count, textOptionsQ);
              TextmeshQ3 = new THREE.Mesh( textGeometryQ3, textMaterialQ );
              TextmeshQ3.geometry.center();
              TextmeshQ3.position.y = meshObj.s3;
              mesh.add(TextmeshQ3);

              textGeometryQ4 = new THREE.TextGeometry(meshObj.price, textOptionsQ);
              TextmeshQ4 = new THREE.Mesh( textGeometryQ4, textMaterialQ );
              TextmeshQ4.geometry.center();
              TextmeshQ4.position.y = meshObj.s4;
              mesh.add(TextmeshQ4);
          }
          setMesh(Plans1_a_mesh,priceArray[0],1);


          PlansArray.push(Plans1_a);
          MeshArrays.push(Plans1_a_mesh);
          //Plans1

          //Plans2
          const Plans2_a = new THREE.MeshBasicMaterial({
              map:new THREE.TextureLoader().load(bigPlansArray[1])
          });
          Plans2_a.map.needsUpdate = true; //ADDED
          var Plans2_a_mesh = new THREE.Mesh(new THREE.PlaneGeometry(352, 352),Plans2_a);
          Plans2_a_mesh.overdraw = true;
          Plans2_a_mesh.geometry.center();
          // cloud_mesh.material.needsUpdate = true;
          Plans2_a_mesh.position.x =  objectPositions[1].x;
          Plans2_a_mesh.position.y = objectPositions[1].y;
          Plans2_a_mesh.scale.set(0.27,0.27,0.27);
          scene2.add(Plans2_a_mesh);

          setMesh(Plans2_a_mesh,priceArray[1],2);

          PlansArray.push(Plans2_a);
          MeshArrays.push(Plans2_a_mesh);
          //Plans2

          //Plans3
          const Plans3_a = new THREE.MeshBasicMaterial({
              map:new THREE.TextureLoader().load(smallPlansArray[2])
          });
          Plans3_a.map.needsUpdate = true; //ADDED
          var Plans3_a_mesh = new THREE.Mesh(new THREE.PlaneGeometry(352, 366),Plans3_a);
          Plans3_a_mesh.overdraw = true;
          Plans3_a_mesh.geometry.center();
          // cloud_mesh.material.needsUpdate = true;
          Plans3_a_mesh.position.x =  objectPositions[2].x;
          Plans3_a_mesh.position.y = objectPositions[2].y;
          Plans3_a_mesh.scale.set(0.21,0.21,0.21);
          scene2.add(Plans3_a_mesh);

          setMesh(Plans3_a_mesh,priceArray[2],1);

          PlansArray.push(Plans3_a);
          MeshArrays.push(Plans3_a_mesh);
          //Plans3


          //Plans4
          const Plans4_a = new THREE.MeshBasicMaterial({
              map:new THREE.TextureLoader().load(smallPlansArray[3])
          });
          Plans4_a.map.needsUpdate = true; //ADDED
          var Plans4_a_mesh = new THREE.Mesh(new THREE.PlaneGeometry(352, 366),Plans4_a);
          Plans4_a_mesh.overdraw = true;
          Plans4_a_mesh.geometry.center();
          // cloud_mesh.material.needsUpdate = true;
          Plans4_a_mesh.position.x = objectPositions[3].x;
          Plans4_a_mesh.position.y = objectPositions[3].y;
          Plans4_a_mesh.scale.set(0.21,0.21,0.21);
          scene2.add(Plans4_a_mesh);

          setMesh(Plans4_a_mesh,priceArray[3],1);

          PlansArray.push(Plans4_a);
          MeshArrays.push(Plans4_a_mesh);
          //Plans4


          //touch

          var lastFixed = 1;
          var CurrentPositionArray = [];

          const SlideTracker = (ev,meshnumber) => {

            //finish
            var currentMesh = meshnumber;
            try{
              var xObjectPosition = ev.intersects[0].point.x;

              //left right stopper
              var Leftstopper = -(objectPositions[0].different - xObjectPosition);

              var fixer = 0;

              if(Leftstopper > (objectPositions[0].x + objectPositions[0].different)){ //right side
                fixer = 1;
                //console.log(1);
              }

              if(Leftstopper < (objectPositions[0].x * 3)){//left side
                fixer = 1;
                //console.log(2);
              }
              //left right stopper


              if(fixer === 0){


                  if(currentMesh == 1){
                    //[{x:-87,y:-1622,different:87},{x:0,y:-1622,different:87},{x:87,y:-1622,different:87},{x:164.5,y:-1622,different:87}];
                    MeshArrays[0].position.x = (objectPositions[0].x + xObjectPosition);
                    CurrentPositionArray[0] = (objectPositions[0].x + xObjectPosition);

                    MeshArrays[1].position.x = xObjectPosition;
                    CurrentPositionArray[1] = xObjectPosition;

                    MeshArrays[2].position.x = (objectPositions[2].x + xObjectPosition);
                    CurrentPositionArray[2] = (objectPositions[2].x + xObjectPosition);

                    MeshArrays[3].position.x = (objectPositions[3].x + 10 + xObjectPosition);
                    CurrentPositionArray[3] = (objectPositions[3].x + 10 + xObjectPosition);

                  }

                  if(currentMesh == 0){
                    //[{x:-87,y:-1622,different:87},{x:0,y:-1622,different:87},{x:87,y:-1622,different:87},{x:164.5,y:-1622,different:87}];
                    MeshArrays[0].position.x = (objectPositions[0].x + xObjectPosition);
                    CurrentPositionArray[0] = (objectPositions[0].x + xObjectPosition);

                    MeshArrays[1].position.x = (objectPositions[1].x + xObjectPosition);
                    CurrentPositionArray[1] = (objectPositions[1].x + xObjectPosition);

                    MeshArrays[2].position.x = (objectPositions[2].x + xObjectPosition);
                    CurrentPositionArray[2] = (objectPositions[2].x + xObjectPosition);

                    MeshArrays[3].position.x = (objectPositions[3].x + 10 + xObjectPosition);
                    CurrentPositionArray[3] = (objectPositions[3].x + 10 + xObjectPosition);

                  }

                  if(currentMesh == 2){
                    //[{x:-87,y:-1622,different:87},{x:0,y:-1622,different:87},{x:87,y:-1622,different:87},{x:164.5,y:-1622,different:87}];
                    MeshArrays[0].position.x = (objectPositions[0].x + xObjectPosition);
                    CurrentPositionArray[0] = (objectPositions[0].x + xObjectPosition);

                    MeshArrays[1].position.x = (objectPositions[1].x + xObjectPosition);
                    CurrentPositionArray[1] = (objectPositions[1].x + xObjectPosition);

                    MeshArrays[2].position.x = (objectPositions[2].x + xObjectPosition);
                    CurrentPositionArray[2] = (objectPositions[2].x + xObjectPosition);

                    MeshArrays[3].position.x = (objectPositions[3].x + 10 + xObjectPosition);
                    CurrentPositionArray[3] = (objectPositions[3].x + 10 + xObjectPosition);

                  }



                  //position tracker
                  for(var i = 0;i < CurrentPositionArray.length;i++){
                    var minus20 = CurrentPositionArray[i] - 30;
                    var plus20 = CurrentPositionArray[i] + 30;
                    if((0 > minus20) && (0 < plus20)){

                      if(lastFixed !== i){

                        PlansArray[i].map.dispose();
                        PlansArray[i].map = new THREE.TextureLoader().load(bigPlansArray[i]);
                        MeshArrays[i].scale.set(0.27,0.27,0.27);
                        setMesh(MeshArrays[i],priceArray[i],2);
                        MeshArrays[i].position.y = objectPositions[i].y - 20;

                        //console.log("current Position " + i);
                        lastFixed = i;

                        for(var j = 0;j < PlansArray.length;j++){
                          if(j !== i){
                            PlansArray[j].map.dispose();
                            PlansArray[j].map = new THREE.TextureLoader().load(smallPlansArray[j]);
                            MeshArrays[j].scale.set(0.21,0.21,0.21);
                            setMesh(MeshArrays[j],priceArray[j],1);
                            MeshArrays[i].position.y = objectPositions[i].y;

                            //Plans2_a_mesh.scale.set(0.27,0.27,0.27);
                          }
                        }
                      }


                    }
                  }

              }
              //position tracker

            }catch(e){

            }
            //finish

          }

          Plans2_a_mesh.on('touchmove', ev => {

              SlideTracker(ev,1);

          })
          Plans1_a_mesh.on('touchmove', ev => {

              SlideTracker(ev,0);

          })
          Plans3_a_mesh.on('touchmove', ev => {

              SlideTracker(ev,2);

          })
          Plans4_a_mesh.on('touchmove', ev => {

              SlideTracker(ev,3);

          })

          Plans1_a_mesh.on('click', ev => {

              localStorage.setItem("promotion",0);
              localStorage.setItem("amount",300);
              localStorage.setItem("enablelogin",1);
              goToLogin();

          })

          Plans2_a_mesh.on('click', ev => {

              localStorage.setItem("promotion",1);
              localStorage.setItem("amount",3000);
              localStorage.setItem("enablelogin",1);
              goToLogin();

          })

          Plans3_a_mesh.on('click', ev => {

              localStorage.setItem("promotion",2);
              localStorage.setItem("amount",350);
              localStorage.setItem("enablelogin",1);
              goToLogin();
          })
          Plans4_a_mesh.on('click', ev => {

              localStorage.setItem("promotion",3);
              localStorage.setItem("amount",2700);
              localStorage.setItem("enablelogin",1);
              goToLogin();

          })
          //touch

          turnFourthAnimation = 1;


        }






        //ReadyBlock
        // const Ready_a = new THREE.MeshBasicMaterial({
        //     map:new THREE.TextureLoader().load(ReadyBlock)
        // });
        // Ready_a.map.needsUpdate = true; //ADDED
        // var Ready_mesh = new THREE.Mesh(new THREE.PlaneGeometry(215, 1250),Ready_a);
        // Ready_mesh.overdraw = true;
        // Ready_mesh.geometry.center();
        // // cloud_mesh.material.needsUpdate = true;
        // Ready_mesh.position.x = 0;
        // Ready_mesh.position.y = -1050;
        // Ready_mesh.layers.set(0);
        // scene.add(Ready_mesh);
        //ReadyBlock



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


  return <div className="vis scrollChange secondFourth"  ref={mount}/>;
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

  //console.log(matLins[0]);





  onWindowResize()
  //camera.position.set( 0, YPosition, 550 );
  //YPosition -= 1;
  //camera.position.set( 0, -480, 550 );

}

//



export default NewComponent;
