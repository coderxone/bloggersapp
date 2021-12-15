import React, {useState,useRef,useMemo} from 'react';
import axios from 'axios';
import LinearProgress from '@material-ui/core/LinearProgress';
import config from '../../config/config.js';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import AlertComponent from '../../helperComponents/AlertBoxComponent';
import LocalizeComponent from '../../localize/LocalizeComponent';
import GoBackAbsoluteComponent from '../../helperComponents/goBackAbsoluteComponent';
import { useHistory } from "react-router-dom";
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import {useDispatch} from 'react-redux';
import {SetNewsBackgroundImage} from '../../features/counter-slice';


const App = (props) => {

  const imageProperty = {
    selectedFile:null
  }
  const activeButton = props.back;
  const dispatch = useDispatch();

  const [progress, setProgress] = React.useState(0);
  const [buffer, setBuffer] = React.useState(0);
  const [successupload,Setsuccessupload] = useState(0);
  const [existingBackgroundImage,SetexistingBackgroundImage] = useState(0);
  const [imageData, setimageData] = useState({});

  const [error,SetError] = useState(false);
  const [AlertText,SetAlertText] = useState('please fill in');

  const inputFile = useRef(null);

  let history = useHistory();

  const [loadPath,SetLoadPath] = useState(0);

  const openFile = (command) => {

        Setsuccessupload(0);
        SetexistingBackgroundImage(0);
        SetLoadPath(0);
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

    dispatch(SetNewsBackgroundImage(URL.createObjectURL(event.target.files[0])));
    SetexistingBackgroundImage(1);

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
      SetexistingBackgroundImage(0);
    },2000);
  }

  const uploadButton = (loadPath) => {

    //loadPath
    const formdata = new FormData();

    formdata.append('email',config.getUserEmail());
    formdata.append('id',config.getUserItemName("id"));
    
    let uploadUrl = config.getBaseDomainUrl() + "/newsimage";

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
         
             Setsuccessupload(1);
             hideLoadStuffs();

          }
      });
  }

  useMemo(() => {

    if(existingBackgroundImage !== 0){
      uploadButton(loadPath);
    }

  },[existingBackgroundImage,loadPath]);




  return (
    <div >
    {
      activeButton === true && (
        <GoBackAbsoluteComponent/>
      )
    }


        <div className="newsCameraCover">
            <div className="newsCameraBox">
                <PhotoCameraIcon className="newsCameraIcon" onClick={event => openFile(0)}/>
            </div>
        </div>
      

          {
            existingBackgroundImage == 1 && (
              <div className="newsProgressCover">
                  <LinearProgress  variant="buffer" value={progress} valueBuffer={buffer} />
              </div>

            )
          }
          

          {
            successupload == 1 &&
            (
                <CheckCircleOutlineIcon className="successNewsUploadIcon"/>
            )
          }
          



      <AlertComponent state={error} text={AlertText}/>



        <input className="fileClass" type="file" accept="image/*"  ref={inputFile} onChange={event => uploadHandler(event,loadPath)} name="photo" style={{display: 'none'}}></input>


    </div>
  );
}

 export default App;
