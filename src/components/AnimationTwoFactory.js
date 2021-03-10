import React, { useRef,useEffect, useState,useMemo } from 'react';
import * as THREE from 'three';

import Stats from '../../node_modules/three/examples/jsm/libs/stats.module.js';

import { GUI } from '../../node_modules/three/examples/jsm/libs/dat.gui.module.js';
import { OrbitControls } from '../../node_modules/three/examples/jsm/controls/OrbitControls.js';
import { Line2 } from '../../node_modules/three/examples/jsm/lines/Line2.js';
import { LineMaterial } from '../../node_modules/three/examples/jsm/lines/LineMaterial.js';
import { LineGeometry } from '../../node_modules/three/examples/jsm/lines/LineGeometry.js';
import { GeometryUtils } from '../../node_modules/three/examples/jsm/utils/GeometryUtils.js';
import Logo_Echohub_1_part from '../images/main/animationtwo/business.png';
import Person from '../images/main/animationtwo/person.png';
import fontStylesD from '../fonts/helvetiker_regular_typeface.json';

let line, renderer, scene, camera, controls;
var liness = [];
let line1;
let matLine, matLineBasic, matLineDashed;
let matLins = [];
let ematLineBasics = [];
let matLineDasheds = [];
let stats;
let gui;
const orbit_control = 0;
const ASPECT_RATIO = window.innerWidth / window.innerHeight;
const WhiteTextColor = "#ffffff";
const LinesColor = "rgb(3, 148, 252)";
// viewport
let insetWidth;
let insetHeight;

