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
import Button from '@material-ui/core/Button';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Logo from '../icons/logo_circle_new_circle.png';
import Box from '@material-ui/core/Box';
import { connect } from 'react-redux';
import DialogComponent from '../components/DialogComponent';
import config from '../config/config.js';
import CountryComponent from '../components/CountryComponent';
import CategoriesComponent from '../helperComponents/CategoriesComponent.js';
import EditListComponent from '../helperComponents/SelfEditSocialNetworkComponent.js';
import Observable from '../services/Observable';

import { increment, decrement,save_email,save_age,save_multiData } from '../actions/actions';
import {
  Link,
} from "react-router-dom";



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
  email: yup.string().required("Required").email(),
});

function getSteps() {
  return ['step 1', 'step 2', 'step 3','step 4','step 5','step 6','step 7'];
}


const BloggerAnswersComponent = (props) => {

  var QuestionsArray = ['Where are you located?','Please choose your audience interest','How old are you?','Please Enter your First Name','Please Enter your Last Name','Please Enter your Nick Name','please inter Social NetWork Account Link'];
  const [questions] = useState(QuestionsArray);

  const classes = useStyles();


  const { register, handleSubmit, errors,setError } = useForm({
    resolver: yupResolver(schema)
  });


  const [activeStep, setActiveStep] = React.useState(6);
  const steps = getSteps();

  const handleNext = () => {
    setName("");
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setName("");
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setName("");
    setActiveStep(0);
  };


  const onSubmit = (data) => {

  }

  const [age,SetAge] = useState(0);
  const setOld = (event) => {

    var age = event.target.value;
    if(age > 0){
      SetAge(age);
      props.dispatch(save_age(age));
    }

  }

  const [name,setName] = useState('');

  const setMultiData = (event) => {

    var objName = '';
    if(activeStep == 3){
      objName = "firstName";
    }else if(activeStep == 4){
      objName = "lastName";
    }else if(activeStep == 5){
      objName = "nickName";
    }

    var firstName = event.target.value;
    if(firstName.length > 0){
      props.dispatch(save_multiData({_object:objName,name:firstName}));
    }
    setName(firstName);

  }

  return (

   	<div className={classes.root}>
        <Grid container >



            <div className="askBox">

                <div className="askBoxText">
                    {questions[activeStep]}
                </div>

                <div className="questionBox">
                    <form onSubmit={handleSubmit(onSubmit)}  >

                  {
                    activeStep == 0 && (
                      <CountryComponent/>
                    )
                  }
                  {
                    activeStep == 1 && (
                      <CategoriesComponent/>

                    )
                  }
                  {
                    activeStep == 2 && (
                      <TextField
                          required
                          onChange={setOld}
                          className="textFieldAppStyle"
                        />

                    )
                  }
                  {
                    (
                    activeStep == 3 ||
                    activeStep == 4 ||
                    activeStep == 5
                    ) && (
                      <TextField
                          required
                          onChange={setMultiData}
                          value={name}
                          className="textFieldAppStyle"
                        />
                    )
                  }

                  {
                    activeStep == 6 && (

                      <EditListComponent />

                    )
                  }



                    </form>

                </div>


            </div>



              <div className="manageButtons">
                  <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                     Back
                   </Button>
                   <Button
                     variant="contained"
                     color="primary"
                     onClick={handleNext}
                     className={classes.button}
                   >
                     {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                   </Button>

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







          </Grid>
      </div>


  );
};


 export default connect(mapStateToProps,mapDispatchToProps)(BloggerAnswersComponent);
