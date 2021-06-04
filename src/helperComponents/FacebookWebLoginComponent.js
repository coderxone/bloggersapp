import React, {useState,useEffect,useMemo} from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import config from '../config/config.js';
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

  return (

    <div>
      <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
        <DialogTitle id="simple-dialog-title fontStyle">{LocalizeComponent.socialButton}</DialogTitle>
        <div className="socialDialog">
          <FacebookLogin
            appId="179803590561761"
            autoLoad={false}
            fields="name,email,picture"
            callback={responseFacebook}
            onClick={event => componentClicked}
            cssClass="faceBookLogin"
            />



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
