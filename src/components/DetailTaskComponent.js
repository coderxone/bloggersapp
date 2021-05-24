import React, {useState,useMemo,useEffect,useCallback} from 'react';
// import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonItem, IonLabel, IonList, IonItemDivider } from '@ionic/react';
import '../css/mainStyles.scss';
import '../css/DetailDescriptionComponent.scss';
import LocalizeComponent from '../localize/LocalizeComponent';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import InputLabel from '@material-ui/core/InputLabel';
import ListIcon from '@material-ui/icons/List';

import FormControl from '@material-ui/core/FormControl';

import {
  withStyles,
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
import EditListComponent from '../helperComponents/EditSocialNetworkComponent.js';
import config from '../config/config.js';

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepConnector from '@material-ui/core/StepConnector';
import clsx from 'clsx';
import Check from '@material-ui/icons/Check';

import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import FormDialogComponent from '../helperComponents/FormDialogComponent';

import {
  useHistory
} from "react-router-dom";

import { increment, decrement,save_email } from '../actions/actions';

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
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
    height:'200px',
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


//xx
const CompleteBlockComponent = (props) => {

  const [activeStep, setActiveStep] = React.useState(1);
  const statusArray = useMemo(() => {
    var rData = config.getJSONFromMemory("appstatus");

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
    }

    return rData;
  },[])

  const items = props.items;

  //console.log(items);

  const content = useMemo(() => {

    return items.map((item,index) =>

      <div key={item.id} >
            <div  className="MainBlockStepperWithoutFrame withoutScroll">
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
        </div>

      );

  },[props.items]);



  return (
    <div className="fullWidth withoutScroll" >
      {content}
    </div>
  );

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

  // const netWorkArray = ["Instagram","Facebook","Youtube","Twitter"];
  const netWorkArray = useMemo(function(){

      var array = [];
      var cycleAr = JSON.parse(localStorage.getItem("soc"));
      cycleAr.map(item => {
        array.push(item.name);
      });
      return array;

  },[]);

  const OrigN = useMemo(function(){

      var array = [];
      var cycleAr = JSON.parse(localStorage.getItem("soc"));
      cycleAr.map(item => {
        array.push(item.name);
      });
      return array;

  },[]);
  const OrigNTwo = useMemo(function(){

      var array = [];
      var cycleAr = JSON.parse(localStorage.getItem("soc"));
      cycleAr.map(item => {
        array.push(item.name);
      });
      return array;

  },[]);

  const [originalNetWorkArrayState] = useState(OrigN);
  const [netWorkArrayState,setnetWorkArrayState] = useState(OrigNTwo);


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


  const ReplaceLinks = (() => {

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

          var checkSocialString = "";
          var findObj = null;
          var findSocialId = null;

          for(var n = 0;n < banVideo.length;n++){
            //console.log(banVideo[n].url);
            for(var l = 0;l < checkLinksValidationsArray.length;l++){
              if(banVideo[n].url.indexOf(checkLinksValidationsArray[l]) >= 0){
                //console.log(originalNetWorkArrayState[l]);
                checkSocialString = originalNetWorkArrayState[l];
                findObj = banVideo[n];
                findSocialId = l;
              }
            }

            //console.log(banVideo[n]);
          }

          //console.log(inputtext.indexOf(checkLinksValidationsArray[findSocialId]));
          if(inputtext.indexOf(checkLinksValidationsArray[findSocialId]) < 0){
            //warning
            uploadedNotice = 3;
          }


          if(uploadedNotice === 1){
            SetdangerText("video for " + findUploadSocialNetworksText + " already uploaded ");
            SetdangerState(true);
            hideAlert();
          }else if(uploadedNotice === 2){
            SetdangerText("video for " + findUploadSocialNetworksText + " already uploaded for this project ");
            SetdangerState(true);
            hideAlert();
          }else if(uploadedNotice === 3){
            SetdangerText("Link should be for " + originalNetWorkArrayState[findSocialId] + " ");
            SetdangerState(true);
            hideAlert();
          }else{
            if(validate === 1){



                var obj = {
                  id:findObj.id,
                  videotype:checkSocialString,
                  url:find,
                  set:"set"
                }
                console.log(obj);
                DetailTaskService.ReplaceUrl(obj);
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

  const checkCurrentStatus = ((id) => {

    var checkObj = {
      id:id,
    }

    DetailTaskService.checkCurrentStatus(checkObj);
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
                if(searchString){
                    if(searchString.indexOf(findArray[k]) >= 0){
                      replaceArray.splice(j, 1);
                    }
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
      //console.log(111);
      SubmittedTask(detailData.id);
      localStorage.removeItem("tempstorageData");
      localStorage.removeItem("tempstorageDistance");
    }
    //SetCurrentNetwork
  }
};

const [listArrayComplete,setListArrayComplete] = useState([]);
const [currentTaskStatus,setCurrentTaskStatus] = useState(0);

useEffect(() => {
  const ListenlistenCheckUrl = DetailTaskService.listenCheckUrl().subscribe(data => {

      CountTaskFunction(data);


    //SetStep(stepper => stepper + 1);
  });

  const listenCurrentStatusL = DetailTaskService.listenCurrentStatus().subscribe(data => {

    //console.log(data);

    if(data.data.length > 0){

      const newlistArray = [...listArrayComplete];

      for(var i = 0;i < data.data.length;i++){

          //change status
          if(data.data[i].status !== 1){
            setCurrentTaskStatus(1);
          }else{
            setCurrentTaskStatus(0);
          }
          //change status
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

      //console.log(newlistArray);

      setListArrayComplete(newlistArray);


    }


  });


  return () => {
    ListenlistenCheckUrl.unsubscribe();
    listenCurrentStatusL.unsubscribe();
  }

},[]);





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

          SetcompletedTask(false);

      }else if(data.status == "false"){
        if(banVideo.length > 0){
          SetBanVideo([]);
        }
      }

}

useEffect(() => {
  const listencheckBannedVideo = DetailTaskService.listencheckBannedVideo().subscribe(data => {
      //console.log(data);
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
        checkCurrentStatus(detailData.id);

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

//xx
    const ListenRejectObserver = Observable.getReject_subject().subscribe(data => {

        if(data.action === 1){
          var text = data.text;

          DetailTaskService.DeclineOrder(text,detailData.id);
        }else if(data.action === "close"){
          SetformDialogStatus(false);
        }

    });

    const ListenDeclineOrder = DetailTaskService.listenDeclineOrder().subscribe(data => {

        console.log(data);
        if(data.status == "ok"){
          console.log("goBack");
          goBackEvent();
        }

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

    const listenReplaceUrl = DetailTaskService.listenReplaceUrl().subscribe(data => {

      if(data.status == "updated"){
        SetInputText("");
        SetalertText(LocalizeComponent.successAction);
        SetSucessState(true);
        seteditFormStatus(false);
        hideAlert();
        CheckVideos(detailData.id);
      }else if(data.status == "already"){
        SetInputText("");
        SetdangerText(LocalizeComponent.replace_confirmation);
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
        listenReplaceUrl.unsubscribe();
        ListenRejectObserver.unsubscribe();
        ListenDeclineOrder.unsubscribe();
    }

    //unsubscribe

  }, []);
  //}, [netWorkArrayState,CheckVideos,SetCurrentStatus,SubmittedTask,permitControlArray,findArrayState,detailData,SethowManySteps]);




//run 1 time
useEffect(() => {

  SethowManySteps(netWorkArrayState.length + 1);
  CheckVideos(detailData.id);
  checkCurrentStatus(detailData.id);
  CheckcheckBannedVideoF(detailData.id);
  //console.log(detailData.id);
  //console.log("checked");
  checkGenerateUrl();
  config.checkUserAuthorization(1);



}, []);

//notification part
const history = useHistory();
const goToContacts = useCallback((Contacts) => {

    return history.push({pathname: '/contactlist'}), [history];

});

const goToChat = useCallback((Contacts) => {

    return history.push({pathname: '/suggest',projectId:detailData.id,email:detailData.email}), [history];

});

const goBackEvent = useCallback(() => {

    return history.goBack();

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

    const [state, setState] = React.useState({
      top: false
    });

    const toggleDrawer = (anchor, open) => (event) => {
      if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
      }
      setState({ ...state, [anchor]: open });
    };

    const [formDialogStatus,SetformDialogStatus] = useState(false);
//xx
    const OpenTaskWindow = () => {

        const newState = {...state};
        newState.open = false;
        setState(newState);

        SetformDialogStatus(true);
    }

    const list = (anchor) => (
      <div
        className={clsx(classes.list, {
          [classes.fullList]: anchor === 'top',
        })}
        role="presentation"
        onClick={toggleDrawer(anchor, false)}
        onKeyDown={toggleDrawer(anchor, false)}
      >
        <div className="MainMunuBlock" onClick={OpenTaskWindow}>
          <div className="MenuList">
            <div className="ListDivider"></div>
            <HighlightOffIcon className="LeftMenuList"/>
            <div className="RightMenuList">{LocalizeComponent.Decline}</div>
            <div className="ListDivider"></div>
          </div>

        </div>



      </div>
    );



  return (

   	<div className={classes.root}>

      <div className="menuAbsolute" onClick={toggleDrawer("top", true)}>
        <ListIcon className="menuButtonstyle"/>
      </div>


      <div>

          <React.Fragment key={"top"}>
            <Drawer anchor={"top"} open={state["top"]} onClose={toggleDrawer("top", false)}>
              {list("top")}
            </Drawer>
          </React.Fragment>

      </div>
        <Grid container >
              <GoBackAbsoluteComponent/>

              <div className="TaskTitleBox">
                  <div className="TaskTitle">
                      {detailData.url}
                  </div>
              </div>

              <div className="TitleDivider"></div>

              <div className="descriptBox">
                  <div className="descriptionText">
                      {LocalizeComponent.description_n}: {detailData.description}
                      <br/>
                      {LocalizeComponent.Location_n}: {detailData.location_name}
                  </div>
              </div>

              <div className="BlockDivider"></div>

              <CompleteBlockComponent items={listArrayComplete} />

            <div className="BlockDivider"></div>

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

               <div className="BlockDivider"></div>

               {
                 currentTaskStatus === 0 &&
                 (

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


                          {banVideo.length > 0 ? (
                            <div className="buttonBoxSet">
                                <div className="generateButtonSet" onClick={ReplaceLinks}>
                                    <div className="generateButtonTextSet"  >
                                        {LocalizeComponent.next_x}
                                    </div>
                                </div>
                            </div>
                           ) : (
                             <div className="buttonBoxSet">
                                 <div className="generateButtonSet" onClick={Share}>
                                     <div className="generateButtonTextSet"  >
                                         {LocalizeComponent.next_x}
                                     </div>
                                 </div>
                             </div>
                           )}



                   </div>
                  ) : (
                    <div className="DoneTask">
                        {currentStatus}
                    </div>
                  )}

               </div>


             )
           }

           <div className="BlockDivider"></div>


            {
              currentTaskStatus === 0 && (
                <div className="fullSize">
               {editFormStatus === true ? (
                 <div className="setBoxTwo">

                   <div>
                       <div className="ShareNameBoxEdit" onClick={DisableEditBox}>

                          <div className="ShareNameTextFrame">
                              <div className="ShareNameTextB">
                                  {LocalizeComponent.edit_social}
                              </div>
                          </div>
                       </div>

                       <div className="SelectSocial">

                         <FormControl className={classes.formControl} error={selectError}>
                               <InputLabel id="demo-simple-select-label">{LocalizeComponent.select_social}</InputLabel>
                               <EditListComponent list={originalNetWorkArrayState} currentNetworkTwo={currentNetworkTwo}/>
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
              </div>
              )
            }

            <div className="BlockDivider"></div>




               <div className="buttonBoxSet">
                   <div className="generateButtonSet" onClick={(event) => goToChat()}>
                       <div className="generateButtonTextSet"  >
                           {LocalizeComponent.chat_with_business}
                       </div>
                   </div>
               </div>

               <div className="BlockDivider"></div>





               <AlertSuccessComponent state={sucessState} text={alertText}/>
               <AlertDangerComponent state={dangerState} text={dangerText}/>
               <ConfirmDialogComponent status={dialogStatus} left={leftbutton} right={rightbutton} text={dialogText}/>
               <FormDialogComponent status={formDialogStatus} action={1} />

          </Grid>
      </div>


  );
};


 export default connect(mapStateToProps,mapDispatchToProps)(DetailTaskComponent);
