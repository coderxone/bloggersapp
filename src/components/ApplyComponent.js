import React, {useState,useEffect,useMemo} from 'react';
// import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonItem, IonLabel, IonList, IonItemDivider } from '@ionic/react';
import '../css/mainStyles.scss';
import LocalizeComponent from '../localize/LocalizeComponent';
import ApplyService from '../services/ApplyService';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import GoBackAbsoluteComponent from '../helperComponents/goBackAbsoluteComponent';
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
import { save_multiData } from '../actions/actions';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { connect } from 'react-redux';
import HomeService from '../services/Homeservice';
import AlertDangerComponent from '../helperComponents/AlertDangerComponent';
import AlertComponent from '../helperComponents/AlertBoxComponent';
import Button from '@material-ui/core/Button';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import AlarmIcon from '@material-ui/icons/Alarm';
import ReactGeoCodeComponent from './GeocodeComponent';
import DandelionComponent from '../components/dandelionComponent';
import CategoriesComponent from '../helperComponents/businessCategories';
import BusinessGoalComponent from '../helperComponents/businessGoalComponent';
import config from '../config/config.js';
import {
  Redirect
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
  return ['1', '2', '3','4','5','6','7','8','9','10'];
}

const ApplyComponent = (props) => {

  const classes = useStyles();
  const { register, handleSubmit, errors,setError } = useForm({
    resolver: yupResolver(schema)
  });

  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [selectedTime, setSelectedTime] = React.useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
    props.dispatch(save_multiData({_object:'date',name:date}));
  };
  const handleTimeChange = (time) => {
    setSelectedTime(time);
    props.dispatch(save_multiData({_object:'time',name:time}));
  };

  const famousPrice = useMemo(() => {
      return parseInt(localStorage.getItem("famousPrice"));
  },[]);

  var QuestionsArray = ['What is the name of your business?','What is your website link to your business?',LocalizeComponent.description_placeholder,'Where is your business located?','Would like to work with only local creators','Would like to work only with famous creators','When would you like to start the campaign?','When would you like to start the campaign?','How much money do you want to pay?','Who is your buyer persona?','What is your goal for the campaign?'];
  const [questions] = useState(QuestionsArray);

  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const [error,SetError] = useState(false);
  const [AlertText,SetAlertText] = useState('please fill in');
  const [urlValidate,SeturlValidate] = useState(0);

  const [name,setName] = useState('');

  const handleNext = () => {
    setName("");

      var resultStep = true;

      resultStep = checkForms();

      console.log(resultStep);

      if(resultStep == true){
        var stepper = activeStep + 1;

        if(stepper == 11){
          onSubmit();
        }else{
          setActiveStep(stepper);
          SetError(false);
        }

      }




  };
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
    }else if(activeStep === 4){
      return true;
    }else if(activeStep === 5){
      return true;
    }else if(activeStep === 6){
      if(config.getUserItemName("date") != false){
        return true;
      }else{
        SetError(true);
        return false;
      }
    }else if(activeStep === 7){
      if(config.getUserItemName("time") != false){
        return true;
      }else{
        SetError(true);
        return false;
      }
    }else if(activeStep === 8){
      return true;
    }else if(activeStep === 9){
      if(config.getUserItemName("category") != false){
        return true;
      }else{
        SetError(true);
        return false;
      }
    }else if(activeStep === 10){
      if(config.getbusinessCategory() != false){
        return true;
      }else{
        SetError(true);
        return false;
      }
    }
    //getUserSSN
  }

  const handleBack = () => {

    var stepper = activeStep - 1;

    setName("");
    setActiveStep(stepper);
  };

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

    if(firstName.length > 0){
      props.dispatch(save_multiData({_object:objName,name:firstName}));
    }
    setName(firstName);

  }


  const [maxdefaultSliderValue] = useState(5000);
  const [mindefaultSliderValue] = useState(200);
  const [defaultSliderValue,setDefaultSliderValue] = useState(200);
  const [defaultSliderValueStore,setdefaultSliderValueStore] = useState(200);
  var databasedefaultSliderValue = 200;
  const [peopleCount,setPeopleCount] = useState(6);
  const [subscribers,setSubscribers] = useState(500);
  const [subscribersor,setSubscribersor] = useState(500);

  const [redirect,Setredirect] = useState(false);
  const [route,SetRoute] = useState("");

  const handleChangeSlider = (event,newValue) => {

    var obj = {
      amount:newValue,
      swithFamous:swithFamous
    }
    ApplyService.checkSubscriberCore(obj);
    //famousPrice
    setdefaultSliderValueStore(newValue);

  }

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

           var gps = 0;
           if(swithState == true){
             gps = 1;
           }else{
             gps = 2;
           }

           var famous = 0;
           if(swithFamous == true){
             famous = 1;
           }else{
             famous = 2;
           }

           var peopleCount = config.getUserItemName("people");

           var finalObject = {
             coord:config.getUserCoordinates(),
             amount:config.getUserItemName("amount"),
             peopleCount:peopleCount,
             countvideo:peopleCount,
             subscribers:config.getUserItemName("subscribers"),
             gps:gps,
             famous:famous,
             url:config.getUserItemName("companyUrl"),
             date:config.getUserItemName("date"),
             time:config.getUserItemName("time"),
             description:config.getUserItemName("description"),
             companyName:config.getUserItemName("companyName"),
             category:config.getUserItemName("category"),
             businessAnswers:config.getbusinessCategory()

           }

           return finalObject;
         }catch (e){
             //handle errors as needed
         }
      };

      FinalLogic().then(response => {
        console.log(response);
        HomeService.sendApplyData(response);
      })


  });

  const [swithFamous,SetswithFamous] = useState(false);

  const CorrectPrice = ((data) => {

    setPeopleCount(data.countOfBloggers);
    setSubscribers(data.subscribersResult);
    setSubscribersor(data.originalNumber);
    setDefaultSliderValue(data.NewCheckingAmount);
    props.dispatch(save_multiData({_object:'amount',name:data.NewCheckingAmount}));
    props.dispatch(save_multiData({_object:'people',name:data.countOfBloggers}));
    props.dispatch(save_multiData({_object:'subscribers',name:data.originalNumber}));

  });

  useEffect(() => {
    const listenSubscriberCore = ApplyService.listenSubscriberCore().subscribe(data => {

        CorrectPrice(data);
    });

    return () => {
      listenSubscriberCore.unsubscribe();
    }

  },[]);



  useEffect(() => {

      const firstListener = HomeService.listenApplyData().subscribe(data => {

          if(data.status === "ok"){
              //data.insertId
              localStorage.setItem("insertId",data.insertId);

              SetRoute("/payment");
              Setredirect(true);

              //console.log(data);
          }
      });




      return () => {
        firstListener.unsubscribe();
      }

  },[]);


  useEffect(() => {
    var obj = {
      amount:defaultSliderValue,
      swithFamous:swithFamous
    }

    ApplyService.checkSubscriberCore(obj);
    config.checkUserAuthorization(2);

  },[]);

  const [swithState,SetswithState] = useState(false);


  const handleSwitch = (event) => {
    SetswithState(event.target.checked);
  }

  const handleSwitchInfl = (event) => {
    SetswithFamous(event.target.checked);

  }

  useMemo(() => {
    var obj = {
      amount:defaultSliderValueStore,
      swithFamous:swithFamous
    }

    ApplyService.checkSubscriberCore(obj);
  },[swithFamous])


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

                    <div>
                      <div className="switchBox">

                        <div className="lswitchBox">
                          {LocalizeComponent.onlyLocal}
                        </div>
                        <div className="rswitchBox">
                          <Switch
                            checked={swithState}
                            onChange={handleSwitch}
                            color="primary"
                            className="switchCheckbox"
                            name="checkedB"
                            inputProps={{ 'aria-label': 'primary checkbox' }}
                          />

                        </div>


                      </div>
                      <AlertComponent state={error} text={AlertText}/>
                    </div>

                  )
                }
                {
                  activeStep == 5 && (

                    <div>
                        <div className="switchBoxIfl">

                          <div className="lswitchBox">
                            {LocalizeComponent.highRank}
                          </div>
                          <div className="rswitchBox">
                            <Switch
                              checked={swithFamous}
                              onChange={handleSwitchInfl}
                              color="primary"
                              className="switchCheckbox"
                              name="checkedB"
                              inputProps={{ 'aria-label': 'primary checkbox' }}
                            />

                          </div>


                        </div>
                        <AlertComponent state={error} text={AlertText}/>
                    </div>

                  )
                }
                {
                  activeStep == 6 && (

                    <div>
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <KeyboardDatePicker
                            margin="normal"
                            id="date-picker-dialog"
                            inputRef={register}
                            label={LocalizeComponent.date_name}
                            className="datepickerColor"
                            name="date"
                            helperText={errors.date?.message}
                            format="MM/dd/yyyy"
                            value={selectedDate}
                            onChange={handleDateChange}
                            KeyboardButtonProps={{
                              'aria-label': 'change date',
                            }}
                            keyboardIcon={<CalendarTodayIcon style={{color:"#0083ff"}} />}
                          />

                        </MuiPickersUtilsProvider>
                      <AlertComponent state={error} text={AlertText}/>
                    </div>

                  )
                }
                {
                  activeStep == 7 && (

                    <div>
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <KeyboardTimePicker
                            inputRef={register}
                            margin="normal"
                            id="time-picker"
                            name="time"
                            label={LocalizeComponent.time_name}
                            value={selectedDate}

                            format="HH:mm:ss"
                            className="secondMargin"
                            helperText={errors.time?.message}
                            onChange={handleTimeChange}
                            KeyboardButtonProps={{
                              'aria-label': 'change time',
                            }}
                            keyboardIcon={<AlarmIcon style={{color:"#0083ff"}} />}
                          />
                        </MuiPickersUtilsProvider>
                      <AlertComponent state={error} text={AlertText}/>
                    </div>

                  )
                }
                {
                  activeStep == 8 && (

                    <div>
                      <Typography align="left" className="appColor" gutterBottom>{LocalizeComponent.amount_name + " - $" + defaultSliderValue}</Typography>
                      <PrettoSlider
                      valueLabelDisplay="auto"
                      aria-label="pretto slider"
                      defaultValue={databasedefaultSliderValue}
                      max={maxdefaultSliderValue}
                      min={mindefaultSliderValue}
                      onChange={handleChangeSlider}
                      />

                      <Box>
                        <div className="showText">{LocalizeComponent.count_of_bloggers} - {peopleCount} </div>
                        <div className="showText">{LocalizeComponent.count_of_subscribers } - {subscribers}</div>
                      </Box>
                      <AlertComponent state={error} text={AlertText}/>
                    </div>

                  )
                }

                {
                  activeStep == 9 && (

                    <div>
                      <CategoriesComponent/>
                      <AlertComponent state={error} text={AlertText}/>
                    </div>

                  )
                }
                {
                  activeStep == 10 && (

                    <div>
                      <BusinessGoalComponent/>
                      <AlertComponent state={error} text={AlertText}/>
                    </div>

                  )
                }


              </div>


          </div>



            <div className="manageButtons">
                <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                   Back
                 </Button>
                 {
                   activeStep < steps.length && (
                     <Button
                       variant="contained"
                       color="primary"
                       onClick={handleNext}
                       className={classes.button}
                     >
                       Next
                     </Button>
                     )
                 }
                 {
                   activeStep === steps.length && (
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
