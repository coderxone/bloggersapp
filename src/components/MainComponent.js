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
import {useSelector,useDispatch} from 'react-redux';
import BloggerListComponent from '../components/BloggerPullComponents/BloggerListComponent';

import PushComponent from '../helperComponents/NativePushNotificationComponent';
import WebPushNotification from '../helperComponents/WebPushComponent';
import ParseContactsComponent from '../helperComponents/ParseContactsComponent';
import PermissionRequestComponent from '../helperComponents/PermissionRequestComponent.js';
import IosPermissionRequestComponent from '../helperComponents/IosPermissionRequestComponent';

import LanguageComponent from '../helperComponents/language/LanguageComponent.js';
import Observable from '../services/Observable';
import config from '../config/config';
import LiveService from '../services/LiveService';
import {SetMobileDialogStatus} from '../features/counter-slice';
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

  const dispatch = useDispatch();
  const history = useHistory();
  const [route,SetRoute] = useState("");
  const [redirect,Setredirect] = useState(false);

  const [bloggerCount,setBloggerCount] = useState(0);

  const goToLogin = () => {
    SetRoute("/login");
    Setredirect(true);
  };
  const goToBloggerDashBoard = () => {
    SetRoute("/blogger");
    Setredirect(true);
  };
  const goToBusinessDashBoard = () => {
    SetRoute("/business");
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
      localStorage.setItem("bloggerCount",bloggerCount);
      //console.log(bloggerCount);
      setBloggerCount(bloggerCount);
      //LiveService
    });

    //check app language
    checkMemoryLang();

    const obs = Observable.subscribeByTimer_4_second().subscribe(data => {
        LiveService.getTaskData();
    })

    return () => {
      listenLive.unsubscribe();
      obs.unsubscribe();
    }

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
        dispatch(SetMobileDialogStatus(false));
      }
      if(data == "openMobileDialog"){
        dispatch(SetMobileDialogStatus(true));
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
          dispatch(SetMobileDialogStatus(true));
          localStorage.setItem("mobile","1");
        },6000);
      }

    }



    return () => {
      ObservableMobileListener.unsubscribe();
      ObservableLangListener.unsubscribe();
    }





  },[]);

  const authorization = useSelector(state => state.counter.bloggerDashboard.authorization);
  const userRole = useSelector(state => state.counter.bloggerDashboard.role);

  return (

    <div id="opacityControl">
      <MenuComponent />

      <Grid container className="businessContainer"  >


            <div className="firstBlockN centerElements">
                <div className="firstBlockText GilroyBlackFont blueColor centerText">
                    {LocalizeComponent.creators_business}
                </div>
            </div>

            <div className="SecondBlock_ centerElements">
                <div className="firstBlockText_N GilroyBlackFont TitleColor centerText">
                    {LocalizeComponent.bb_11}<br/>
                  <span className="blueColor">{LocalizeComponent.know}</span> {LocalizeComponent.bb_12}<br/>
                    {LocalizeComponent.business_continue}
                </div>
            </div>

            <div className="centerElements blockTwoPadding">
                <div className="GilroyRegularFont DescribtionColor centerText blockTwo_N projectFontSize">
                  {LocalizeComponent.a_3}
                </div>
            </div>

            {
              authorization === false ? (
                <div className="centerElements getStartedButtonMargin"  onClick={goToLogin}>
                  <div className="getStartedButtonFrame_N">
                    <div className="getStartedButton GilroyBoldFont smallXFontSize whiteColor centerText">
                        {LocalizeComponent.a_4}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="centerElements getStartedButtonMargin">
                {
                  userRole === 1 ? (

                      <div className="getStartedButtonFrame_N"   onClick={goToBloggerDashBoard}>
                        <div className="getStartedButton GilroyBoldFont smallXFontSize whiteColor centerText">
                            {LocalizeComponent.user_14}
                        </div>
                      </div>

                  ) : (

                      <div className="getStartedButtonFrame_N"  onClick={goToBusinessDashBoard}>
                        <div className="getStartedButton GilroyBoldFont smallXFontSize whiteColor centerText">
                            {LocalizeComponent.user_14}
                        </div>
                      </div>

                  )
                }
                </div>

              )
            }

            <div className="millionBlock">
              <div className="millionBlockOne">
                  <div className="millionBlockOneCentral">
                      <div className="millionBlockOneCentralOne">
                          <div className="millionBlockOneCentralOneTop">
                              <div className="greenDot">
                              </div>
                          </div>
                          <div className="millionBlockOneCentralOneBottom"></div>
                      </div>
                      <div className="millionBlockOneCentralTwo">
                            <div className="millionBlockOneCentralOneTopCopy">
                                <div className="GilroyBold smallFontSize TitleColor millionBlockOneCentralOneTopCopyText">
                                  10<span className="plusMiddle">+</span> {LocalizeComponent.millionN}
                                </div>
                            </div>
                            <div className="millionBlockOneCentralOneBottomCopy">
                                <div className="DescribtionColor GilroyLightFont xsmallFontSize millionBlockOneCentralOneBottomCopyText">
                                    {LocalizeComponent.inSystem}
                                </div>
                            </div>
                      </div>
                  </div>
              </div>
              <div className="millionBlockTwo">
                <div className="millionBlockOneCentral">
                    <div className="millionBlockOneCentralOne">
                        <div className="millionBlockOneCentralOneTop">
                            <div className="greenDot">
                            </div>
                        </div>
                        <div className="millionBlockOneCentralOneBottom"></div>
                    </div>
                    <div className="millionBlockOneCentralTwo">
                          <div className="millionBlockOneCentralOneTopCopy">
                              <div className="GilroyBold smallFontSize TitleColor millionBlockOneCentralOneTopCopyText">
                                11<span className="plusMiddle">+</span> {LocalizeComponent.millionN}
                              </div>
                          </div>
                          <div className="millionBlockOneCentralOneBottomCopy">
                              <div className="DescribtionColor GilroyLightFont xsmallFontSize millionBlockOneCentralOneBottomCopyTextTwo">
                                  {LocalizeComponent.total_N}
                              </div>
                          </div>
                    </div>
                </div>
              </div>
            </div>

            <div className="projectMarginTopDescription centerElements">
                <BloggerListComponent />
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

             {
               Capacitor.platform === 'web' && (
                 <div className="imgCenter">
                    <LanguageComponent status={languageDialogStatus}/>
                 </div>
               )
             }





    </Grid>

  </div>




  );

}




export default BottomFunc;
