import React, {useState,useMemo,useEffect,useCallback} from 'react';
// import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonItem, IonLabel, IonList, IonItemDivider } from '@ionic/react';
import '../css/mainStyles.scss';
import '../css/DetailDescriptionComponent.scss';
import LocalizeComponent from '../localize/LocalizeComponent';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {
  makeStyles,
} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import DetailTaskService from '../services/DetailTaskService';
import AlertSuccessComponent from '../helperComponents/AlertSuccessComponent';
import AlertDangerComponent from '../helperComponents/AlertDangerComponent';
import StepperComponent from '../helperComponents/StepperComponent';
import Observable from '../services/Observable';
import GoBackAbsoluteComponent from '../helperComponents/goBackAbsoluteComponent';
import ConfirmDialogComponent from '../helperComponents/ConfirmDialogComponent';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {
  useHistory
} from "react-router-dom";

import { increment, decrement,save_email } from '../actions/actions';


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
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    backgroundColor:'transparent',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    width:"100%",
  },
}));



const schema = yup.object().shape({
  url: yup.string().required("Required"),
});


const BannedList = ((props) => {

    const list = props.list;

    const showList = list.map((item,index) =>

        <div className="BanBoxList" key={item.id}>
            <div className="banBoxText">
              {item.type}
            </div>

        </div>
    );

    return (
      <div className="banBox">
          <div className="banBoxTitle">
              {LocalizeComponent.banBoxTitle}
          </div>
            <div className="boxIconPosition">
              <ExpandMoreIcon className="boxIconStyle"/>
            </div>
          {showList}
      </div>
    );

});


