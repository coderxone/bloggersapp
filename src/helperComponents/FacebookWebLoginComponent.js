import React, {useState,useEffect,useMemo} from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import config from '../config/config.js';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';

import { save_multiData } from '../actions/actions';
import {
  Link,
} from "react-router-dom";



const FacebookWebLoginComponent = (props) => {



  return (

    <Grid container >

    <div id="fb-root"></div>
    <script async defer crossOrigin="anonymous" src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v10.0&appId=179803590561761&autoLogAppEvents=1" nonce="M7OtfWI3"></script>


    </Grid>


  );
};


 export default connect()(FacebookWebLoginComponent);
