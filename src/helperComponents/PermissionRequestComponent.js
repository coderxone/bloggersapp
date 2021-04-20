import React, { useEffect,useState } from 'react'
import config from '../config/config.js';
import { Capacitor,Plugins } from '@capacitor/core';
import {
  useHistory,
  Redirect,
} from "react-router-dom";
const { Geolocation } = Plugins;


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




  useEffect(() => {

      if(Capacitor.platform === "android"){
        requestPermissions();
      }

      //ios functions
      var watchIdAndroidIos = null;
      if(Capacitor.platform === 'ios'){
        watchIdAndroidIos = Geolocation.watchPosition(SuccessAndroidWatcher,ErrorAndroidPosition,options);
      }

      return () => {
          if(watchIdAndroidIos != null){
            if(Capacitor.platform === 'ios'){
              Geolocation.clearWatch(watchIdAndroidIos);
            }
          }
      }
        //ios functions


  }, []);

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
