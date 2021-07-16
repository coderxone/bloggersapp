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
import AuthService from '../services/AuthService';
import { useSelector, useDispatch} from 'react-redux';
import { SetChangeStep,CancelSSNCheck,CancelSubscribersCheck } from '../features/counter-slice';
import MultiInputComponent from '../components/BloggerAnswersComponents.js/MultiInputComponent';
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




const BloggerAnswersComponent = (props) => {

  const dispatch = useDispatch();



  const classes = useStyles();

  //xxx
  const questions = useSelector((state) => state.counter.bloggersAnswers.questions);
  const checkssn = useSelector((state) => state.counter.bloggersAnswers.checkssn);
  const socialcheck = useSelector((state) => state.counter.bloggersAnswers.socialcheck);
  const multisaveArray = useSelector((state) => state.counter.bloggersAnswers.multisaveArray);
  const [fieldType,SetFieldType] = useState("text");

  useMemo(() => {
    let checkssn = config.getUserItemName("checkssn");

    if(Number(checkssn) === 0){
      dispatch(CancelSSNCheck());
    }

  },[])

  const [activeStep, setActiveStep] = React.useState(0);

  //const steps = useState(getSteps());
  const steps = useSelector((state) => state.counter.bloggersAnswers.steps);



  const [error,SetError] = useState(false);
  const [AlertText,SetAlertText] = useState('please fill in');


  const handleNext = () => {
    setName("");

      var resultStep = true;

      resultStep = checkForms();

      if(resultStep == true){
        var stepper = activeStep + 1;

        if(stepper == steps.length){
          //console.log("submit")
          onSubmit();
        }else{
          setActiveStep(stepper);
          SetError(false);
          restoreData(stepper);
        }

      }




  };

  const handleBack = () => {

    var stepper = activeStep - 1;

    console.log(stepper)
    setName("");
    setActiveStep(stepper);
    restoreData(stepper);
  };

  const restoreData = (stepper) => {

    let multisavear = [...multisaveArray];

    var objName = multisavear[stepper];


    if(objName === "age" || objName === "accountage" || objName === "subscribers_count"  || objName === "accountage"){
      SetFieldType("number");
    }else{
      SetFieldType("text");
    }


    let savedData = config.getUserItemName(objName);

    if(savedData != false){
      setName(savedData);
    }


  }

  const [name,setName] = useState('');

  const checkForms = () => {
    if(multisaveArray[activeStep] == "location"){
      var result = config.getUserCountry();
      if(result != false){
        return true;
      }else{
        SetError(true);
        return false;
      }

    }else if(multisaveArray[activeStep] == "category"){
      var result = config.getUserCategory();
      if(result != false){
        return true;
      }else{
        SetAlertText(LocalizeComponent.select_address);
        SetError(true);
        return false;
      }
    }else if(multisaveArray[activeStep] == "age"){
      if(config.getUserItemName(multisaveArray[activeStep]) != false){
        return true;
      }else{
        SetAlertText(LocalizeComponent.select_age);
        SetError(true);
        return false;
      }
    }else if(multisaveArray[activeStep] === "firstName"){
      if(config.getUserItemName(multisaveArray[activeStep]) != false){
        return true;
      }else{
        SetError(true);
        return false;
      }
    }else if(multisaveArray[activeStep] === "lastName"){
      if(config.getUserItemName(multisaveArray[activeStep]) != false){
        return true;
      }else{
        SetError(true);
        return false;
      }
    }else if(multisaveArray[activeStep] === "accountage"){
      if(config.getUserItemName(multisaveArray[activeStep]) != false){
        return true;
      }else{
        SetError(true);
        return false;
      }
    }else if(multisaveArray[activeStep] === "nickName"){
      if(config.getUserItemName(multisaveArray[activeStep]) != false){
        return true;
      }else{
        SetError(true);
        return false;
      }
    }else if(multisaveArray[activeStep] === "sociallink"){
      if(config.getUserSocialNetworks().status == true){
        return true;
      }else{
        SetError(true);
        return false;
      }
    }else if(multisaveArray[activeStep] === "subscribers_count"){
      if(config.getUserItemName(multisaveArray[activeStep]) != false){
        return true;
      }else{
        SetError(true);
        return false;
      }
    }else if(multisaveArray[activeStep] === "paypal"){
      if(config.getUserItemName(multisaveArray[activeStep]) != false){
        return true;
      }else{
        SetError(true);
        return false;
      }
    }else if(multisaveArray[activeStep] === "ssn"){
      if(config.getUserSSN().status != false){
        return true;
      }else{
        SetAlertText("please fill in");
        SetError(true);
        return false;
      }
    }else if(multisaveArray[activeStep] === "identity"){
      if(config.getUserItemName("photo") != false){
        return true;
      }else{
        SetAlertText("please download image");
        SetError(true);
        hideAlert();
        return false;
      }
    }
    //getUserSSN
  }

  const hideAlert = () => {

    setTimeout(function(){
      SetError(false);
    },3000)

  }



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
               if(checkssn === false){
                 SsnObject.SSN = "not required";
               }else{
                 SsnObject = config.getUserSSN();
               }

             }
           }

           let lastName = config.getUserItemName("lastName");

           props.dispatch(save_multiData({_object:'additionalData',name:lastName}));


           var finalObject = {
             country:country,
             category:config.getUserCategory(),
             age:config.getUserItemName("age"),
             firstName:config.getUserItemName("firstName"),
             lastName:lastName,
             accountage:config.getUserItemName("accountage"),
             nickName:config.getUserItemName("nickName"),
             subscribers_count:config.getUserItemName("subscribers_count"),
             paypal:config.getUserItemName("paypal"),
             socialNetworks:config.getUserSocialNetworks(),
             ssn:SsnObject,
             photo:config.getUserItemName("photo"),
             savetype:{
               checkssn:checkssn,
               socialcheck:socialcheck
             },
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

    let multisavear = [...multisaveArray];

    var objName = multisavear[activeStep];

    console.log(objName);


    var firstName = event.target.value;
    if(firstName.length > 0){
      props.dispatch(save_multiData({_object:objName,name:firstName}));
    }
    setName(firstName);

  }

  const [route,SetRoute] = useState("");
  const [redirect,Setredirect] = useState(false);

