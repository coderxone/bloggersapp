import React, { useCallback,useEffect,useState,useMemo,useRef } from 'react';
import MenuComponent from '../../components/MenuComponents/MenuComponent';
import LocalizeComponent from '../../localize/LocalizeComponent';
import Grid from '@material-ui/core/Grid';
import config from '../../config/config';
import '../../components/profileComponents/userProfileComponent.scss';
import {
  Link,useHistory
} from "react-router-dom";

 //LocalizeComponent.setLanguage("ru");



const BottomFunc = () => {


  const [backgroundImageUrl,setBackgroundImageUrl] = useState("https://bladenonline.com/wp-content/uploads/2020/04/shutterstock_753167914_1.jpg");
  const [userBackgroundImageUrl,setUserBackgroundImageUrl] = useState("https://echohub.io/newimages/no-image.png");

  const [progressBarValue,SetprogressBarValue] = useState(10);

  let widthValueFirst = progressBarValue + "%";
  let widthValueSecond = 70 + "%";

  const [progressBarValueA,SetprogressBarValueA] = useState(7);

  let widthValueFirstA = progressBarValueA + "%";
  let widthValueSecondA = 70 + "%";

  return (

    <div id="opacityControl">
      <MenuComponent />

      <Grid container className="projectContainer"  >


        <div className="u_background" style={ { backgroundPosition: "center",backgroundRepeat:"no-repeat",backgroundSize:"cover",background: "url(" + backgroundImageUrl + ") no-repeat center/cover" }}>

        </div>

        <div className="infoPanelCover">
            <div className="infoPanel robotoFont blackColor">

                    <div>
                      <div className="centerElements">
                          <div className="u_image u_imagePosition" style={ { backgroundPosition: "center",backgroundRepeat:"no-repeat",backgroundSize:"cover",background: "url(" + userBackgroundImageUrl + ") no-repeat center/cover" }}>
                      </div>
                    </div>



                    <div className="u_imageRole ">
                          {LocalizeComponent.c_19}
                    </div>

                    <div className="u_imageName ">
                          Angela Hireman
                    </div>

                    <div className="u_imageRole ">
                          10000k subscribers | 7 points
                    </div>

                    <div className="userProgressBlock">

                      <div className="completitionBlock activityM activityMT moveLeftCompletitionBlock">
                          <div className="left_childCompletitionBlock right_childCompletitionBlockCopyWithPrivilagius">
                            {LocalizeComponent.user_1}
                          </div>
                          <div className="right_childCompletitionBlock ">
                              <div className="progressButton">
                                  <div style={{width : widthValueFirst}} className="leftprogressButton"></div>
                                  <div style={{width : widthValueSecond}} className="rightprogressButton"></div>
                              </div>

                              <div className="completition_percent">
                                  <div className="completition_percent_text">
                                    {widthValueFirst}
                                  </div>
                              </div>

                          </div>
                          <div className="right_childCompletitionBlockRSpace"></div>
                      </div>

                      <div className="completitionBlock activityM moveLeftCompletitionBlock">

                          <div className="left_childCompletitionBlock right_childCompletitionBlockCopyWithPrivilagius">
                            {LocalizeComponent.user_2}
                          </div>
                          <div className="right_childCompletitionBlock">
                              <div className="progressButton">
                                  <div style={{width : widthValueFirstA}} className="leftprogressButton"></div>
                                  <div style={{width : widthValueSecondA}} className="rightprogressButton"></div>
                              </div>

                              <div className="completition_percent">
                                  <div className="completition_percent_text">
                                    {widthValueFirstA}
                                  </div>
                              </div>

                          </div>

                          <div className="right_childCompletitionBlockRSpace"></div>


                      </div>


                    </div>


                    <div className="user_bio">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias mollitia unde consequatur, vel rem possimus nihil corrupti, modi odit ipsam ut id minus, cupiditate provident eos quidem error culpa obcaecati.
                    </div>

                </div>
            </div>
        </div>












    </Grid>

  </div>




  );

}




export default BottomFunc;
