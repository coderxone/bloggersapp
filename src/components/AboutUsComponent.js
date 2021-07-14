import React, { useCallback,useEffect,useState,useMemo,useRef } from 'react';
import MenuComponent from '../components/MenuComponents/MenuComponent';
import LocalizeComponent from '../localize/LocalizeComponent';
import Grid from '@material-ui/core/Grid';
import config from '../config/config';
import DandelionComponent from '../components/dandelionComponent';
import {
  Link,useHistory
} from "react-router-dom";

 //LocalizeComponent.setLanguage("ru");


const BottomFunc = (props) => {




  return (

    <div id="opacityControl">
      <MenuComponent />

      <Grid container className="projectContainer"  >


        <div className="MainLCenterWrapAbout">

            <div className="MainLogoCenter"><DandelionComponent /></div>

        </div>

      <div className="centerElements blockTwoPadding projectMarginTopDescription">
          <div className="robotoFont blackColor centerText blockTwo projectFontSize">
            {LocalizeComponent.about_1}
          </div>
      </div>











    </Grid>

  </div>




  );

}



export default BottomFunc;
