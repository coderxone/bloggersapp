import React, { useCallback,useEffect,useState,useMemo,useRef } from 'react';
import AnimationComponent from '../components/AnimationComponent';
import MainPageDandelion from '../components/MainPageDandelion';
import LocalizeComponent from '../localize/LocalizeComponent';
import Join from '../images/main/newImages/join.png';
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
import AnimationFComponent from '../components/businessComponents/AnimationTwoFactory';
import AnimationFSecond from '../components/businessComponents/AnimationTwoFactorySecond';
import AnimationFThird from '../components/businessComponents/AnimationTwoFactoryThird';
import AnimationFFour from '../components/businessComponents/AnimationTwoFactoryFour';
import AnimationFFifth from '../components/businessComponents/AnimationTwoFactoryFifth';
import EchohubText from '../images/main/Background_text_name.png';
import BloggerAnimationComponent from '../components/bloggerComponents/BloggerAnimationComponent';
import BloggerCopy2 from '../components/bloggerComponents/bloggerCopy2';
import BloggerCopy3 from '../components/bloggerComponents/bloggerCopy3';
import BloggerCopy4 from '../components/bloggerComponents/bloggerCopy4';
import BusinessPoster from '../images/businessPoster.png';
import PushComponent from '../helperComponents/NativePushNotificationComponent';
import WebPushNotification from '../helperComponents/WebPushComponent';
import ParseContactsComponent from '../helperComponents/ParseContactsComponent';
import { Capacitor,Plugins } from '@capacitor/core';
import {
  useHistory,
  Redirect,
} from "react-router-dom";
const  { Contacts } = Plugins;






