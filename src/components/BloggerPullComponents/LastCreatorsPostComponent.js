import React, { useCallback,useEffect,useState,useMemo,useRef } from 'react';
import LocalizeComponent from '../../localize/LocalizeComponent';
import Grid from '@material-ui/core/Grid';
import config from '../../config/config';
import {
  Link,useHistory
} from "react-router-dom";

import '../../css/lastCreatorsPostsComponent.scss';
 //LocalizeComponent.setLanguage("ru");


const LastCreatorsPostsComponent = (props) => {

  let colorIndex = 0;
  let colorArray = ["#FFA24D","#78D993","#F9A3BE"];

  const colorTracker = () => {
      if(colorIndex > 2){
        colorIndex = 0;
      }

      let item = colorArray[colorIndex];
      colorIndex++;
      return item;
  }

  const checkImage = (imageUrl) => {

    if(imageUrl.indexOf('graph') >= 0){

      let str = "url(" + imageUrl + ") no-repeat center/cover";
      return str;
    }else{
      if(imageUrl == 0 || imageUrl == "no-image.png"){
          let str = colorTracker();
          return str;
      }else{
        let str = "url(" + config.getServerImagePath() + imageUrl + ") no-repeat center/cover";
        return str;
      }

    }
  }


  return (

    <div className="BusinessTemplate">

        <div className="gridTitle">
          <div className="gridTitleText">
            {LocalizeComponent.lastCreatorPosts}
          </div>
        </div>

        <div className="gridTitle">
          <div className="fullView">
            <div className="fullViewText">
              {LocalizeComponent.fullView}
            </div>
          </div>
        </div>

        <div className="gridFrame">
            <div className="gridMatrix">

              <div className="gridItem">
                <div className="gridSubItem leftRadius"
                style = {{
                          backgroundPosition: "center",
                          backgroundRepeat:"no-repeat",
                          backgroundSize:"cover",
                          background: checkImage("photo-1630421056829")
                        }}>
                </div>
                <div className="gridSubItemDoubleRow rightRadius">
                      <div className="gridSubItemDoubleRowText gridSubItemDoubleRowTextEndAlign">Tiana Vetrovs</div>
                      <div className="gridSubItemDoubleRowText gridSubItemDoubleRowTextStartAlign">Posted 12 hours ago</div>
                </div>
              </div>
              <div className="gridItem">
                <div className="gridSubItem leftRadius"
                style = {{
                          backgroundPosition: "center",
                          backgroundRepeat:"no-repeat",
                          backgroundSize:"cover",
                          background: checkImage("photo-1630421056829")
                        }}>
                </div>
                <div className="gridSubItemDoubleRow rightRadius">
                      <div className="gridSubItemDoubleRowText gridSubItemDoubleRowTextEndAlign">Tiana Vetrovs</div>
                      <div className="gridSubItemDoubleRowText gridSubItemDoubleRowTextStartAlign">Posted 12 hours ago</div>
                </div>
              </div>
              <div className="gridItem">
                <div className="gridSubItem leftRadius"
                style = {{
                          backgroundPosition: "center",
                          backgroundRepeat:"no-repeat",
                          backgroundSize:"cover",
                          background: checkImage("photo-1630421056829")
                        }}>
                </div>
                <div className="gridSubItemDoubleRow rightRadius">
                      <div className="gridSubItemDoubleRowText gridSubItemDoubleRowTextEndAlign">Tiana Vetrovs</div>
                      <div className="gridSubItemDoubleRowText gridSubItemDoubleRowTextStartAlign">Posted 12 hours ago</div>
                </div>
              </div>
              <div className="gridItem">
                <div className="gridSubItem leftRadius"
                style = {{
                          backgroundPosition: "center",
                          backgroundRepeat:"no-repeat",
                          backgroundSize:"cover",
                          background: checkImage("photo-1630421056829")
                        }}>
                </div>
                <div className="gridSubItemDoubleRow rightRadius">
                      <div className="gridSubItemDoubleRowText gridSubItemDoubleRowTextEndAlign">Tiana Vetrovs</div>
                      <div className="gridSubItemDoubleRowText gridSubItemDoubleRowTextStartAlign">Posted 12 hours ago</div>
                </div>
              </div>
              <div className="gridItem">
                <div className="gridSubItem leftRadius"
                style = {{
                          backgroundPosition: "center",
                          backgroundRepeat:"no-repeat",
                          backgroundSize:"cover",
                          background: checkImage("photo-1630421056829")
                        }}>
                </div>
                <div className="gridSubItemDoubleRow rightRadius">
                      <div className="gridSubItemDoubleRowText gridSubItemDoubleRowTextEndAlign">Tiana Vetrovs</div>
                      <div className="gridSubItemDoubleRowText gridSubItemDoubleRowTextStartAlign">Posted 12 hours ago</div>
                </div>
              </div>
              <div className="gridItem">
                <div className="gridSubItem leftRadius"
                style = {{
                          backgroundPosition: "center",
                          backgroundRepeat:"no-repeat",
                          backgroundSize:"cover",
                          background: checkImage("photo-1630421056829")
                        }}>
                </div>
                <div className="gridSubItemDoubleRow rightRadius">
                      <div className="gridSubItemDoubleRowText gridSubItemDoubleRowTextEndAlign">Tiana Vetrovs</div>
                      <div className="gridSubItemDoubleRowText gridSubItemDoubleRowTextStartAlign">Posted 12 hours ago</div>
                </div>
              </div>






            </div>
        </div>

    </div>


  );

}



export default LastCreatorsPostsComponent;
