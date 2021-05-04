import React, { useEffect,useState } from 'react'
import config from '../config/config.js';
import { Capacitor,Plugins } from '@capacitor/core';
const { IOSAppTracking } = Plugins;

const IosRequestPermissionComponent = () => {





  useEffect(() => {



      //ios functions
      var watchIdAndroidIos = null;
      if(Capacitor.platform === 'ios'){

        IOSAppTracking.getTrackingStatus().then((res) => {
          console.log("tracking response");
          //setResponse(1);
          console.log(res);
        });

        IOSAppTracking.requestPermission().then((res) => {
          console.log("tracking permission");
          console.log(res);
        });


      }


        //ios functions


  }, []);





return (
  <div>

  </div>
);
}
export default IosRequestPermissionComponent;
