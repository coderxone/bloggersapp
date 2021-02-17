import React, { useRef,useEffect, useState,useLayoutEffect } from 'react';
import { Canvas, useFrame } from 'react-three-fiber';
import * as THREE from "three";
import { MeshLine, MeshLineMaterial, MeshLineRaycast } from 'three.meshline';
import sample from '../images/sample1.jpeg';
import sample2 from '../images/sample2.jpg';
import instagramIcon from '../images/instagram.png';
import YoutubeIcon from '../images/youtube.png';
import FacebookIcon from '../images/facebook.png';
import TiktokIcon from '../images/tiktok.png';
import '../css/MainComponent.css';
import fontStylesD from '../fonts/helvetiker_regular_typeface.json';


function TextMesh(props) {
  const mesh = useRef(null)

  useFrame(() => {
    // animation code goes here
    // mesh.current.rotation.x += 0.01
     mesh.current.rotation.y += 0.01
     mesh.current.geometry.center()
    // mesh.current.rotation.z += 0.01

  })

  // parse JSON file with Three
  const font = new THREE.FontLoader().parse(fontStylesD);

  // configure font geometry
  const textOptions = {
    font,
    size: 3,
    height: 1
  };



  return (
    <mesh position={[-5, 0, -10]} ref={mesh}>
      <textGeometry attach='geometry' args={['Business', textOptions]} />
      <meshStandardMaterial attach='material'  />
    </mesh>
  )
}

function vertexShader() {
  return `
  attribute float lineDistance;
  varying float vLineDistance;

  void main() {
    vLineDistance = lineDistance;
    vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
    gl_Position = projectionMatrix * mvPosition;
  }
  `
}

function fragmentShader() {
  return `
      uniform vec3 diffuse;
      uniform float opacity;
      uniform float time; // added time uniform

      uniform float dashSize;
      uniform float gapSize;
      uniform float dotSize;
      varying float vLineDistance;

      void main() {
        float totalSize = dashSize + gapSize;
        float modulo = mod( vLineDistance + time, totalSize ); // time added to vLineDistance
        float dotDistance = dashSize + (gapSize * .5) - (dotSize * .5);

        if ( modulo > dashSize && mod(modulo, dotDistance) > dotSize ) {
          discard;
        }

        gl_FragColor = vec4( diffuse, opacity );
      }
  `
}

function newShaderMaterial(){
  return new THREE.ShaderMaterial({
    uniforms: {
      diffuse: {value: new THREE.Color(0xff0000)},
      dashSize: {value: 20},
      gapSize: {value: 1},
      dotSize: {value: 0.1},
      opacity: {value: 1.0},
      time: {value: 0} // added uniform
    },
    vertexShader: vertexShader(),
    fragmentShader: fragmentShader(),
    transparent: true
  });
}


const backgroundColor = "#ffffff";
const TextColor = "#0083ff";
const BusinessEllipseColor = "#0083ff";
const PersonCircleColor = "#0083ff";
const PersonTextColor = "white";
var enableAnimation = 0;
//const AnimationLineColor = "rgba(255,251,36,0.36)";
const AnimationLineColor = "rgba(0,131,255,0.08)";
//const AnimationLineColor = "#fffb24";
const AnimationLineColorOriginal = "#e3e3e3";
//const AnimationLineColorOriginal = "rgba(0,131,255,0.08)";
//const AnimationLineColorOriginal = "#0083ff";

const ASPECT_RATIO = window.innerWidth / window.innerHeight;
const WIDTH = ( window.innerWidth ) * window.devicePixelRatio;
const HEIGHT = ( window.innerHeight ) * window.devicePixelRatio;

