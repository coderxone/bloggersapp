import React, { useCallback,useEffect,useState,useMemo,useRef } from 'react';
import { connect } from 'react-redux';
import MenuComponent from '../../components/MenuComponents/MenuComponent';
import LocalizeComponent from '../../localize/LocalizeComponent';
import Grid from '@material-ui/core/Grid';
import config from '../../config/config';
import {
  Link,useHistory
} from "react-router-dom";

 //LocalizeComponent.setLanguage("ru");

 const mapStateToProps = (state) => {
   return {
       somethingFromStore: state.somethingFromStore
   }
 }

const BottomFunc = (props) => {


  const reduxStore = props.somethingFromStore;


  return (

    <div id="opacityControl">
      <MenuComponent />

      <Grid container className="projectContainer"  >











    </Grid>

  </div>




  );

}



export default connect(mapStateToProps)(BottomFunc);
