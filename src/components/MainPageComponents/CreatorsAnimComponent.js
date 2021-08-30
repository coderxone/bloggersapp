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
import group2 from '../../images/central_images/Group2.png';
import group3 from '../../images/central_images/Group3.png';
import group4 from '../../images/central_images/Group4.png';
import group5 from '../../images/central_images/Group5.png';
import girl from '../../images/central_images/girl_t.png';
import man from '../../images/central_images/man.png';
import twitter1 from '../../images/central_images/twitter1.png';
import facebook1 from '../../images/central_images/facebook1.png';
import tiktok1 from '../../images/central_images/tiktok1.png';
import Emoji from '../../images/central_images/Emoji.png';
import youtube1 from '../../images/central_images/youtube1.png';
import Emoji_1 from '../../images/central_images/Emoji-1.png';
import Emoji_6 from '../../images/central_images/Emoji-6.png';
import instagram1 from '../../images/central_images/instagram1.png';

import Observable from '../../services/Observable';



import fontStylesD from '../../fonts/a_AvanteLt_Light.json';
import { MeshLine, MeshLineMaterial, MeshLineRaycast } from 'three.meshline'
import {
  useHistory,
} from "react-router-dom";
import LocalizeComponent from '../../localize/LocalizeComponent';



let line, renderer, scene,scene2, camera, controls;

const backgroundColor = "#ffffff";
const ASPECT_RATIO = window.innerWidth / window.innerHeight;
const WhiteTextColor = "#ffffff";

//const LinesColor = "rgb(3, 148, 252)";//2090cc
// viewport
let insetWidth;
let insetHeight;
const firstPagePosition = 0;


