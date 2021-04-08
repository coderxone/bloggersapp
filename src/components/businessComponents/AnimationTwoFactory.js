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
import NumbersOfSubscribers from '../../images/main/newImages/number_of_subscribers.png';
import InterestLocation from '../../images/main/newImages/interests.png';
import TargetAudienceLocation from '../../images/main/newImages/target_audience.png';
import TextWindow1 from '../../images/main/newImages/Large.png';
import TextWindow2 from '../../images/main/newImages/Various.png';
import TextWindow3 from '../../images/main/newImages/macro.png';
import Arrows from '../../images/main/newImages/arrows.png';
import CenterBlock from '../../images/main/newImages/40.png';
import LeftBlock from '../../images/main/newImages/89.png';
import RightBlock from '../../images/main/newImages/according.png';
import Logo_Echohub_1_part from '../../images/main/animationtwo/business.png';
import Person from '../../images/main/animationtwo/person.png';
import CloudImage from '../../images/main/animationtwo/cloud.png';

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
      camera.position.set( 0, firstPagePosition, 550 );
    }else if(props.page == 2){
      camera.position.set( 0, secondPagePosition, 550 );
    }else if(props.page == 3){
      camera.position.set( 0, thirdPagePosition, 550 );
    }else if(props.page == 4){
      camera.position.set( 0, fourthPagePosition, 550 );
    }else if(props.page == 5){
      camera.position.set( 0, fifthPagePosition, 550 );
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

    if(props.page == 1){

          const ellipse = new THREE.MeshBasicMaterial({
              map: new THREE.TextureLoader().load(Logo_Echohub_1_part)
          });

          ellipse.map.needsUpdate = true; //ADDED
          var imgEcho1_mesh = new THREE.Mesh(new THREE.PlaneGeometry(150, 30),ellipse);
          imgEcho1_mesh.overdraw = true;
          imgEcho1_mesh.geometry.center();
          imgEcho1_mesh.material.needsUpdate = true;
          imgEcho1_mesh.position.y = businessPosition.y;

          scene.add(imgEcho1_mesh);
          //text
          const font = new THREE.FontLoader().parse(fontStylesD);

          const textOptions = {
            font,
            size: 9, // font size
            height: 5, // how much extrusion (how thick / deep are the letters)
          };

          var textGeometry = new THREE.TextGeometry("Business", textOptions);

          var textMaterial = new THREE.MeshBasicMaterial(
            { color: WhiteTextColor }
          );

          var Textmesh = new THREE.Mesh( textGeometry, textMaterial );
          Textmesh.geometry.center();
          imgEcho1_mesh.add(Textmesh);
          //business side text

          //cloud
          const cloud = new THREE.MeshBasicMaterial({
              map:new THREE.TextureLoader().load(CloudImage)
          });
          cloud.map.needsUpdate = true; //ADDED
          var cloud_mesh = new THREE.Mesh(new THREE.PlaneGeometry(436, 268),cloud);
          cloud_mesh.overdraw = true;
          cloud_mesh.geometry.center();
          // cloud_mesh.material.needsUpdate = true;
          cloud_mesh.position.x = 0;
          cloud_mesh.position.y = -152;
          cloud_mesh.layers.set(0);
          cloud_mesh.scale.set(0.2,0.2,0.2);
          scene.add(cloud_mesh);

          //cloud
          //three additional text
          const NumbersOfSubscribersA = new THREE.MeshBasicMaterial({
              map:new THREE.TextureLoader().load(NumbersOfSubscribers)
          });
          NumbersOfSubscribersA.map.needsUpdate = true; //ADDED
          var NumbersOfSubscribers_mesh = new THREE.Mesh(new THREE.PlaneGeometry(400, 88),NumbersOfSubscribersA);
          NumbersOfSubscribers_mesh.overdraw = true;
          NumbersOfSubscribers_mesh.geometry.center();
          // cloud_mesh.material.needsUpdate = true;
          NumbersOfSubscribers_mesh.position.x = -80;
          NumbersOfSubscribers_mesh.position.y = -87;
          NumbersOfSubscribers_mesh.layers.set(1);
          NumbersOfSubscribers_mesh.scale.set(0.232,0.232,0.232);
          scene2.add(NumbersOfSubscribers_mesh);

          const InterestLocationA = new THREE.MeshBasicMaterial({
              map:new THREE.TextureLoader().load(InterestLocation)
          });
          InterestLocationA.map.needsUpdate = true; //ADDED
          var InterestLocationA_mesh = new THREE.Mesh(new THREE.PlaneGeometry(213, 87),InterestLocationA);
          InterestLocationA_mesh.overdraw = true;
          InterestLocationA_mesh.geometry.center();
          // cloud_mesh.material.needsUpdate = true;
          InterestLocationA_mesh.position.x = 0;
          InterestLocationA_mesh.position.y = -45;
          InterestLocationA_mesh.layers.set(1);
          InterestLocationA_mesh.scale.set(0.24,0.24,0.24);
          scene2.add(InterestLocationA_mesh);

          const TargetAudienceLocationA = new THREE.MeshBasicMaterial({
              map:new THREE.TextureLoader().load(TargetAudienceLocation)
          });
          TargetAudienceLocationA.map.needsUpdate = true; //ADDED
          var TargetAudienceLocationA_mesh = new THREE.Mesh(new THREE.PlaneGeometry(400, 88),TargetAudienceLocationA);
          TargetAudienceLocationA_mesh.overdraw = true;
          TargetAudienceLocationA_mesh.geometry.center();
          // cloud_mesh.material.needsUpdate = true;
          TargetAudienceLocationA_mesh.position.x = 80;
          TargetAudienceLocationA_mesh.position.y = -87;
          TargetAudienceLocationA_mesh.layers.set(1);
          TargetAudienceLocationA_mesh.scale.set(0.232,0.232,0.232);
          scene2.add(TargetAudienceLocationA_mesh);
          //three additional text
          //TextWindow1
          const TextWindow1_a = new THREE.MeshBasicMaterial({
              map:new THREE.TextureLoader().load(TextWindow1)
          });
          TextWindow1_a.map.needsUpdate = true; //ADDED
          var TextWindow1_mesh = new THREE.Mesh(new THREE.PlaneGeometry(1029, 172),TextWindow1_a);
          TextWindow1_mesh.overdraw = true;
          TextWindow1_mesh.geometry.center();
          // cloud_mesh.material.needsUpdate = true;
          TextWindow1_mesh.position.x = rightWindowPosition;
          TextWindow1_mesh.position.y = 10;
          TextWindow1_mesh.layers.set(1);
          TextWindow1_mesh.scale.set(0.24,0.24,0.24);
          scene2.add(TextWindow1_mesh);
          //TextWindow1

          //TextWindow2
          const TextWindow2_a = new THREE.MeshBasicMaterial({
              map:new THREE.TextureLoader().load(TextWindow2)
          });
          TextWindow2_a.map.needsUpdate = true; //ADDED
          var TextWindow2_mesh = new THREE.Mesh(new THREE.PlaneGeometry(1029, 173),TextWindow2_a);
          TextWindow2_mesh.overdraw = true;
          TextWindow2_mesh.geometry.center();
          // cloud_mesh.material.needsUpdate = true;
          TextWindow2_mesh.position.x = rightWindowPosition;
          TextWindow2_mesh.position.y = -205;
          TextWindow2_mesh.layers.set(1);
          TextWindow2_mesh.scale.set(0.24,0.24,0.24);
          scene2.add(TextWindow2_mesh);
          //TextWindow2
          //TextWindow3
          const TextWindow3_a = new THREE.MeshBasicMaterial({
              map:new THREE.TextureLoader().load(TextWindow3)
          });
          TextWindow3_a.map.needsUpdate = true; //ADDED
          var TextWindow3_mesh = new THREE.Mesh(new THREE.PlaneGeometry(828, 133),TextWindow3_a);
          TextWindow3_mesh.overdraw = true;
          TextWindow3_mesh.geometry.center();
          // cloud_mesh.material.needsUpdate = true;
          TextWindow3_mesh.position.x = 0;
          TextWindow3_mesh.position.y = -360;
          TextWindow3_mesh.layers.set(1);
          TextWindow3_mesh.scale.set(0.24,0.24,0.24);
          scene2.add(TextWindow3_mesh);
          //TextWindow3
          //arrows
          const Arrows_a = new THREE.MeshBasicMaterial({
              map:new THREE.TextureLoader().load(Arrows)
          });
          Arrows_a.map.needsUpdate = true; //ADDED
          var Arrows_a_mesh = new THREE.Mesh(new THREE.PlaneGeometry(463, 42),Arrows_a);
          Arrows_a_mesh.overdraw = true;
          Arrows_a_mesh.geometry.center();
          // cloud_mesh.material.needsUpdate = true;
          Arrows_a_mesh.position.x = rightWindowPosition;
          Arrows_a_mesh.position.y = -230.5;
          Arrows_a_mesh.layers.set(1);
          Arrows_a_mesh.scale.set(0.24,0.24,0.24);
          scene2.add(Arrows_a_mesh);
          //arrows
          //blocks
          const CenterBlockA = new THREE.MeshBasicMaterial({
              map:new THREE.TextureLoader().load(CenterBlock)
          });
          CenterBlockA.map.needsUpdate = true; //ADDED
          var CenterBlockA_mesh = new THREE.Mesh(new THREE.PlaneGeometry(447, 415),CenterBlockA);
          CenterBlockA_mesh.overdraw = true;
          CenterBlockA_mesh.geometry.center();
          // cloud_mesh.material.needsUpdate = true;
          CenterBlockA_mesh.position.x = rightWindowPosition;
          CenterBlockA_mesh.position.y = -281;
          CenterBlockA_mesh.layers.set(1);
          CenterBlockA_mesh.scale.set(0.22,0.22,0.22);
          scene2.add(CenterBlockA_mesh);

          const LeftBlockA = new THREE.MeshBasicMaterial({
              map:new THREE.TextureLoader().load(LeftBlock)
          });
          LeftBlockA.map.needsUpdate = true; //ADDED
          var LeftBlockA_mesh = new THREE.Mesh(new THREE.PlaneGeometry(330, 312),LeftBlockA);
          LeftBlockA_mesh.overdraw = true;
          LeftBlockA_mesh.geometry.center();
          // cloud_mesh.material.needsUpdate = true;
          LeftBlockA_mesh.position.x = rightWindowPosition - 88;
          LeftBlockA_mesh.position.y = -281;
          LeftBlockA_mesh.layers.set(1);
          LeftBlockA_mesh.scale.set(0.22,0.22,0.22);
          scene2.add(LeftBlockA_mesh);

          const RightBlockA = new THREE.MeshBasicMaterial({
              map:new THREE.TextureLoader().load(RightBlock)
          });
          RightBlockA.map.needsUpdate = true; //ADDED
          var RightBlockA_mesh = new THREE.Mesh(new THREE.PlaneGeometry(330, 312),RightBlockA);
          RightBlockA_mesh.overdraw = true;
          RightBlockA_mesh.geometry.center();
          // cloud_mesh.material.needsUpdate = true;
          RightBlockA_mesh.position.x = rightWindowPosition + 88;
          RightBlockA_mesh.position.y = -281;
          RightBlockA_mesh.layers.set(1);
          RightBlockA_mesh.scale.set(0.22,0.22,0.22);
          scene2.add(RightBlockA_mesh);
          //blocks

  }//page 1 close tag
    //persons
    const downloadperson = new THREE.MeshBasicMaterial({
        map:new THREE.TextureLoader().load(Person)
    });

    var personPositionsCoordinates = [];

    var personPosition = {x:-100,y:-130};
    personPositionsCoordinates.push(personPosition);

    downloadperson.map.needsUpdate = true; //ADDED
    var person_mesh = new THREE.Mesh(new THREE.PlaneGeometry(25, 60),downloadperson);
    person_mesh.overdraw = true;
    person_mesh.geometry.center();
    person_mesh.material.needsUpdate = true;
    person_mesh.position.x = personPosition.x;
    person_mesh.position.y = personPosition.y;
    person_mesh.layers.set(1);

    if(props.page == 1){
      scene.add(person_mesh);
    }


    var Persons = [];
    var originalPersonPositionX = personPosition.x;
    var originalPersonPositionY = personPosition.y;
    for(var i = 0;i < 5;i++){
      Persons[i] = person_mesh.clone();
      if((i > 0) && (i < 3)){
        Persons[i].position.y = originalPersonPositionY + 40;
      }

        Persons[i].position.x = originalPersonPositionX += 40;

        var objCoord = {
          x:Persons[i].position.x,
          y:Persons[i].position.y
        }
        personPositionsCoordinates.push(objCoord);
        Persons[i].layers.set(1);
        if(props.page == 1){
          scene.add(Persons[i]);
        }


    }
    //persons


    // console.log(personPositionsCoordinates);
    // console.log(personPositionsCoordinates);
    // Position and THREE.Color Data


    var objectMove = [
      {x:40,y:20},
      {x:20,y:20},
      {x:5,y:20},
      {x:-10,y:20},
      {x:-25,y:20},
      {x:-45,y:20},
    ]
    var objectMoveSecondLine = [
      {x:40,y:80},
      {x:20,y:90},
      {x:5,y:70},
      {x:-10,y:70},
      {x:-37,y:90},
      {x:-57,y:80},
    ]

    var splines = [];
    var pointss = [];
    var divisionss = [];
    var geometryss = [];
    var bottomCorrectPosition = 28.5;
    var centerCorrectPosition = 33.5;

    var FinalPositionsOfLines = [];
    var geometryTorus = [];
    var materialTorus = [];
    var torus = [];



    for(var k = 0;k < 6;k++){
      const positions = [];
  		const colors = [];
        //line

        if(k == 2){
          splines[k] = new THREE.CatmullRomCurve3( [
            	new THREE.Vector3( businessPosition.x - objectMove[k].x, businessPosition.y - objectMove[k].y,  0 ),
            	new THREE.Vector3( personPositionsCoordinates[k].x + 12,personPositionsCoordinates[k].y + centerCorrectPosition, 0 ),
            ] );
            var obj = {
              x:personPositionsCoordinates[k].x + 12,
              y:personPositionsCoordinates[k].y + centerCorrectPosition
            }
            FinalPositionsOfLines.push(obj);
        }else if(k == 3){
          splines[k] = new THREE.CatmullRomCurve3( [
            	new THREE.Vector3( businessPosition.x - objectMove[k].x, businessPosition.y - objectMove[k].y,  0 ),
            	new THREE.Vector3( personPositionsCoordinates[k].x - 12,personPositionsCoordinates[k].y + centerCorrectPosition, 0 ),
            ] );
            var obj = {
              x:personPositionsCoordinates[k].x - 12,
              y:personPositionsCoordinates[k].y + centerCorrectPosition
            }
            FinalPositionsOfLines.push(obj);
        }else if(k > 3){
          splines[k] = new THREE.CatmullRomCurve3( [
            	new THREE.Vector3( businessPosition.x - objectMove[k].x, businessPosition.y - objectMove[k].y,  0 ),
            	new THREE.Vector3( businessPosition.x - objectMoveSecondLine[k].x - 7, businessPosition.y - objectMoveSecondLine[k].y,  0  ),
            	new THREE.Vector3( personPositionsCoordinates[k].x - 5,businessPosition.y - objectMoveSecondLine[k].y - 7, 0 ),
            	new THREE.Vector3( personPositionsCoordinates[k].x,personPositionsCoordinates[k].y + bottomCorrectPosition, 0 ),
            ] );
            var obj = {
              x:personPositionsCoordinates[k].x,
              y:personPositionsCoordinates[k].y + bottomCorrectPosition
            }
            FinalPositionsOfLines.push(obj);
        }else{
          splines[k] = new THREE.CatmullRomCurve3( [
            	new THREE.Vector3( businessPosition.x - objectMove[k].x, businessPosition.y - objectMove[k].y,  0 ),
            	new THREE.Vector3( businessPosition.x - objectMoveSecondLine[k].x - 7, businessPosition.y - objectMoveSecondLine[k].y,  0  ),
            	new THREE.Vector3( personPositionsCoordinates[k].x + 5,businessPosition.y - objectMoveSecondLine[k].y - 7, 0 ),
            	new THREE.Vector3( personPositionsCoordinates[k].x,personPositionsCoordinates[k].y + bottomCorrectPosition, 0 ),
            ] );
            var obj = {
              x:personPositionsCoordinates[k].x,
              y:personPositionsCoordinates[k].y + bottomCorrectPosition
            }
            FinalPositionsOfLines.push(obj);
        }




        pointss[k] = splines[k].getPoints( 50 );
      	divisionss[k] = Math.round( 12 * pointss[k].length );
      	const point = new THREE.Vector3();
      	const color = new THREE.Color(LinesColor);

      	for ( let i = 0, l = divisionss[k]; i < l; i ++ ) {

      		const t = i / l;

      		splines[k].getPoint( t, point );
      		positions.push( point.x, point.y, point.z );

      		//color.setHSL( t, 1.0, 0.5 );
      		colors.push( color.r, color.g, color.b );

      	}

      	geometryss[k] = new LineGeometry();
      	geometryss[k].setPositions( positions );
      	geometryss[k].setColors( colors );

      	matLins[k] = new LineMaterial({

      		color: 0xffffff,
      		linewidth: 1, // in pixels
      		vertexColors: true,
      		dashed: false
      	});

        // matLins[k] = new MeshLineMaterial({
        //
        //   //transparent: true,
        //   lineWidth: 3,
        //   vertexColors: true,
        //   dashArray: 1,     // always has to be the double of the line
        //   dashOffset: 0,    // start the dash at zero
        //   dashRatio: 0.99,  // visible length range min: 0.99, max: 0.5
        //   //dashed: true
        //
        // });

      	liness[k] = new Line2( geometryss[k], matLins[k] );
      	liness[k].computeLineDistances();
      	liness[k].scale.set( 1, 1, 1 );
      	liness[k].layers.set(2);
        if(props.page == 1){
          scene.add( liness[k] );
        }



        //circles
        //FinalPositionsOfLines

        geometryTorus[k] = new THREE.TorusGeometry( 3, 0.7, 16, 100 );
        materialTorus[k] = new THREE.MeshBasicMaterial( { color: LinesColor } );
        torus[k] = new THREE.Mesh( geometryTorus[k], materialTorus[k] );
        torus[k].position.x = FinalPositionsOfLines[k].x;
        torus[k].position.y = FinalPositionsOfLines[k].y - 4;
        torus[k].layers.set(2);
        if(props.page == 1){
          scene.add(torus[k]);
        }


        //circles

    }




    var splinesB = [];
    var pointssB = [];
    var divisionssB = [];
    var geometryssB = [];
    var bottomCorrectPositionB = 28.5;
    var centerCorrectPositionB = 33.5;

    var FinalPositionsOfLinesB = [];
    var geometryTorusB = [];
    var materialTorusB = [];
    var torusB = [];

    for(var j = 0;j < FinalPositionsOfLines.length;j++){
      const positions = [];
      const colors = [];
        //line

        if(j == 0){
          splinesB[j] = new THREE.CatmullRomCurve3( [
              new THREE.Vector3( FinalPositionsOfLines[j].x, FinalPositionsOfLines[j].y - 70,  0 ),
              new THREE.Vector3( FinalPositionsOfLines[j].x + 13, FinalPositionsOfLines[j].y - 270,  0  ),
              new THREE.Vector3( FinalPositionsOfLines[j].x + 57,FinalPositionsOfLines[j].y - 280, 0 ),
              new THREE.Vector3( FinalPositionsOfLines[j].x + 60,FinalPositionsOfLines[j].y - 300, 0 ),
            ] );

            var obj = {
              x:FinalPositionsOfLines[j].x,
              y:FinalPositionsOfLines[j].y - 70
            }
            FinalPositionsOfLinesB.push(obj);

        }else if(j == 1){
          splinesB[j] = new THREE.CatmullRomCurve3( [
              new THREE.Vector3( FinalPositionsOfLines[j].x - 20, FinalPositionsOfLines[j].y - 55,  0 ),
              new THREE.Vector3( FinalPositionsOfLines[j].x - 10, FinalPositionsOfLines[j].y - 250,  0  ),
              new THREE.Vector3( FinalPositionsOfLines[j].x + 32,FinalPositionsOfLines[j].y - 260, 0 ),
              new THREE.Vector3( FinalPositionsOfLines[j].x + 36,FinalPositionsOfLines[j].y - 300, 0 ),
            ] );

            var obj = {
              x:FinalPositionsOfLines[j].x - 20,
              y:FinalPositionsOfLines[j].y - 55
            }
            FinalPositionsOfLinesB.push(obj);

        }else if((j > 1) && (j < 4)){
          splinesB[j] = new THREE.CatmullRomCurve3( [
              new THREE.Vector3( FinalPositionsOfLines[j].x, FinalPositionsOfLines[j].y - 145,  0 ),
              new THREE.Vector3( FinalPositionsOfLines[j].x,FinalPositionsOfLines[j].y - 345, 0 ),
            ] );

            var obj = {
              x:FinalPositionsOfLines[j].x,
              y:FinalPositionsOfLines[j].y - 145
            }
            FinalPositionsOfLinesB.push(obj);

        }else if(j == 4){
          splinesB[j] = new THREE.CatmullRomCurve3( [
              new THREE.Vector3( FinalPositionsOfLines[j].x + 20, FinalPositionsOfLines[j].y - 55,  0 ),
              new THREE.Vector3( FinalPositionsOfLines[j].x + 10, FinalPositionsOfLines[j].y - 250,  0  ),
              new THREE.Vector3( FinalPositionsOfLines[j].x - 32,FinalPositionsOfLines[j].y - 260, 0 ),
              new THREE.Vector3( FinalPositionsOfLines[j].x - 36,FinalPositionsOfLines[j].y - 300, 0 ),
            ] );
            var obj = {
              x:FinalPositionsOfLines[j].x + 20,
              y:FinalPositionsOfLines[j].y - 55
            }
            FinalPositionsOfLinesB.push(obj);
        }else if(j == 5){
          splinesB[j] = new THREE.CatmullRomCurve3( [
              new THREE.Vector3( FinalPositionsOfLines[j].x, FinalPositionsOfLines[j].y - 70,  0 ),
              new THREE.Vector3( FinalPositionsOfLines[j].x - 13, FinalPositionsOfLines[j].y - 270,  0  ),
              new THREE.Vector3( FinalPositionsOfLines[j].x - 57,FinalPositionsOfLines[j].y - 280, 0 ),
              new THREE.Vector3( FinalPositionsOfLines[j].x - 60,FinalPositionsOfLines[j].y - 300, 0 ),
            ] );

            var obj = {
              x:FinalPositionsOfLines[j].x,
              y:FinalPositionsOfLines[j].y - 70
            }
            FinalPositionsOfLinesB.push(obj);
        }




        pointssB[j] = splinesB[j].getPoints( 50 );
        divisionssB[j] = Math.round( 12 * pointssB[j].length );
        const point = new THREE.Vector3();
        const color = new THREE.Color(LinesColor);

        for ( let i = 0, l = divisionssB[j]; i < l; i ++ ) {

          const t = i / l;

          splinesB[j].getPoint( t, point );
          positions.push( point.x, point.y, point.z );

          //color.setHSL( t, 1.0, 0.5 );
          colors.push( color.r, color.g, color.b );

        }

        geometryssB[j] = new LineGeometry();
        geometryssB[j].setPositions( positions );
        geometryssB[j].setColors( colors );

        matLinsB[j] = new LineMaterial({

          color: 0xffffff,
          linewidth: 3, // in pixels
          vertexColors: true,
          //resolution:  // to be set by renderer, eventually
          dashed: false

        });


        linessB[j] = new Line2( geometryssB[j], matLinsB[j] );
        linessB[j].computeLineDistances();
        linessB[j].scale.set( 1, 1, 1 );
        linessB[j].layers.set(2);
        //scene.add( linessB[j] );

        geometryTorusB[j] = new THREE.TorusGeometry( 3, 0.7, 16, 100 );
        materialTorusB[j] = new THREE.MeshBasicMaterial( { color: LinesColor } );
        torusB[j] = new THREE.Mesh( geometryTorusB[j], materialTorusB[j] );
        torusB[j].position.x = FinalPositionsOfLinesB[j].x;
        torusB[j].position.y = FinalPositionsOfLinesB[j].y + 4;
        torusB[j].layers.set(2);
        if(props.page == 1){
          //scene.add(torusB[j]);

        }

    }



    //line2

        const segmentLength = 10;
        const nbrOfPoints = 10;
        const pointsZ = [];
        for (let i = 0; i < nbrOfPoints; i++) {
            //pointsZ.push(i * segmentLength, 0, 0);
            pointsZ.push(-50, 0, 0);
            pointsZ.push(50, 0, 0);
            pointsZ.push(100, 0, 0);
            pointsZ.push(120, -20, 0);
            pointsZ.push(120, -50, 0);
        }
        //new experement block
//https://github.com/spite/THREE.MeshLine
//But do not worry, converting Geometry into BufferGeometry is that easy :
//var geo = new THREE.BufferGeometry().fromGeometry(new THREE.BoxGeometry(25, 25, 25))
//var bufferGeometry = new THREE.BufferGeometry().fromGeometry( geometry );

        //new experement block
        // Build the geometry
        const lineZ = new MeshLine();
       lineZ.setPoints(pointsZ);
        const geometryZ = lineZ.geometry;


        // const materialZ = new MeshLineMaterial({
        //   transparent: true,
        //   lineWidth: 4,
        //   color: new THREE.Color("red"),
        //   dashArray: 1,     // always has to be the double of the line
        //   dashOffset: 0,    // start the dash at zero
        //   dashRatio: 0.99,  // visible length range min: 0.99, max: 0.5
        // });

        const materialZ = new MeshLineMaterial({
                // transparent: true,
                lineWidth: 3,
                color: new THREE.Color("red"),
                // dashArray: 0.7,     // always has to be the double of the line
                // dashOffset: 0,    // start the dash at zero
                // dashRatio: 0.75,  // visible length range min: 0.99, max: 0.5
              });

        // Build the Mesh

        lineMeshZ = new THREE.Mesh(geometryZ, materialZ);
        lineMeshZ.position.x = 0;
        lineMeshZ.position.y = -50;
        //https://www.npmjs.com/package/three.meshline
        // ! Assuming you have your own webgl engine to add meshes on scene and update them.
        //scene.add(lineMeshZ);




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
