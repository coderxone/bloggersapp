import React, { useCallback,useEffect,useState,useMemo,useRef } from 'react';
import MenuComponent from '../../components/MenuComponents/MenuComponent';
import LocalizeComponent from '../../localize/LocalizeComponent';
import Grid from '@material-ui/core/Grid';
import config from '../../config/config';
import { connect } from 'react-redux';
import '../../components/profileComponents/userProfileComponent.scss';
import ProgressIndicator from '../../helperComponents/progressIndicator';
import ProfileService from '../../services/ProfileService';
import EditIcon from '@material-ui/icons/Edit';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import {
  Link,useHistory
} from "react-router-dom";

import Input from '@material-ui/core/Input';
import DoneAllIcon from '@material-ui/icons/DoneAll';

import UserProfilePhotoUpload from './userProfilePhotoUpload';
import { useSelector, useDispatch } from 'react-redux'



const mapStateToProps = (state) => {
  return state;
}

const BottomFunc = (props) => {


  const count = useSelector((state) => state.counter.value);
  const IMAGE_DATA = useSelector((state) => state.counter.IMAGE_DATA);
  const BACKGROUND_IMAGE_DATA = useSelector((state) => state.counter.BACKGROUND_IMAGE_DATA);
  const dispatch = useDispatch();



  const [backgroundImageUrl,setBackgroundImageUrl] = useState(config.getServerImageBackgroundPath() + "background.jpeg");
  const [userBackgroundImageUrl,setUserBackgroundImageUrl] = useState(config.getServerImagePath() + "no-image.png");

  const [switchDownloadedImage,SetswitchDownloadedImage] = useState(0);
  const [switchDownloadedBackgroundImage,SetswitchDownloadedBackgroundImage] = useState(0);

  useMemo(() => {

    if(String(IMAGE_DATA) !== "[object Object]"){
      SetswitchDownloadedImage(1);
    }
  },[IMAGE_DATA])

  useMemo(() => {

    if(String(BACKGROUND_IMAGE_DATA) !== "[object Object]"){
      SetswitchDownloadedBackgroundImage(1);
    }
  },[BACKGROUND_IMAGE_DATA])

  const [progressBarValue,SetprogressBarValue] = useState(10);

  let widthValueFirst = progressBarValue + "%";
  let widthValueSecond = 70 + "%";

  const [progressBarValueA,SetprogressBarValueA] = useState(0);

  let widthValueFirstA = progressBarValueA + "%";
  let widthValueSecondA = 70 + "%";
  const [userData,SetUserData] = useState({});



  const [editMode,SetEditMode] = useState(0);

  const EditMode = (command) => {
    SetEditMode(command);
  }



  const UpdateInDB = (object) => {
    ProfileService.updateUsersData(object);
  }

  const ChangingUserData = (value,updatingValue) => {

      let oldData = {...userData};

      if(updatingValue === "firstName"){
        oldData.firstName = value;
      }
      if(updatingValue === "lastName"){
        oldData.lastName = value;
      }
      if(updatingValue === "bio"){
        oldData.bio = value;
      }

      if(value.length > 0){
        UpdateInDB(oldData);
      }
      SetUserData(oldData);
  }

  useEffect(() => {
    const util = ProfileService.listenUserDataG().subscribe(result => {

      let personalObject = result.result;

      if(personalObject.firstName === "0"){
        personalObject.firstName = LocalizeComponent.user_6;
      }
      if(personalObject.lastName === "0"){
        personalObject.lastName = LocalizeComponent.user_7;
      }
      if(personalObject.lastName === null){
        personalObject.bio = LocalizeComponent.user_8;
      }

      //console.log(personalObject);
      //setUserBackgroundImageUrl
      if(personalObject.image_url !== "no-image.png"){

        let image_name = personalObject.image_url;
        if(image_name.indexOf("https") >= 0){
          setUserBackgroundImageUrl(personalObject.image_url);
        }else{
          setUserBackgroundImageUrl(config.getServerImagePath() + personalObject.image_url);
        }

      }
      if(personalObject.background_image !== "background.jpeg"){
        setBackgroundImageUrl(config.getServerImageBackgroundPath() + personalObject.background_image);
      }

      SetprogressBarValueA(personalObject.points);
      SetUserData(personalObject);

    });

    const utilTwo = ProfileService.listenUpdateUsersData().subscribe(response => {

    });



    ProfileService.getOwnData();


    // props.reduxStorage.getState(res => {
    //   console.log(res);
    // })



    return () => {
        util.unsubscribe();
        utilTwo.unsubscribe();
    }
  },[])



  return (

    <div id="opacityControl">
      <MenuComponent />



      <Grid container className="projectContainer"  >

        {
          switchDownloadedBackgroundImage === 0 ? (
            <div className="u_background" style={ { backgroundPosition: "center",backgroundRepeat:"no-repeat",backgroundSize:"cover",background: "url(" + backgroundImageUrl + ") no-repeat center/cover" }}>

            </div>
          ) : (
            <img className="u_background" src={BACKGROUND_IMAGE_DATA}  />
          )
        }


        <div className="infoPanelCover">
            <div className="infoPanel robotoFont blackColor">


                      <div className="centerElements">
                        {
                          switchDownloadedImage === 0 ? (
                            <div className="u_image u_imagePosition" style={ { backgroundPosition: "center",backgroundRepeat:"no-repeat",backgroundSize:"cover",background: "url(" + userBackgroundImageUrl + ") no-repeat center/cover" }}></div>
                          ) : (
                            <img className="u_image u_imagePosition" src={IMAGE_DATA}  />
                          )
                        }


                      </div>

                      {
                        editMode === 0 ? (
                          <EditIcon className="editIcon" onClick={event => EditMode(1)}/>
                        ) : (
                          <DoneAllIcon className="doneIcon" onClick={event => EditMode(0)}/>
                        )
                      }


                      <UserProfilePhotoUpload back={false} />



                    <div className="u_imageRole ">
                          {LocalizeComponent.business}
                    </div>

                    {
                      editMode === 0 ? (
                        <div className="u_imageName ">
                              {userData.firstName} {userData.lastName}
                        </div>
                      ) : (
                        <form noValidate autoComplete="off" className="u_imageName ">
                              <Input value={userData.firstName} onChange={event => ChangingUserData(event.target.value,"firstName")} placeholder={LocalizeComponent.user_4} className="firstNameInput" error  /> <Input value={userData.lastName} placeholder={LocalizeComponent.user_5}  onChange={event => ChangingUserData(event.target.value,"lastName")} className="lastNameInput" error  />
                              <input type="hidden" value="Submit" />
                        </form>
                      )
                    }


                    <div className="u_imageRole ">

                    </div>

                    <div className="userProgressBlock">


                  

                    </div>

                    <div className="user_bioCover">
                      <div className="user_bioTitle">
                          {LocalizeComponent.user_3}
                      </div>

                      {
                        editMode === 0 ? (
                          <div className="user_bio">
                              {userData.bio}
                          </div>
                        ) : (
                          <form noValidate autoComplete="off" className="user_bio ">
                            <TextareaAutosize value={userData.bio}  onChange={event => ChangingUserData(event.target.value,"bio")} placeholder={LocalizeComponent.user_8} className="bioTextArea"   aria-label={LocalizeComponent.user_8}  />
                            <input type="hidden" value="Submit" />
                          </form>
                        )
                      }


                    </div>





        </div>
        </div>













    </Grid>




  </div>




  );

}


 export default BottomFunc;
