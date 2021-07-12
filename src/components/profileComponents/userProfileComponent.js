import React, { useCallback,useEffect,useState,useMemo,useRef } from 'react';
import MenuComponent from '../../components/MenuComponents/MenuComponent';
import LocalizeComponent from '../../localize/LocalizeComponent';
import Grid from '@material-ui/core/Grid';
import config from '../../config/config';
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

import userProfilePhotoUpload from './userProfilePhotoUpload';



const BottomFunc = () => {


  const [backgroundImageUrl,setBackgroundImageUrl] = useState("https://bladenonline.com/wp-content/uploads/2020/04/shutterstock_753167914_1.jpg");
  const [userBackgroundImageUrl,setUserBackgroundImageUrl] = useState("https://echohub.io/newimages/no-image.png");

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

      SetprogressBarValueA(personalObject.points);
      SetUserData(personalObject);

    });

    const utilTwo = ProfileService.listenUpdateUsersData().subscribe(response => {

    });

    ProfileService.getOwnData();

    return () => {
        util.unsubscribe();
        utilTwo.unsubscribe();
    }
  },[])



  return (

    <div id="opacityControl">
      <MenuComponent />

      <Grid container className="projectContainer"  >


        <div className="u_background" style={ { backgroundPosition: "center",backgroundRepeat:"no-repeat",backgroundSize:"cover",background: "url(" + backgroundImageUrl + ") no-repeat center/cover" }}>

        </div>

        <div className="infoPanelCover">
            <div className="infoPanel robotoFont blackColor">


                      <div className="centerElements">
                          <div className="u_image u_imagePosition" style={ { backgroundPosition: "center",backgroundRepeat:"no-repeat",backgroundSize:"cover",background: "url(" + userBackgroundImageUrl + ") no-repeat center/cover" }}></div>
                      </div>

                      {
                        editMode === 0 ? (
                          <EditIcon className="editIcon" onClick={event => EditMode(1)}/>
                        ) : (
                          <DoneAllIcon className="doneIcon" onClick={event => EditMode(0)}/>
                        )
                      }


                      <userProfilePhotoUpload />



                    <div className="u_imageRole ">
                          {LocalizeComponent.c_19}
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
                          {userData.subscribers_count} subscribers | {userData.points} points
                    </div>

                    <div className="userProgressBlock">


                      <ProgressIndicator name={LocalizeComponent.user_2} first={widthValueFirstA} second={widthValueSecondA} />

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