//xxx
  useEffect(() => {
    const service = BloggerAnswersService.listenUpdateUsersData().subscribe(data => {

      if(data.status == "ok"){
        SetRoute("/blogger");
        Setredirect(true);
      }

    });

    config.checkUserAuthorization(1);

    let listenCheckInstagramSubscribers = AuthService.listenCheckInstagramSubscribers().subscribe(res => {
      let instagramStatus = res.instagramStatus;

      if(instagramStatus){
          dispatch(CancelSubscribersCheck());
      }


    })
    AuthService.checkInstagramSubscribers();

    return () => {
      service.unsubscribe();
      listenCheckInstagramSubscribers.unsubscribe();
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
                    multisaveArray[activeStep] == "location" && (
                      <div>
                        <CountryComponent />
                        <AlertComponent state={error} text={AlertText}/>
                      </div>
                    )
                  }
                  {
                    multisaveArray[activeStep] == "category" && (
                      <div>
                        <CategoriesComponent/>
                        <AlertComponent state={error} text={AlertText}/>
                      </div>
                    )
                  }


                  {
                    multisaveArray[activeStep] === "age" &&
                    (
                      <MultiInputComponent error={error} AlertText={AlertText} name={name} setMultiData={event => setMultiData(event)} fieldType={fieldType} />
                    )
                  }
                  {
                    multisaveArray[activeStep] === "firstName" &&
                    (
                      <MultiInputComponent error={error} AlertText={AlertText} name={name} setMultiData={event => setMultiData(event)} fieldType={fieldType} />
                    )
                  }
                  {
                    multisaveArray[activeStep] === "lastName" &&
                    (
                      <MultiInputComponent error={error} AlertText={AlertText} name={name} setMultiData={event => setMultiData(event)} fieldType={fieldType} />
                    )
                  }
                  {
                    multisaveArray[activeStep] === "nickName" &&
                    (
                      <MultiInputComponent error={error} AlertText={AlertText} name={name} setMultiData={event => setMultiData(event)} fieldType={fieldType} />
                    )
                  }
                  {
                    multisaveArray[activeStep] === "subscribers_count" &&

                    (
                      <MultiInputComponent error={error} AlertText={AlertText} name={name} setMultiData={event => setMultiData(event)} fieldType={fieldType} />
                    )
                  }
                  {
                    multisaveArray[activeStep] === "accountage" &&

                    (
                      <MultiInputComponent error={error} AlertText={AlertText} name={name} setMultiData={event => setMultiData(event)} fieldType={fieldType} />
                    )
                  }
                  {
                    multisaveArray[activeStep] === "paypal" &&

                    (
                      <MultiInputComponent error={error} AlertText={AlertText} name={name} setMultiData={event => setMultiData(event)} fieldType={fieldType} />
                    )
                  }




                  {
                    socialcheck === true &&
                    multisaveArray[activeStep] === "sociallink" && (

                      <div>
                        <EditListComponent />
                        <AlertComponent state={error} text={AlertText}/>
                      </div>

                    )
                  }


                  {
                    checkssn === true &&
                    multisaveArray[activeStep] === "ssn" && (

                      <div>
                        <VerifyComponent  />
                        <AlertComponent state={error} text={AlertText}/>
                      </div>

                    )
                  }
                  {
                    checkssn === true &&
                    multisaveArray[activeStep] === "identity" && (

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
                         {LocalizeComponent.Finish1}
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
