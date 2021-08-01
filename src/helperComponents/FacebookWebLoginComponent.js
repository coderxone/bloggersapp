import React, {useState,useEffect,useMemo,useCallback} from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import config from '../config/config.js';
import firebase from 'firebase/app';
import LinearProgress from '@material-ui/core/LinearProgress';
//import firebase from "../config/firebase";
import "firebase/auth";
// import { FacebookAuthProvider,getAuth,signInWithPopup } from "firebase/auth";

import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import { multiSave } from '../actions/actions';
import FacebookLogin from 'react-facebook-login';
import LocalizeComponent from '../localize/LocalizeComponent';
import {
  Link,
} from "react-router-dom";

import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import FacebookIcon from '@material-ui/icons/Facebook';

import DialogActions from '@material-ui/core/DialogActions';
import googleIcon from '../icons/googleIcon.png';
import { useHistory } from "react-router-dom";


var firebaseConfig = {
  apiKey: "AIzaSyAUc1hzfw3s96B8LH_f1LBsE0jW4gCqJVU",
  authDomain: "echohub.firebaseapp.com",
  projectId: "echohub",
  storageBucket: "echohub.appspot.com",
  messagingSenderId: "992987530913",
  appId: "1:992987530913:web:c69a82b2e841a44622d2e0",
  measurementId: "G-871R9F8N2F"
};

firebase.initializeApp(firebaseConfig);



const FacebookWebLoginComponent = (props) => {

  const history = useHistory();

  const GoToLogin = useCallback((item) => {

      return history.push({pathname: '/login'}), [history];

  });

  const loginWithGoogle = () => {

    var googleProvider = new firebase.auth.GoogleAuthProvider();

    //EAACjh8klDZBEBANciXl8jP3THgvX05gKZBHrCqPJVu7I6EOcasY6aj3hMx4OyBzf8O8A6kPmMAO5k1dclfAU58q8ZA2Tw4FSmZApaOZC8flBeFLZCNpmcLUVUQtFbLRt7GaCxkL8toDG8bXjNZA2y13bO2459H0lgkXFNtW77ZBZAWWOoxDxu1JI7GcHtUQfwWwd8IKRqsVkl7D2urEHOGLPpKCNYexiQNe1tFfI2LdWQEAZDZD
    firebase.auth()
    .signInWithPopup(googleProvider)
    .then((result) => {
      var credential = result.credential;
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = credential.accessToken;
      // The signed-in user info.
      var user = result.user;


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




      //console.log(user);
      // ...
    }).catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.


      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });


  }

  const loginWithFacebook = () => {

  //  const facebookProvider = new FacebookAuthProvider();
     var facebookProvider = new firebase.auth.FacebookAuthProvider();
      facebookProvider.addScope('email');
      facebookProvider.addScope('public_profile');
      facebookProvider.addScope('pages_show_list');
      facebookProvider.addScope('instagram_basic');
      facebookProvider.addScope('instagram_manage_insights');
      facebookProvider.addScope('pages_read_engagement');
      facebookProvider.setCustomParameters({
        'display': 'popup'
      });


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


              <div className="facebookButton " onClick={loginWithFacebook}>
                <FacebookIcon  className="faceBookLoginMT"/>
                <div className="faceBookLoginText robotoText">Continue with Facebook</div>
              </div>

              <div className="facebookButton projectMarginTop" onClick={loginWithGoogle}>
                <img src={googleIcon}  className="faceBookLoginMT"/>
                <div className="faceBookLoginText robotoText">Sign in with Google</div>
              </div>


          </div>



    </div>





  );
};


 export default connect()(FacebookWebLoginComponent);
