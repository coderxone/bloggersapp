import React, {useState,useEffect,useMemo} from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import config from '../../config/config.js';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import LocalizeComponent from '../../localize/LocalizeComponent';

import { multiSave } from '../../actions/actions';
import {
  Link,
} from "react-router-dom";



const ExampleComponent = (props) => {


  const status = props.status;

  console.log(status)


  return (

    <div className="fullSize projectFont projectTextColor projectFontSize">

        {
          status == 0 &&
          (
            <ol className="projectPaddingLi">

              <li>
                  {
                    LocalizeComponent.insruction_step1
                  }
              </li>
              <li>
                  {
                    LocalizeComponent.insruction_step2
                  }
              </li>
              <li>
                  {
                    LocalizeComponent.insruction_step3
                  }
              </li>

            </ol>
          )
        }

        {
          status == 1 &&
          (
            <div className="projectBox projectTextColor projectFontSize projectFont">


                  {
                    LocalizeComponent.currentStatus + LocalizeComponent.current1
                  }


            </div>
          )
        }
        {
          status == 3 &&
          (
            <ol className="projectPaddingLi">

              <li>
                  {
                    LocalizeComponent.step3
                  }
              </li>
              <li>
                  {
                    LocalizeComponent.step3_1
                  }
              </li>
              <li>
                  {
                    LocalizeComponent.step3_2
                  }
              </li>
              <li>
                  {
                    LocalizeComponent.step3_3
                  }
              </li>
              <li>
                  {
                    LocalizeComponent.step3_4
                  }
              </li>
              <li>
                  {
                    LocalizeComponent.step3_5
                  }
              </li>
              <li>
                  {
                    LocalizeComponent.step3_6
                  }
              </li>

            </ol>


          )
        }



    </div>


  );
};


 export default connect()(ExampleComponent);
