import React, { useEffect,useState } from 'react'
import { Capacitor,Plugins, PushNotification, PushNotificationToken, PushNotificationActionPerformed } from '@capacitor/core';
import {
  useHistory,
  Redirect,
} from "react-router-dom";

import HomeService from '../services/Homeservice.js';
const { PushNotifications } = Plugins;


const RemotePushController = () => {

  const [redirect,Setredirect] = useState(false);
  const [route,SetRoute] = useState("");

  const goToPush = (url) => {
    SetRoute("/" + url);
    Setredirect(true);
  };

  const NativePush = () => {
        // Register with Apple / Google to receive push via APNS/FCM
        PushNotifications.requestPermission().then( result => {
        if (result.granted) {
          // Register with Apple / Google to receive push via APNS/FCM
          PushNotifications.register();
        } else {
          // Show some error
        }
      });


      // On succcess, we should be able to receive notifications
      PushNotifications.addListener('registration',
        (token) => {
          var tokenValue = token.value;
          localStorage.setItem("saveNativeFirebaseToken",tokenValue);
          localStorage.setItem("saveNativeFirebaseTokenActive","1");

          console.log('Push registration success, token: ' + JSON.stringify(token));
        }
      );

      // Some issue with your setup and push will not work
      PushNotifications.addListener('registrationError',
        (error) => {
          //console.log('Error on registration: ' + JSON.stringify(error));
        }
      );

      // Show us the notification payload if the app is open on our device
      PushNotifications.addListener('pushNotificationReceived',
        (notification) => {
          console.log(JSON.stringify(notification));
          var title = notification.title;
          var message = notification.body;
          try{
            var redirectUrl = notification.data.url;
            if(redirectUrl){
              goToPush(redirectUrl);
            }
          }catch(e){

          }

          //{"id":"0:1617565724738684%386ed691386ed691","data":{},"title":"hi guys","body":"from echohub"}
        }
      );

      // Method called when tapping on a notification
      PushNotifications.addListener('pushNotificationActionPerformed',
        (notification) => {
          //console.log(JSON.stringify(notification));
        }
      );
    }



  useEffect(() => {
        const listenSaveNative = HomeService.listensaveNativeFirebaseToken().subscribe(data => {
          console.log(data);
        });

      if(Capacitor.platform !== 'web'){
        NativePush();
      }


      return () => {
        listenSaveNative.unsubscribe();
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
export default RemotePushController;
