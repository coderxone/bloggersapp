import React, { useCallback,useEffect,useState,useMemo,useRef } from 'react';
import LocalizeComponent from '../../localize/LocalizeComponent';
import Grid from '@material-ui/core/Grid';
import config from '../../config/config';
import {
  Link,useHistory
} from "react-router-dom";

import '../../css/BloggerListWhiteComponent.scss';
 //LocalizeComponent.setLanguage("ru");


const BloggerListWhiteComponent = (props) => {

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

    <div className="BusinessTemplate ">

        <div className="gridTitle">
          <div className="gridTitleText">
            {LocalizeComponent.lastBusinessPost}
          </div>
        </div>

        <div className="gridTitle">
          <div className="gridSmallText">
            {LocalizeComponent.postearnMoney}
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
                <div className="gridSubItem rightRadius">
                      <div className="gridSubItemBlockText">Promote Business App</div>
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
                <div className="gridSubItem rightRadius">
                      <div className="gridSubItemBlockText">Promote Business App</div>
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
                <div className="gridSubItem rightRadius">
                      <div className="gridSubItemBlockText">Promote Business App</div>
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
                <div className="gridSubItem rightRadius">
                      <div className="gridSubItemBlockText">Promote Business App</div>
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
                <div className="gridSubItem rightRadius">
                      <div className="gridSubItemBlockText">Promote Business App</div>
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
                <div className="gridSubItem rightRadius">
                      <div className="gridSubItemBlockText">Promote Business App</div>
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
                <div className="gridSubItem rightRadius">
                      <div className="gridSubItemBlockText">Promote Business App</div>
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
                <div className="gridSubItem rightRadius">
                      <div className="gridSubItemBlockText">Promote Business App</div>
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
                <div className="gridSubItem rightRadius">
                      <div className="gridSubItemBlockText">Promote Business App</div>
                </div>
              </div>




            </div>
        </div>

    </div>


  );

}



export default BloggerListWhiteComponent;
