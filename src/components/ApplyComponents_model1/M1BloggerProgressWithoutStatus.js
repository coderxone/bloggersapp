import React, {useState,useMemo} from 'react';
import config from '../../config/config.js';
import LocalizeComponent from '../../localize/LocalizeComponent';
import {
  withStyles,
  makeStyles,
} from '@material-ui/core/styles';
import Check from '@material-ui/icons/Check';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepConnector from '@material-ui/core/StepConnector';
import clsx from 'clsx';
import {
  Link,
} from "react-router-dom";


const useQontoStepIconStyles = makeStyles({
  root: {
    color: '#eaeaf0',
    display: 'flex',
    height: 10,
    alignItems: 'center',
  },
  active: {
    color: '#0083ff',
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: 'currentColor',
  },
  completed: {
    color: '#0083ff',
    zIndex: 1,
    fontSize: 10,
  },
});

const QontoConnector = withStyles({
    alternativeLabel: {
    top: 2,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
    },
    active: {
    '& $line': {
      borderColor: '#0083ff',
    },
    },
    completed: {
    '& $line': {
      borderColor: '#0083ff',
    },
    },
    line: {
    borderColor: '#eaeaf0',
    borderTopWidth: 3,
    borderRadius: 1
    },
    })(StepConnector);

    function QontoStepIcon(props) {
        const classes = useQontoStepIconStyles();
        const { active, completed } = props;

        return (
          <div
            className={clsx(classes.root, {
              [classes.active]: active,
            })}
          >
            {completed ? <Check className={classes.completed} /> : <div className={classes.circle} />}
          </div>
        );
      }

const BloggerProgressComponent = (props) => {

  const [activeStep, setActiveStep] = React.useState(1);
  const statusArray = useMemo(() => {
    var rData = config.getJSONFromMemory("appstatus");

    rData.splice(1,2);

    for(var i = 0;i < rData.length;i++){
      if(rData[i].text == "open task"){
        rData[i].text = LocalizeComponent.open_task;
      }
      if(rData[i].text == "under consideration by business"){
        rData[i].text = LocalizeComponent.under_consideration;
      }
      if(rData[i].text == "approved by business"){
        rData[i].text = LocalizeComponent.approved_b;
      }
      if(rData[i].text == "waiting system approval"){
        rData[i].text = LocalizeComponent.waiting_system_appr;
      }
      if(rData[i].text == "ready for withdrawal"){
        rData[i].text = LocalizeComponent.statuswithdrawal;
      }
    }

    return rData;
  },[]);



  const items = props.items;


  const fixStatus = (status) => {
    if(status === 4){
      return 1;
    }else if(status === 5){
      return 2;
    }else if(status === 1){
      return 0;
    }
  }

  const content = useMemo(() => {

        return items.map((item,index) =>

          <Link key={item.id} className="deleteUrlClass "
              to={{
                pathname: "/mdetailtask",
                data: item // your data array of objects
              }}
              >
                <div  className="MainBlockStepper withoutScroll">
                  <div  className="firstLevelStepper">
                      <div className="firstLevelTextStepper">
                          {item.url}
                      </div>
                  </div>
                  <div className="secondLevelStepper">

                    <Stepper className="StepperAppStyles" alternativeLabel activeStep={fixStatus(item.status)} connector={<QontoConnector />}>
                      {statusArray.map((label) => (
                        <Step key={label.id}>
                          <StepLabel StepIconComponent={QontoStepIcon}>{label.text}</StepLabel>
                        </Step>
                      ))}
                    </Stepper>
                  </div>
                </div>
            </Link>

      );

  },[props.items]);



  return (
    <div className="fullWidth withoutScroll" >
      {content}
    </div>
  );

}

export default BloggerProgressComponent;
