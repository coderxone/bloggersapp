import React, { useCallback,useEffect,useState,useMemo,useRef } from 'react';
import MenuComponent from '../components/MenuComponents/MenuComponent';
import MainPageDandelion from '../components/MainPageDandelion';
import LocalizeComponent from '../localize/LocalizeComponent';
import Grid from '@material-ui/core/Grid';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import DynamicFeedIcon from '@material-ui/icons/DynamicFeed';
import MultilineChartIcon from '@material-ui/icons/MultilineChart';
import NetworkCheckIcon from '@material-ui/icons/NetworkCheck';
import PublicIcon from '@material-ui/icons/Public';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import DescriptionIcon from '@material-ui/icons/Description';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import LocationSearchingIcon from '@material-ui/icons/LocationSearching';
import ComputerIcon from '@material-ui/icons/Computer';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import FaceIcon from '@material-ui/icons/Face';
import AnnouncementIcon from '@material-ui/icons/Announcement';
import CenterFocusStrongIcon from '@material-ui/icons/CenterFocusStrong';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import WorkIcon from '@material-ui/icons/Work';



import PushComponent from '../helperComponents/NativePushNotificationComponent';
import WebPushNotification from '../helperComponents/WebPushComponent';
import ParseContactsComponent from '../helperComponents/ParseContactsComponent';
import PermissionRequestComponent from '../helperComponents/PermissionRequestComponent.js';
import IosPermissionRequestComponent from '../helperComponents/IosPermissionRequestComponent';
import MobileAppComponent from '../helperComponents/mobileAppComponent';
import LanguageComponent from '../helperComponents/language/LanguageComponent.js';
import Observable from '../services/Observable';
import config from '../config/config';
import LiveService from '../services/LiveService';
import { Capacitor,Plugins } from '@capacitor/core';
import {
  Link,useHistory,
  Redirect,
} from "react-router-dom";
 const  { StatusBar } = Plugins;
 //LocalizeComponent.setLanguage("ru");

 const DetectLanguage = () => {


   var lang = config.getUserItemName("lang");
   if(lang != false){
     if(lang === "ru"){
       LocalizeComponent.setLanguage("ru");
     }
   }



 }


DetectLanguage();



