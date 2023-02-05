import React, {useState,useCallback} from 'react';
import config from '../config/config.js';
import firebase from 'firebase/compat/app';
import LinearProgress from '@material-ui/core/LinearProgress';
// import firebase from "../config/firebase";
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'; //v9
// import { FacebookAuthProvider,getAuth,signInWithPopup } from "firebase/auth";

import { connect } from 'react-redux';
import { multiSave } from '../actions/actions';

import FacebookIcon from '@material-ui/icons/Facebook';

import googleIcon from '../icons/googleIcon.png';
import { useHistory } from "react-router-dom";

const firebaseConfig = {
  apiKey: "AIzaSyB3gzojEsuJLDDobASHATDhnP7_gW4zuU8",
  authDomain: "echohub-85ea5.firebaseapp.com",
  projectId: "echohub-85ea5",
  storageBucket: "echohub-85ea5.appspot.com",
  messagingSenderId: "335772410045",
  appId: "1:335772410045:web:1c1108d1c01b63a23cd7d4",
  measurementId: "G-6XSB98RLQM"
};

firebase.initializeApp(firebaseConfig);
//280512703859870 boevoi
//1052774621919562 test
//app secret cbf8311cd273f6a10121ec7924352471  //boevoi
//app secret 5f1d1ebefeb095551629522f402c4fe7  //test
//test user 	vlcdslnpia_1629336588@tfbnw.net
//test pass 	123456!A


const FacebookWebLoginComponent = (props) => {

  const history = useHistory();

  const GoToLogin = useCallback((item) => {

      return history.push({pathname: '/login'}), [history];

  });

  const loginWithGoogle = () => {

    const provider = new GoogleAuthProvider();
    
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;

        var email = user.email;
        if(email == null){
          email = user.displayName + "@gmail.com";
        }
        var picture = user.photoURL;
        var name = user.displayName;

        email = String(email.trim());
        localStorage.setItem("email",String(email));

        props.dispatch(multiSave({name:"name",value:name}));
        props.dispatch(multiSave({name:"email",value:email}));
        props.dispatch(multiSave({name:"picture",value:picture}));
        props.dispatch(multiSave({name:"social",value:"ok"}));
        props.dispatch(multiSave({name:"googletoken",value:token}));
        setProgress(1);


        let currentUrl = config.getCurrentUrl();
        if(currentUrl === 'main'){
            GoToLogin();
        }

        //console.log(user)

      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);

      });

    
      




  


  }

  const loginWithFacebook = () => {

  //  const facebookProvider = new FacebookAuthProvider();
     var facebookProvider = new firebase.auth.FacebookAuthProvider();
      facebookProvider.addScope('email');
      facebookProvider.addScope('public_profile');
      //facebookProvider.addScope('user_location');
      //facebookProvider.addScope('user_photos');
      //facebookProvider.addScope('user_posts');
      facebookProvider.addScope('pages_show_list');
      facebookProvider.addScope('instagram_basic');
      facebookProvider.addScope('instagram_manage_insights');
      facebookProvider.addScope('pages_read_engagement');
      facebookProvider.setCustomParameters({
        'display': 'popup'
      });
      //vlcdslnpia_1629336588@tfbnw.net
      //


      firebase
      .auth()
      .signInWithPopup(facebookProvider)
      .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        var credential = result.credential;

        var token = credential.accessToken;

        // The signed-in user info.
        var user = result.user;

        var email = user.email;
        if(email == null){
          email = user.displayName + "@gmail.com";
        }
        var picture = user.photoURL;
        var name = user.displayName;
        props.dispatch(multiSave({name:"name",value:name}));
        props.dispatch(multiSave({name:"email",value:email}));
        props.dispatch(multiSave({name:"picture",value:picture}));
        props.dispatch(multiSave({name:"social",value:"ok"}));
        props.dispatch(multiSave({name:"facebooktoken",value:token}));
        setProgress(1);


        let currentUrl = config.getCurrentUrl();
        if(currentUrl === 'main'){
            GoToLogin();
        }


        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var accessToken = credential.accessToken;

        // ...
      }).catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;

        // ...
      });
  }

  const [progress,setProgress] = useState(0);



  return (

    <div >

        {
          progress == 1 &&
          (
            <LinearProgress className="BloggerProgress progressMargin" color="secondary" />
          )
        }




          <div className="socialBox">
              
              <div className="facebookButton projectMarginTop" onClick={loginWithGoogle}>
                <img src={googleIcon}  className="faceBookLoginMT"/>
                <div className="faceBookLoginText robotoText">Sign in with Google</div>
              </div>


          </div>



    </div>





  );
};


{/* <div className="facebookButton " onClick={loginWithFacebook}>
                <FacebookIcon  className="faceBookLoginMT"/>
                <div className="faceBookLoginText robotoText">Continue with Facebook</div>
              </div> */}

 export default connect()(FacebookWebLoginComponent);