const NewComponent = () => {
  const mount = useRef(null)

  function init() {

		renderer = new THREE.WebGLRenderer( { antialias: true } );
		renderer.setPixelRatio( window.devicePixelRatio );
		renderer.setClearColor( 0x000000, 0.0 );
		renderer.setSize( window.innerWidth, window.innerHeight );


		scene = new THREE.Scene();

		camera = new THREE.PerspectiveCamera( 45,ASPECT_RATIO, 1, 1000);
		//camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 1000 );
		camera.position.set( 0, -150, 550 );
    //var viewPosition = {x:0,y:-150,z:550};//for mobiles


    if(orbit_control == 1){
      controls = new OrbitControls( camera, renderer.domElement );
  		controls.minDistance = 10;
  		controls.maxDistance = 550;
    }






    var businessPosition = {x:0,y:60};

    const ellipse = new THREE.MeshBasicMaterial({
        map:THREE.ImageUtils.loadTexture(Logo_Echohub_1_part, {}, function() {
        })
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

    //persons
    const downloadperson = new THREE.MeshBasicMaterial({
        map:THREE.ImageUtils.loadTexture(Person, {}, function() {
        })
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

        var objCoord = {
          x:Persons[i].position.x,
          y:Persons[i].position.y
        }
        personPositionsCoordinates.push(objCoord);

      scene.add(Persons[i]);
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

    for(var k = 0;k < 6;k++){
      const positions = [];
  		const colors = [];
        //line

        if(k == 2){
          splines[k] = new THREE.CatmullRomCurve3( [
            	new THREE.Vector3( businessPosition.x - objectMove[k].x, businessPosition.y - objectMove[k].y,  0 ),
            	new THREE.Vector3( personPositionsCoordinates[k].x + 12,personPositionsCoordinates[k].y + 30, 0 ),
            ] );
        }else if(k == 3){
          splines[k] = new THREE.CatmullRomCurve3( [
            	new THREE.Vector3( businessPosition.x - objectMove[k].x, businessPosition.y - objectMove[k].y,  0 ),
            	new THREE.Vector3( personPositionsCoordinates[k].x - 12,personPositionsCoordinates[k].y + 30, 0 ),
            ] );
        }else if(k > 3){
          splines[k] = new THREE.CatmullRomCurve3( [
            	new THREE.Vector3( businessPosition.x - objectMove[k].x, businessPosition.y - objectMove[k].y,  0 ),
            	new THREE.Vector3( businessPosition.x - objectMoveSecondLine[k].x - 7, businessPosition.y - objectMoveSecondLine[k].y,  0  ),
            	new THREE.Vector3( personPositionsCoordinates[k].x - 5,businessPosition.y - objectMoveSecondLine[k].y - 7, 0 ),
            	new THREE.Vector3( personPositionsCoordinates[k].x,personPositionsCoordinates[k].y + 30, 0 ),
            ] );
        }else{
          splines[k] = new THREE.CatmullRomCurve3( [
            	new THREE.Vector3( businessPosition.x - objectMove[k].x, businessPosition.y - objectMove[k].y,  0 ),
            	new THREE.Vector3( businessPosition.x - objectMoveSecondLine[k].x - 7, businessPosition.y - objectMoveSecondLine[k].y,  0  ),
            	new THREE.Vector3( personPositionsCoordinates[k].x + 5,businessPosition.y - objectMoveSecondLine[k].y - 7, 0 ),
            	new THREE.Vector3( personPositionsCoordinates[k].x,personPositionsCoordinates[k].y + 30, 0 ),

            ] );
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
      		//resolution:  // to be set by renderer, eventually
      		dashed: false

      	});

      	liness[k] = new Line2( geometryss[k], matLins[k] );
      	liness[k].computeLineDistances();
      	liness[k].scale.set( 1, 1, 1 );
      	scene.add( liness[k] );

    }

    //line2

    //circles


    var radius = 100,
    segments = 64,
    materialss = new THREE.LineBasicMaterial( { color: LinesColor } ),
    geometryss = new THREE.CircleGeometry( radius, segments );
    //scene.add( new THREE.LineLoop( geometryss, materialss ) );

    function drawCircle(radius, color, lineWidth){

        var points = [];

        // 360 full circle will be drawn clockwise
        for(let i = 0; i <= 360; i++){
            points.push(Math.sin(i*(Math.PI/180))*radius, Math.cos(i*(Math.PI/180))*radius, 0);
        }

        var geometry = new LineGeometry();
        geometry.setPositions( points );

        var material = new LineMaterial({
            color: color,
            linewidth: lineWidth
        });

        let line = new Line2( geometry, material );
        //line.computeLineDistances();

        scene.add( line );
    }

    drawCircle(10,LinesColor,5);
    //circles

		//

		window.addEventListener( 'resize', onWindowResize );
		onWindowResize();

		stats = new Stats();
		//mount.current.appendChild( stats.dom );


	}


  useEffect(() => {

    init();
		animate();
    //document.body.appendChild( renderer.domElement );
    mount.current.appendChild(renderer.domElement)

    return () => {

      mount.current.removeChild(renderer.domElement)

    }


  }, [])


  return <div className="vis" ref={mount}/>;
}





function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

	insetWidth = window.innerHeight / 4; // square
	insetHeight = window.innerHeight / 4;


}

function animate() {

	requestAnimationFrame( animate );

	stats.update();

	// main scene

	renderer.setClearColor( 0x000000, 0 );

	renderer.setViewport( 0, 0, window.innerWidth, window.innerHeight );

	// renderer will set this eventually
  matLins.map((item) => {
    item.resolution.set( window.innerWidth, window.innerHeight ); // resolution of the viewport
  })


	renderer.render( scene, camera );

	// inset scene

	renderer.setClearColor( 0x222222, 1 );

	renderer.clearDepth(); // important!

	renderer.setScissorTest( true );

	renderer.setScissor( 20, 20, insetWidth, insetHeight );

	renderer.setViewport( 20, 20, insetWidth, insetHeight );



	// renderer will set this eventually
  matLins.map((item) => {
    item.resolution.set( insetWidth, insetHeight ); // resolution of the inset viewport
  })




	renderer.setScissorTest( false );

}

//



export default NewComponent;
