import React, { useRef,useEffect, useState,useCallback } from 'react';
import * as THREE from 'three';
import  Earthtexture from '../../3dmodels/earth_texture_two.png';
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
import StripesImage from '../../images/main/animationtwo/stripes.png';
import Lines3Image from '../../images/main/animationtwo/lines3.png';
import Lines4Image from '../../images/main/animationtwo/lines4.png';
import Lines5Image from '../../images/main/animationtwo/lines5.png';
import Lines6Image from '../../images/main/animationtwo/lines6.png';
import instagramImage from '../../images/main/animationtwo/instagram.png';
import facebookImage from '../../images/main/animationtwo/facebook.png';
import tiktokImage from '../../images/main/animationtwo/tiktok.png';
import twitterImage from '../../images/main/animationtwo/twitter.png';
import youtubeImage from '../../images/main/animationtwo/youtube.png';
import JoinImage from '../../images/main/animationtwo/join.png';
//import Lines7Image from '../images/main/animationtwo/lines7.png';
import Lines7Image from '../../images/main/animationtwo/lines7.png';
import Lines8Image from '../../images/main/animationtwo/lines8.png';
import TextWindow1 from '../../images/main/animationtwo/textWindow1.png';
import TextWindow2 from '../../images/main/animationtwo/textWindow2.png';
import TextWindow3 from '../../images/main/animationtwo/textWindow3.png';
import TextWindow4 from '../../images/main/animationtwo/textWindow4.png';
import TextWindow5 from '../../images/main/animationtwo/textWindow5.png';
import TextWindow6 from '../../images/main/animationtwo/textWindow6.png';
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

          //TextWindow1
          const TextWindow1_a = new THREE.MeshBasicMaterial({
              map:new THREE.TextureLoader().load(TextWindow1)
          });
          TextWindow1_a.map.needsUpdate = true; //ADDED
          var TextWindow1_mesh = new THREE.Mesh(new THREE.PlaneGeometry(1090, 269),TextWindow1_a);
          TextWindow1_mesh.overdraw = true;
          TextWindow1_mesh.geometry.center();
          // cloud_mesh.material.needsUpdate = true;
          TextWindow1_mesh.position.x = rightWindowPosition;
          TextWindow1_mesh.position.y = 0;
          TextWindow1_mesh.layers.set(1);
          TextWindow1_mesh.scale.set(0.2,0.2,0.2);
          scene2.add(TextWindow1_mesh);
          //TextWindow1
          //TextWindow2
          const TextWindow2_a = new THREE.MeshBasicMaterial({
              map:new THREE.TextureLoader().load(TextWindow2)
          });
          TextWindow2_a.map.needsUpdate = true; //ADDED
          var TextWindow2_mesh = new THREE.Mesh(new THREE.PlaneGeometry(1090, 326),TextWindow2_a);
          TextWindow2_mesh.overdraw = true;
          TextWindow2_mesh.geometry.center();
          // cloud_mesh.material.needsUpdate = true;
          TextWindow2_mesh.position.x = rightWindowPosition;
          TextWindow2_mesh.position.y = -235;
          TextWindow2_mesh.layers.set(1);
          TextWindow2_mesh.scale.set(0.2,0.2,0.2);
          scene2.add(TextWindow2_mesh);
          //TextWindow2
          //TextWindow3
          const TextWindow3_a = new THREE.MeshBasicMaterial({
              map:new THREE.TextureLoader().load(TextWindow3)
          });
          TextWindow3_a.map.needsUpdate = true; //ADDED
          var TextWindow3_mesh = new THREE.Mesh(new THREE.PlaneGeometry(1090, 388),TextWindow3_a);
          TextWindow3_mesh.overdraw = true;
          TextWindow3_mesh.geometry.center();
          // cloud_mesh.material.needsUpdate = true;
          TextWindow3_mesh.position.x = leftWindowPosition;
          TextWindow3_mesh.position.y = -315;
          TextWindow3_mesh.layers.set(1);
          TextWindow3_mesh.scale.set(0.2,0.2,0.2);
          scene2.add(TextWindow3_mesh);
          //TextWindow3
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
      		linewidth: 3, // in pixels
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
//xx
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
        scene.add( linessB[j] );

        geometryTorusB[j] = new THREE.TorusGeometry( 3, 0.7, 16, 100 );
        materialTorusB[j] = new THREE.MeshBasicMaterial( { color: LinesColor } );
        torusB[j] = new THREE.Mesh( geometryTorusB[j], materialTorusB[j] );
        torusB[j].position.x = FinalPositionsOfLinesB[j].x;
        torusB[j].position.y = FinalPositionsOfLinesB[j].y + 4;
        torusB[j].layers.set(2);
        if(props.page == 1){
          scene.add(torusB[j]);
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




        if(props.page == 2){
        //Lines3Image
          const Stripes_a = new THREE.MeshBasicMaterial({
              map:new THREE.TextureLoader().load(StripesImage)
          });
          Stripes_a.map.needsUpdate = true; //ADDED
          var Stripes_mesh = new THREE.Mesh(new THREE.PlaneGeometry(1110, 821),Stripes_a);
          Stripes_mesh.overdraw = true;
          Stripes_mesh.geometry.center();
          // cloud_mesh.material.needsUpdate = true;
          Stripes_mesh.position.x = 0;
          Stripes_mesh.position.y = -495;
          Stripes_mesh.scale.set(0.2,0.2,0.2);
          scene.add(Stripes_mesh);
          //Lines3Image
        }


//xx


        if(props.page == 2){
          //Lines3Image
          const Lines3_a = new THREE.MeshBasicMaterial({
              map:new THREE.TextureLoader().load(Lines3Image)
          });
          Lines3_a.map.needsUpdate = true; //ADDED
          var Lines3_a_mesh = new THREE.Mesh(new THREE.PlaneGeometry(968, 703),Lines3_a);
          Lines3_a_mesh.overdraw = true;
          Lines3_a_mesh.geometry.center();
          // cloud_mesh.material.needsUpdate = true;
          Lines3_a_mesh.position.x = 0;
          Lines3_a_mesh.position.y = -687;
          Lines3_a_mesh.scale.set(0.2,0.2,0.2);
          scene.add(Lines3_a_mesh);
          //Lines3Image
          //TextWindow4
          const TextWindow4_a = new THREE.MeshBasicMaterial({
              map:new THREE.TextureLoader().load(TextWindow4)
          });
          TextWindow4_a.map.needsUpdate = true; //ADDED
          var TextWindow4_mesh = new THREE.Mesh(new THREE.PlaneGeometry(1090, 193),TextWindow4_a);
          TextWindow4_mesh.overdraw = true;
          TextWindow4_mesh.geometry.center();
          // cloud_mesh.material.needsUpdate = true;
          TextWindow4_mesh.position.x = rightWindowPosition;
          TextWindow4_mesh.position.y = -605;
          TextWindow4_mesh.layers.set(0);
          TextWindow4_mesh.scale.set(0.2,0.2,0.2);
          scene.add(TextWindow4_mesh);
          //TextWindow4
        }



        if((props.page == 2) || (props.page == 3)){
          //TextWindow5
          const TextWindow5_a = new THREE.MeshBasicMaterial({
              map:new THREE.TextureLoader().load(TextWindow5)
          });
          TextWindow5_a.map.needsUpdate = true; //ADDED
          var TextWindow5_mesh = new THREE.Mesh(new THREE.PlaneGeometry(1090, 298),TextWindow5_a);
          TextWindow5_mesh.overdraw = true;
          TextWindow5_mesh.geometry.center();
          // cloud_mesh.material.needsUpdate = true;
          TextWindow5_mesh.position.x = leftWindowPosition;
          TextWindow5_mesh.position.y = -800;
          TextWindow5_mesh.layers.set(0);
          TextWindow5_mesh.scale.set(0.2,0.2,0.2);
          scene.add(TextWindow5_mesh);
          //TextWindow5
        }

        if(props.page == 3){
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
          Lines4_a_mesh.position.y = -874;
          Lines4_a_mesh.scale.set(0.22,0.22,0.22);
          scene.add(Lines4_a_mesh);
          //Lines4Image


                  const InstagramIcon_a = new THREE.MeshBasicMaterial({
                      map:new THREE.TextureLoader().load(instagramImage)
                  });
                  InstagramIcon_a.map.needsUpdate = true; //ADDED
                  var InstagramIcon_a_mesh = new THREE.Mesh(new THREE.PlaneGeometry(126, 126),InstagramIcon_a);
                  InstagramIcon_a_mesh.overdraw = true;
                  InstagramIcon_a_mesh.geometry.center();
                  // cloud_mesh.material.needsUpdate = true;
                  InstagramIcon_a_mesh.position.x = -78;
                  InstagramIcon_a_mesh.position.y = -897;
                  InstagramIcon_a_mesh.scale.set(0.22,0.22,0.22);
                  scene2.add(InstagramIcon_a_mesh);

                  InstagramIcon_a_mesh.on('click', function(ev) {

                    window.open(
                      'https://www.instagram.com/echohub.io/',
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
                  FacebookIcon_a_mesh.position.y = -897;
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
                  TiktokIcon_a_mesh.position.y = -887;
                  TiktokIcon_a_mesh.scale.set(0.22,0.22,0.22);
                  scene2.add(TiktokIcon_a_mesh);

                  TiktokIcon_a_mesh.on('click', function(ev) {

                    window.open(
                      'https://www.tiktok.com/',
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
                  Twitter_a_mesh.position.y = -897;
                  Twitter_a_mesh.scale.set(0.22,0.22,0.22);
                  scene2.add(Twitter_a_mesh);
                  Twitter_a_mesh.on('click', function(ev) {

                    window.open(
                      'https://twitter.com/',
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
                  youtube_a_mesh.position.y = -897;
                  youtube_a_mesh.scale.set(0.22,0.22,0.22);
                  scene2.add(youtube_a_mesh);

                  youtube_a_mesh.on('click', function(ev) {

                    window.open(
                      'https://www.youtube.com/channel/UC-tvKHO66_pcfeOrh1n2YQg',
                      '_blank' // <- This is what makes it open in a new window.
                    );

                  });

                  const JOIN_geom = new THREE.CircleGeometry( 18, 32 );
                  const materialJOIN = new THREE.MeshBasicMaterial( { opacity:0.1,transparent:true } );

                  const JOIN_a_mesh = new THREE.Mesh( JOIN_geom, materialJOIN );
                  // cloud_mesh.material.needsUpdate = true;
                  JOIN_a_mesh.position.x = 90;
                  JOIN_a_mesh.position.y = -1267;
                  JOIN_a_mesh.renderOrder = 1;
                  //JOIN_a_mesh.scale.set(4,4,4);
                  scene2.add(JOIN_a_mesh);

                  JOIN_a_mesh.on('click', function(ev) {

                    goToLogin();

                  });

                  //TextWindow6
                  const TextWindow6_a = new THREE.MeshBasicMaterial({
                      map:new THREE.TextureLoader().load(TextWindow6)
                  });
                  TextWindow6_a.map.needsUpdate = true; //ADDED
                  var TextWindow6_mesh = new THREE.Mesh(new THREE.PlaneGeometry(1185, 518),TextWindow6_a);
                  TextWindow6_mesh.overdraw = true;
                  TextWindow6_mesh.geometry.center();
                  // cloud_mesh.material.needsUpdate = true;
                  TextWindow6_mesh.position.x = rightWindowPosition;
                  TextWindow6_mesh.position.y = -970;
                  TextWindow6_mesh.layers.set(0);
                  TextWindow6_mesh.scale.set(0.2,0.2,0.2);
                  scene.add(TextWindow6_mesh);
                  //TextWindow6
                  //Lines5Image
                  const Lines5_a = new THREE.MeshBasicMaterial({
                      map:new THREE.TextureLoader().load(Lines5Image)
                  });
                  Lines5_a.map.needsUpdate = true; //ADDED
                  var Lines5_a_mesh = new THREE.Mesh(new THREE.PlaneGeometry(1020, 513),Lines5_a);
                  Lines5_a_mesh.overdraw = true;
                  Lines5_a_mesh.geometry.center();
                  // cloud_mesh.material.needsUpdate = true;
                  Lines5_a_mesh.position.x = 0;
                  Lines5_a_mesh.position.y = -1083;
                  Lines5_a_mesh.scale.set(0.2,0.2,0.2);
                  scene.add(Lines5_a_mesh);
                  //Lines5Image
                  //Lines6Image
                  const Lines6_a = new THREE.MeshBasicMaterial({
                      map:new THREE.TextureLoader().load(Lines6Image)
                  });
                  Lines6_a.map.needsUpdate = true; //ADDED
                  var Lines6_a_mesh = new THREE.Mesh(new THREE.PlaneGeometry(1147, 732),Lines6_a);
                  Lines6_a_mesh.overdraw = true;
                  Lines6_a_mesh.geometry.center();
                  // cloud_mesh.material.needsUpdate = true;
                  Lines6_a_mesh.position.x = 0;
                  Lines6_a_mesh.position.y = -1220;
                  Lines6_a_mesh.scale.set(0.2,0.2,0.2);
                  scene.add(Lines6_a_mesh);
                  //Lines6Image

                  //light for earth
                  var ambLight = new THREE.AmbientLight(0x333333);
                  scene2.add(ambLight);
                  const light = new THREE.DirectionalLight( 0xffffff, 2 );
                  light.position.set(-300,30,300);
                  scene2.add(light);
                  //for earth
                  var textureLoader = new THREE.TextureLoader();

                  const textureF = textureLoader.load(Earthtexture,
                      function ( texture ) {
                        textureF.flipY = false;
                        //Earthtexture
                //xx
                        var geometryEarth = new THREE.SphereGeometry(45, 32, 32);
                        var materialEarth = new THREE.MeshPhongMaterial( {
                            map: texture
                         });

                        //materialEarth.map.needsUpdate = true; //ADDED
                        earthmesh = new THREE.Mesh(geometryEarth, materialEarth);
                        earthmesh.position.x = 0;
                        earthmesh.position.y = -1088;
                        earthmesh.geometry.center();
                        earthmesh.rotation.z = 90;

                        scene2.add( earthmesh );

                        animate();
                        planetAnimation = 1;
                      }
                  );


        }




        if(props.page == 4){
          //Lines7Image
          const Lines7_a = new THREE.MeshBasicMaterial({
              map:new THREE.TextureLoader().load(Lines7Image)
          });
          Lines7_a.map.needsUpdate = true; //ADDED
          var Lines7_a_mesh = new THREE.Mesh(new THREE.PlaneGeometry(1243, 1211),Lines7_a);
          Lines7_a_mesh.overdraw = true;
          Lines7_a_mesh.geometry.center();
          // cloud_mesh.material.needsUpdate = true;
          Lines7_a_mesh.position.x = 0;
          Lines7_a_mesh.position.y = -1420;
          Lines7_a_mesh.scale.set(0.2,0.2,0.2);
          scene.add(Lines7_a_mesh);
          //Lines7Image
          //circle animation

          const geometryA = new THREE.CircleGeometry( 10, 32 );
          const materialA = new THREE.MeshBasicMaterial( { color: "#70dfbe" } );
          circleA = new THREE.Mesh( geometryA, materialA );
          circleA.position.x = 0;
          circleA.position.y = -1389;
          scene.add( circleA );

          //text

          const font = new THREE.FontLoader().parse(fontStylesD);

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



          //Lines8Image
          const Lines8_a = new THREE.MeshBasicMaterial({
              map:new THREE.TextureLoader().load(Lines8Image)
          });
          Lines8_a.map.needsUpdate = true; //ADDED
          var Lines8_a_mesh = new THREE.Mesh(new THREE.PlaneGeometry(1170, 510),Lines8_a);
          Lines8_a_mesh.overdraw = true;
          Lines8_a_mesh.geometry.center();
          // cloud_mesh.material.needsUpdate = true;
          Lines8_a_mesh.position.x = leftWindowPosition;
          Lines8_a_mesh.position.y = -1605;
          Lines8_a_mesh.scale.set(0.2,0.2,0.2);
          scene.add(Lines8_a_mesh);
          //Lines8Image

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

    if(props.page != 3){
      animate();
    }


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

  if(planetAnimation == 1){
    earthmesh.rotation.y += 0.02;
  }

  if(turnFourthAnimation == 1){
    t += NearestRandomPoints(0.02);
    t2 += NearestRandomPoints(0.022);
    t3 += NearestRandomPoints(0.015);;
    var yR = -1389;
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

  lineMeshZ.material.dashOffset -= 0.002;



  onWindowResize()
  //camera.position.set( 0, YPosition, 550 );
  //YPosition -= 1;
  //camera.position.set( 0, -480, 550 );

}

//



export default NewComponent;
