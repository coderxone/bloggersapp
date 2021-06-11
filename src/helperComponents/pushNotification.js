import firebase from 'firebase';
import 'firebase/messaging';
import config from '../config/config';


var firebaseConfig = {
  apiKey: "AIzaSyAUc1hzfw3s96B8LH_f1LBsE0jW4gCqJVU",
  authDomain: "echohub.firebaseapp.com",
  projectId: "echohub",
  storageBucket: "echohub.appspot.com",
  messagingSenderId: "992987530913",
  appId: "1:992987530913:web:c69a82b2e841a44622d2e0",
  measurementId: "G-871R9F8N2F"
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
