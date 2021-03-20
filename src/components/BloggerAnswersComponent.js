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


import { increment, decrement,save_email } from '../actions/actions';
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
  return ['step 1', 'step 2', 'step 3','step 4'];
}


const BloggerAnswersComponent = (props) => {


  const classes = useStyles();


  const { register, handleSubmit, errors,setError } = useForm({
    resolver: yupResolver(schema)
  });


  const [activeStep, setActiveStep] = React.useState(1);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };


  const onSubmit = (data) => {

  }


  return (

   	<div className={classes.root}>
        <Grid container >



            <div className="askBox">

                <div className="askBoxText">
                    find your country
                </div>

                <div className="questionBox">
                    <form onSubmit={handleSubmit(onSubmit)}  >

                  {
                    activeStep == 1 && (
                      <CountryComponent/>
                    )
                  }
                  {
                    activeStep == 2 && (
                      <TextField
                          error
                          inputRef={register}

                          className="textFieldAppStyle"
                          helperText={errors.title?.message}
                        />
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
