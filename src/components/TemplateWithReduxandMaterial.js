import React, {useState,useEffect,useMemo} from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import config from '../config/config.js';
import { connect } from 'react-redux';

import { increment, decrement,save_email } from '../actions/actions';
import {
  Link,
} from "react-router-dom";



function mapStateToProps(state,ownProps) {
  return {
    count: state.count,
    email:state.email,
    password:state.password
  }
}

//const {regionsList: { data: list = [] } } = props;

const mapDispatchToProps = dispatch => ({
  increment,
  decrement,
  dispatch,
  save_email
});



const TaskComponent = (props) => {

  const [categories] = useMemo(() => {

      var categ = config.getCategories();
      console.log(categ);

      return categ;
  },[]);

  return (

    <Autocomplete
      id="combo-box-demo"
      options={categories}
      getOptionLabel={(option) => option.title}
      style={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Combo box" variant="outlined" />}
    />


  );
};


 export default connect(mapStateToProps,mapDispatchToProps)(TaskComponent);
