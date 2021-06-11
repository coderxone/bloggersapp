import React, {useState,useEffect,useMemo} from 'react';
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

import DialogActions from '@material-ui/core/DialogActions';


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



// firebase.auth().signOut();
const FacebookWebLoginComponent = (props) => {

  const responseFacebook = (response) => {
    console.log(response);

    var name = response.name;
    var email = response.email;
    var picture = response.picture.data.url;


    props.dispatch(multiSave({name:"name",value:name}));
    props.dispatch(multiSave({name:"email",value:email}));
    props.dispatch(multiSave({name:"picture",value:picture}));
    props.dispatch(multiSave({name:"social",value:"ok"}));

  }



  const componentClicked = (event) => {
    event.preventDefault();
  }

  useEffect(() => {





  },[]);

  const [open, setOpen] = React.useState(false);


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };


  const [signed,setSigned] = useState(false);

  const firebaseSignResponse = (response,providerId) => {
    console.log(response);
    console.log(providerId);


    setSigned(true);
  }

  const loginWithGoogle = () => {

    var googleProvider = new firebase.auth.GoogleAuthProvider();

    //EAACjh8klDZBEBANciXl8jP3THgvX05gKZBHrCqPJVu7I6EOcasY6aj3hMx4OyBzf8O8A6kPmMAO5k1dclfAU58q8ZA2Tw4FSmZApaOZC8flBeFLZCNpmcLUVUQtFbLRt7GaCxkL8toDG8bXjNZA2y13bO2459H0lgkXFNtW77ZBZAWWOoxDxu1JI7GcHtUQfwWwd8IKRqsVkl7D2urEHOGLPpKCNYexiQNe1tFfI2LdWQEAZDZD
    firebase.auth()
    .signInWithPopup(googleProvider)
    .then((result) => {
      /** @type {firebase.auth.OAuthCredential} */
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
        props.dispatch(multiSave({name:"name",value:name}));
        props.dispatch(multiSave({name:"email",value:email}));
        props.dispatch(multiSave({name:"picture",value:picture}));
        props.dispatch(multiSave({name:"social",value:"ok"}));
        setProgress(1);




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
      facebookProvider.setCustomParameters({
        'display': 'popup'
      });


      firebase
      .auth()
      .signInWithPopup(facebookProvider)
      .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        var credential = result.credential;

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
        setProgress(1);


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

    <div>
      <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
        <DialogTitle id="simple-dialog-title fontStyle">{LocalizeComponent.socialButton}</DialogTitle>
        <div className="socialDialog">




                        <div >
                          {
                            progress == 1 &&
                            (
                              <LinearProgress className="BloggerProgress progressMargin" color="secondary" />
                            )
                          }


                            <button
                              className="faceBookLogin"
                              onClick={loginWithGoogle}
                            >
                              Sign In with Google
                            </button>

                            <button
                              className="faceBookLogin faceBookLoginMT"
                              onClick={loginWithFacebook}
                            >
                              Sign In with Facebook
                            </button>

                        </div>





        </div>

        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            {LocalizeComponent.close}
          </Button>
        </DialogActions>

      </Dialog>

      <div>


        <Button variant="contained" color="primary"  onClick={handleClickOpen}>
          {LocalizeComponent.socialButton}
        </Button>

      </div>

    </div>





  );
};


 export default connect()(FacebookWebLoginComponent);