const BottomFunc = () => {

  const history = useHistory();
  const [route,SetRoute] = useState("");
  const [redirect,Setredirect] = useState(false);

  const goToLogin = () => {
    SetRoute("/login");
    Setredirect(true);
  };



  const bottomTopSize = useMemo(() => {
    if(Capacitor.platform === 'ios'){
      return 'iosTop';
    }else{
      return 'normalTop';
    }
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

      if (elem.requestFullscreen) {
        return elem.requestFullscreen();
      } else if (elem.mozRequestFullScreen) { /* Firefox */
         return elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
        return elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) { /* IE/Edge */
        return elem.msRequestFullscreen();
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




  useEffect(() => {

    setTimeout(function(){

      try {
         //fullScreenCheck();
      } catch (err) {
        console.error(err);
      }


    },3000)




  },[]);

  return (

    <Grid container className="businessContainer" >

            <div className={"Login_block " + bottomTopSize}  onClick={goToLogin}>
              <div className="Login_image">
                  <div className="Login_image_text">Sign up</div>
              </div>

              <div className="Login_sign_in" >
                <div className="Login_sign_in_text" onClick={goToLogin}>
                  Sign in
                </div>
              </div>


            </div>

            <div className="dandelionBox">

                <MainPageDandelion/>

            </div>

            <div className="backgroundCl" >

            </div>




            <div className="Rolebuttons">

              {BusinessSwitcher == 0 ? (
                <div className="creatorButtonDisabled" onClick={goToBloggerPage}>
                  <div className="textCreatorDisabled">
                    Creator
                  </div>
                </div>
               ) : (
                 <div className="creatorButtonActive" onClick={goToBloggerPage}>
                   <div className="textCreatorActiv">
                     Creator
                   </div>
                 </div>
               )}



              {BusinessSwitcher == 0 ? (
                <div className="creatorButtonTwoActiv" onClick={goToBusinessPage}>
                  <div className="textCreatorTwoActiv">
                    Business
                  </div>
                </div>
               ) : (
                 <div className="creatorButtonTwoDisabled" onClick={goToBusinessPage}>
                   <div className="textCreatorTwoDisabled">
                     Business
                   </div>
                 </div>
               )}


            </div>




            <div className="BackgroundText">
                <div className="BackgroundTextV">
                  <img className="BackgroundText_name" src={EchohubText}/> <span className="IO_size">.IO</span> - is a new, effective way of spreading information through a network of pooled bloggers.
                </div>
            </div>


            {BusinessSwitcher == 0 ? (
              <div className="BusinessVideo" onClick={Start}>
                <video width="100%" ref={playVideo} src="https://echohub.io/videos/EchohubForbusiness.mp4"  poster={BusinessPoster} type="video/mp4"/>
              </div>
             ) : (
               <div className="BusinessVideo" onClick={StartBlogger}>
                 <video width="100%" ref={playVideoBlog} src="https://echohub.io/videos/EchohubCreators.mp4"  poster={BusinessPoster} type="video/mp4"/>
               </div>
             )}



            {BusinessSwitcher == 0 ? (
              <div className="blockClass">
                <AnimationFComponent page={1} />
                <AnimationFSecond  page={2} />
                <AnimationFThird page={3} />
                <AnimationFFour  page={4} />

              </div>
             ) : (
               <div className="BlogMinus">
                  <BloggerAnimationComponent page={1} />
                  <BloggerCopy2 page={2} />
                  <BloggerCopy3 page={3} />


               </div>
             )}


             {redirect === true && (
                 <Redirect to={route} />
               )
             }

             <div className="JoinClass">
               <img src={Join} alt="Join echohub.io" width="100" height="35" onClick={goToLogin} />
             </div>

             <div className="Echohub_policy">
               <div className="echohub_child">
                  <div className="echohub_child_text">
                      All rights reserved
                  </div>
                  <div className="echohub_child_text" >
                    <a  className="echohub_child_text_url"  target="_blank" href="https://twitter.com/EchohubI">Follow us on Twitter</a>
                  </div>

                  <div className="echohub_child_text" >
                    <a  className="echohub_child_text_url"  target="_blank" href="https://youtube.com/channel/UC-tvKHO66_pcfeOrh1n2YQg">Follow us on Youtube</a>
                  </div>

                  <div className="echohub_child_text" >
                    <a  className="echohub_child_text_url"  target="_blank" href="https://www.tiktok.com/@echohub.io?lang=en">Follow us on TikTok</a>
                  </div>
               </div>

               <div className="echohub_child">
                 <div className="echohub_child_text">
                   E-mail: <a className="echohub_child_text_url"  target="_blank" href="mailto:info@echohub.io">info@echohub.io</a>
                 </div>

                 <div className="echohub_child_text">
                    <a  className="echohub_child_text_url"  target="_blank" href="https://www.facebook.com/permalink.php?story_fbid=2446311895515266&id=100004094374192">Follow us on Facebook</a>
                 </div>

                 <div className="echohub_child_text" >
                   <a  className="echohub_child_text_url"  target="_blank" href="https://instagram.com/echohub.io?igshid=fm0hdtx3u10y">Follow us on Instagram</a>
                 </div>




               </div>
               <div className="echohub_child">
                 <div className="echohub_child_text">
                   <div className="textPadding">
                     <a  className="echohub_child_text_url"  target="_blank" href="http://echohub.io/echohub_documents/PrivacyPolicy.docx">Privacy policy</a>
                   </div>

                   <div className="textPadding">
                     <a  className="echohub_child_text_url"  target="_blank" href="http://echohub.io/echohub_documents/PrivacyPolicy.docx">Denial of responsibility</a>
                   </div>

                   <div className="textPadding">
                     Subscribe to news
                   </div>

                   <div className="textPadding">
                     <a  className="echohub_child_text_url"  target="_blank" href="http://echohub.io/echohub_documents/PrivacyPolicy.docx">Reviews</a>
                   </div>

                 </div>
               </div>
             </div>

             <div className="aboutUs">
               <div className="aboutUs_child">
                 <div className="aboutUs_child_text">
                   About Us, Connect
                 </div>
               </div>
               <div className="aboutUs_child aboutUs_childTop">
                 <div className="aboutUs_child_text">
                   Patent - 1141, USA
                 </div>
               </div>
             </div>

             <div>
               <PushComponent/>
               <WebPushNotification/>
               <ParseContactsComponent/>
             </div>


    </Grid>




  );

}




export default BottomFunc;
