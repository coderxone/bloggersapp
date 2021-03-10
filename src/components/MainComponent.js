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
import blComponent from '../components/blComponent';




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

              <div className="Login_sign_in"  onClick={goToLogin}>
                <div className="Login_sign_in_text">
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
              <div className="creatorButtonDisabled" onClick={goToBloggerPage}>
                <div className="textCreatorActiv">
                  Creator
                </div>
              </div>
              <div className="creatorButtonTwoDisabled" onClick={goToBusinessPage}>
                <div className="textCreatorTwoDisabled">
                  Business
                </div>
              </div>
              <div >

              </div>
            </div>




            <div className="BackgroundText">
                <div className="BackgroundTextV">
                  <span className="IO_size">.IO</span> - is a new, effective way of spreading information through a network of pooled bloggers.
                </div>
            </div>


            {
              BusinessSwitcher == 0 &&
              (
                <BusinessPageComponent />
              )
            }


    </Grid>




  );

}




export default BottomFunc;
