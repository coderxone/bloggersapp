import React, { useCallback,useEffect,useState,useMemo,useRef } from 'react';
import MenuComponent from '../../components/MenuComponents/MenuComponent';
import LocalizeComponent from '../../localize/LocalizeComponent';
import Grid from '@material-ui/core/Grid';
import AuthorizationBox from '../../helperComponents/AuthorizationBox';

import {
  Link,useHistory
} from "react-router-dom";

 //LocalizeComponent.setLanguage("ru");



const BottomFunc = () => {





  return (

    <div id="opacityControl" className="withoutScroll">
      <MenuComponent />

      <Grid container className="projectContainer withoutScroll"  >

      <div className="firstBlock centerElements">
          <div className="firstBlockText robotoFont blackColor centerText">
              {LocalizeComponent.c_1}<br/>
              {LocalizeComponent.c_2}
          </div>
      </div>

      <div className="centerElements blockTwoPadding">
          <div className="robotoFont blackColor centerText blockTwo projectFontSize">
            {LocalizeComponent.c_3}
          </div>
      </div>


      <AuthorizationBox/>


      <div className="processBox">
        <div className="processBoxFirst">
            {LocalizeComponent.c_7}
        </div>
        <div className="centerElements">
          <div className="processBoxSecond">
              {LocalizeComponent.c_8}
          </div>
        </div>
      </div>


      <div className="processBox">
        <div className="processBoxFirst">
            {LocalizeComponent.c_13}
        </div>
        <div className="centerElements">
          <div className="processBoxSecond">
            <ul>
              <li>
                {LocalizeComponent.c_14}
              </li>
              <li>
                {LocalizeComponent.c_15}
              </li>
            </ul>

          </div>
        </div>
      </div>











    </Grid>

  </div>




  );

}




export default BottomFunc;