const NewHookComponent = () => {

  const mount = useRef(null)
  const [isAnimating, setAnimating] = useState(true)
  const controls = useRef(null)
  const group = new THREE.Object3D();
  const scene = new THREE.Scene();
  let width = window.innerWidth;
  let height = window.innerHeight;
  const camera = new THREE.PerspectiveCamera(75,ASPECT_RATIO, 1, 1000);
  const cameraPerspective = new THREE.PerspectiveCamera( 75,ASPECT_RATIO, 150, 1000);
  const cameraPerspectiveHelper = new THREE.CameraHelper( camera );
  const renderer = new THREE.WebGLRenderer({ antialias: true })
  //var viewPosition = {x:0,y:0,z:250};
  var viewPosition = {x:0,y:0,z:100};
  var viewPositionAnimation = {x:0,y:-250,z:-200};
  //var viewPositionAnimation = {x:0,y:-90,z:0};
  const SetCameraPosition = () => {
    camera.position.set( viewPosition.x, viewPosition.y, viewPosition.z );
    camera.updateMatrixWorld();
    // camera.lookAt( 0, -80, 0 );
    camera.lookAt( viewPositionAnimation.x, viewPositionAnimation.y, viewPositionAnimation.z );

    renderer.setClearColor(backgroundColor)
    renderer.setSize(width, height)
  }

  const SetCamera = () => {
    camera.lookAt( viewPositionAnimation.x, viewPositionAnimation.y, viewPositionAnimation.z );
  }

  function onWindowResize() {

     camera.aspect = window.innerWidth / window.innerHeight;
     camera.updateProjectionMatrix();
     renderer.setSize( window.innerWidth, window.innerHeight );

  }
  useEffect(() => {

    SetCameraPosition();
    group.add( camera );//adding camera to group
    //scene.add( cameraPerspectiveHelper );
    scene.add(group); //add group with camera to scene
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
       linewidth:6,
       wireframe: true,
       linecap: 'round', //ignored by WebGLRenderer
      	linejoin:  'round' //ignored by WebGLRenderer

     } );
     var businessPosition = {y:60};
     const ellipse = new THREE.Line( geometryEl, materialEl );
     ellipse.position.y = 60;
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
      size: 3, // font size
      height: 1, // how much extrusion (how thick / deep are the letters)
    };

    var PersontextGeometry = new THREE.TextGeometry( "Blogger", PersontextOptions);

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

    console.log(currentCoordinates); //current Persons coordinates
    //console.log(businessPosition);
    //persons

    //curves lines from business to bloggers

    // Create a sine-like wave

        // const curveLine = new THREE.SplineCurve( [
        // 	new THREE.Vector2( businessPosition.x - 20, businessPosition.y - 9 ),
        // 	new THREE.Vector2( currentCoordinates[0].x + 3, currentCoordinates[0].y + 10 )
        // ] );
        //
        // const pointsCurveLine = curveLine.getPoints( 50 );
        // const geometryCurveLine = new THREE.BufferGeometry().setFromPoints( pointsCurveLine );
        //
        // const materialCurveLine = new THREE.LineBasicMaterial( { color : 0xff0000 } );
        //
        // // Create the final object to add to the scene
        // const CurveLineObject = new THREE.Line( geometryCurveLine, materialCurveLine );

        //scene.add(CurveLineObject);


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
                  lineWidth: 2,
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

        //webgl.add(LineCurveCoordinatesCurveLineObject[0]);

        //social network

        //sentral
        const Socialgeometry = new THREE.CircleGeometry( 15, 32 );
        const Socialmaterial = new THREE.MeshBasicMaterial( { color: PersonCircleColor } );
        const SocialcircleObject = new THREE.Mesh( Socialgeometry, Socialmaterial );
        SocialcircleObject.position.x = 0;
        SocialcircleObject.position.y = -140;
        SocialcircleObject.rotation.x = -0.3;
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
        SocialPersonTextmesh.rotation.x = 0;
        SocialPersonTextmesh.position.x = 0.3;
        SocialcircleObject.add(SocialPersonTextmesh);
        //sentral

        //instagram image
        // const textureInst = new THREE.TextureLoader().load(instagramIcon);
        // const geometryInst = new THREE.BoxBufferGeometry( 15, 15, 15 );
        // const materialInstag = new THREE.MeshBasicMaterial( { map: textureInst } );
        // const instagMesh = new THREE.Mesh(geometryInst, materialInstag);
        // instagMesh.position.x = -30;
        // instagMesh.position.y = -110;
        // scene.add(instagMesh);
        var img = new THREE.MeshBasicMaterial({
            map:THREE.ImageUtils.loadTexture(instagramIcon)
        });
        img.map.needsUpdate = true; //ADDED
        var image_mesh = new THREE.Mesh(new THREE.PlaneGeometry(20, 20),img);
        image_mesh.overdraw = true;
        image_mesh.material.needsUpdate = true;
        image_mesh.position.x = -60;
        image_mesh.position.y = -140;
        image_mesh.rotation.x = -0.5;
        image_mesh.rotation.z = -0.05;
        scene.add(image_mesh);
        //instagram image

        //youtube
        var imgYoutube = new THREE.MeshBasicMaterial({
            map:THREE.ImageUtils.loadTexture(YoutubeIcon)
        });
        imgYoutube.map.needsUpdate = true; //ADDED
        var Youtube_image_mesh = new THREE.Mesh(new THREE.PlaneGeometry(20, 20),imgYoutube);
        Youtube_image_mesh.overdraw = true;
        Youtube_image_mesh.material.needsUpdate = true;
        Youtube_image_mesh.position.x = 60;
        Youtube_image_mesh.position.y = -140;
        Youtube_image_mesh.rotation.x = -0.5;
        //Youtube_image_mesh.rotation.z = -0.05;
        scene.add(Youtube_image_mesh);
        //youtube

        //facebook
        var imgFacebook = new THREE.MeshBasicMaterial({
            map:THREE.ImageUtils.loadTexture(FacebookIcon)
        });
        imgFacebook.map.needsUpdate = true; //ADDED
        var Facebook_image_mesh = new THREE.Mesh(new THREE.PlaneGeometry(13, 13),imgFacebook);
        Facebook_image_mesh.overdraw = true;
        Facebook_image_mesh.material.needsUpdate = true;
        Facebook_image_mesh.position.x = 0;
        Facebook_image_mesh.position.y = -80;
        Facebook_image_mesh.rotation.x = -0.5;
        //Youtube_image_mesh.rotation.z = -0.05;
        scene.add(Facebook_image_mesh);
        //facebook

        //tiktok
        var imgTiktok = new THREE.MeshBasicMaterial({
            map:THREE.ImageUtils.loadTexture(TiktokIcon)
        });
        imgTiktok.map.needsUpdate = true; //ADDED
        var Tiktok_image_mesh = new THREE.Mesh(new THREE.PlaneGeometry(25, 25),imgTiktok);
        Tiktok_image_mesh.overdraw = true;
        Tiktok_image_mesh.material.needsUpdate = true;
        Tiktok_image_mesh.position.x = 0;
        Tiktok_image_mesh.position.y = -250;
        Tiktok_image_mesh.rotation.x = -0.5;
        //Youtube_image_mesh.rotation.z = -0.05;
        scene.add(Tiktok_image_mesh);
        //tiktok
