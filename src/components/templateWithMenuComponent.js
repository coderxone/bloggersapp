import React, { useCallback,useEffect,useState,useMemo,useRef } from 'react';
import MenuComponent from '../../components/MenuComponents/MenuComponent';
import LocalizeComponent from '../../localize/LocalizeComponent';
import Grid from '@material-ui/core/Grid';
import config from '../../config/config';
import {
  Link,useHistory
} from "react-router-dom";

 //LocalizeComponent.setLanguage("ru");


const BottomFunc = (props) => {




  return (

    <div id="opacityControl">
      <MenuComponent />

        <div className="projectContainer">

        </div>

    </div>




  );

}



export default BottomFunc;
