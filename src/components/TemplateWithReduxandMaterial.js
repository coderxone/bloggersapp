import React, {useState,useEffect,useMemo} from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import config from '../config/config.js';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';

import { multiSave } from '../actions/actions';
import {
  Link,
} from "react-router-dom";


const mapStateToProps = (state) => {
  return {
      somethingFromStore: state.somethingFromStore
  }
}

const ExampleComponent = (props) => {

  const stateFromprops = props.somethingFromStore;


  return (

    <Grid container >




    </Grid>


  );
};


 export default connect(mapStateToProps)(ExampleComponent);
