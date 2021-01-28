import React, {useState,useMemo,useEffect,useConstructor,useLayoutEffect} from 'react';
// import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonItem, IonLabel, IonList, IonItemDivider } from '@ionic/react';
import '../css/mainStyles.css';
import '../css/DetailDescriptionComponent.css';
import LocalizeComponent from '../localize/LocalizeComponent';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import {
  withStyles,
  makeStyles,
} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Logo from '../icons/logo_circle_new_circle.png';
import Box from '@material-ui/core/Box';
import { connect } from 'react-redux';
import AuthService from '../services/AuthService';
import HomeService from '../services/Homeservice';
import DialogComponent from '../components/DialogComponent';
import config from '../config/config.js';
import DetailTaskService from '../services/DetailTaskService';
import AlertSuccessComponent from '../helperComponents/AlertSuccessComponent';
import AlertDangerComponent from '../helperComponents/AlertDangerComponent';
import StepperComponent from '../helperComponents/StepperComponent';
import Observable from '../services/Observable';


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
    backgroundColor:'#161730',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    backgroundColor:'#161730',
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




const DetailTaskComponent = (props) => {

  //const [detailData,setDetailData] = useState({});
  const detailData = useMemo(() => {
      const locationData = props.location;
      //console.log(locationData);
      if(locationData.data){
        //convert to Json for Save in browser memory
        var insertData = JSON.stringify(props.location.data);
        //save in memory
        localStorage.setItem("detailItem",insertData);

        return props.location.data;

        // localStorage.setItem("checkingItemData",JSON.stringify(ItemData));
      }else{
        //get Data from browser memmory
        var gettingData = JSON.parse(localStorage.getItem("detailItem"));
        //check availability
        if(localStorage.getItem("detailItem")){
          //setDetailData();
          return gettingData;
        }
      }
  },[]);



  const classes = useStyles();
  const { register, handleSubmit, errors,setError } = useForm({
    resolver: yupResolver(schema)
  });
  var obj = {
    email:""
  };

  const [completedTask,SetcompletedTask] = useState(false);

  const [storageData,setStorageData] = useState(obj);

  const [cancelDoubleEvent,setCancelDoubleEvent] = useState(0);

  const [closeDialog,setCloseDialog] = useState(false);

  const [dangerState,SetdangerState] = useState(false);
  const [dangerText,SetdangerText] = useState("");

  const onSubmit = ((data) => {

  });

  const [swithbutton,SetSwithButton] = useState(false);
  const [url,SetUrl] = useState("");

  const GenerateUrl = (() => {
      DetailTaskService.generateUrl(detailData.id);
  });

  const [sucessState,SetSucessState] = useState(false);
  const [alertText,SetalertText] = useState("");

  const hideAlert = () => {

    setTimeout(function(){
      SetSucessState(false);
      SetdangerState(false);
    },3000);
  }

  const CopyUrl = (() => {

    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = document.location.origin + "/checkurl/" + url;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);

    SetalertText("copied to clipboard");//setText in Alert
    SetSucessState(true);//show alert
    hideAlert();
    //this.homeservice.Toast("copied to clipboard");
  });

  const [inputtext,SetInputText] = useState("");
  const [howmanysteps,SethowManySteps] = useState(5);

  const setText = ((string) => {
      SetInputText(string);
  });

  const netWorkArray = ["Instagram","Facebook","Youtube","Twitter"];

  const [originalNetWorkArrayState,setOriginalNetWorkArrayState] = useState(["Instagram","Facebook","Youtube","Twitter"]);
  const [netWorkArrayState,setnetWorkArrayState] = useState(["Instagram","Facebook","Youtube","Twitter"]);

  const [findArrayState,SetFindArrayState] = useState([]);
  //var permitControlArray = new Array();
  const [permitControlArray,SetpermitControlArray] = useState([]);

  const [currentNetWork,SetCurrentNetwork] = useState(netWorkArray[0]);

  const [stepper,SetStep] = useState(0);

  const [checkLinksValidationsArray,SetcheckLinksValidationsArray] = useState(["instagram.com","facebook.com","youtube.com","twitter.com"]);

  const Share = (() => {

      if(inputtext.length > 0){
          var find = inputtext;
          var validate = 0;

          for(var i = 0;i < checkLinksValidationsArray.length;i++){
            if(find.indexOf(checkLinksValidationsArray[i]) >= 0){
                validate = 1;
            }
          }

          var uploadedNotice = 0;
          var findUploadSocialNetworksText = "";

          for(var k = 0;k < findArrayState.length;k++){
              if(find.indexOf(findArrayState[k]) >= 0){
                uploadedNotice = 1;
                findUploadSocialNetworksText = findArrayState[k];
              }
          }

          for(var j = 0;j < permitControlArray.length;j++){
            //console.log(permitControlArray[j].url);
            if(inputtext == permitControlArray[j].url){
              uploadedNotice = 2;
              findUploadSocialNetworksText = permitControlArray[j].type;
            }
          }

          if(uploadedNotice == 1){
            SetdangerText("video for " + findUploadSocialNetworksText + " already uploaded ");
            SetdangerState(true);
            hideAlert();
          }else if(uploadedNotice == 2){
            SetdangerText("video for " + findUploadSocialNetworksText + " already uploaded for this project ");
            SetdangerState(true);
            hideAlert();
          }else{
            if(validate == 1){
                var obj = {
                  id:detailData.id,
                  videotype:netWorkArray[stepper],
                  url:inputtext,
                  set:"set"
                }
              //  console.log(obj);
                DetailTaskService.setUrl(obj);
              }
          }

      }

  });

  const [currentStatus,SetCurrentStatus] = useState(LocalizeComponent.doneTask);

  const CheckVideos = ((id) => {

    var checkObj = {
      status:"check",
      id:id,
    }

    DetailTaskService.checkUrl(checkObj);
  });

  const SubmittedTask = (id) => {
      var submitObj = {
        approvetask:0,
        id:id
      }

      DetailTaskService.submitOrder(submitObj);
  }



