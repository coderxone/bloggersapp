import React, {useState,useEffect,useMemo,useCallback} from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import config from '../../config/config.js';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import DandelionComponent from '../../components/dandelionComponent';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import LocalizeComponent from '../../localize/LocalizeComponent';
import Button from '@material-ui/core/Button';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import CheckIcon from '@material-ui/icons/Check';

import { multiSave } from '../../actions/actions';
import {
  useHistory,
} from "react-router-dom";


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',

  },
  center: {
    flexGrow: 1,
    textAlign: "center",
    fontSize: theme.typography.pxToRem(20),
    fontWeight: 'bold',
    fontFamily:'AppFont',
    align: 'center',
    border: '1px solid #0083ff',
    borderRadius:'5px',
    color:'#0083ff',
    height:'100px',

  },
  m: {
    marginTop:'35px',
    textTransform: 'capitalize',
  },
  m2: {
    marginTop:'24px',
    paddingLeft:'1px',
    paddingRight:'1px',
    textTransform: 'capitalize',
  },
  text: {
    flexGrow: 1,
    fontSize: theme.typography.pxToRem(18),
    fontWeight: 'bold',
    fontFamily:'AppFont',
  },
  icon:{
    color:'#0083ff'
  },
  button: {
    margin: theme.spacing(1),
    borderColor:'#0083ff',
  },
}));

const SimpleAccordion = ({callParentEvent}) => {
  const classes = useStyles();

  const continueWithPlan = (planNumber) => {
      var object = {
        name:"plan",
        value:String(planNumber)
      }

      callParentEvent(object);

  }

  return (
    <div className={classes.root + " projectContainer"}>
      <Accordion>
        <AccordionSummary
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <div  className={classes.center}>
            <div className={classes.m}>
              {LocalizeComponent.n1} / {LocalizeComponent.c_16}
            </div>
          </div>
        </AccordionSummary>
        <AccordionDetails>

          <div className={classes.text}>
            <div className="centralButton">
              <Button
                variant="outlined"
                color="primary"
                className={classes.button}
                endIcon={<NavigateNextIcon/>}
                onClick={event => continueWithPlan(1)}
              >
                    {LocalizeComponent.b_24} {LocalizeComponent.c_16}

              </Button>
            </div>

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
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <div className={classes.center}>
            <div className={classes.m2}>
              {LocalizeComponent.n2} / {LocalizeComponent.c_17}
            </div>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <div className={classes.text}>
            <div className="centralButton">
              <Button
                variant="outlined"
                color="primary"
                className={classes.button}
                onClick={event => continueWithPlan(2)}
                endIcon={<NavigateNextIcon/>}
              >
                    {LocalizeComponent.b_25} {LocalizeComponent.c_17}
              </Button>
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

          </div>
        </AccordionDetails>
      </Accordion>

    </div>
  );
}

const ExampleComponent = (props) => {

  const history = useHistory();

  const goToApplyNewModel = useCallback(() => {
    return history.push({pathname: '/applyn'}), [history];
  })
  const goToApplyBlogger = useCallback(() => {
    return history.push({pathname: '/apply'}), [history];
  })


  const ExecuteChildrentClick = (object) => {
      props.dispatch(multiSave(object));

      if(object.value === "1"){
        goToApplyNewModel();
      }else if(object.value === "2"){
        goToApplyBlogger();
      }
  }

  return (

    <Grid container>

      <div className="bloggerAWrap">
        <div className="MainLCenterWrap">

            <div className="MainLogoCenter"><DandelionComponent /></div>

          </div>
      </div>

      <div className="projectMarginTopByPercent">
            <SimpleAccordion callParentEvent={ExecuteChildrentClick} />
      </div>



    </Grid>


  );
};


 export default connect()(ExampleComponent);