//xx
        //

        //social network





//curves lines from business to bloggers

//meshLine
//MeshLine, MeshLineMaterial, MeshLineRaycast



            // // ! Assuming you have your own webgl engine to add meshes on scene and update them.
            //   webgl.add(lineMesh);

            // ! Call each frame
              // function update() {
              //   // Check if the dash is out to stop animate it.
              //   if (lineMesh.material.uniforms.dashOffset.value < -2) return;
              //
              //   // Decrement the dashOffset value to animate the path with the dash.
              //   lineMesh.material.uniforms.dashOffset.value -= 0.01;
              // }
//meshLine





    //scene.add(group);

    console.log(LineCurveCoordinatesCurveLineObject[0]);



    //text
    var LineSpeed = 0.002;
    var LineSpeedTwo = 0.002;
    var LineSpeedThree = 0.002;
    var LineSpeedFour = 0.002;
    var LineSpeedFive = 0.002;
    var LineSpeedSix = 0.002;

    function animate() {
        renderer.render(scene, camera)
        setTimeout(animate, 5);
        // Check if the dash is out to stop animate it.
        // if (LineCurveCoordinatesCurveLineObject[0].material.uniforms.dashOffset.value < -2){
        //   return false;
        // }
        // Decrement the dashOffset value to animate the path with the dash.
        //LineCurveCoordinatesCurveLineObject[0].material.uniforms.dashOffset.value -= 0.01;
        if(enableAnimation == 1){


        LineCurveCoordinatesCurveLineObject[0].material.dashOffset -= LineSpeed;
        LineCurveCoordinatesCurveLineObject[1].material.dashOffset -= LineSpeedTwo;
        LineCurveCoordinatesCurveLineObject[2].material.dashOffset -= LineSpeedThree;
        LineCurveCoordinatesCurveLineObject[3].material.dashOffset -= LineSpeedFour;
        LineCurveCoordinatesCurveLineObject[4].material.dashOffset -= LineSpeedFive;
        LineCurveCoordinatesCurveLineObject[5].material.dashOffset -= LineSpeedSix;

        // viewPositionAnimation.y -= 0.04;
        // SetCamera();
        //
        // if(viewPositionAnimation.y < -80){
        //   viewPositionAnimation.y = 0;
        // }
        }


      }
      animate();

      function getRandomFloat() {
        return (Math.random() * (0.001 - 0.006) + 0.006).toFixed(4)
      }

      if(enableAnimation == 1){
        setInterval(function(){
          LineSpeed = getRandomFloat();
          LineSpeedTwo = getRandomFloat();
          LineSpeedThree = getRandomFloat();
          LineSpeedFour = getRandomFloat();
          LineSpeedFive = getRandomFloat();
          LineSpeedSix = getRandomFloat();


        },2000)
      }


      //onWindowResize();

      //window.addEventListener( 'resize', onWindowResize, false );

    mount.current.appendChild(renderer.domElement)

    return () => {

      mount.current.removeChild(renderer.domElement)

    }


  }, [])









  return <div className="vis" ref={mount}  />
}


export default NewHookComponent;
