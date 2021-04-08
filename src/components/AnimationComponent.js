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
     var businessPosition = {y:60};
     const ellipse = new THREE.Line( geometryEl, materialEl );
     ellipse.position.y = businessPosition.y;
     businessPosition.x = ellipse.position.x;
     ellipse.rotation.x = 0.4;

     scene.add(ellipse);
    //ellipse
    //text
    const font = new THREE.FontLoader().parse(fontStylesD);

    // configure font geometry
    const textOptions = {
      font,
      size: 7, // font size
      height: 4, // how much extrusion (how thick / deep are the letters)

    };

    var textGeometry = new THREE.TextGeometry( "Business", textOptions);

    var textMaterial = new THREE.MeshBasicMaterial(
      { color: TextColor }
    );

    var Textmesh = new THREE.Mesh( textGeometry, textMaterial );
    Textmesh.geometry.center();
    ellipse.add(Textmesh);
    //business side text

    //persons

    var startPosition = -38;
    var stepper = 25;
    var personsYposition = -50;
    var currentCoordinates = [];


    const Persongeometry = new THREE.CircleGeometry( 10, 32 );
    const Personmaterial = new THREE.MeshBasicMaterial( { color: PersonCircleColor } );
    const Personcircle = new THREE.Mesh( Persongeometry, Personmaterial );
    Personcircle.position.x = startPosition - stepper;
    Personcircle.position.y = personsYposition;
    scene.add( Personcircle );
    currentCoordinates.push({x:startPosition - stepper,y:personsYposition})

    //text
    const PersontextOptions = {
      font,
      size: 4, // font size
      height: 1, // how much extrusion (how thick / deep are the letters)
    };

    var PersontextGeometry = new THREE.TextGeometry( "Creator", PersontextOptions);

    var PersontextMaterial = new THREE.MeshBasicMaterial(
      { color: PersonTextColor }
    );

    var PersonTextmesh = new THREE.Mesh( PersontextGeometry, PersontextMaterial );
    PersonTextmesh.geometry.center();
    PersonTextmesh.rotation.x = -0.2;
    PersonTextmesh.position.x = 0.3;
    Personcircle.add(PersonTextmesh);
    //text
    var Persons = [];

    for(var i = 0;i < 5;i++){
      Persons[i] = Personcircle.clone();
      Persons[i].position.x = startPosition;
      currentCoordinates.push({x:startPosition,y:personsYposition})
      startPosition += stepper;
      scene.add(Persons[i]);

    }

  //  console.log(currentCoordinates); //current Persons coordinates
    //console.log(businessPosition);
    //persons




        var LineCurveCoordinates = [];
        var LineCurveCoordinatesGeometries = [];
        var LineCurveCoordinatesCurveLineObject = [];
        var LineCurveCoordinatesCurveLineObjectOriginal = [];
        var pointsArrayCurveLine = [];
        var materialMeshLineArray = [];

        var newXArrays = [];

        var newXposition = businessPosition.x - 18;
        var newYposition = businessPosition.y - 10;

        const baseLineMesh = new MeshLineMaterial({
                // transparent: true,
                lineWidth: 0.7,
                color: new THREE.Color(AnimationLineColorOriginal),
                // dashArray: 0.7,     // always has to be the double of the line
                // dashOffset: 0,    // start the dash at zero
                // dashRatio: 0.75,  // visible length range min: 0.99, max: 0.5
              });

        for(var j = 0;j < 6;j++){

          var downLinePosition = currentCoordinates[j].x;
          if(j < 2){
            downLinePosition = downLinePosition + 2;
          }else if(j > 4){
            downLinePosition = downLinePosition - 2;
          }

          if(j < 3){
            newYposition = newYposition - 1;
          }else if(j > 3){
            newYposition = newYposition + 1;
          }


          var pointsMeshLine = [];
          pointsMeshLine.push( new THREE.Vector3(newXposition, newYposition, 0 ) );
          pointsMeshLine.push( new THREE.Vector3( downLinePosition, currentCoordinates[j].y + 11, 0 ) );
          LineCurveCoordinates[j] = pointsMeshLine;



          newXArrays.push({x:newXposition,y:newYposition})
          newXposition += 7;


          LineCurveCoordinatesGeometries[j] = new MeshLine();
          LineCurveCoordinatesGeometries[j].setPoints(LineCurveCoordinates[j]);

          materialMeshLineArray[j] = new MeshLineMaterial({
                  transparent: true,
                  lineWidth: 3,
                  color: new THREE.Color(AnimationLineColor),
                  dashArray: 1,     // always has to be the double of the line
                  dashOffset: 0,    // start the dash at zero
                  dashRatio: 0.99,  // visible length range min: 0.99, max: 0.5
                  //dashRatio: 0.75,  // visible length range min: 0.99, max: 0.5
                });

          LineCurveCoordinatesCurveLineObjectOriginal[j] = new THREE.Mesh( LineCurveCoordinatesGeometries[j],baseLineMesh);
          //LineCurveCoordinatesCurveLineObjectOriginal[j].renderOrder = 2;
          scene.add( LineCurveCoordinatesCurveLineObjectOriginal[j] );
          LineCurveCoordinatesCurveLineObject[j] = new THREE.Mesh( LineCurveCoordinatesGeometries[j], materialMeshLineArray[j]);
          //LineCurveCoordinatesCurveLineObject[j].renderOrder = 1;
          scene.add( LineCurveCoordinatesCurveLineObject[j]);


        }


        //social network
        var copyCoordinatesforVideoLines = [];//copyes for videoLines

        var videoIconsCoordinates = currentCoordinates;
        var YvideoIconPosition = -122;
        copyCoordinatesforVideoLines.push({x:currentCoordinates[0].x,y:YvideoIconPosition});
