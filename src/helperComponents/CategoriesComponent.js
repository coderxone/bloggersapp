import React, {useState,useEffect,useMemo} from 'react';
import TextField from '@material-ui/core/TextField';
import { save_category } from '../actions/actions';
import Autocomplete from '@material-ui/lab/Autocomplete';
import config from '../config/config.js';
import { connect } from 'react-redux';
import {
  Link,
} from "react-router-dom";







const TaskComponent = (props) => {

  const categories = useMemo(() => {

      var categ = config.getCategories();
      console.log(categ);
      return categ;

  },[]);

  const [category,SetCategory] = useState('');

  return (

    <Autocomplete
      id="combo-box-demo"
      options={categories}
      multiple
      onChange={(event, newValue) => {
        //console.log(newValue);
        if(newValue){
          SetCategory(newValue);
          props.dispatch(save_category(newValue));
        }

      }}
      getOptionLabel={(option) => option}
      style={{ width: '100%' }}
      renderInput={(params) => <TextField {...params} label="select category" />}
    />


  );
};


 export default connect()(TaskComponent);
