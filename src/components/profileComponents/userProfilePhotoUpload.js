import React, {useState,useEffect,useRef,useMemo} from 'react';
import axios from 'axios';
import uploadImage from '../../images/uploadimage.png';
import LinearProgress from '@material-ui/core/LinearProgress';
import config from '../../config/config.js';
import { connect } from 'react-redux';
import { save_multiData } from '../../actions/actions';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import Grid from '@material-ui/core/Grid';
import DandelionComponent from '../../components/dandelionComponent';
import AlertComponent from '../../helperComponents/AlertBoxComponent';
import LocalizeComponent from '../../localize/LocalizeComponent';
import GoBackAbsoluteComponent from '../../helperComponents/goBackAbsoluteComponent';
import { useHistory } from "react-router-dom";
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';

const App = (props) => {

  const imageProperty = {
    selectedFile:null
  }
  const activeButton = props.back;

  const [progress, setProgress] = React.useState(0);
  const [buffer, setBuffer] = React.useState(0);
  const progressRef = React.useRef(() => {});
  const [successupload,Setsuccessupload] = useState(0);
  const [image, setImage] = useState({});
  const [existingImage,SetexistingImage] = useState(0);
  const [imageData, setimageData] = useState({});

  const [error,SetError] = useState(false);
  const [AlertText,SetAlertText] = useState('please fill in');

  const inputFile = useRef(null);

  let history = useHistory();

  const openFile = (command) => {


        setImage({});
        SetexistingImage(0);
        Setsuccessupload(0);
        inputFile.current.click();


  }

  const uploadHandler = (event) => {

    let filesize = event.target.files[0].size;

    if(filesize > 42000000){

      SetAlertText(LocalizeComponent.b_29);
      SetError(true);
      return false;
    }

    event.preventDefault();
    setImage(URL.createObjectURL(event.target.files[0]));
    setimageData(event.target.files[0]);
    SetexistingImage(1);

    event.target.value = null;

  }


  const goBack = () => {

    setTimeout(function(){
      history.goBack();
    },2000);

  }


  const uploadButton = () => {


    const formdata = new FormData();

    formdata.append('email',config.getUserEmail());

    formdata.append('photo',imageData,imageData.name);
      axios.post(config.getBaseDomainUrl() + "/usermainphoto",formdata,{
        onUploadProgress:progressEvent => {
          var uploadProgress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
          setProgress(uploadProgress);
          setBuffer(uploadProgress + 10);
        }
      })
      .then(res => {
          if(res.status == 200){
            console.log(res);
            // props.dispatch(save_multiData({_object:'profilephoto',name:res.data}));
            // props.dispatch(save_multiData({_object:'profilephotostatus',name:"1"}));
            // Setsuccessupload(1);

            //goBack();
          }
      });
  }

  useMemo(() => {

    if(existingImage !== 0){
      uploadButton();
    }

  },[existingImage]);




  return (
    <Grid container >
    {
      activeButton === true && (
        <GoBackAbsoluteComponent/>
      )
    }




      <img className="VideoImageStyle" onClick={openFile} src={uploadImage}/>
      <PhotoCameraIcon className="PhotoCameraIcon" onClick={event => openFile(0)}/>



      <div className="videoSecondBlock">
          {
            existingImage == 1 && (
              <LinearProgress variant="buffer" value={progress} valueBuffer={buffer} />
            )
          }

          {
            successupload == 1 &&
            (
              <div className="VideoImageStyleContainer">
                <CheckCircleOutlineIcon className="successUpload"/>
              </div>

            )
          }

      </div>

      <div className="ListDivider"></div>

      {
        existingImage === 1 && (



          <div className="VideoImageStyleContainer">
            <img className="VideoPreviewStyle"  src={image}  />
          </div>

        )
      }

      <AlertComponent state={error} text={AlertText}/>



        <input className="fileClass" type="file" accept="image/*"  ref={inputFile} onChange={uploadHandler} name="photo" style={{display: 'none'}}></input>


    </Grid>
  );
}

 export default connect()(App);
