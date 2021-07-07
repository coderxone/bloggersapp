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



  const [tab,setTab] = useState(0);
  const [leftTabClass,setLeftTabClass] = useState("activeTab");
  const [rightTabClass,setRightTabClass] = useState("");

  const SwitchTab = (number) => {
    setTab(number);
    if(number === 0){
      setLeftTabClass("activeTab");
      setRightTabClass("");
    }else if(number === 1){
      setLeftTabClass("");
      setRightTabClass("activeTab");
    }

  }



  return (

    <div id="opacityControl" className="withoutScroll">
      <MenuComponent />

      <Grid container className="projectContainer withoutScroll"  >

      <div className="firstBlock centerElements">
          <div className="firstBlockText robotoFont blackColor centerText">
              {LocalizeComponent.bb_11}<br/>
              {LocalizeComponent.bb_12}
          </div>
      </div>

      <div className="centerElements blockTwoPadding">
          <div className="robotoFont blackColor centerText blockTwo projectFontSize">
            {LocalizeComponent.bb_14}
          </div>
      </div>


      <AuthorizationBox/>


      <div className="processBox">
        <div className="processBoxFirst">
            {LocalizeComponent.c_7}
        </div>
        <div className="centerElements">
          <div className="processBoxSecond">
              {LocalizeComponent.bb_15}
          </div>
        </div>
      </div>




      <div className="tabBox">

        <div className="chooseModel">
            {LocalizeComponent.c_18}
        </div>

        <div className="tabViewBoxCover">

              <div className="tabsSwitcher">
                <div className={"leftSwitcher " + leftTabClass} onClick={event => SwitchTab(0)}>
                    {LocalizeComponent.c_16}<br></br>
                    {LocalizeComponent.bb_16}
                </div>
                <div className={"rightSwitcher " + rightTabClass} onClick={event => SwitchTab(1)}>
                    {LocalizeComponent.c_17}<br></br>
                    {LocalizeComponent.bb_16}
                </div>
              </div>

              {
                tab === 0 ? (
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
                        {LocalizeComponent.bb_16}
                      </div>

                    </div>

                    <div className="secondTabViewBox">

                      <ul className="commonViewBox">
                        <li className="rightLiViewBox ">
                            <CheckIcon className="leftViewBox"/>
                            <div className="rightViewBox">{LocalizeComponent.a1}</div>
                        </li>
                        <li className="rightLiViewBox ">
                            <CheckIcon className="leftViewBox"/>
                            <div className="rightViewBox">{LocalizeComponent.a2}</div>
                        </li>
                        <li className="rightLiViewBox ">
                            <CheckIcon className="leftViewBox"/>
                            <div className="rightViewBox">{LocalizeComponent.a3}</div>
                        </li>
                        <li className="rightLiViewBox ">
                            <CheckIcon className="leftViewBox"/>
                            <div className="rightViewBox">{LocalizeComponent.a4}</div>
                        </li>
                        <li className="rightLiViewBox ">
                            <CheckIcon className="leftViewBox"/>
                            <div className="rightViewBox">{LocalizeComponent.a5}</div>
                        </li>
                        <li className="rightLiViewBox ">
                            <CheckIcon className="leftViewBox"/>
                            <div className="rightViewBox">{LocalizeComponent.a6}</div>
                        </li>
                        <li className="rightLiViewBox ">
                            <CheckIcon className="leftViewBox"/>
                            <div className="rightViewBox">{LocalizeComponent.a7}</div>
                        </li>
                        <li className="rightLiViewBox ">
                            <CheckIcon className="leftViewBox"/>
                            <div className="rightViewBox">{LocalizeComponent.a8}</div>
                        </li>
                        <li className="rightLiViewBox ">
                            <CheckIcon className="leftViewBox"/>
                            <div className="rightViewBox">{LocalizeComponent.a9}</div>
                        </li>
                        <li className="rightLiViewBox ">
                            <CheckIcon className="leftViewBox"/>
                            <div className="rightViewBox">{LocalizeComponent.a10}</div>
                        </li>
                        <li className="rightLiViewBox ">
                            <CheckIcon className="leftViewBox"/>
                            <div className="rightViewBox">{LocalizeComponent.a11}</div>
                        </li>

                      </ul>





                    </div>

                    <Link to={{pathname: "/login"}} className="BoxbuttonDivProjectButton viewBoxButtonStyles deleteUrlClassWithoutText">
                      <div className="BoxbuttonStyleProject" >{LocalizeComponent.Sign_up}</div>
                    </Link>



                  </div>
                ) : (
                  <div className="tabViewBox">

                    <div className="firstTabViewBox">

                        <div className="centerElements">
                          <div className="circleSign">
                            <div className="circleSignText">
                              {LocalizeComponent.c_17}
                            </div>
                          </div>
                        </div>


                      <div className="secondBlock">
                        {LocalizeComponent.c_17}<br></br>
                        {LocalizeComponent.bb_16}
                      </div>

                    </div>

                    <div className="secondTabViewBox">

                      <ul className="commonViewBox">
                        <li className="rightLiViewBox ">
                            <CheckIcon className="leftViewBox"/>
                            <div className="rightViewBox">{LocalizeComponent.b_1}</div>
                        </li>
                        <li className="rightLiViewBox ">
                            <CheckIcon className="leftViewBox"/>
                            <div className="rightViewBox">{LocalizeComponent.b_2}</div>
                        </li>
                        <li className="rightLiViewBox ">
                            <CheckIcon className="leftViewBox"/>
                            <div className="rightViewBox">{LocalizeComponent.b_3}</div>
                        </li>
                        <li className="rightLiViewBox ">
                            <CheckIcon className="leftViewBox"/>
                            <div className="rightViewBox">{LocalizeComponent.b_4}</div>
                        </li>
                        <li className="rightLiViewBox ">
                            <CheckIcon className="leftViewBox"/>
                            <div className="rightViewBox">{LocalizeComponent.b_5}</div>
                        </li>
                        <li className="rightLiViewBox ">
                            <CheckIcon className="leftViewBox"/>
                            <div className="rightViewBox">{LocalizeComponent.b_6}</div>
                        </li>
                        <li className="rightLiViewBox ">
                            <CheckIcon className="leftViewBox"/>
                            <div className="rightViewBox">{LocalizeComponent.b_7}</div>
                        </li>
                        <li className="rightLiViewBox ">
                            <CheckIcon className="leftViewBox"/>
                            <div className="rightViewBox">{LocalizeComponent.b_8}</div>
                        </li>
                        <li className="rightLiViewBox ">
                            <CheckIcon className="leftViewBox"/>
                            <div className="rightViewBox">{LocalizeComponent.b_9}</div>
                        </li>
                        <li className="rightLiViewBox ">
                            <CheckIcon className="leftViewBox"/>
                            <div className="rightViewBox">{LocalizeComponent.b_10}</div>
                        </li>
                        <li className="rightLiViewBox ">
                            <CheckIcon className="leftViewBox"/>
                            <div className="rightViewBox">{LocalizeComponent.b_11}</div>
                        </li>
                        <li className="rightLiViewBox ">
                            <CheckIcon className="leftViewBox"/>
                            <div className="rightViewBox">{LocalizeComponent.b_12}</div>
                        </li>
                        <li className="rightLiViewBox ">
                            <CheckIcon className="leftViewBox"/>
                            <div className="rightViewBox">{LocalizeComponent.b_13}</div>
                        </li>
                        <li className="rightLiViewBox ">
                            <CheckIcon className="leftViewBox"/>
                            <div className="rightViewBox">{LocalizeComponent.b_14}</div>
                        </li>
                        <li className="rightLiViewBox ">
                            <CheckIcon className="leftViewBox"/>
                            <div className="rightViewBox">{LocalizeComponent.b_15}</div>
                        </li>
                        <li className="rightLiViewBox ">
                            <CheckIcon className="leftViewBox"/>
                            <div className="rightViewBox">{LocalizeComponent.b_16}</div>
                        </li>
                        <li className="rightLiViewBox ">
                            <CheckIcon className="leftViewBox"/>
                            <div className="rightViewBox">{LocalizeComponent.b_17}</div>
                        </li>
                        <li className="rightLiViewBox ">
                            <CheckIcon className="leftViewBox"/>
                            <div className="rightViewBox">{LocalizeComponent.b_18}</div>
                        </li>
                        <li className="rightLiViewBox ">
                            <CheckIcon className="leftViewBox"/>
                            <div className="rightViewBox">{LocalizeComponent.b_19}</div>
                        </li>
                        <li className="rightLiViewBox ">
                            <CheckIcon className="leftViewBox"/>
                            <div className="rightViewBox">{LocalizeComponent.b_20}</div>
                        </li>
                        <li className="rightLiViewBox ">
                            <CheckIcon className="leftViewBox"/>
                            <div className="rightViewBox">{LocalizeComponent.b_21}</div>
                        </li>
                        <li className="rightLiViewBox ">
                            <CheckIcon className="leftViewBox"/>
                            <div className="rightViewBox">{LocalizeComponent.b_22}</div>
                        </li>
                        <li className="rightLiViewBox ">
                            <CheckIcon className="leftViewBox"/>
                            <div className="rightViewBox">{LocalizeComponent.b_23}</div>
                        </li>

                      </ul>

                    </div>

                    <Link to={{pathname: "/login"}} className="BoxbuttonDivProjectButton viewBoxButtonStyles deleteUrlClassWithoutText">
                      <div className="BoxbuttonStyleProject" >{LocalizeComponent.Sign_up}</div>
                    </Link>



                  </div>
                )
              }





        </div>

      </div>











    </Grid>

  </div>




  );

}




export default BottomFunc;