useEffect(() => {
  const ListenlistenCheckUrl = DetailTaskService.listenCheckUrl().subscribe(data => {

    if(data.status == "false"){

    }else if(data.status == "ok"){

      var findArray = new Array();


      var count = data.data.length;
      var countOfTask = originalNetWorkArrayState.length;
      var replaceArray = netWorkArrayState;

          for(var i = 0;i < count;i++){
              var platform = data.data[i].type;
              findArray.push(platform);
          }

          SetpermitControlArray(data.data);
          SetFindArrayState(findArray);
          //SetCurrentNetwork()
          for(var j = 0;j < netWorkArrayState.length;j++){
              for(var k = 0;k < findArray.length;k++){
                  var searchString = netWorkArrayState[j];
                  //console.log(searchString);
                  if(searchString.indexOf(findArray[k]) >= 0){
                    replaceArray.splice(j, 1);
                  }
              }
          }

      //console.log(replaceArray);
      //netWorkArray = replaceArray;
      setnetWorkArrayState(replaceArray);
      SetCurrentNetwork(replaceArray[0]);

      SetStep(count);

      if(countOfTask == count){
        SetcompletedTask(true);
        SubmittedTask(detailData.id);
      }
      //SetCurrentNetwork
    }

    return () => {
      ListenlistenCheckUrl.unsubscribe();
    }
    //SetStep(stepper => stepper + 1);
  });
},[]);



  // useEffect(() => {
  //
  //
  //
  //   return () => {
  //
  //   }
  //
  // },[data]);

  useEffect(() => {
//xx
    const ListenlistenSetUrl = DetailTaskService.listenSetUrl().subscribe(data => {
      //console.log(data);
      if(data.status == "inserted"){
        CheckVideos(detailData.id);
        SetInputText("");
        //SetStep(stepper => stepper + 1);
      }

    });

    const listenSubmittedOrder = DetailTaskService.listenSubmittedOrder().subscribe(data => {
      //console.log(data);
      if(data.currentStatus == 0){
          SetCurrentStatus(LocalizeComponent.waitingApprove);
      }
    });

    const obs = Observable.subscribeByTimer_10_second().subscribe(data => {
        SubmittedTask(detailData.id);
    });


    const unsub = DetailTaskService.listenGenerateUrl().subscribe(data => {
        //console.log(data);

        if(data.status == "ok"){
          var generatedUrl = data.url;
          SetUrl(generatedUrl);
          SetSwithButton(true);
        }
        //console.log(generatedUrl);
    });

    //unsubscribe

    return () => {
        ListenlistenSetUrl.unsubscribe();
        listenSubmittedOrder.unsubscribe();
        obs.unsubscribe();
        unsub.unsubscribe();
    }

    //unsubscribe

  }, []);
  //}, [netWorkArrayState,CheckVideos,SetCurrentStatus,SubmittedTask,permitControlArray,findArrayState,detailData,SethowManySteps]);




//run 1 time
useEffect(() => {

  SethowManySteps(netWorkArrayState.length + 1);
  CheckVideos(detailData.id);


}, []);


  return (

   	<div className={classes.root}>
        <Grid container >

              <div className="descriptBox">
                  <div className="descriptionText">
                      Name of business: {detailData.url}
                      <br/>
                      Description: {detailData.description}
                      <br/>
                      Location: {detailData.location_name}
                  </div>
              </div>

              {swithbutton === false ? (
                <div className="buttonBox">
                    <div className="generateButton" onClick={GenerateUrl}>
                        <div className="generateButtonText"  >
                            generate url
                        </div>
                    </div>
                </div>
               ) : (
                 <div className="buttonBox">
                     <div className="generateButton" onClick={CopyUrl}>
                         <div className="generateButtonText"  >
                             copy url
                         </div>
                     </div>
                 </div>
               )}


               <div className="setBox">
                 {completedTask === false ? (
                   <div>
                       <div className="ShareNameBox">

                          <div className="ShareNameText">
                              {LocalizeComponent.currentStep} <div className="socialColor">{currentNetWork} {LocalizeComponent.socialNetwork}</div>
                              {LocalizeComponent.currentStepAfter}
                          </div>
                       </div>

                       <div className="fullWidthDetail">
                          <StepperComponent step={stepper} count={howmanysteps}/>
                       </div>


                       <input type="text" value={inputtext}  onChange={event => setText(event.target.value)} className="setInputStyle" name="setUrl"></input>

                         <div className="buttonBoxSet">
                             <div className="generateButtonSet" onClick={Share}>
                                 <div className="generateButtonTextSet"  >
                                     next
                                 </div>
                             </div>
                         </div>
                   </div>
                  ) : (
                    <div className="DoneTask">
                        {currentStatus}
                    </div>
                  )}



               </div>

               <div className="buttonShare">
                   <div className="generateButton" >
                       <div className="generateButtonText"  >
                           Complete this task with a friend creator
                       </div>
                   </div>
               </div>
               <div className="buttonShare">
                   <div className="generateButton" >
                       <div className="generateButtonText"  >
                           Share this task with a friend influencer
                       </div>
                   </div>
               </div>

               <AlertSuccessComponent state={sucessState} text={alertText}/>
               <AlertDangerComponent state={dangerState} text={dangerText}/>


          </Grid>
      </div>


  );
};


 export default connect(mapStateToProps,mapDispatchToProps)(DetailTaskComponent);
