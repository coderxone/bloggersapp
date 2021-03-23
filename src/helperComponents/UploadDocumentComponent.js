import React, {useState,useEffect,useRef,useMemo} from 'react';
import axios from 'axios';
import uploadImage from '../images/uploadimage.png';
import LinearProgress from '@material-ui/core/LinearProgress';
import config from '../config/config.js';
import { connect } from 'react-redux';
import { save_multiData } from '../actions/actions';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

const App = (props) => {

  const imageProperty = {
    selectedFile:null
  }

  const [progress, setProgress] = React.useState(0);
  const [buffer, setBuffer] = React.useState(0);
  const progressRef = React.useRef(() => {});
  const [successupload,Setsuccessupload] = useState(0);
  const [image, setImage] = useState({});
  const [existingImage,SetexistingImage] = useState(0);
  const [imageData, setimageData] = useState({});

  const inputFile = useRef(null);

  const openFile = () => {

      setImage({});
      SetexistingImage(0);
      Setsuccessupload(0);
      inputFile.current.click();
  }

  const uploadHandler = (event) => {

    event.preventDefault();
    setImage(URL.createObjectURL(event.target.files[0]));
    setimageData(event.target.files[0]);
    SetexistingImage(1);

  }



  const uploadButton = () => {

    const formdata = new FormData();

    formdata.append('email',config.getUserEmail());

    formdata.append('photo',imageData,imageData.name);
      axios.post(config.getBaseDomainUrl() + "/uploaduserid",formdata,{
        onUploadProgress:progressEvent => {
          var uploadProgress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
          setProgress(uploadProgress);
          setBuffer(uploadProgress + 10);
        }
      })
      .then(res => {
          if(res.status == 200){
            props.dispatch(save_multiData({_object:'photo',name:res.data}));
            Setsuccessupload(1);
          }
      });
  }

  useMemo(() => {

    if(existingImage !== 0){
      uploadButton();
    }

  },[existingImage]);


  return (
    <div className="App">



      <img className="UploadImageStyleSecond" onClick={openFile} src={uploadImage}/>


      {
        existingImage === 1 && (
          <img className="UploadImageStyle"  src={image}  />
        )
      }




      <div className="imageSecondBlock">
          {
            existingImage == 1 && (
              <LinearProgress variant="buffer" value={progress} valueBuffer={buffer} />
            )
          }

          {
            successupload == 1 &&
            (
              <CheckCircleOutlineIcon className="successUpload"/>
            )
          }

      </div>



        <input className="fileClass" type="file"  ref={inputFile} onChange={uploadHandler} name="photo" style={{display: 'none'}}></input>


    </div>
  );
}

 export default connect()(App);
