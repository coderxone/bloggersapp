import React, { useCallback,useEffect,useState,useMemo,useRef } from 'react';
import MenuComponent from '../../components/MenuComponents/MenuComponent';
import LocalizeComponent from '../../localize/LocalizeComponent';
import Grid from '@material-ui/core/Grid';
import AuthorizationBox from '../../helperComponents/AuthorizationBox';
import CheckIcon from '@material-ui/icons/Check';
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

      <div className="tabBox">

        <div className="chooseModel">
            {LocalizeComponent.c_18}
        </div>

        <div className="tabViewBoxCover">

              <div className="tabsSwitcher">
                <div className="leftSwitcher">
                    {LocalizeComponent.c_16}<br></br>
                    {LocalizeComponent.c_19}
                </div>
                <div className="rightSwitcher">
                    {LocalizeComponent.c_17}<br></br>
                    {LocalizeComponent.c_19}
                </div>
              </div>


              <div className="tabViewBox">

                <div className="firstTabViewBox">

                    <div className="centerElements">
                      <div className="circleSign">
                        <div className="circleSignText">
                          {LocalizeComponent.c_16}
                        </div>
                      </div>
                    </div>


                  <div className="secondBlock">
                    {LocalizeComponent.c_16}<br></br>
                    {LocalizeComponent.c_19}
                  </div>

                </div>

                <div className="secondTabViewBox">
                  <div className="commonViewBox textOverFlow">
                    <div className="leftViewBox"><CheckIcon/></div>
                    <div className="rightViewBox">{LocalizeComponent.c_20}</div>
                  </div>
                  <div className="commonViewBox textOverFlow">
                    <div className="leftViewBox"><CheckIcon/></div>
                    <div className="rightViewBox">{LocalizeComponent.c_21}</div>
                  </div>
                  <div className="commonViewBox textOverFlow">
                    <div className="leftViewBox"><CheckIcon/></div>
                    <div className="rightViewBox">{LocalizeComponent.c_22}</div>
                  </div>

                </div>

                <Link to={{pathname: "/login"}} className="BoxbuttonDivProjectButton viewBoxButtonStyles deleteUrlClassWithoutText">
                  <div className="BoxbuttonStyleProject" >{LocalizeComponent.Sign_up}</div>
                </Link>



              </div>

        </div>

      </div>











    </Grid>

  </div>




  );

}




export default BottomFunc;
