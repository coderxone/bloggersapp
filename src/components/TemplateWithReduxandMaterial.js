import React, {useState,useEffect,useMemo} from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import config from '../config/config.js';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';

import { increment, decrement,save_email } from '../actions/actions';
import {
  Link,
} from "react-router-dom";



const AdminComponent = (props) => {

  const [categories] = useMemo(() => {

      var categ = config.getCategories();
      console.log(categ);

      return categ;
  },[]);

  return (

    <Grid container >




    </Grid>


  );
};


 export default connect()(AdminComponent);
