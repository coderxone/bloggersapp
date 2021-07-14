import React, {useState,useEffect,useMemo,useCallback} from 'react';
// import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonItem, IonLabel, IonList, IonItemDivider } from '@ionic/react';
import '../../css/mainStyles.scss';
import LocalizeComponent from '../../localize/LocalizeComponent';
import ApplyService from '../../services/ApplyService';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import GoBackAbsoluteComponent from '../../helperComponents/goBackAbsoluteComponent';
import Switch from '@material-ui/core/Switch';
import {
  withStyles,
  makeStyles,
} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import DateFnsUtils from '@date-io/date-fns';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import { multiSave } from '../../actions/actions';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { connect } from 'react-redux';
import HomeService from '../../services/Homeservice';
import AlertDangerComponent from '../../helperComponents/AlertDangerComponent';
import AlertComponent from '../../helperComponents/AlertBoxComponent';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import AlarmIcon from '@material-ui/icons/Alarm';
import ReactGeoCodeComponent from '../GeocodeComponent';
import DandelionComponent from '../dandelionComponent';
import BusinessGoalComponent from '../../helperComponents/businessGoalComponent';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import config from '../../config/config.js';
import {
  Redirect,useHistory
} from "react-router-dom";



//const {regionsList: { data: list = [] } } = props;


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor:'transparent',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    backgroundColor:'transparent',
  },
  icon:{
    color:'#0083ff',
    htmlColor:'#0083ff',
    headerColor:'#0083ff',
  }
}));

const PrettoSlider = withStyles({
  root: {
    color: '#0083ff',
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    // backgroundColor: '#fff',
    border: '2px solid #0083ff',
    marginTop: -8,
    marginLeft: -12,
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },

})(Slider);

const CssTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: '#0083ff',
    },
    '& label': {
      color: '#0083ff',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#0083ff',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#0083ff',
      },
      '&:hover fieldset': {
        borderColor: 'yellow',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#0083ff',
      },
      '& input:valid + fieldset': {
        borderColor: '#0083ff',
      },
      '& input:invalid + fieldset': {
        borderColor: 'red',
      },

    },
  },
})(TextField);

const schema = yup.object().shape({
  title: yup.string().matches(
            /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
            'Enter correct url!'
        )
        .required('Please enter url').required("Required"),
  description: yup.string().required("Required"),
  date: yup.string().required("Required"),
  time: yup.string().required("Required"),
});

function getSteps() {
  return ['1', '2', '3','4','5'];
}