//xx
        //sentral
        // const Socialgeometry = new THREE.CircleGeometry( 10, 32 );
        // const Socialmaterial = new THREE.MeshBasicMaterial( { color: PersonCircleColor } );
        // const SocialcircleObject = new THREE.Mesh( Socialgeometry, Socialmaterial );
        // SocialcircleObject.position.x = videoIconsCoordinates[0].x;
        // SocialcircleObject.position.y = YvideoIconPosition;
        //video icon

        const VideoImg = new THREE.MeshBasicMaterial({
            map:new THREE.TextureLoader().load(VideocamIcon)
        });
        VideoImg.map.needsUpdate = true; //ADDED
        var SocialcircleObject = new THREE.Mesh(new THREE.PlaneGeometry(21, 21),VideoImg);
        SocialcircleObject.overdraw = true;
        SocialcircleObject.material.needsUpdate = true;
        SocialcircleObject.position.x = videoIconsCoordinates[0].x;
        SocialcircleObject.position.y = YvideoIconPosition;

        //video icon

        // const Socialgeometry = new THREE.CircleGeometry( 10, 32 );
        // const Socialmaterial = new THREE.MeshBasicMaterial( { color: PersonCircleColor } );
        // const SocialcircleObject = new THREE.Mesh( Socialgeometry, Socialmaterial );
        // SocialcircleObject.position.x = videoIconsCoordinates[0].x;
        // SocialcircleObject.position.y = YvideoIconPosition;
        scene.add( SocialcircleObject );

        const SocialPersontextOptions = {
          font,
          size: 4, // font size
          height: 1, // how much extrusion (how thick / deep are the letters)
        };

        var SocialPersontextGeometry = new THREE.TextGeometry( "Video", SocialPersontextOptions);

        var SocialPersontextMaterial = new THREE.MeshBasicMaterial(
          { color: PersonTextColor }
        );

        var SocialPersonTextmesh = new THREE.Mesh( SocialPersontextGeometry, SocialPersontextMaterial );
        SocialPersonTextmesh.geometry.center();

        var SocialcircleObjectCopies = [];

        for(var i = 1;i < videoIconsCoordinates.length;i++){
            SocialcircleObjectCopies[i] = SocialcircleObject.clone();;
            SocialcircleObjectCopies[i].position.x = videoIconsCoordinates[i].x;
            SocialcircleObjectCopies[i].position.y = YvideoIconPosition;
            scene.add(SocialcircleObjectCopies[i]);
            copyCoordinatesforVideoLines.push({x:videoIconsCoordinates[i].x,y:YvideoIconPosition});
        }

        //video CirclesAnimation for video icons
        var VideoLineCoordinates = [];
        var VideoLineCoordinatesGeometries = [];
        var VideoLineCoordinatesObjectOriginal = [];
        var VideomaterialMeshLineArray = [];
        var VideoLineCoordinatesObjectAnimated = [];

        for(var i = 0;i < currentCoordinates.length;i++){
          var upLinePositionX = currentCoordinates[i].x;

          var pointsMeshLine = [];
          pointsMeshLine.push( new THREE.Vector3(upLinePositionX, currentCoordinates[i].y - 11, 0 ) );
          pointsMeshLine.push( new THREE.Vector3( copyCoordinatesforVideoLines[i].x, copyCoordinatesforVideoLines[i].y + 11, 0 ) );
          //SocialcircleObjectCopies
          VideoLineCoordinates[i] = pointsMeshLine;
          VideoLineCoordinatesGeometries[i] = new MeshLine();
          VideoLineCoordinatesGeometries[i].setPoints(VideoLineCoordinates[i]);

          VideomaterialMeshLineArray[i] = new MeshLineMaterial({
                  transparent: true,
                  lineWidth: 3,
                  color: new THREE.Color(AnimationLineColor),
                  dashArray: 1,     // always has to be the double of the line
                  dashOffset: 0,    // start the dash at zero
                  dashRatio: 0.99,  // visible length range min: 0.99, max: 0.5
                  //dashRatio: 0.75,  // visible length range min: 0.99, max: 0.5
                });

          VideoLineCoordinatesObjectOriginal[i] = new THREE.Mesh( VideoLineCoordinatesGeometries[i],baseLineMesh);
          VideoLineCoordinatesObjectAnimated[i] = new THREE.Mesh( VideoLineCoordinatesGeometries[i],VideomaterialMeshLineArray[i]);
          //LineCurveCoordinatesCurveLineObjectOriginal[j].renderOrder = 2;
          scene.add( VideoLineCoordinatesObjectOriginal[i] );
          scene.add( VideoLineCoordinatesObjectAnimated[i] );

        }
        //video CirclesAnimation

        //sentral
        const SocialIconsPositions = [];//social network coordinates

        var startX = -70;
        var startY = -200;
        for(var i = 0;i < 4;i++){
          var object = {
            x:startX,
            y:startY
          }
          SocialIconsPositions.push(object);
          startX += 45;
        }

        //instagram image


        const img = new THREE.MeshBasicMaterial({
            map:new THREE.TextureLoader().load(instagramIcon)
        });
        img.map.needsUpdate = true; //ADDED
        var image_mesh = new THREE.Mesh(new THREE.PlaneGeometry(20, 20),img);
        image_mesh.overdraw = true;
        image_mesh.material.needsUpdate = true;
        image_mesh.position.x = SocialIconsPositions[0].x;
        image_mesh.position.y = SocialIconsPositions[0].y;
        scene.add(image_mesh);
        //instagram image

        //youtube

        const imgYoutube = new THREE.MeshBasicMaterial({
            map:new THREE.TextureLoader().load(YoutubeIcon)
        });
        imgYoutube.map.needsUpdate = true; //ADDED
        var Youtube_image_mesh = new THREE.Mesh(new THREE.PlaneGeometry(20, 20),imgYoutube);
        Youtube_image_mesh.overdraw = true;
        Youtube_image_mesh.material.needsUpdate = true;
        Youtube_image_mesh.position.x = SocialIconsPositions[1].x;;
        Youtube_image_mesh.position.y = SocialIconsPositions[1].y;;
        scene.add(Youtube_image_mesh);
        //youtube

        //facebook

        const imgFacebook = new THREE.MeshBasicMaterial({
            map:new THREE.TextureLoader().load(FacebookIcon)
        });
        imgFacebook.map.needsUpdate = true; //ADDED
        var Facebook_image_mesh = new THREE.Mesh(new THREE.PlaneGeometry(14, 14),imgFacebook);
        Facebook_image_mesh.overdraw = true;
        Facebook_image_mesh.material.needsUpdate = true;
        Facebook_image_mesh.position.x = SocialIconsPositions[2].x;
        Facebook_image_mesh.position.y = SocialIconsPositions[2].y;
        scene.add(Facebook_image_mesh);
        //facebook

        //tiktok
        const imgTiktok = new THREE.MeshBasicMaterial({
            map:new THREE.TextureLoader().load(TiktokIcon)
        });
        imgTiktok.map.needsUpdate = true; //ADDED
        var Tiktok_image_mesh = new THREE.Mesh(new THREE.PlaneGeometry(20, 20),imgTiktok);
        Tiktok_image_mesh.overdraw = true;
        Tiktok_image_mesh.material.needsUpdate = true;
        Tiktok_image_mesh.position.x = SocialIconsPositions[3].x;
        Tiktok_image_mesh.position.y = SocialIconsPositions[3].y;
        scene.add(Tiktok_image_mesh);
        //tiktok

        var PeoplePosition = {x:0,y:-300};

        //Peoples
        
        const roundPeoples = new THREE.MeshBasicMaterial({
            map:new THREE.TextureLoader().load(Peoples)
        });
        roundPeoples.map.needsUpdate = true; //ADDED
        var roundPeoples_image_mesh = new THREE.Mesh(new THREE.PlaneGeometry(100, 100),roundPeoples);
        roundPeoples_image_mesh.overdraw = true;
        roundPeoples_image_mesh.material.needsUpdate = true;
        roundPeoples_image_mesh.position.x = PeoplePosition.x;
        roundPeoples_image_mesh.position.y = PeoplePosition.y;
        roundPeoples_image_mesh.geometry.center();
        scene.add(roundPeoples_image_mesh);
        //Peoples
        //load 3d earth
        //
        var textureLoaderF = new THREE.TextureLoader();
        var textureF = textureLoaderF.load('https://echohub.io/videos/earth_texture_two.png');
        textureF.flipY = false;
        //Earthtexture
