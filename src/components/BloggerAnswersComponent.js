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
import AlertComponent from '../helperComponents/AlertBoxComponent';
import config from '../config/config.js';
import CountryComponent from '../components/CountryComponent';
import CategoriesComponent from '../helperComponents/CategoriesComponent';
import EditListComponent from '../helperComponents/SelfEditSocialNetworkComponent';
import Observable from '../services/Observable';
import VerifyComponent from '../helperComponents/VerifyComponent';
import UploadDocumentComponent from '../helperComponents/UploadDocumentComponent';
import { increment, decrement,save_email,save_multiData } from '../actions/actions';
import BloggerAnswersService from '../services/BloggerAnswersService';
import DandelionComponent from '../components/dandelionComponent';
import {
  Redirect,
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
  return ['1', '2', '3','4','5','6','7','8','9','10'];
}


const BloggerAnswersComponent = (props) => {

  var QuestionsArray = ['Where are you located?','Please choose your audience interest','How old are you?','Please Enter your First Name','Please Enter your Last Name','Please Enter your Username','please inter Social Network Account Link','How many subscribers do you currently have ?','Enter your PayPal email for withdrawal','Enter SSN,ITIN or EIN for background verification','upload at least 1 document to proof identity'];
  const [questions] = useState(QuestionsArray);

  const classes = useStyles();


  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const [error,SetError] = useState(false);
  const [AlertText,SetAlertText] = useState('please fill in');


  const handleNext = () => {
    setName("");

      var resultStep = true;

      resultStep = checkForms();

      console.log(resultStep);

      if(resultStep == true){
        var stepper = activeStep + 1;

        if(stepper == 9){
          var country = config.getUserCountry();
          if(country){
            if(country !== "US"){
              stepper += 1;
            }
          }
        }

        if(stepper == 11){
          onSubmit();
        }else{
          setActiveStep(stepper);
          SetError(false);
        }

      }




  };

  const [name,setName] = useState('');

  const checkForms = () => {
    if(activeStep == 0){
      var result = config.getUserCountry();
      if(result != false){
        return true;
      }else{
        SetError(true);
        return false;
      }

    }else if(activeStep == 1){
      var result = config.getUserCategory();
      if(result != false){
        return true;
      }else{
        SetAlertText("please fill in");
        SetError(true);
        return false;
      }
    }else if(activeStep == 2){
      if(age != 0){
        return true;
      }else{
        SetError(true);
        return false;
      }
    }else if((activeStep === 3) || (activeStep === 4) || (activeStep === 5)){
      if(name.length > 0){
        return true;
      }else{
        SetError(true);
        return false;
      }
    }else if(activeStep === 6){
      if(config.getUserSocialNetworks().status == true){
        return true;
      }else{
        SetError(true);
        return false;
      }
    }else if(activeStep === 7){
      if(config.getUserItemName("subscribers_count") != false){
        return true;
      }else{
        SetError(true);
        return false;
      }
    }else if(activeStep === 8){
      if(config.getUserItemName("paypal") != false){
        return true;
      }else{
        SetError(true);
        return false;
      }
    }else if(activeStep === 9){
      if(config.getUserSSN().status != false){
        return true;
      }else{
        SetAlertText("please fill in");
        SetError(true);
        return false;
      }
    }else if(activeStep === 10){
      if(config.getUserItemName("photo") != false){
        return true;
      }else{
        SetAlertText("please download image");
        SetError(true);
        return false;
      }
    }
    //getUserSSN
  }

  const handleBack = () => {

    var stepper = activeStep - 1;

    if(stepper == 9){
      var country = config.getUserCountry();
      if(country){
        if(country !== "US"){
          stepper -= 1;
        }
      }
    }

    setName("");
    setActiveStep(stepper);
  };

  const handleReset = () => {
    setName("");
    setActiveStep(0);
  };


  const onSubmit = (data) => {

      const FinalLogic = async function(){
         try {

           var SsnObject = {};

           var country = config.getUserCountry();
           if(country){
             if(country !== "US"){
               SsnObject.SSN = "not required";
             }else{
               SsnObject = config.getUserSSN();
             }
           }

           var finalObject = {
             country:country,
             category:config.getUserCategory(),
             age:config.getUserItemName("age"),
             firstName:config.getUserItemName("firstName"),
             lastName:config.getUserItemName("lastName"),
             nickName:config.getUserItemName("nickName"),
             subscribers_count:config.getUserItemName("subscribers_count"),
             paypal:config.getUserItemName("paypal"),
             socialNetworks:config.getUserSocialNetworks(),
             ssn:SsnObject,
             photo:config.getUserItemName("photo"),
           }
           return finalObject;
         }catch (e){
             //handle errors as needed
         }
      };

      FinalLogic().then(response => {
        BloggerAnswersService.updateUsersData(response);
      })



  }

  const [age,SetAge] = useState(0);
  const setOld = (event) => {

    var age = event.target.value;
    if(age > 0){
      SetAge(age);
      props.dispatch(save_multiData({_object:'age',name:age}));
    }

  }

  const setMultiData = (event) => {

    var objName = '';
    if(activeStep == 3){
      objName = "firstName";
    }else if(activeStep == 4){
      objName = "lastName";
    }else if(activeStep == 5){
      objName = "nickName";
    }else if(activeStep == 7){
      objName = "subscribers_count";
    }else if(activeStep == 8){
      objName = "paypal";
    }

    var firstName = event.target.value;
    if(firstName.length > 0){
      props.dispatch(save_multiData({_object:objName,name:firstName}));
    }
    setName(firstName);

  }

  const [route,SetRoute] = useState("");
  const [redirect,Setredirect] = useState(false);


  useEffect(() => {
    const service = BloggerAnswersService.listenUpdateUsersData().subscribe(data => {

      if(data.status == "ok"){
        SetRoute("/blogger");
        Setredirect(true);
      }

    });

    config.checkUserAuthorization(1);

    return () => {
      service.unsubscribe();
    }
  },[])

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
                        <CountryComponent />
                        <AlertComponent state={error} text={AlertText}/>
                      </div>
                    )
                  }
                  {
                    activeStep == 1 && (
                      <div>
                        <CategoriesComponent/>
                        <AlertComponent state={error} text={AlertText}/>
                      </div>
                    )
                  }
                  {
                    activeStep == 2 && (
                      <div>
                        <TextField
                            required
                            onChange={setOld}
                            type="number"
                            className="textFieldAppStyle"
                          />
                        <AlertComponent state={error} text={AlertText}/>
                      </div>

                    )
                  }
                  {
                    (
                    activeStep == 3 ||
                    activeStep == 4 ||
                    activeStep == 5
                    ) && (
                      <div>
                          <TextField
                              required
                              onChange={setMultiData}
                              value={name}
                              className="textFieldAppStyle"
                            />
                          <AlertComponent state={error} text={AlertText}/>
                      </div>
                    )
                  }

                  {
                    activeStep == 6 && (

                      <div>
                        <EditListComponent />
                        <AlertComponent state={error} text={AlertText}/>
                      </div>

                    )
                  }
                  {
                    activeStep == 7 && (

                      <div>
                          <TextField
                              required
                              onChange={setMultiData}
                              value={name}
                              type="number"
                              className="textFieldAppStyle"
                            />
                          <AlertComponent state={error} text={AlertText}/>
                      </div>

                    )
                  }
                  {
                    activeStep == 8 && (

                      <div>
                        <TextField
                            required
                            onChange={setMultiData}
                            value={name}
                            className="textFieldAppStyle"
                          />
                        <AlertComponent state={error} text={AlertText}/>
                      </div>

                    )
                  }
                  {
                    activeStep == 9 && (

                      <div>
                        <VerifyComponent  />
                        <AlertComponent state={error} text={AlertText}/>
                      </div>

                    )
                  }
                  {
                    activeStep == 10 && (

                      <div>
                        <UploadDocumentComponent  />
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
                         Finish
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


                {redirect === true && (
                    <Redirect to={route} />
                  )
                }


          </Grid>
      </div>


  );
};


 export default connect(mapStateToProps,mapDispatchToProps)(BloggerAnswersComponent);
