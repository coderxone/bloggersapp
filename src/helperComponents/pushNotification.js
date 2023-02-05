// import firebase from 'firebase';
import firebase from 'firebase/compat/app';
import 'firebase/messaging';
import config from '../config/config';


const firebaseConfig = {
  apiKey: "AIzaSyB3gzojEsuJLDDobASHATDhnP7_gW4zuU8",
  authDomain: "echohub-85ea5.firebaseapp.com",
  projectId: "echohub-85ea5",
  storageBucket: "echohub-85ea5.appspot.com",
  messagingSenderId: "335772410045",
  appId: "1:335772410045:web:1c1108d1c01b63a23cd7d4",
  measurementId: "G-6XSB98RLQM"
};



export const checkSupport = () => {
  try{
    if(firebase.messaging.isSupported()){
      firebase.initializeApp(firebaseConfig);
      const messaging = firebase.messaging();
      return messaging;
    }else{
      return false;
    }
  }catch(e){
    return false;
  }

}



export const getToken = (messaging) => {
  return new Promise((resolve,reject) => {

          messaging.getToken({vapidKey: 'BCphRjWwa3N4Uqoovx-dPSy9uWqMSM_16OWGjO7ouvQQ-8vJsPQOfbjTqitsOoLd_HDjFz5Zro31ZrsLY4rk86M'}).then((currentToken) => {
            if (currentToken) {
              localStorage.setItem("firebaseWebToken",currentToken);
              localStorage.setItem("listenfirebaseWebToken","1");
              resolve(currentToken);
            } else {
              resolve(false);
            }
          }).catch((err) => {
            console.log('An error occurred while retrieving token. ', err);
            // catch error while creating client token
          });

    });
  };

export const GetPermission = () => {
  return new Promise((resolve,reject) => {
          window.Notification.requestPermission().then((permission) => {
            if (permission === 'granted') {
              console.log('Notification permission granted.');
              resolve(true);
            }else {
              console.log('Unable to get permission to notify.');
              resolve(false);
            }
          });
        });
}





export const onMessageListener =(messaging) => {
  return new Promise((resolve) => {

      messaging.onMessage((payload) => {
        resolve(payload);
      });

  });
};
