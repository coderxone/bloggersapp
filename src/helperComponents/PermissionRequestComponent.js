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




  useEffect(() => {

      if(Capacitor.platform !== "web"){
        requestPermissions();
      }


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
