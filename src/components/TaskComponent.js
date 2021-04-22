import React, {useState,useEffect,useMemo} from 'react';
// import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonItem, IonLabel, IonList, IonItemDivider } from '@ionic/react';
import '../css/mainStyles.scss';
import LocalizeComponent from '../localize/LocalizeComponent';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import {
  withStyles,
  makeStyles,
} from '@material-ui/core/styles';
import GoBackAbsoluteComponent from '../helperComponents/goBackAbsoluteComponent';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Logo from '../icons/logo_circle_new_circle.png';
import Box from '@material-ui/core/Box';
import { connect } from 'react-redux';
import AuthService from '../services/AuthService';
import HomeService from '../services/Homeservice';
import TaskService from '../services/TaskService';
import DialogComponent from '../components/DialogComponent';
import config from '../config/config.js';

import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepConnector from '@material-ui/core/StepConnector';
import clsx from 'clsx';
import Check from '@material-ui/icons/Check';



import { increment, decrement,save_email } from '../actions/actions';
import {
  Link,
} from "react-router-dom";

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


    function TabPanel(props) {
        const { children, value, index, ...other } = props;

        return (
          <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
          >
            {value === index && (
              <Box>
                {children}
              </Box>
            )}
          </div>
        );
      }

    TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
    };

    function a11yProps(index) {
      return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
      };
    }



function mapStateToProps(state,ownProps) {
  return {
    count: state.count,
    email:state.email,
    password:state.password
  }
}

//const {regionsList: { data: list = [] } } = props;

const mapDispatchToProps = dispatch => ({
  increment,
  decrement,
  dispatch,
  save_email
});

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor:'transparent',
  },
  paper: {
    padding: theme.spacing(0),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    backgroundColor:'transparent',
  },
}));



const CssTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: '#8936f4',
    },
    '& label': {
      color: '#8936f4',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#8936f4',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'red',
      },
      '&:hover fieldset': {
        borderColor: 'yellow',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#8936f4',
      },
      '& input:valid + fieldset': {
        borderColor: '#8936f4',
      },
      '& input:invalid + fieldset': {
        borderColor: 'red',
      },

    },
  },
})(TextField);

const schema = yup.object().shape({
  email: yup.string().required("Required").email(),
});


const MessageComponent = (props) => {
  return (
    <div className="errorBox">
        {props.message}
    </div>
  )
}


const BlockComponent = (props) => {

  const items = props.items;

  const content = useMemo(() => {

    return items.map((item,index) =>

      <Link key={item.id} className="deleteUrlClass"
          to={{
            pathname: "/detailtask",
            data: item // your data array of objects
          }}
          >
            <div  className="MainBlock withoutScroll">
              <div  className="firstLevel">
                  <div className="firstLevelText">
                      {item.url} - {item.description}
                  </div>
              </div>
              <div className="secondLevel">
                <div className="secondLevelShare">
                  <div className="secondLevelOne">
                    <div className="shouldButton">
                        <div className="shouldButtonText">
                              limit: {item.peoplecount} infl.
                        </div>
                    </div>
                  </div>
                  <div className="secondLevelTwo">

                  </div>
                </div>
                <div className="secondLevelShareThree">
                  <div className="secondLevelThree">
                    <div className="shouldButtonThree">
                        <div className="shouldButtonText">
                              {item.date} - {item.time}
                        </div>
                    </div>
                  </div>
                  <div className="secondLevelThreeTwo">
                    <div className="shareButtonThree">
                        <div className="shareButtonText">
                              {item.sum} $
                        </div>
                    </div>
                  </div>
                </div>
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

//xx
const CompleteBlockComponent = (props) => {

  const [activeStep, setActiveStep] = React.useState(1);
  const statusArray = useMemo(() => {
    var rData = config.getJSONFromMemory("appstatus");
    return rData;
  },[])

  const items = props.items;

  //console.log(items);

  const content = useMemo(() => {

    return items.map((item,index) =>

      <Link key={item.id} className="deleteUrlClass"
          to={{
            pathname: "/detailtask",
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

                <Stepper className="StepperAppStyles" alternativeLabel activeStep={item.status - 1} connector={<QontoConnector />}>
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


const TaskComponent = (props) => {


  var checkingEmail = useMemo(() => {

      const locationData = props.location;
      if(locationData.data){
        //save in browser memory
        localStorage.setItem("checkingEmail",checkingEmail);
        //return object;
        return props.location.data.user_email;
        // localStorage.setItem("checkingItemData",JSON.stringify(ItemData));
      }else{
        return localStorage.getItem("checkingEmail");
      }

  },[]);




  const classes = useStyles();
  const { register, handleSubmit, errors,setError } = useForm({
    resolver: yupResolver(schema)
  });



  const [cancelDoubleEvent,setCancelDoubleEvent] = useState(0);

  const [closeDialog,setCloseDialog] = useState(false);

  const onSubmit = ((data) => {




  });

  const [listArray,setListArray] = useState([]);
  const [listArrayComplete,setListArrayComplete] = useState([]);



  useEffect(() => {

    const TaskServiceUnsub = TaskService.listenUserDataTask().subscribe(data => {
      //console.log(data);

      if(data.status == "ok"){



        if(data.data.length > 0){

          const newlistArray = [...listArray];

          for(var i = 0;i < data.data.length;i++){
              var found = 0;
              for(var j = 0;j < newlistArray.length;j++){
                if(newlistArray[j].id == data.data[i].id){
                  found = 1;
                }
              }
              if(found == 0){
                newlistArray.push(data.data[i]);
              }

          }

          setListArray(newlistArray);
        }

        if(data.completedata.length > 0){

          const newlistArray = [...listArrayComplete];

          for(var i = 0;i < data.completedata.length;i++){
              var found = 0;
              for(var j = 0;j < newlistArray.length;j++){
                if(newlistArray[j].id == data.completedata[i].id){
                  found = 1;
                }
              }
              if(found == 0){
                newlistArray.push(data.completedata[i]);
              }

          }

          //console.log(newlistArray);
//xx
          setListArrayComplete(newlistArray);


        }


      }

    });
    //unsubscribe

    return () => {
      TaskServiceUnsub.unsubscribe();
    }

    //unsubscribe

  }, [listArray,listArrayComplete]);


  useEffect(() => {

    //initiase functions
    TaskService.getTaskData();
    config.checkUserAuthorization(1);


  }, []);


  const [value, setValue] = React.useState(1);

  const tabsChange = (event, newValue) => {
    setValue(newValue);
  };









  return (

   	<div className={classes.root}>
        <Grid container >
          <AppBar position="static">
          <Tabs value={value} onChange={tabsChange} aria-label="simple tabs example">
              <Tab label="Current Tasks" {...a11yProps(0)} />
              <Tab label="Task Progress" {...a11yProps(1)} />
            </Tabs>
          </AppBar>
          <TabPanel value={value} index={0}>
            <BlockComponent items={listArray} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <CompleteBlockComponent items={listArrayComplete} />
          </TabPanel>

            <GoBackAbsoluteComponent/>



          </Grid>
      </div>


  );
};


 export default connect(mapStateToProps,mapDispatchToProps)(TaskComponent);
