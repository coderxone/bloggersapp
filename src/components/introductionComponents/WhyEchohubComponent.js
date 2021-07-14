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

      <Grid container className="projectContainer"  >


      <div className="firstBlock centerElements">
          <div className="firstBlockText robotoFont blackColor centerText">
              {LocalizeComponent.bb_11}<br/>
              {LocalizeComponent.bb_12}
          </div>
      </div>

      <div className="centerElements blockTwoPadding">
          <div className="robotoFont blackColor centerText blockTwo projectFontSize">
            {LocalizeComponent.a_3}
          </div>
      </div>
      <div className="centerElements blockTwoPadding projectMarginTopDescription">
          <div className="robotoFont blackColor centerText blockTwo projectFontSize">
            {LocalizeComponent.user_15}
          </div>
      </div>








    </Grid>

  </div>




  );

}



export default BottomFunc;