const NewComponent = (props) => {
  const mount = useRef(null);

  const history = useHistory();
  const font = new THREE.FontLoader().parse(fontStylesD);



  function init() {

		renderer = new THREE.WebGLRenderer( { antialias: true } );
		renderer.setPixelRatio( window.devicePixelRatio );
		renderer.setClearColor( 0x000000, 0.0 );
		renderer.setSize( window.innerWidth, window.innerHeight );


		scene = new THREE.Scene();

		camera = new THREE.PerspectiveCamera( 45,ASPECT_RATIO, 1, 1000);
		//camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 1000 );
    var Deep = 0;

    camera.position.set( 0, 0, 1000 );



    camera.updateMatrixWorld();
    camera.layers.enable(0);
    camera.layers.enable(1);
    camera.layers.enable(2);

    const listImage = new THREE.MeshBasicMaterial({
        map:new THREE.TextureLoader().load(group4)
    });
    listImage.transparent = true;
    var listImage_mesh = new THREE.Mesh(new THREE.PlaneGeometry(512, 613),listImage);
    listImage_mesh.overdraw = true;
    listImage_mesh.geometry.center();
    // cloud_mesh.material.needsUpdate = true;
    listImage_mesh.position.x = -90;
    listImage_mesh.position.y = 0;//
    listImage_mesh.scale.set(0.28,0.28,0.28);
    scene.add(listImage_mesh);


    const girlImage = new THREE.MeshBasicMaterial({
        map:new THREE.TextureLoader().load(girl)
    });
    girlImage.transparent = true;
    var girlImage_mesh = new THREE.Mesh(new THREE.PlaneGeometry(250, 251),girlImage);
    girlImage_mesh.overdraw = true;

    girlImage_mesh.geometry.center();
    // cloud_mesh.material.needsUpdate = true;
    girlImage_mesh.position.x = -90;
    girlImage_mesh.position.y = -160;//
    girlImage_mesh.scale.set(0.75,0.75,0.75);
    scene.add(girlImage_mesh);

    const manImage = new THREE.MeshBasicMaterial({
        map:new THREE.TextureLoader().load(man)
    });
    manImage.transparent = true;
    var manImage_mesh = new THREE.Mesh(new THREE.PlaneGeometry(264, 264),manImage);
    manImage_mesh.overdraw = true;

    manImage_mesh.geometry.center();
    // cloud_mesh.material.needsUpdate = true;
    manImage_mesh.position.x = 90;
    manImage_mesh.position.y = 30;//
    manImage_mesh.scale.set(0.72,0.72,0.72);
    scene.add(manImage_mesh);

    const group5Image = new THREE.MeshBasicMaterial({
        map:new THREE.TextureLoader().load(group5)
    });
    group5Image.transparent = true;
    var group5Image_mesh = new THREE.Mesh(new THREE.PlaneGeometry(512, 706),group5Image);
    group5Image_mesh.overdraw = true;

    group5Image_mesh.geometry.center();
    // cloud_mesh.material.needsUpdate = true;
    group5Image_mesh.position.x = 78;
    group5Image_mesh.position.y = -165;//
    group5Image_mesh.scale.set(0.28,0.28,0.28);
    scene.add(group5Image_mesh);


    const group3Image = new THREE.MeshBasicMaterial({
        map:new THREE.TextureLoader().load(group3)
    });
    group3Image.transparent = true;
    var group3Image_mesh = new THREE.Mesh(new THREE.PlaneGeometry(512, 135),group3Image);
    group3Image_mesh.overdraw = true;

    group3Image_mesh.geometry.center();
    // cloud_mesh.material.needsUpdate = true;
    group3Image_mesh.position.x = -10;
    group3Image_mesh.position.y = 94;//
    group3Image_mesh.scale.set(0.25,0.25,0.25);
    scene.add(group3Image_mesh);


    const group2Image = new THREE.MeshBasicMaterial({
        map:new THREE.TextureLoader().load(group2)
    });
    group2Image.transparent = true;
    var group2Image_mesh = new THREE.Mesh(new THREE.PlaneGeometry(512, 157),group2Image);
    group2Image_mesh.overdraw = true;

    group2Image_mesh.geometry.center();
    // cloud_mesh.material.needsUpdate = true;
    group2Image_mesh.position.x = -39;
    group2Image_mesh.position.y = -220;//
    group2Image_mesh.scale.set(0.25,0.25,0.25);
    scene.add(group2Image_mesh);

    const twitter1Image = new THREE.MeshBasicMaterial({
        map:new THREE.TextureLoader().load(twitter1)
    });
    twitter1Image.transparent = true;
    var twitter1Image_mesh = new THREE.Mesh(new THREE.PlaneGeometry(512, 512),twitter1Image);
    twitter1Image_mesh.overdraw = true;

    twitter1Image_mesh.geometry.center();
    // cloud_mesh.material.needsUpdate = true;
    twitter1Image_mesh.position.x = -155;
    twitter1Image_mesh.position.y = 85;//
    twitter1Image_mesh.scale.set(0.06,0.06,0.06);
    scene.add(twitter1Image_mesh);

    const facebook1Image = new THREE.MeshBasicMaterial({
        map:new THREE.TextureLoader().load(facebook1)
    });
    facebook1Image.transparent = true;
    var facebook1Image_mesh = new THREE.Mesh(new THREE.PlaneGeometry(512, 512),facebook1Image);
    facebook1Image_mesh.overdraw = true;

    facebook1Image_mesh.geometry.center();
    // cloud_mesh.material.needsUpdate = true;
    facebook1Image_mesh.position.x = -30;
    facebook1Image_mesh.position.y = 77;//
    facebook1Image_mesh.scale.set(0.06,0.06,0.06);
    scene.add(facebook1Image_mesh);

    const tiktok1Image = new THREE.MeshBasicMaterial({
        map:new THREE.TextureLoader().load(tiktok1)
    });
    tiktok1Image.transparent = true;
    var tiktok1Image_mesh = new THREE.Mesh(new THREE.PlaneGeometry(512, 512),tiktok1Image);
    tiktok1Image_mesh.overdraw = true;

    tiktok1Image_mesh.geometry.center();
    // cloud_mesh.material.needsUpdate = true;
    tiktok1Image_mesh.position.x = 40;
    tiktok1Image_mesh.position.y = 105;//
    tiktok1Image_mesh.scale.set(0.05,0.05,0.05);
    scene.add(tiktok1Image_mesh);

    const EmojiImage = new THREE.MeshBasicMaterial({
        map:new THREE.TextureLoader().load(Emoji)
    });
    EmojiImage.transparent = true;
    var EmojiImage_mesh = new THREE.Mesh(new THREE.PlaneGeometry(512, 512),EmojiImage);
    EmojiImage_mesh.overdraw = true;

    EmojiImage_mesh.geometry.center();
    // cloud_mesh.material.needsUpdate = true;
    EmojiImage_mesh.position.x = 175;
    EmojiImage_mesh.position.y = 80;//
    EmojiImage_mesh.scale.set(0.06,0.06,0.06);
    scene.add(EmojiImage_mesh);


    const youtube1Image = new THREE.MeshBasicMaterial({
        map:new THREE.TextureLoader().load(youtube1)
    });
    youtube1Image.transparent = true;
    var youtube1Image_mesh = new THREE.Mesh(new THREE.PlaneGeometry(512, 512),youtube1Image);
    youtube1Image_mesh.overdraw = true;

    youtube1Image_mesh.geometry.center();
    // cloud_mesh.material.needsUpdate = true;
    youtube1Image_mesh.position.x = -15;
    youtube1Image_mesh.position.y = 20;//
    youtube1Image_mesh.scale.set(0.06,0.06,0.06);
    scene.add(youtube1Image_mesh);


    const Emoji_1Image = new THREE.MeshBasicMaterial({
        map:new THREE.TextureLoader().load(Emoji_1)
    });
    Emoji_1Image.transparent = true;
    var Emoji_1Image_mesh = new THREE.Mesh(new THREE.PlaneGeometry(512, 512),Emoji_1Image);
    Emoji_1Image_mesh.overdraw = true;

    Emoji_1Image_mesh.geometry.center();
    // cloud_mesh.material.needsUpdate = true;
    Emoji_1Image_mesh.position.x = 10;
    Emoji_1Image_mesh.position.y = -30;//
    Emoji_1Image_mesh.scale.set(0.07,0.07,0.07);
    scene.add(Emoji_1Image_mesh);

    const Emoji_6Image = new THREE.MeshBasicMaterial({
        map:new THREE.TextureLoader().load(Emoji_6)
    });
    Emoji_6Image.transparent = true;
    var Emoji_6Image_mesh = new THREE.Mesh(new THREE.PlaneGeometry(512, 512),Emoji_6Image);
    Emoji_6Image_mesh.overdraw = true;

    Emoji_6Image_mesh.geometry.center();
    // cloud_mesh.material.needsUpdate = true;
    Emoji_6Image_mesh.position.x = -10;
    Emoji_6Image_mesh.position.y = -95;//
    Emoji_6Image_mesh.scale.set(0.06,0.06,0.06);
    scene.add(Emoji_6Image_mesh);

    var Emoji_1Image_meshCopy = Emoji_1Image_mesh.clone();

    Emoji_1Image_meshCopy.position.x = -165;
    Emoji_1Image_meshCopy.position.y = -95;
    scene.add(Emoji_1Image_meshCopy);

    const instagram1Image = new THREE.MeshBasicMaterial({
        map:new THREE.TextureLoader().load(instagram1)
    });

    instagram1Image.transparent = true;
    var instagram1Image_mesh = new THREE.Mesh(new THREE.PlaneGeometry(512, 512),instagram1Image);
    instagram1Image_mesh.overdraw = true;

    instagram1Image_mesh.geometry.center();
    // cloud_mesh.material.needsUpdate = true;
    instagram1Image_mesh.position.x = -170;
    instagram1Image_mesh.position.y = -230;//
    instagram1Image_mesh.scale.set(0.07,0.07,0.07);
    scene.add(instagram1Image_mesh);


    var EmojiImage_meshCopy = EmojiImage_mesh.clone();

    EmojiImage_meshCopy.position.x = 10;
    EmojiImage_meshCopy.position.y = -245;
    scene.add(EmojiImage_meshCopy);










		//

		window.addEventListener( 'resize', onWindowResize );
		onWindowResize();



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


  return <div className="vis scrollChange secondThird"  ref={mount}/>;
}






function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;

	renderer.setSize( window.innerWidth, window.innerHeight );

	insetWidth = window.innerHeight / 4; // square
	insetHeight = window.innerHeight / 4;


}


function animate() {

	requestAnimationFrame( animate );


	// main scene

	//renderer.setClearColor( 0x000000, 0 );
	renderer.setClearColor( backgroundColor );

	renderer.setViewport( 0, 0, window.innerWidth, window.innerHeight );


  renderer.autoClear = true;

	renderer.render( scene, camera );







  onWindowResize()


}

//



export default NewComponent;