//xx
        var geometryEarth = new THREE.SphereGeometry(30, 32, 32);
        var materialEarth = new THREE.MeshPhongMaterial();
        materialEarth.map = textureF;
        var earthmesh = new THREE.Mesh(geometryEarth, materialEarth);
        earthmesh.position.x = PeoplePosition.x;
        earthmesh.position.y = PeoplePosition.y;
        earthmesh.geometry.center();
        scene.add( earthmesh );

        //Social Icons Animation Line

        var SocialAnimLineCoordinates = [];
        var SocialAnimLineCoordinatesGeometries = [];
        var SocialAnimLineCoordinatesObjectOriginal = [];
        var SocialAnimmaterialMeshLineArray = [];
        var SocialAnimLineCoordinatesObjectAnimated = [];
        var GlobalSocialAnimLineCoordinatesObjectAnimated = [];


        for(var b = 0;b < copyCoordinatesforVideoLines.length;b++){

          var CollectedAnimArray = [];

          for(var i = 0;i < SocialIconsPositions.length;i++){

              var upLinePositionX = copyCoordinatesforVideoLines[b].x;
              var upLinePositionY = copyCoordinatesforVideoLines[b].y;

              var pointsMeshLine = [];
              pointsMeshLine.push( new THREE.Vector3(upLinePositionX, upLinePositionY - 11, 0 ) );
              pointsMeshLine.push( new THREE.Vector3( SocialIconsPositions[i].x, SocialIconsPositions[i].y + 11, 0 ) );
              //SocialcircleObjectCopies
              SocialAnimLineCoordinates[i] = pointsMeshLine;
              SocialAnimLineCoordinatesGeometries[i] = new MeshLine();
              SocialAnimLineCoordinatesGeometries[i].setPoints(SocialAnimLineCoordinates[i]);

              SocialAnimmaterialMeshLineArray[i] = new MeshLineMaterial({
                      transparent: true,
                      lineWidth: 3,
                      color: new THREE.Color(AnimationLineColor),
                      dashArray: 1,     // always has to be the double of the line
                      dashOffset: 0,    // start the dash at zero
                      dashRatio: 0.99,  // visible length range min: 0.99, max: 0.5
                      //dashRatio: 0.75,  // visible length range min: 0.99, max: 0.5
                    });

              SocialAnimLineCoordinatesObjectOriginal[i] = new THREE.Mesh( SocialAnimLineCoordinatesGeometries[i],baseLineMesh);
              SocialAnimLineCoordinatesObjectAnimated[i] = new THREE.Mesh( SocialAnimLineCoordinatesGeometries[i],SocialAnimmaterialMeshLineArray[i]);
              CollectedAnimArray.push(SocialAnimLineCoordinatesObjectAnimated[i]);
              scene.add( SocialAnimLineCoordinatesObjectOriginal[i] );
              scene.add( SocialAnimLineCoordinatesObjectAnimated[i] );

          }
          GlobalSocialAnimLineCoordinatesObjectAnimated[b] = CollectedAnimArray;
        }

        //Social Icons Animation Line

        //people world position
        var PPeopleLineCoordinates = [];
        var PPeopleLineCoordinatesGeometries = [];
        var PPeopleLineCoordinatesGeometries = [];
        var PPeopleLineCoordinatesObjectOriginal = [];
        var PPeopleLineCoordinatesObjectAnimated = [];
        var PPeopleAnimmaterialMeshLineArray = [];
        //people world position


        for(var j = 0;j < SocialIconsPositions.length;j++){

            PPeopleAnimmaterialMeshLineArray[j] = new MeshLineMaterial({
                    transparent: true,
                    lineWidth: 3,
                    color: new THREE.Color(AnimationLineColor),
                    dashArray: 1,     // always has to be the double of the line
                    dashOffset: 0,    // start the dash at zero
                    dashRatio: 0.99,  // visible length range min: 0.99, max: 0.5
                    //dashRatio: 0.75,  // visible length range min: 0.99, max: 0.5
                  });



            var correctXposition;
            var correctYposition;
            if(j == 0){
              console.log(j);
              correctXposition = PeoplePosition.x - 10;
              correctYposition = PeoplePosition.y + 40;
              console.log(correctYposition);
            }else if(j == 1){
              correctXposition = PeoplePosition.x;
              correctYposition = PeoplePosition.y - 50;
            }else if(j == 2){
              correctXposition = PeoplePosition.x;
              correctYposition = PeoplePosition.y - 50;
            }else if(j == 3){
              correctXposition = PeoplePosition.x + 8;
              correctYposition = PeoplePosition.y + 40;
            }

            //add Animation from social to world
            //PeoplePosition
            var PPeoplepointsMeshLine = [];
            PPeoplepointsMeshLine.push( new THREE.Vector3(SocialIconsPositions[j].x, SocialIconsPositions[j].y - 11, 0 ) );
            PPeoplepointsMeshLine.push( new THREE.Vector3( correctXposition, correctYposition, 0 ) );

            PPeopleLineCoordinates[j] = PPeoplepointsMeshLine;
            PPeopleLineCoordinatesGeometries[j] = new MeshLine();
            PPeopleLineCoordinatesGeometries[j].setPoints(PPeopleLineCoordinates[j]);
            PPeopleLineCoordinatesObjectOriginal[j] = new THREE.Mesh( PPeopleLineCoordinatesGeometries[j],baseLineMesh);
            PPeopleLineCoordinatesObjectAnimated[j] = new THREE.Mesh( PPeopleLineCoordinatesGeometries[j],PPeopleAnimmaterialMeshLineArray[j]);
            scene.add( PPeopleLineCoordinatesObjectOriginal[j] );
            scene.add( PPeopleLineCoordinatesObjectAnimated[j] );
            //add Animation from social to world

        }

        //world coordinates
        const turbulence = 0.5;

        const NearestRandomPoints = (mainpoint) => {
          var randomValue = mainpoint + (Math.random() * (turbulence * 2)) - turbulence;
          return randomValue;
        }

        var WorldColors = []
        var WorldOutCoordinates = [];
        var WorldOutCoordinatesTwo = [];
        var WorldLineCoordinatesGeometries = [];
        var WorldLineCoordinatesGeometriesTwo = [];
        var WorldGeneratedlinePoints = [];
        var WorldLineCoordinatesObjectOriginal = [];
        var WorldLineCoordinatesObjectOriginalTwo = [];
        var WorldLineCoordinatesObjectOriginalAnime = [];
        var WorldLineCoordinatesObjectOriginalAnimeTwo = [];



        for(var k = 0;k < 4;k++){

          WorldColors[k] = new MeshLineMaterial({
            transparent: true,
            lineWidth: 3,
            color: new THREE.Color(AnimationLineColor),
            dashArray: 1,     // always has to be the double of the line
            dashOffset: 0,    // start the dash at zero
            dashRatio: 0.99,  // visible length range min: 0.99, max: 0.5
            //dashRatio: 0.75,  // visible length range min: 0.99, max: 0.5
                });



          var worldInsideCoordinates = [];
          var worldInsideCoordinatestwo = [];

          worldInsideCoordinates.push( new THREE.Vector3(PeoplePosition.x, PeoplePosition.y, 0 ) );
          worldInsideCoordinates.push( new THREE.Vector3(NearestRandomPoints(-120), NearestRandomPoints(businessPosition.y + PeoplePosition.y) , 0 ) );
          worldInsideCoordinates.push( new THREE.Vector3(NearestRandomPoints(-120), NearestRandomPoints((businessPosition.y + PeoplePosition.y) / 4) , 0 ) );
          worldInsideCoordinates.push( new THREE.Vector3(businessPosition.x - 30, businessPosition.y, 0 ) );

          WorldOutCoordinates[k] = worldInsideCoordinates;

          worldInsideCoordinatestwo.push( new THREE.Vector3(PeoplePosition.x, PeoplePosition.y, 0 ) );
          worldInsideCoordinatestwo.push( new THREE.Vector3(NearestRandomPoints(+120), NearestRandomPoints(businessPosition.y + PeoplePosition.y) , 0 ) );
          worldInsideCoordinatestwo.push( new THREE.Vector3(NearestRandomPoints(+120), NearestRandomPoints((businessPosition.y + PeoplePosition.y) / 4) , 0 ) );
          worldInsideCoordinatestwo.push( new THREE.Vector3(businessPosition.x + 30, businessPosition.y, 0 ) );

          WorldOutCoordinatesTwo[k] = worldInsideCoordinatestwo;


          WorldLineCoordinatesGeometries[k] = new MeshLine();
          WorldLineCoordinatesGeometries[k].setPoints(WorldOutCoordinates[k]);
          WorldLineCoordinatesGeometriesTwo[k] = new MeshLine();
          WorldLineCoordinatesGeometriesTwo[k].setPoints(WorldOutCoordinatesTwo[k]);


           WorldLineCoordinatesObjectOriginal[k] = new THREE.Mesh(WorldLineCoordinatesGeometries[k], baseLineMesh);
           WorldLineCoordinatesObjectOriginalAnime[k] = new THREE.Mesh(WorldLineCoordinatesGeometries[k], WorldColors[k]);

           WorldLineCoordinatesObjectOriginalTwo[k] = new THREE.Mesh(WorldLineCoordinatesGeometriesTwo[k], baseLineMesh);
           WorldLineCoordinatesObjectOriginalAnimeTwo[k] = new THREE.Mesh(WorldLineCoordinatesGeometriesTwo[k], WorldColors[k]);


          //scene.add( WorldLineCoordinatesObjectOriginal[1] );
          scene.add( WorldLineCoordinatesObjectOriginal[k] );
          scene.add( WorldLineCoordinatesObjectOriginalAnime[k] );
          scene.add( WorldLineCoordinatesObjectOriginalTwo[k] );
          scene.add( WorldLineCoordinatesObjectOriginalAnimeTwo[k] );
        }







    //text


