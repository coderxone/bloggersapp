import React, { useCallback,useEffect } from 'react';
import AnimationComponent from '../components/AnimationComponent';
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
import backgroundVector from '../images/main/BackgroundVectorTwo.png';


import {
  useHistory,
} from "react-router-dom";

const BottomFunc = () => {

  const history = useHistory();

  const goToLogin = useCallback(() => {

    return history.push('/login'), [history]

  });

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



        <div className="backgroundCl">
            <img width="100%"  src={backgroundVector}/>
        </div>

        <div className="Rolebuttons">
          <div className="creatorButton">
            <div className="textCreator">
              Creator
            </div>
          </div>
          <div >

          </div>
        </div>




    </Grid>




  );

}




export default BottomFunc;
