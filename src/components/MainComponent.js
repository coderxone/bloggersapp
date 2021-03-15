import React, { useCallback,useEffect,useState } from 'react';
import AnimationComponent from '../components/AnimationComponent';
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
import BusinessPageComponent from '../components/bComponent';
import AnimationFComponent from '../components/businessComponents/AnimationTwoFactory';
import AnimationFSecond from '../components/businessComponents/AnimationTwoFactorySecond';
import AnimationFThird from '../components/businessComponents/AnimationTwoFactoryThird';
import AnimationFFour from '../components/businessComponents/AnimationTwoFactoryFour';

import BloggerAnimationComponent from '../components/bloggerComponents/BloggerAnimationComponent';
import BloggerCopy2 from '../components/bloggerComponents/bloggerCopy2';
import BloggerCopy3 from '../components/bloggerComponents/bloggerCopy3';
import BloggerCopy4 from '../components/bloggerComponents/bloggerCopy4';




import {
  useHistory,
} from "react-router-dom";

const BottomFunc = () => {

  const history = useHistory();

  const goToLogin = useCallback(() => {

    return history.push('/login'), [history]

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

            <div className="Login_block"  onClick={goToLogin}>
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
                  <span className="IO_size">.IO</span> - is a new, effective way of spreading information through a network of pooled bloggers.
                </div>
            </div>



            {BusinessSwitcher == 0 ? (
              <div>
                <AnimationFComponent page={1} />
                <AnimationFSecond  page={2} />
                <AnimationFThird page={3} />
                <AnimationFFour  page={4} />

              </div>
             ) : (
               <div>
                  <BloggerAnimationComponent page={1} />
                  <BloggerCopy2 page={2} />
                  <BloggerCopy3 page={3} />


               </div>
             )}


    </Grid>




  );

}




export default BottomFunc;
