import React, { useCallback,useEffect,useState,useMemo,useRef } from 'react';
import MenuComponent from '../../components/MenuComponents/MenuComponent';
import LocalizeComponent from '../../localize/LocalizeComponent';
import Grid from '@material-ui/core/Grid';
import config from '../../config/config';
import { connect } from 'react-redux';
import '../../components/profileComponents/userProfileComponent.scss';
import './NewsComponent.scss';
import ProgressIndicator from '../../helperComponents/progressIndicator';
import ProfileService from '../../services/ProfileService';
import EditIcon from '@material-ui/icons/Edit';

import {
  Link,useHistory
} from "react-router-dom";

import DoneAllIcon from '@material-ui/icons/DoneAll';

import UserProfilePhotoUpload from '../profileComponents/userProfilePhotoUpload';
import { useSelector, useDispatch } from 'react-redux'
import { EnableBackButton } from '../../features/counter-slice';
import background from '../../images/background.jpeg';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import RemoveRedEyeIcon from '@material-ui/icons/RemoveRedEye';
import TextField from '@mui/material/TextField';
import NewsService from '../../services/NewsService';




const mapStateToProps = (state) => {
  return state;
}

const NewsComponent = (props) => {


  var id = useMemo(() => {

      let reg = /^\d+$/;
      let hashId = props.match.params.id;
      let check = reg.test(hashId)
      if(check){
        return hashId;
      }
      return false;

  },[]);

  const count = useSelector((state) => state.counter.value);
  const IMAGE_DATA = useSelector((state) => state.counter.IMAGE_DATA);
  const BACKGROUND_IMAGE_DATA = useSelector((state) => state.counter.BACKGROUND_IMAGE_DATA);
  const dispatch = useDispatch();
  const newsEditMode = useSelector((state) => state.counter.newsEditMode);



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
    //enable backButton
    dispatch(EnableBackButton(true));
    

    let listenRequestNewsData = NewsService.listenRequestNewsData().subscribe(data => {
      if(data.status === "ok"){
          SetTitle(data.results[0].title);
          SetDescription(data.results[0].description);
          SetCategory(data.results[0].category);
          SetDate(data.results[0].date + " hours ago");
      }
    })

    // props.reduxStorage.getState(res => {
    //   console.log(res);
    // })
    NewsService.requestNewsData(id);


    return () => {
        util.unsubscribe();
        utilTwo.unsubscribe();
        listenRequestNewsData.unsubscribe();
        dispatch(EnableBackButton(false));
    }
  },[id]);

  const hibrydClass = newsEditMode === 1 ? "GilroyBlackFont whiteColor editFrame" : "GilroyBlackFont whiteColor newsFrame";
  const [category,SetCategory] = useState("Sport");
  const [title,SetTitle] = useState("Example Title");
  const [description,SetDescription] = useState("example description");
  const [date,SetDate] = useState("4 hours ago");

  const changeItem = (itemName,value) => {

    
      switch (itemName) {
        case 'category':
          SetCategory(value);
        break;
        
        case 'title':
          SetTitle(value);
        break;

        case 'description':
          SetDescription(value);
        break;
      }
    
      
  }

  useMemo(() => {

    let obj = {
      category:category,
      title:title,
      description:description,
      id:id
    }

    if(category.length > 2 && title.length > 2 && description.length > 2){
      NewsService.updateNewsData(obj);
    }

  },[category,title,description,id]);

  return (

    <div id="opacityControl">
      <MenuComponent />

      <Grid container className="projectContainer"  >

        {
          switchDownloadedBackgroundImage === 0 ? (
            <div className="news_u_background" style={ { backgroundPosition: "center",backgroundRepeat:"no-repeat",backgroundSize:"cover",background: "url(" + background + ") no-repeat center/cover" }}>
              <div className={hibrydClass}>
                {
                  newsEditMode === 1 ? (
                    
                    <div className="editInputBackground">
                      <TextField
                        label="Category"
                        variant="standard"
                        multiline
                        className="fullSelect"
                        value={category}
                        onChange={event => changeItem('category',event.target.value)}
                      />
                    </div>
                    
                  ):(
                    <div >{category}</div>
                  )
                }
                
                <div className="textOpacity">{date}</div>

                {
                  newsEditMode === 1 ? (
                    
                    <div className="editInputBackground">
                      <TextField
                        label="Title"
                        variant="standard"
                        multiline
                        className="fullSelect"
                        onChange={event => changeItem('title',event.target.value)}
                        value={title}
                      />
                    </div>
                    
                  ):(
                    <h2 className="whiteOpacity">
                      {
                        title
                      }
                    </h2>
                  )
                }

                
              </div>
            </div>
          ) : (
            <img className="news_u_background" src={BACKGROUND_IMAGE_DATA}  />
          )
        }

        <style>{`
            .menuContainer{
                position: absolute;
            }
            .backabsolute{
                left:5px;
                background-color:rgba(29,32,46,0.2);
            }
        `}</style>


        <div className="newsInfoPanelCover">
            <div className="newsInfoPanel robotoFont blackColor">

              <div className="newsGridContainer GilroyRegularFont">
                <div className="newsGridItems">
                  <div className="subGridItems">
                      <div className="author_image" style={ { backgroundPosition: "center",backgroundRepeat:"no-repeat",backgroundSize:"cover",background: "url(" + background + ") no-repeat center/cover" }}>
                      </div>
                  </div>
                  <div className="subGridItems">
                      <div className="author_text">John Agger</div>
                  </div>
                </div>
                <div className="newsGridItemsTwo">
                  <div className="subGridItems">
                      <AccessTimeIcon className="newsClock"/>
                  </div>
                  <div className="subGridItems">
                    <div className="author_text">2 min</div>
                  </div>
                </div>
                <div className="newsGridItems">
                  <div className="subGridItems">
                      <RemoveRedEyeIcon className="newsClock" />
                  </div>
                  <div className="subGridItems">
                    <div className="author_text">234 views</div>
                  </div>
                </div>
              </div>

              {
                  newsEditMode === 1 ? (
                    
                    <div className="editInputBackground newsDescription">
                      <TextField
                        label="Decription"
                        variant="standard"
                        multiline
                        className="fullSelect"
                        onChange={event => changeItem('description',event.target.value)}
                        value={description}
                      />
                    </div>
                    
                  ):(
                    <div className="GilroyRegularFont smallFontSize newsDescription">
                      {
                        description
                      }
                    </div>
                  )
                }

              




            </div>
        </div>













    </Grid>




  </div>




  );

}


 export default NewsComponent;