const EditList = ((props) => {

    const list = props.list;
    const currentNetworkTwo = props.currentNetworkTwo;

    const showList = list.map((item,index) =>

        <MenuItem key={index} value={item}>{item}</MenuItem>

    );

    const InsidehandleEdit = (event) => {
        Observable.sendData_subject_Edit(event.target.value);
    };

    return (

      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={currentNetworkTwo}
        onChange={InsidehandleEdit}
      >
        {showList}

      </Select>

    );


});



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
  },[props]);

  //console.log(detailData);



  const classes = useStyles();
  const { register, handleSubmit,reset } = useForm({
    resolver: yupResolver(schema)
  });


  const [completedTask,SetcompletedTask] = useState(false);


  const [dangerState,SetdangerState] = useState(false);
  const [dangerText,SetdangerText] = useState("");



  const [swithbutton,SetSwithButton] = useState(false);
  const [url,SetUrl] = useState("");

  const GenerateUrl = (() => {
      DetailTaskService.generateUrl(detailData.id);
  });

  const checkGenerateUrl = (() => {
      DetailTaskService.checkGenerateUrl(detailData.id);
  });

  const [sucessState,SetSucessState] = useState(false);
  const [alertText,SetalertText] = useState("");

  const hideAlert = () => {

    setTimeout(function(){
      SetSucessState(false);
      SetdangerState(false);
    },5000);
  }

  const CopyUrl = (() => {

    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = document.location.origin + "/follow/" + url;
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

  const [originalNetWorkArrayState] = useState(["Instagram","Facebook","Youtube","Twitter"]);
  const [netWorkArrayState,setnetWorkArrayState] = useState(["Instagram","Facebook","Youtube","Twitter"]);

  const [findArrayState,SetFindArrayState] = useState([]);
  //var permitControlArray = new Array();
  const [permitControlArray,SetpermitControlArray] = useState([]);

  const [currentNetWork,SetCurrentNetwork] = useState(netWorkArray[0]);

  const [stepper,SetStep] = useState(0);

  const [checkLinksValidationsArray] = useState(["inst","face","yout","twit"]);

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
            if(inputtext === permitControlArray[j].url){
              uploadedNotice = 2;
              findUploadSocialNetworksText = permitControlArray[j].type;
            }
          }

          if(uploadedNotice === 1){
            SetdangerText("video for " + findUploadSocialNetworksText + " already uploaded ");
            SetdangerState(true);
            hideAlert();
          }else if(uploadedNotice === 2){
            SetdangerText("video for " + findUploadSocialNetworksText + " already uploaded for this project ");
            SetdangerState(true);
            hideAlert();
          }else{
            if(validate === 1){
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

      //console.log(submitObj);

      DetailTaskService.submitOrder(submitObj);
  }


const CountTaskFunction = (data) => {
  if(data.status === "false"){
    if(stepper > 0){
      SetStep(0);
    }
  }else if(data.status === "ok"){

    var findArray = [];

    var count = data.data.length;

    //console.log(count);

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

    if((countOfTask == count) && (countOfTask > 0) && (count > 0)){
      SetcompletedTask(true);
      console.log(111);
      SubmittedTask(detailData.id);
      localStorage.removeItem("tempstorageData");
      localStorage.removeItem("tempstorageDistance");
    }
    //SetCurrentNetwork
  }
};


useEffect(() => {
  const ListenlistenCheckUrl = DetailTaskService.listenCheckUrl().subscribe(data => {

    //console.log(data);
      CountTaskFunction(data);


    //SetStep(stepper => stepper + 1);
  });


  return () => {
    ListenlistenCheckUrl.unsubscribe();

  }

},[]);




//xx
const [banVideo,SetBanVideo] = useState([]);

const CheckcheckBannedVideoF = ((id) => {

  var checkObj = {
    status:"check",
    id:id,
  }

  DetailTaskService.checkBannedVideo(checkObj);
});


const ExecutelistencheckBannedVideo = (data) => {

      if(data.status == "ok"){

          var bannedVideoArray = data.data;
          const newArbanVideo = [...banVideo];

          if(bannedVideoArray.length > newArbanVideo.length){

            for(var i = 0;i < bannedVideoArray.length;i++){

              var found = 0;
              for(var j = 0;j < newArbanVideo.length;j++){
                if(newArbanVideo[j].id == bannedVideoArray[i].id){
                  found = 1;
                }
              }

              if(found == 0){
                newArbanVideo.push(bannedVideoArray[i]);
              }


            }

            SetBanVideo(newArbanVideo);
          }else if(bannedVideoArray.length < newArbanVideo.length){
            SetBanVideo([]);

            SetBanVideo(bannedVideoArray);
          }else if(bannedVideoArray.length === newArbanVideo.length){
            SetBanVideo([]);
            SetBanVideo(bannedVideoArray);
          }

      }else if(data.status == "false"){
        if(banVideo.length > 0){
          SetBanVideo([]);
        }
      }

}

useEffect(() => {
  const listencheckBannedVideo = DetailTaskService.listencheckBannedVideo().subscribe(data => {

      ExecutelistencheckBannedVideo(data);

  });

  return () => {
    listencheckBannedVideo.unsubscribe();
  }
},[])

  useEffect(() => {

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
        //SubmittedTask(detailData.id);
        //console.log(detailData.id);
        CheckVideos(detailData.id);
        CheckcheckBannedVideoF(detailData.id);

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


    const ListenEditObserv = Observable.getData_subject_Edit().subscribe(data => {

        SetCurrentNetworkTwo(data);

    });

    const listenEditUrl = DetailTaskService.listenEditUrl().subscribe(data => {

      if(data.status == "updated"){
        reset();
        SetalertText(LocalizeComponent.successAction);
        SetSucessState(true);
        seteditFormStatus(false);
        hideAlert();
      }else if(data.status == "already"){
        reset();
        SetdangerText(LocalizeComponent.edit_confirmation);
        SetdangerState(true);
        seteditFormStatus(false);
        hideAlert();
      }

    });

    //unsubscribe

    return () => {
        ListenlistenSetUrl.unsubscribe();
        listenSubmittedOrder.unsubscribe();
        obs.unsubscribe();
        unsub.unsubscribe();
        ListenEditObserv.unsubscribe();
        listenEditUrl.unsubscribe();
    }

    //unsubscribe

  }, []);
  //}, [netWorkArrayState,CheckVideos,SetCurrentStatus,SubmittedTask,permitControlArray,findArrayState,detailData,SethowManySteps]);




//run 1 time
useEffect(() => {

  SethowManySteps(netWorkArrayState.length + 1);
  CheckVideos(detailData.id);
  CheckcheckBannedVideoF(detailData.id);
  //console.log(detailData.id);
  //console.log("checked");
  checkGenerateUrl();



}, []);

//notification part
const history = useHistory();
const goToContacts = useCallback((Contacts) => {

    return history.push({pathname: '/contactlist'}), [history];

});

const goToChat = useCallback((Contacts) => {

    return history.push({pathname: '/suggest',projectId:detailData.id,email:detailData.email}), [history];

});

useEffect(() => {
  const DialogNotif = Observable.getData_subject().subscribe(data => {
    if(data == "confirm"){
      goToContacts();
      //go to page with id
    }else if(data == "cancel"){
      setDialogStatus(false);
    }

  });



  const DialogExecute = Observable.getData_subjectDialog().subscribe(data => {
    if(data.alert == "opendialog"){
      //console.log(data);
      setLeftbutton(LocalizeComponent.cancel);
      setRightbutton(LocalizeComponent.check);
      setDialogText(LocalizeComponent.dialogCheckMessage);
      setDetailProjectId(data.projectId);
      setDetailMessage(data.message);
      setDialogStatus(true);
      //go to page with id
    }

  });

  return () => {
    DialogNotif.unsubscribe();
    DialogExecute.unsubscribe();
  }
},[])





const [dialogStatus,setDialogStatus] = useState(false);
const [leftbutton,setLeftbutton] = useState('');
const [rightbutton,setRightbutton] = useState('');
const [dialogText,setDialogText] = useState('');
const [detailProjectId,setDetailProjectId] = useState(0);
const [detailMessage,setDetailMessage] = useState("");


const [currentNetworkTwo, SetCurrentNetworkTwo] = React.useState('');
const [editFormStatus,seteditFormStatus] = useState(false);
const EnableEditBox = () => {
  seteditFormStatus(true);
}
const DisableEditBox = () => {
  seteditFormStatus(false);
}
const [selectError,SetselectError] = useState(false);
const EditNetwork = (data) => {

  if(currentNetworkTwo.length < 1){
    SetselectError(true);
    return false;
  }else{
    SetselectError(false);
  }

  var inputString = data.url;

  if(inputString.length > 0){

      var foundIndex = 0;
      for(var i = 0;i < originalNetWorkArrayState.length;i++){
        if(originalNetWorkArrayState[i] == currentNetworkTwo){
          foundIndex = i;
        }
      }

      console.log(inputString.indexOf(checkLinksValidationsArray[foundIndex]));
      console.log(checkLinksValidationsArray[foundIndex]);

      if(inputString.indexOf(checkLinksValidationsArray[foundIndex]) >= 0){

        var obj = {
          id:detailData.id,
          videotype:currentNetworkTwo,
          url:inputString,
          set:"set"
        }
        //  console.log(obj);
        DetailTaskService.EditUrl(obj);

      }else{
        reset();
      }

      //checkLinksValidationsArray
  }else{

  }

}



  return (

   	<div className={classes.root}>
        <Grid container >
              <GoBackAbsoluteComponent/>
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
                            {LocalizeComponent.startTask}
                        </div>
                    </div>
                </div>
               ) : (
                 <div className="buttonBox">
                     <div className="generateButton" onClick={CopyUrl}>
                         <div className="generateButtonText"  >
                             {LocalizeComponent.CopyUrl}
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

                         {banVideo.length > 0 ? (
                           <BannedList list={banVideo}/>
                          ) : (
                            <div></div>
                          )}



                         <div className="buttonBoxSet">
                             <div className="generateButtonSet" onClick={Share}>
                                 <div className="generateButtonTextSet"  >
                                     {LocalizeComponent.next_x}
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

               {editFormStatus === true ? (
                 <div className="setBoxTwo">

                   <div>
                       <div className="ShareNameBoxEdit" onClick={DisableEditBox}>

                          <div className="ShareNameTextB">
                                {LocalizeComponent.edit_social}
                          </div>
                       </div>

                       <div className="SelectSocial">

                         <FormControl className={classes.formControl} error={selectError}>
                               <InputLabel id="demo-simple-select-label">{LocalizeComponent.select_social}</InputLabel>
                               <EditList list={originalNetWorkArrayState} currentNetworkTwo={currentNetworkTwo}/>
                         </FormControl>

                       </div>


                       <form onSubmit={handleSubmit(EditNetwork)}>

                       <input ref={register} required type="text" className="setInputStyle" name="url"/>

                         <div className="buttonBoxSet">

                            <input type="submit"  className="generateButtonSetButton" value={LocalizeComponent.confirm_edit} />

                         </div>

                         </form>
                   </div>

                 </div>
                ) : (
                  <div className="buttonBoxSet">
                      <div className="generateButtonSet" onClick={EnableEditBox}>
                          <div className="generateButtonTextSet"  >
                              {LocalizeComponent.edit_button_link}
                          </div>
                      </div>
                  </div>
                )}


               <div className="buttonBoxSet">
                   <div className="generateButtonSet" onClick={(event) => goToChat()}>
                       <div className="generateButtonTextSet"  >
                           {LocalizeComponent.chat_with_business}
                       </div>
                   </div>
               </div>



               <AlertSuccessComponent state={sucessState} text={alertText}/>
               <AlertDangerComponent state={dangerState} text={dangerText}/>
               <ConfirmDialogComponent status={dialogStatus} left={leftbutton} right={rightbutton} text={dialogText}/>


          </Grid>
      </div>


  );
};


 export default connect(mapStateToProps,mapDispatchToProps)(DetailTaskComponent);
