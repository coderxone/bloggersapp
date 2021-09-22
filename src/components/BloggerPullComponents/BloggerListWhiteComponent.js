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




  return (

    <div className="gridFrame">
        <div className="gridMatrix">

          <div className="gridItem">
            <div className="gridSubItem"></div>
            <div className="gridSubItem">

                  <div className="gridSubItemBlockText">Promote Business App</div>
              
            </div>
          </div>

          <div className="gridItem">

          </div>
          <div className="gridItem">

          </div>

          <div className="gridItem">

          </div>


        </div>
    </div>


  );

}



export default BloggerListWhiteComponent;