//xx
    //var iterator = 0;
    function animate() {
        renderer.render(scene, camera)
        requestAnimationFrame(animate);

        // Check if the dash is out to stop animate it.
        // if (LineCurveCoordinatesCurveLineObject[0].material.uniforms.dashOffset.value < -2){
        //   return false;
        // }
        // Decrement the dashOffset value to animate the path with the dash.
        //LineCurveCoordinatesCurveLineObject[0].material.uniforms.dashOffset.value -= 0.01;
        if(enableAnimation == 1){


        LineCurveCoordinatesCurveLineObject[0].material.dashOffset -= LineSpeed;
        LineCurveCoordinatesCurveLineObject[1].material.dashOffset -= LineSpeed;
        LineCurveCoordinatesCurveLineObject[2].material.dashOffset -= LineSpeed;
        LineCurveCoordinatesCurveLineObject[3].material.dashOffset -= LineSpeed;
        LineCurveCoordinatesCurveLineObject[4].material.dashOffset -= LineSpeed;
        LineCurveCoordinatesCurveLineObject[5].material.dashOffset -= LineSpeed;

        if(LineCurveCoordinatesCurveLineObject[5].material.dashOffset.toFixed(2) < -0.6){
          enableAnimation = 0;
          setManageStep(2);






        }

        // viewPositionAnimation.y -= 0.04;
        // SetCamera();
        //
        // if(viewPositionAnimation.y < -80){
        //   viewPositionAnimation.y = 0;
        // }
        }
//xx
        if(enableAnimationVideo == 1){
          VideoLineCoordinatesObjectAnimated[VideoLineCoordinatesObjectAnimatedSpepper].material.dashOffset -= LineSpeed;
          if(VideoLineCoordinatesObjectAnimated[VideoLineCoordinatesObjectAnimatedSpepper].material.dashOffset.toFixed(2) < -0.6){
            enableAnimationVideo = 0;
            VideoLineCoordinatesObjectAnimated[VideoLineCoordinatesObjectAnimatedSpepper].material.dashOffset = 0;
            setManageStep(3);

            if(VideoLineCoordinatesObjectAnimatedSpepper == 5){
              VideoLineCoordinatesObjectAnimatedSpepper = 0;
            }else{
              VideoLineCoordinatesObjectAnimatedSpepper++;
            }

          }
        }

        if(SocialAnimLineEnable == 1){
          GlobalSocialAnimLineCoordinatesObjectAnimated[SocialAnimLineCoordinatesObjectAnimatedStepper][0].material.dashOffset -= LineSpeed;
          GlobalSocialAnimLineCoordinatesObjectAnimated[SocialAnimLineCoordinatesObjectAnimatedStepper][1].material.dashOffset -= LineSpeed;
          GlobalSocialAnimLineCoordinatesObjectAnimated[SocialAnimLineCoordinatesObjectAnimatedStepper][2].material.dashOffset -= LineSpeed;
          GlobalSocialAnimLineCoordinatesObjectAnimated[SocialAnimLineCoordinatesObjectAnimatedStepper][3].material.dashOffset -= LineSpeed;
          if(GlobalSocialAnimLineCoordinatesObjectAnimated[SocialAnimLineCoordinatesObjectAnimatedStepper][0].material.dashOffset.toFixed(2) < -0.6){

              SocialAnimLineEnable = 0;
              setManageStep(4);
              GlobalSocialAnimLineCoordinatesObjectAnimated[SocialAnimLineCoordinatesObjectAnimatedStepper][0].material.dashOffset = 0;
              GlobalSocialAnimLineCoordinatesObjectAnimated[SocialAnimLineCoordinatesObjectAnimatedStepper][1].material.dashOffset = 0;
              GlobalSocialAnimLineCoordinatesObjectAnimated[SocialAnimLineCoordinatesObjectAnimatedStepper][2].material.dashOffset = 0;
              GlobalSocialAnimLineCoordinatesObjectAnimated[SocialAnimLineCoordinatesObjectAnimatedStepper][3].material.dashOffset = 0;

              if(SocialAnimLineCoordinatesObjectAnimatedStepper == 5){
                SocialAnimLineCoordinatesObjectAnimatedStepper = 0;
              }else{
                SocialAnimLineCoordinatesObjectAnimatedStepper++;
              }

          }
        }

        if(SocialWorldLineEnable == 1){
          PPeopleLineCoordinatesObjectAnimated[0].material.dashOffset -= LineSpeed;
          PPeopleLineCoordinatesObjectAnimated[1].material.dashOffset -= LineSpeed;
          PPeopleLineCoordinatesObjectAnimated[2].material.dashOffset -= LineSpeed;
          PPeopleLineCoordinatesObjectAnimated[3].material.dashOffset -= LineSpeed;

          if(PPeopleLineCoordinatesObjectAnimated[SocialWorldLineEnableStepper].material.dashOffset.toFixed(2) < -0.6){

              SocialWorldLineEnable = 0;

              PPeopleLineCoordinatesObjectAnimated[0].material.dashOffset = 0;
              PPeopleLineCoordinatesObjectAnimated[1].material.dashOffset = 0;
              PPeopleLineCoordinatesObjectAnimated[2].material.dashOffset = 0;
              PPeopleLineCoordinatesObjectAnimated[3].material.dashOffset = 0;

              // earthmesh.rotation.y = 0;
              // roundPeoples_image_mesh.rotation.z -= 0.01;

              setManageStep(5);

          }
        }



        if(WorldEnable == 1){
          WorldLineCoordinatesObjectOriginalAnime[0].material.dashOffset -= 0.005;
           WorldLineCoordinatesObjectOriginalAnime[1].material.dashOffset -= 0.004;
           WorldLineCoordinatesObjectOriginalAnime[2].material.dashOffset -= 0.0045;
           WorldLineCoordinatesObjectOriginalAnime[3].material.dashOffset -= 0.006;

          WorldLineCoordinatesObjectOriginalAnimeTwo[0].material.dashOffset -=  0.005;
           WorldLineCoordinatesObjectOriginalAnimeTwo[1].material.dashOffset -=  0.004;
           WorldLineCoordinatesObjectOriginalAnimeTwo[2].material.dashOffset -= 0.0045;
           WorldLineCoordinatesObjectOriginalAnimeTwo[3].material.dashOffset -=  0.006;

           earthmesh.rotation.y += 0.05;
           roundPeoples_image_mesh.rotation.z -= 0.01;

           if(WorldLineCoordinatesObjectOriginalAnime[0].material.dashOffset.toFixed(2) < -0.6){

              WorldLineCoordinatesObjectOriginalAnime[0].material.dashOffset = 0;
              WorldLineCoordinatesObjectOriginalAnime[1].material.dashOffset = 0;
              WorldLineCoordinatesObjectOriginalAnime[2].material.dashOffset = 0;
              WorldLineCoordinatesObjectOriginalAnime[3].material.dashOffset = 0;

             WorldLineCoordinatesObjectOriginalAnimeTwo[0].material.dashOffset = 0;
              WorldLineCoordinatesObjectOriginalAnimeTwo[1].material.dashOffset = 0;
              WorldLineCoordinatesObjectOriginalAnimeTwo[2].material.dashOffset = 0;
              WorldLineCoordinatesObjectOriginalAnimeTwo[3].material.dashOffset = 0;

             runAgain();
           }
        }



          //console.log(positions);


      }
      animate();



      function getRandomFloat() {
        return (Math.random() * (0.001 - 0.006) + 0.006).toFixed(4)
      }

      const runAgain = () => {
        setTimeout(function(){
          WorldEnable = 0;
          WorldLineCoordinatesObjectOriginalAnime[0].material.dashOffset = 0;
          WorldLineCoordinatesObjectOriginalAnime[1].material.dashOffset = 0;
          WorldLineCoordinatesObjectOriginalAnime[2].material.dashOffset = 0;
          WorldLineCoordinatesObjectOriginalAnime[3].material.dashOffset = 0;

         WorldLineCoordinatesObjectOriginalAnimeTwo[0].material.dashOffset = 0;
          WorldLineCoordinatesObjectOriginalAnimeTwo[1].material.dashOffset = 0;
          WorldLineCoordinatesObjectOriginalAnimeTwo[2].material.dashOffset = 0;
          WorldLineCoordinatesObjectOriginalAnimeTwo[3].material.dashOffset = 0;
          setManageStep(2);
        },5000);
      }





  }

  const StartApp = () => {
    setTimeout(function(){
      setManageStep(1);
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
