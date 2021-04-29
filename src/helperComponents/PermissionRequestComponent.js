import React, { useEffect,useState } from 'react'
import config from '../config/config.js';
import { Capacitor,Plugins } from '@capacitor/core';
import { Response } from 'capacitor-ios-app-tracking';
import {
  useHistory,
  Redirect,
} from "react-router-dom";
const { Geolocation } = Plugins;
const { IOSAppTracking } = Plugins;

const RequestPermissionComponent = () => {

  const [redirect,Setredirect] = useState(false);
  const [route,SetRoute] = useState("");

  const goToPush = (url) => {
    SetRoute("/" + url);
    Setredirect(true);
  };




  const requestPermissions = () => {

      //first lets check permissions
      const permission = Geolocation.requestPermissions().then((permission) => {

      });

  }

  const SuccessAndroidWatcher = (position) => {

  }

  const ErrorAndroidPosition = (data) => {

  }

  var options = {
    maximumAge: 40000,
    enableHighAccuracy: true,
    timeout: 40000
  }
  //ios permissions
  const [ response, setResponse ] = useState(0);




  useEffect(() => {

      if(Capacitor.platform === "android"){
        requestPermissions();
      }

      //ios functions
      var watchIdAndroidIos = null;
      if(Capacitor.platform === 'ios'){

        IOSAppTracking.getTrackingStatus().then((res) => {
          console.log("tracking response");
          setResponse(1);
          console.log(res);
        });

        IOSAppTracking.requestPermission().then((res) => {
          console.log(res);
        });

        //watchIdAndroidIos = Geolocation.watchPosition(SuccessAndroidWatcher,ErrorAndroidPosition,options);
      }

      return () => {
          // if(watchIdAndroidIos != null){
          //   if(Capacitor.platform === 'ios'){
          //     Geolocation.clearWatch(watchIdAndroidIos);
          //   }
          // }
      }
        //ios functions


  }, []);

  // useEffect(() => {
  //
  //   if(Capacitor.platform === 'ios'){
  //       if(response.status === 'unrequested') {
  //         console.log("tracking unrequested");
  //
  //       }else{
  //         console.log("tracking response");
  //         console.log(response);
  //       }
  //   }
  // },[response]);



return (
  <div>

      <div>
      {redirect === true && (
          <Redirect to={route} />
        )
      }
      </div>
  </div>
);
}
export default RequestPermissionComponent;
