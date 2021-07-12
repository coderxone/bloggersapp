import React, {useState,useEffect,useRef,useMemo} from 'react';
import axios from 'axios';
import uploadImage from '../../images/uploadimage.png';
import LinearProgress from '@material-ui/core/LinearProgress';
import config from '../../config/config.js';
import { save_multiData,setImageData } from '../../actions/actions';

import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import Grid from '@material-ui/core/Grid';
import DandelionComponent from '../../components/dandelionComponent';
import AlertComponent from '../../helperComponents/AlertBoxComponent';
import LocalizeComponent from '../../localize/LocalizeComponent';
import GoBackAbsoluteComponent from '../../helperComponents/goBackAbsoluteComponent';
import { useHistory } from "react-router-dom";
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import {useDispatch} from 'react-redux';
import {saveImageData,saveBackgroundImageData} from '../../features/counter-slice';
import PhotoIcon from '@material-ui/icons/Photo';


const App = (props) => {

  const imageProperty = {
    selectedFile:null
  }
  const activeButton = props.back;
  const dispatch = useDispatch();

  const [progress, setProgress] = React.useState(0);
  const [buffer, setBuffer] = React.useState(0);
  const progressRef = React.useRef(() => {});
  const [successupload,Setsuccessupload] = useState(0);
  const [image, setImage] = useState({});
  const [existingImage,SetexistingImage] = useState(0);
  const [existingBackgroundImage,SetexistingBackgroundImage] = useState(0);
  const [imageData, setimageData] = useState({});

  const [error,SetError] = useState(false);
  const [AlertText,SetAlertText] = useState('please fill in');

  const inputFile = useRef(null);

  let history = useHistory();

  const [loadPath,SetLoadPath] = useState(0);

  const openFile = (command) => {


        setImage({});
        SetexistingImage(0);
        Setsuccessupload(0);
        SetexistingBackgroundImage(0);
        if(command === 1){
          SetLoadPath(1);
        }else{
          SetLoadPath(0);
        }

        inputFile.current.click();



  }

  const uploadHandler = (event,loadPath) => {

    let filesize = event.target.files[0].size;

    if(filesize > 42000000){

      SetAlertText(LocalizeComponent.b_29);
      SetError(true);
      return false;
    }

    event.preventDefault();

    setimageData(event.target.files[0]);

    if(loadPath === 1){
        dispatch(saveBackgroundImageData(URL.createObjectURL(event.target.files[0])));
        SetexistingBackgroundImage(1);
    }else{
      setImage(URL.createObjectURL(event.target.files[0]));

      dispatch(saveImageData(URL.createObjectURL(event.target.files[0])));
      SetexistingImage(1);
    }



    event.target.value = null;

  }


  const goBack = () => {

    setTimeout(function(){
      history.goBack();
    },2000);

  }

  const hideLoadStuffs = () => {
    setTimeout(function(){
      Setsuccessupload(0);
      SetexistingImage(0);
      SetexistingBackgroundImage(0);
    },2000);
  }



  const uploadButton = (loadPath) => {

    //loadPath
    const formdata = new FormData();

    formdata.append('email',config.getUserEmail());

    let uploadUrl = config.getBaseDomainUrl() + "/usermainphoto";
    if(loadPath === 1){
        uploadUrl = config.getBaseDomainUrl() + "/userbackgroundImage";
    }

    //return false;
    formdata.append('photo',imageData,imageData.name);
      axios.post(uploadUrl,formdata,{
        onUploadProgress:progressEvent => {
          var uploadProgress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
          setProgress(uploadProgress);
          setBuffer(uploadProgress + 10);
        }
      })
      .then(res => {
          if(res.status == 200){
            //console.log(res.data);



            if(loadPath === 0){
                Setsuccessupload(1);
            }

             hideLoadStuffs();

            //goBack();
          }
      });
  }

  useMemo(() => {

    if(existingImage !== 0){
      uploadButton(loadPath);
    }
    if(existingBackgroundImage !== 0){
      uploadButton(loadPath);
    }

  },[existingImage,existingBackgroundImage,loadPath]);




  return (
    <div >
    {
      activeButton === true && (
        <GoBackAbsoluteComponent/>
      )
    }





      <PhotoCameraIcon className="PhotoCameraIcon" onClick={event => openFile(0)}/>
      <PhotoIcon className="PhotoBackgroundIcon" onClick={event => openFile(1)}/>


          {
            existingImage == 1 && (
              <div className="userProfileUploadProgressCover">
                  <LinearProgress  variant="buffer" value={progress} valueBuffer={buffer} />
              </div>

            )
          }
          {
            existingBackgroundImage == 1 && (
              <div className="userProfileBackgroundUploadProgressCover">
                  <LinearProgress  variant="buffer" value={progress} valueBuffer={buffer} />
              </div>

            )
          }

          {
            successupload == 1 &&
            (
                <CheckCircleOutlineIcon className="successUploadIcon"/>
            )
          }



      <AlertComponent state={error} text={AlertText}/>



        <input className="fileClass" type="file" accept="image/*"  ref={inputFile} onChange={event => uploadHandler(event,loadPath)} name="photo" style={{display: 'none'}}></input>


    </div>
  );
}

 export default App;