const BottomFunc = () => {

  const history = useHistory();
  const [route,SetRoute] = useState("");
  const [redirect,Setredirect] = useState(false);

  const [bloggerCount,setBloggerCount] = useState(0);

  const goToLogin = () => {
    SetRoute("/login");
    Setredirect(true);
  };

  const goToAbout = () => {
    SetRoute("/about");
    Setredirect(true);
  };



  const bottomTopSize = useMemo(() => {
    if(Capacitor.platform === 'ios'){
      return 'iosTop';
    }else{
      return 'normalTop';
    }
    //return 'iosTop';
  });


  const [BusinessSwitcher,SetBusinessSwitcher] = useState(0);

  const goToBusinessPage = (() => {

    SetBusinessSwitcher(0);

  });

  const goToBloggerPage = (() => {

    SetBusinessSwitcher(1);

  });

  // const goToBusinessPage = useCallback(() => {
  //
  //   return history.push('/echohub-for-business'), [history]
  //
  // });
  //
  // const goToBloggerPage = useCallback(() => {
  //
  //   return history.push('/echohub-for-bloggers'), [history]
  //
  // });

  var elem = document.documentElement;

  const fullScreenCheck = () => {

      try{
        if (elem.requestFullscreen) {
          return elem.requestFullscreen();
        } else if (elem.mozRequestFullScreen) { /* Firefox */
           return elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
          return elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) { /* IE/Edge */
          return elem.msRequestFullscreen();
        }
      }catch(e){
        return false;
      }


  }

  const playVideo = useRef(null);
  const playVideoBlog = useRef(null);
  const [playState,SetPlayState] = useState(0);
  const [playStateBlogger,SetPlayStateBlogger] = useState(0);

  const Start = () => {
    if(playState === 0){
      playVideo.current.play();
      SetPlayState(1);
    }else{
      SetPlayState(0);
      playVideo.current.pause();
    }
  }

  const StartBlogger = () => {
    if(playStateBlogger === 0){
      playVideoBlog.current.play();
      SetPlayStateBlogger(1);
    }else{
      SetPlayStateBlogger(0);
      playVideoBlog.current.pause();
    }
  }

  const hideStatusBar = () => {
    StatusBar.hide();
  }



  const [mobileDialogStatus,SetMobileDialogStatus] = useState(false);
  const [languageDialogStatus,SetLanguageDialogStatus] = useState(false);


  const checkMemoryLang = () => {
    var lang = config.getUserItemName("lang");

    if(lang === false){
      SetLanguageDialogStatus(true);
    }
  }
  useEffect(() => {
    const listenLive = LiveService.listenUserDataTask().subscribe(data => {
      //console.log(data);
      var bloggerCount = data.results.length;
      //console.log(bloggerCount);
      setBloggerCount(bloggerCount);
      //LiveService
    });

    //check app language
    checkMemoryLang();

    const obs = Observable.subscribeByTimer_4_second().subscribe(data => {
        LiveService.getTaskData();
    })
  },[])

  const UpdatePageLanguage = () => {
    setTimeout(function(){
      window.location.reload();
    },2000);

  }

  useEffect(() => {

    setTimeout(function(){

      try {
        if(Capacitor.platform === 'web'){
           //fullScreenCheck();

        }else{
          hideStatusBar();
        }

      } catch (err) {
        console.error(err);
      }


    },3000);
//xx
    var ObservableMobileListener = Observable.getData_subjectMob().subscribe(data => {
      //console.log(data);
      if(data == "closeMobileDialog"){
        SetMobileDialogStatus(false);
      }
      if(data == "openMobileDialog"){
        SetMobileDialogStatus(true);
      }

    })
    var ObservableLangListener = Observable.getData_subjectLang().subscribe(data => {
      console.log(data);
      if(data == "closeLangDialog"){
        SetLanguageDialogStatus(false);
        UpdatePageLanguage();
      }
      if(data == "openLangDialog"){
        SetLanguageDialogStatus(true);
      }
    })

    if(Capacitor.platform === 'web'){

      var mobile = localStorage.getItem("mobile");

      if((!mobile) && (mobile !== "1")){
        setTimeout(function(){
          SetMobileDialogStatus(true);
          localStorage.setItem("mobile","1");
        },6000);
      }

    }





    return () => {
      ObservableMobileListener.unsubscribe();
      ObservableLangListener.unsubscribe();
    }





  },[]);

  return (

    <div id="opacityControl">
      <MenuComponent />

      <Grid container className="businessContainer"  >



            <div className="firstBlock centerElements">
                <div className="firstBlockText robotoFont blackColor centerText">
                    {LocalizeComponent.a_1}<br/>
                    {LocalizeComponent.a_2}
                </div>
            </div>

            <div className="centerElements blockTwoPadding">
                <div className="robotoFont blackColor centerText blockTwo projectFontSize">
                  {LocalizeComponent.a_3}
                </div>
            </div>

            <div className="centerElements getStartedButtonMargin">
              <div className="getStartedButtonFrame">
                <div className="getStartedButton robotoFont smallFontSize blackColor centerText">
                    {LocalizeComponent.a_4}
                </div>
              </div>
            </div>

            <div className="mainPageDeviderBlock">
              <div className="mainPageDevider"></div>
            </div>







             {redirect === true && (
                 <Redirect to={route} />
               )
             }






             <div>
               <PushComponent/>
               <WebPushNotification/>
               <ParseContactsComponent/>
               <PermissionRequestComponent/>
               {
                 Capacitor.platform === 'ios' && (
                   <IosPermissionRequestComponent/>
                 )
               }
             </div>





    </Grid>

  </div>




  );

}




export default BottomFunc;