const ApplyComponent = (props) => {

  const classes = useStyles();
  const { register, handleSubmit, errors,setError } = useForm({
    resolver: yupResolver(schema)
  });



  var QuestionsArray = [LocalizeComponent.q1,LocalizeComponent.q2,LocalizeComponent.b_26,LocalizeComponent.q3,LocalizeComponent.b_27];
  const [questions] = useState(QuestionsArray);


  const checkStep = useMemo(() => {
    const step = config.getUserItemName("step");
    if(step){
        return parseInt(step);
    }else{
      return 0;
    }
  },[]);

  const video = useMemo(() => {
    const video = config.getUserItemName("video");
    if(video){
        return true;
    }else{
      return false;
    }
  },[]);

  const [activeStep, setActiveStep] = React.useState(checkStep);
  const steps = getSteps();

  const [error,SetError] = useState(false);
  const [AlertText,SetAlertText] = useState('please fill in');
  const [urlValidate,SeturlValidate] = useState(0);

  const [name,setName] = useState('');
  const history = useHistory();

  const handleNext = () => {
      setName("");

      var resultStep = true;

      resultStep = checkForms();

      // console.log(resultStep);
      // console.log(activeStep);

      if(resultStep == true){
        var stepper = activeStep + 1;

        if(stepper == 5){
          //console.log("submit");
          onSubmit();
        }else{
          //xx
          setActiveStep(stepper);
          SetError(false);

          props.dispatch(multiSave({name:'step',value:stepper}));

        }

      }

  };

  const handleBack = () => {

    var stepper = activeStep - 1;
    setName("");
    setActiveStep(stepper);
    props.dispatch(multiSave({name:'step',value:stepper}));

  };

  const restoreFormFields = () => {

    if(activeStep == 0){
      var companyName = config.getUserItemName("companyName");
      if(companyName != false){
        setName(companyName);
      }

    }else if(activeStep == 1){
      var companyUrl = config.getUserItemName("companyUrl");
      if(companyUrl != false){
        setName(companyUrl);
      }
    }else if(activeStep == 2){
      var description = config.getUserItemName("description");
      if(description != false){
        setName(description);
      }
    }

  }




  useMemo(() => {
    restoreFormFields();
  },[activeStep])

//xx
  const checkForms = () => {
    if(activeStep == 0){
      if(config.getUserItemName("companyName") != false){
        return true;
      }else{
        SetError(true);
        return false;
      }

    }else if(activeStep == 1){
      if(config.getUserItemName("companyUrl") != false){
        return true;
      }else{
        SetError(true);
        return false;
      }
    }else if(activeStep == 2){
      if(config.getUserItemName("description") != false){
        return true;
      }else{
        SetError(true);
        return false;
      }
    }else if(activeStep === 3){
      if(config.getUserCoordinates() != false){
        return true;
      }else{
        SetError(true);
        return false;
      }
    }else if(activeStep == 4){
      if(config.getUserItemName("video") != false){
        return true;
      }else{
        SetError(true);
        return false;
      }
    }
    //getUserSSN
  }





  const handleReset = () => {
    setName("");
    setActiveStep(0);
  };

  const urlChecker = (url) => {
    var regular = /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/;
    var testUrl = regular.test(url);
    if(testUrl === true){
      SetError(false);
      SeturlValidate(0);

    }else{
      SetAlertText("");
      SetError(true);
      SeturlValidate(1);
    }
  }
//xx
  const setMultiData = (event) => {

    var firstName = event.target.value;

    var objName = '';
    if(activeStep == 0){
      objName = "companyName";
    }else if(activeStep == 1){
      objName = "companyUrl";
      urlChecker(firstName);
    }else if(activeStep == 2){
      objName = "description";
    }
//xx

    //console.log(firstName);
    if(firstName.length > 0){
      props.dispatch(multiSave({name:objName,value:firstName}));
    }
    setName(firstName);

  }

  const [subscribers,setSubscribers] = useState(500);

  const [redirect,Setredirect] = useState(false);
  const [route,SetRoute] = useState("");


  const [alertState,setAlertState] = useState(false);
  const [alertText,setAlertText] = useState("");

  const hideAlert = () => {
    setTimeout(function(){
        setAlertState(false);
    },3000)
  }
//xx
  const onSubmit = (() => {



      const FinalLogic = async function(){
         try {

           var postamount = config.getUserItemName("postamount");
           var obj = {
             name:"amount",
             value:postamount
           }
           props.dispatch(multiSave(obj));
           //Tue Jun 08 2021 13:40:06 GMT-0700 (Pacific Daylight Time)

           var finalObject = {
             coord:config.getUserCoordinates(),
             amount:parseInt(postamount),//get current system amount
             subscribers:config.getUserItemName("subscribers"),//get current all system subscribers
             url:config.getUserItemName("companyUrl"),
             description:config.getUserItemName("description"),
             companyName:config.getUserItemName("companyName"),
             videourl:config.getUserItemName("video"),
             type:1,
           }

           return finalObject;
         }catch (e){
             //handle errors as needed
         }
      };

      FinalLogic().then(response => {
        //console.log(response);
        HomeService.sendApplyData(response);
      })


  });

//xx

  const goToDownload = useCallback(() => {

    return history.push('/video'), [history]

  });





  useEffect(() => {

    restoreFormFields();//restore forms field if saved

    config.checkUserAuthorization(2);

  },[]);

  useEffect(() => {

      const firstListener = HomeService.listenApplyData().subscribe(data => {

          if(data.status === "ok"){
              //data.insertId
              localStorage.setItem("insertId",data.insertId);
              config.deleteUserItemName("video");
              config.deleteUserItemName("step");


              SetRoute("/payment");
              Setredirect(true);



              //console.log(data);
          }
      });




      return () => {
        firstListener.unsubscribe();
      }

  },[]);








  return (

   	<div className={classes.root}>
        <Grid container >

          <div className="bloggerAWrap">
            <div className="MainLCenterWrap">

                <div className="MainLogoCenter"><DandelionComponent /></div>

              </div>
          </div>

          <div className="askBox">

              <div className="askBoxText">
                  {questions[activeStep]}
              </div>

              <div className="questionBox">


                {
                  activeStep == 0 && (
                    <div>
                        <TextField
                            required
                            onChange={setMultiData}
                            value={name}
                            className="textFieldAppStyle"
                            label={LocalizeComponent.company_name}
                          />
                      <AlertComponent state={error} text={AlertText}/>

                    </div>
                  )
                }
                {
                  activeStep == 1 && (
                    <div>
                        <TextField
                            required
                            onChange={setMultiData}
                            value={name}
                            className="textFieldAppStyle"
                            label={LocalizeComponent.title_name}
                          />
                      <AlertComponent state={error} text={AlertText}/>
                    </div>
                  )
                }
                {
                  activeStep == 2 && (
                    <div>
                        <TextField
                            required
                            onChange={setMultiData}
                            value={name}
                            multiline
                            className="textFieldAppStyle"
                            label={LocalizeComponent.description_name}
                          />
                      <AlertComponent state={error} text={AlertText}/>
                    </div>

                  )
                }
                {

                  activeStep == 3 && (
                    <div>
                        <ReactGeoCodeComponent/>
                        <AlertComponent state={error} text={AlertText}/>
                    </div>
                  )
                }

                {
                  activeStep == 4 && (
                    <div className="VideoImageStyleContainer">

                      <div>
                        {
                          video !== false ? (
                            <Button
                                variant="contained"
                                color="primary"
                                className={classes.button}
                                startIcon={<CheckCircleIcon className="successUploadSmallIcon" />}
                              >
                              {LocalizeComponent.b_30}
                              </Button>
                          ) : (
                            <Button
                                variant="contained"
                                color="primary"
                                className={classes.button}
                                startIcon={<CloudUploadIcon />}
                                onClick={goToDownload}
                              >
                              {LocalizeComponent.b_28}
                              </Button>
                          )
                        }
                      </div>


                      <AlertComponent state={error} text={AlertText}/>
                    </div>
                  )
                }




              </div>


          </div>



            <div className="manageButtons">
                <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                   {LocalizeComponent.q11}
                 </Button>
                 {
                   activeStep < steps.length - 1 && (
                     <Button
                       variant="contained"
                       color="primary"
                       onClick={handleNext}
                       className={classes.button}
                     >
                       {LocalizeComponent.q10}
                     </Button>
                     )
                 }
                 {
                   activeStep === steps.length - 1 && (
                     <Button
                       variant="contained"
                       color="primary"
                       onClick={handleNext}
                       className={classes.button}
                     >
                       {LocalizeComponent.continue_button}
                     </Button>
                     )
                 }


            </div>

            <div className="stepperBox">
                <Stepper alternativeLabel activeStep={activeStep}>
                    {steps.map((label) => (
                      <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                      </Step>
                    ))}
                  </Stepper>
              </div>

              <GoBackAbsoluteComponent/>



            {
              redirect === true && (
                <Redirect to={route} />
              )
            }

             <AlertDangerComponent state={alertState} text={alertText} />



          </Grid>
      </div>


  );
};

 export default connect()(ApplyComponent);
