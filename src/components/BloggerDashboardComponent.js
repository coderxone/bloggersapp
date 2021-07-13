import React, {useState,useMemo,useEffect,useCallback} from 'react';
// import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonItem, IonLabel, IonList, IonItemDivider } from '@ionic/react';
import '../css/mainStyles.scss';
import '../css/bloggerdashboard.scss';
import LocalizeComponent from '../localize/LocalizeComponent';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import {
  makeStyles,
  useTheme,
} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import GeolocationWeb from '@react-native-community/geolocation';
import Observable from '../services/Observable';
import BloggerService from '../services/BloggersService';
import SkeletonComponent from '../helperComponents/SkeletonComponent';
import { increment, decrement,save_email,save_multiData,multiSave } from '../actions/actions';
import {
  Link,useHistory,
} from "react-router-dom";
import Switch from '@material-ui/core/Switch';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import ConfirmDialogComponent from '../helperComponents/ConfirmDialogComponent';
import { useLastLocation } from 'react-router-last-location';
import FilterListIcon from '@material-ui/icons/FilterList';
import CircularProgressComponent from '../helperComponents/CircularProgressComponent';
import DirectionComponent from '../components/DirectionComponent';
import DetailTaskService from '../services/DetailTaskService';
import TaskService from '../services/TaskService';
import LinearProgress from '@material-ui/core/LinearProgress';
import Homeservice from '../services/Homeservice';
import PaymentIcon from '@material-ui/icons/Payment';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import config from '../config/config';
import { Capacitor } from '@capacitor/core';
import { Plugins } from '@capacitor/core';
import VideoComponent from '../components/BloggerDashboardComponents/VideoComponent';
import MenuComponent from '../components/MenuComponents/MenuComponent';
const { Geolocation } = Plugins;




const drawerWidth = 240;

const useStylestwo = makeStyles((theme) => ({
  root: {
    display: 'flex',
    height:'100%'
  },
  icon:{
    color:"#0083ff"
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),

  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),

  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerRight: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor:"white",
    color:"#0083ff",
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
    backgroundColor:'#0083ff',
  },
  drawerHeaderRight: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
    backgroundColor:'#0083ff',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(0),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
    marginRight: 0,
    backgroundColor:"white",
    color:"#0083ff",
    height:"100%",
  },
  contentRight: {
    flexGrow: 1,
    padding: theme.spacing(0),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
    marginRight: -drawerWidth,
    backgroundColor:"white",
    color:"#0083ff",
    height:"100%",
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
    marginRight: drawerWidth,
    height:'100%',
  },
  contentShiftRight: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
    marginRight: drawerWidth,
    height:'100%',
  },
}));

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor:'#0083ff',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    backgroundColor:'#0083ff',
  },
}));



const schema = yup.object().shape({
  email: yup.string().required("Required").email(),
});









const BlockComponent = (props) => {

  const items = props.items;
  const dist = props.distance;


    const content = items.map((item,index) =>

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
                    <br />distance less than {dist} miles
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
                    <div className="shareButton">
                        <div className="shareButtonText">
                              share
                        </div>
                    </div>
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
                              {Math.round(item.sum / item.peoplecount - 1)} $
                        </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </Link>

      );





  return (
    <div className="fullWidth withoutScroll" >
      {content}
    </div>
  );

}

//xxx



const ShowPush = (props) => {

  const items = props.items;
  const distance = props.distance;
  const status = props.status;
  const timerVariable = props.timerVariable;
  const timerCircleVariable = props.timerCircleVariable;
  const StartTask = (item) => {
    let sendObj = {
      action:"starttask",
      status:1,
      item:item
    }

    Observable.sendAny(sendObj);
  }

  const rejectOrder = (item) => {
    let sendObj = {
      action:"rejectorder",
      status:1,
      item:item
    }

    Observable.sendAny(sendObj);
  }


  return (
    <div className="mainPush_root">
      <div className="declineButtonBlock">
         <div className="declineButtonStyle" onClick={event => rejectOrder(items[0])}>
             {LocalizeComponent.Decline}
         </div>
      </div>
      <div className="mainPush">
        <div className="mainPushColumsOne">
          <div className="mainPushColumsOneLeft">
              <div className="mainPushColumsOneLeft_1">{LocalizeComponent.do_before} {items[0].date}</div>
              <div className="mainPushColumsOneLeft_2">{items[0].url}</div>
              <div className="mainPushColumsOneLeft_3">{LocalizeComponent.distance}: {distance}</div>

          </div>
          <div className="mainPushColumsOneRight">
            <div className="CircularProgressParent">
              <CircularProgressComponent status={status} timerVariable={timerVariable} timerCircleVariable={timerCircleVariable}/>
            </div>

          </div>

        </div>
        <div className="mainPushColumsTwo">

          <div className="mainPushColumsTwo_1">
            <div className="gorizontalGreyLine">
            </div>
            <div className="mainPushColumsTwo_1_Price">
              ${Math.round(items[0].sum / items[0].peoplecount - 1)}
            </div>
            <div className="mainPushColumsTwo_2_Second">
                {LocalizeComponent.tips}
            </div>
            <div className="mainPushColumsTwo_3_Third">
              {LocalizeComponent.high}
            </div>
          </div>
          <div className="mainPushColumsTwo_2">
              <div className="buttonStylePush" onClick={event => StartTask(items[0])}>
                  <div className="buttonStylePushText buttonStylePushTextAdd">{LocalizeComponent.accept}</div>
              </div>
          </div>


        </div>

      </div>
    </div>
  );
}

//xxx
const DistrubuteComponent = (props) => {

  const latitude = props.latitude;
  const longitude = props.longitude;
  const item = props.item;
  const status = props.status;
  const timerVariable = props.timerVariable;
  const timerCircleVariable = props.timerCircleVariable;
  const userPoints = props.userPoints;

  //console.log(item)

  if(status === true){
    if(item.type === 2){
      return <DirectionComponent latitude={latitude} longitude={longitude} item={item} status={status} />
    }else if(item.type === 1){
        return <VideoComponent status={status} item={item} timerVariable={timerVariable} timerCircleVariable={timerCircleVariable} userPoints={userPoints} />;
    }
  }else{
    return false;
  }




}



//xx
const BloggerDashboardComponent = (props) => {

  const locationConfig = {skipPermissionRequests:false,authorizationLevel:"whenInUse"}

  const lastLocation = useLastLocation();

  const checkingEmail = useMemo(() => {
    const locationData = props.location;
    if(locationData.data){
      localStorage.setItem("checkingEmail",checkingEmail);
      return props.location.data.user_email;

    }else{
      return localStorage.getItem("checkingEmail");
    }
  },[props]);



  var obj = {
    email:""
  };

  const [approveStatus,SetapproveStatus] = useState(0);
  const [emailStatus,SetEmailStatus] = useState(0);

  // const TimeoutRequest = () => {
  //   setTimeout(function(){
  //       setRequestStatus(true);
  //       //console.log("checking again");
  //   },4000);
  // }

  const timeValueOne = 300;
  const timeValueCircle = 500;

  const [timerVariable,SettimerVariable] = useState(timeValueOne);
  const [timerCircleVariable,SettimerCircleVariable] = useState(timeValueCircle);

  const [items,SetItems] = useState([]);

  const [status,SetStatus] = useState(false);

  const [currentTask,SetcurrentTask] = useState(0);
  const [currentItem,SetcurrentItem] = useState({});

  const [distance,setDistance] = useState("- mi");

  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  //const [searchcountD,SetsearchcountD] = useState(0);
  const [firstLoadStorage,setFirstLoadStorage] = useState(true);
  //gps switcher
  const [swithState,SetswithState] = useState(false);
  const [onlineStatusSwitcher,SetonlineStatusSwitcher] = useState(false);
  const [onlineStatus,SetonlineStatus] = useState(0);

  useMemo(() => {
      var onlineStatus = localStorage.getItem("online");
      // localStorage.setItem("online",0);
      // return false;
      if(onlineStatus){
        if(onlineStatus == 1){
          SetonlineStatus(1);
          SetonlineStatusSwitcher(false);
        }else{
          SetonlineStatus(0);
          SetonlineStatusSwitcher(true);
        }
      }
  },[]);

  useMemo(() => {

    var currentSwitcher = localStorage.getItem("switcher");
    if(currentSwitcher){
      if(currentSwitcher == 1){
        SetswithState(true);
      }
    }

  },[]);

  const [incrementCoordinates,SetincrementCoordinates] = useState(0);

  const SwitchCoordinates = (incrementCoordinates) => {
      let oldXCoordinate = incrementCoordinates;
      oldXCoordinate++;
      SetincrementCoordinates(oldXCoordinate);
  }

  const ManageTasks2Mode = (swithState,status,currentTask,incrementCoordinates) => {
    // latitude
    // swithState
    //busy variable status
    if(status === false && currentTask === 0){
      if(swithState === false){
        console.log("swithch == " + swithState);
        console.log("status == " + status);
        console.log("incrementCoordinates == " + incrementCoordinates);
        console.log("currentTask == " + currentTask);
        SwitchCoordinates(incrementCoordinates);
      }
    }
  }

  //xxx

  //checking and calling tasks every 10 sec
  useEffect(() => {
    const checkTimer15Sec = Observable.subscribeByTimer_15_second().subscribe(sec => {
      ManageTasks2Mode(swithState,status,currentTask,incrementCoordinates);
    });
    return () => {
      checkTimer15Sec.unsubscribe();
    }
  },[swithState,status,incrementCoordinates,currentTask]);

  //calling task when geolocation has changed
  useMemo(() => {

    if((latitude != 0) && (longitude != 0)){
      //console.log("Memo Executed");
      var gps = 2;
      if(swithState === true){
        gps = 1;
      }

      var currentSwitcher = localStorage.getItem("switcher");
      if(currentSwitcher){
        if(currentSwitcher == 1){
          gps = 1;
        }
      }

      console.log("running gps on mode");

      BloggerService.setAllData(latitude,longitude,gps);
    }else{
      var gps = 2;
      if(swithState === false){
        console.log("gps" + gps);
        //xxx
        BloggerService.setAllData(latitude,longitude,gps);
      }
    }
  },[latitude,longitude,swithState,incrementCoordinates]);


  //geolocation call function
  //xxx
  useEffect(() => {

    var options = {
      maximumAge: 40000,
      enableHighAccuracy: true,
      timeout: 40000
    }
      try{
        GeolocationWeb.setRNConfiguration(locationConfig);
      }catch(e){

      }

      var watchId = null;
      var watchIdAndroidIos = null;

      if(swithState === true){
        if(Capacitor.platform !== 'web'){
          watchIdAndroidIos = Geolocation.watchPosition(SuccessAndroidWatcher,ErrorAndroidPosition,options);
        }else{
          watchId = GeolocationWeb.watchPosition(SuccessLocationWatcher, ErrorPosition, options);
        }
      }


    return () => {

      if(swithState === true){
        if(Capacitor.platform !== 'web'){
          if((watchIdAndroidIos != null)){
            Geolocation.clearWatch(watchIdAndroidIos);
          }
        }else{
          if((watchId != null)){
            GeolocationWeb.clearWatch(watchId);
          }
        }
      }

    }


  },[swithState]);




  useMemo(() => {
    var localApprove_status = config.getUserItemName("approvestatus");
    if(localApprove_status != false){
      if(localApprove_status == "1"){
        SetapproveStatus(1);
      }else if(localApprove_status == "0"){
        SetapproveStatus(0);
      }
    }
    //approvestatus
  },[])
//xx
  useMemo(() => {
    var localApprove_status = config.getUserItemName("emailstatus");
    if(localApprove_status != false){
      if(localApprove_status == "1"){
        SetEmailStatus(1);
      }else if(localApprove_status == "0"){
        SetEmailStatus(0);
      }
    }
    //approvestatus
  },[])

  const [userPoints,SetUserPoints] = useState(0);

  useMemo(() => {
      let userPoints = config.getUserItemName("points");

      if(userPoints !== false){
        SetUserPoints(Number(userPoints));
      }
  },[]);



  const checkData = (() => {
        //console.log("1");
        if(firstLoadStorage == true){

          if(ListStorageData !== false){


            SetItems(ListStorageData);
            //setDistance(tempstorageDistanceState);
            SetStatus(true);
            setFirstLoadStorage(false);

            //console.log("storage initialised");

          }

        }

  });

  const [requestStatus,setRequestStatus] = useState(true);

  //checking existing storage
  const ListStorageData = useMemo(() => {
      const storageOne = localStorage.getItem("tempstorageData");
      if(storageOne){
        return JSON.parse(storageOne);
      }else{
        return false;
      }
  },[]);

  const tempstorageDistanceState = useMemo(() => {
      const storageOneD = localStorage.getItem("tempstorageDistance");
      if(storageOneD){
        return storageOneD;
      }else{
        return false;
      }
  },[]);

  //xxx
  const RenderFunction = (data) => {

    //  return false;
      if((data.sdata.length > 0) && (data.status == "ok")){
        const insertArray = [...items];
        var deleteArray = new Array();
        if(insertArray.length > data.sdata.length){ //delete elements

          if(data.sdata.length < insertArray.length){
            for(var i = 0;i < insertArray.length;i++){
              var findInd = 0;
              for(var b = 0;b < data.sdata.length;b++){
                if(insertArray[i].id == data.sdata[b].id){
                  findInd = 1;
                }
              }
              if(findInd == 0){
                deleteArray.push(i);
              }
            }
            for(var l = 0;l < deleteArray.length;l++){
              insertArray.splice(deleteArray[l],1);
            }

            var json = JSON.stringify(insertArray);
            localStorage.setItem("tempstorageData",json);
            localStorage.setItem("tempstorageDistance",data.distance);

            SetItems(insertArray);
            //setDistance(data.distance);
            SetStatus(true);
            Homeservice.notificationVoiceR();



          }


        }else{//add or update elements in array

          if(data.sdata.length > insertArray.length){

              for(var i = 0;i < data.sdata.length;i++){
                var findInd = 0;
                for(var b = 0;b < insertArray.length;b++){
                  if(insertArray[b].id == data.sdata[i].id){
                    insertArray[b] = data.sdata[i];
                    findInd = 1;
                  }
                }
                if(findInd == 0){
                  insertArray.push(data.sdata[i]);
                }
              }

              //save in storage
              //console.log(insertArray);
              var json = JSON.stringify(insertArray);
              localStorage.setItem("tempstorageData",json);
              localStorage.setItem("tempstorageDistance",data.distance);

              SetItems(insertArray);
              //setDistance(data.distance);
              SetStatus(true);
              Homeservice.notificationVoiceR();



          }

        }





      }else if(data.status == "later"){
        //console.log("request denied");
        setRequestStatus(false);
        SetStatus(false);
        SetItems([]);

      }else{
        SetStatus(false);
      }

  }

  useEffect(() => {
    //xxx
    const BloggerListen = BloggerService.listenUserDataG().subscribe((data) => {//items
          //console.log(data);
          console.log(currentTask,onlineStatus,approveStatus,emailStatus);
          if((currentTask === 0) && (onlineStatus === 1) && (approveStatus == 1) && (emailStatus == 1)){ //if user don't have current task
            RenderFunction(data);
          }else{
            SetStatus(false);
          }


    });


    return () => {
      BloggerListen.unsubscribe();
    }

  },[currentTask,onlineStatus,approveStatus,emailStatus]);



const SuccessAndroidWatcher = (position) => {
  setLatitude(position.coords.latitude);
  setLongitude(position.coords.longitude);
}

//xxx
const SuccessLocationWatcher = (position) => {
      //checkData();
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
}

const ErrorPosition = (data) => {
  //console.log(data);
  try{
    GeolocationWeb.requestAuthorization();
  }catch(e){

  }
}

const ErrorAndroidPosition = (data) => {
  //console.log(data);
  try{
    Geolocation.requestPermissions().then((permission) => {
        //console.log("permissions requested");
        //console.log(permission);
    });
  }catch(e){

  }
}

const OneTimeNotification = (data) => {

      var task_id = data.data[0].project_id;
      var count = 0;

      var StorageId = localStorage.getItem("taskId");
      var taskId = parseInt(localStorage.getItem("taskId"));
      var taskCount = parseInt(localStorage.getItem("taskCount"));

//xx
      if(taskId !== task_id){
        localStorage.setItem("taskCount",0);
        taskCount = 0;
      }

        if((taskCount < 1) && (StorageId)){
          taskCount++;
          count = taskCount;

          setLeftbutton(LocalizeComponent.cancel);
          setRightbutton(LocalizeComponent.check);
          setDialogText(LocalizeComponent.UncorfimedTask);
          setDetailProjectId(data.data[0].project_id);
          SetdialogSwitcher(1);
          setDetailMessage(LocalizeComponent.PleaseImprove);
          setDialogStatus(true);
          Homeservice.notificationVoice();
          localStorage.setItem("taskCount",count);

        }

        localStorage.setItem("taskId",task_id);

}

const [dialogSwitcher,SetdialogSwitcher] = useState(0);

useEffect(() => {

    const DialogNotif = Observable.getData_subject().subscribe(data => {

      if(dialogSwitcher === 0){
        if(data == "confirm"){
          goToContacts();
          //go to page with id
        }else if(data == "cancel"){
          setDialogStatus(false);
        }
      }else if(dialogSwitcher === 1){
        if(data == "confirm"){
          GoToTask();
          //go to page with id
        }else if(data == "cancel"){
          setDialogStatus(false);
        }
      }


    });


    return () => {
      DialogNotif.unsubscribe();
    }

},[dialogSwitcher]);

useEffect(() => {


  const RoutePassing = Observable.getRoute().subscribe(data => {

    if(data.status === "ok"){
      setDistance(data.distance)
    }

  });

  const AnyDataCommunicate = Observable.getAny().subscribe(data => {

    if(data.action === "cancelTask"){
        if(data.status == 1){
          //rejectOrder(items[0]);
          console.log('cancelled');
//xxx
        }
    }else if(data.action === "starttask"){

        let item = data.item;

        if(data.status === 1){

          StartTask(item);

        }

    }else if(data.action === "rejectorder"){
        let item = data.item;
        rejectOrder(item);
    }

  });


  const ListenlistenSetUrl = DetailTaskService.listenSetUrl().subscribe(data => {
    //console.log(data);
    // if(data.status == "inserted"){
    //   CheckVideos(detailData.id);
    //   SetInputText("");
    //   //SetStep(stepper => stepper + 1);
    // }

  });


  const listenSubmittedOrder = DetailTaskService.listenSubmittedOrder().subscribe(data => {
    //console.log(data);
  });


  const TaskServiceListen = TaskService.listenUserDataTask().subscribe(data => {
    //  console.log(data);
      if(data.status == "ok"){
        if(data.data.length > 0){
          //console.log(data.data[0].id);
          SetcurrentTask(data.data[0].id);
          SetcurrentItem(data.data[0]);
        }else{
          SetcurrentTask(0);
        }

      }
  });



  const TaskServiceListenUserInfo = TaskService.listengetUserInfo().subscribe(data => {
  //  console.log(data);
      if(data.status == "ok"){
//xx
        //saving user Points
        let userPoints = data.results[0].points;
        SetUserPoints(Number(userPoints));
        props.dispatch(multiSave({name:'points',value:userPoints}));
        //saving user Points

        if(data.results[0].email_confirmed == 1){
          SetEmailStatus(1);
          props.dispatch(multiSave({name:'emailstatus',value:"1"}));
        }else{
          props.dispatch(multiSave({name:'emailstatus',value:"0"}));
          SetEmailStatus(0);
        }

        if(data.results[0].verified == 1){
            SetapproveStatus(1);
            props.dispatch(save_multiData({_object:'approvestatus',name:"1"}));
        }else if(data.results[0].verified == 0){
            SetapproveStatus(0);
            props.dispatch(save_multiData({_object:'approvestatus',name:"0"}));
        }
      }
  });


//xx
  const DialogExecute = Observable.getData_subjectDialog().subscribe(data => {
    if(data.alert == "opendialog"){
      //console.log(data);
      setLeftbutton(LocalizeComponent.cancel);
      setRightbutton(LocalizeComponent.check);
      setDialogText(LocalizeComponent.dialogCheckMessage);
      setDetailProjectId(data.projectId);
      setDetailMessage(data.message);
      setDialogStatus(true);
      SetdialogSwitcher(0);
      //go to page with id
    }

  });

  const checkTimer = Observable.subscribeByTimer_30_second().subscribe(sec => {
    TaskService.getUserInfo();
  });




  const listenBanVideos = Homeservice.listenCheckAllBanVideos().subscribe(data => {
      //console.log(data);
      if(data.status == "ok"){

        //localStorage.setItem("taskCount",0);
        OneTimeNotification(data);


      }else{
        localStorage.setItem("taskCount",0);
      }
  });


  const checkTimer10Sec = Observable.subscribeByTimer_10_second().subscribe(sec => {
    Homeservice.CheckAllBanVideos();

  });



  if(lastLocation != null){
    if(lastLocation.pathname == "/detailtask"){

       checkData();
    }
  }





    return () => {


        DialogExecute.unsubscribe();
        RoutePassing.unsubscribe();
        AnyDataCommunicate.unsubscribe();
        ListenlistenSetUrl.unsubscribe();
        listenSubmittedOrder.unsubscribe();
        TaskServiceListen.unsubscribe();
        TaskServiceListenUserInfo.unsubscribe();
        checkTimer.unsubscribe();
        listenBanVideos.unsubscribe();
        checkTimer10Sec.unsubscribe();

    }

},[])
///---------

const IncrementFunction = () => {
  SettimerCircleVariable(previousValue => previousValue - 1.66);
  SettimerVariable(previousValue => previousValue - 1);
}

const RefreshIncrement = () => {
  SettimerCircleVariable(previousValue => timeValueCircle);
  SettimerVariable(previousValue => timeValueOne);
}


useMemo(() => {
  if(timerVariable == 0){

    var obj = {
      action:"cancelTask",
      status:1
    }
    RefreshIncrement();
    //xxx
    //SetStatus(false);//uncomment
    //send request to reject task because of timer
    //Observable.sendAny(obj);//uncomment
  }
},[timerVariable]);

useEffect(() => {
  const secTimer = Observable.subscribeByTimer_1_second().subscribe(sec => {
    if(status === true){
      IncrementFunction();
    }

  });
  //
  return () => {
    secTimer.unsubscribe();
  }
},[status]);
///---------

const StartTask = ((item) => {
    Homeservice.notificationVoiceA();
    DetailTaskService.generateUrl(item.id);

    if(item.type === 1){
      GoToTaskM1(item);
    }else{
      GoToTask(item);
    }

});

const CheckTypeAndGoToTask = (item) => {
  console.log(item);
  if(item.type === 1){
    GoToTaskM1(item);
  }else if(item.type === 2){
    GoToTask(item);
  }
}

const GoToTask = useCallback((item) => {

    return history.push({pathname: '/detailtask',data:item}), [history];

});
const GoToTaskM1 = useCallback((item) => {

    return history.push({pathname: '/mdetailtask',data:item}), [history];

});
//xx
const rejectOrder = (item) => {
  var obj = {
    id:item.id,
    approvetask:6
  }
  DetailTaskService.submitOrder(obj);
  SetStatus(false);
  Homeservice.notificationVoiceReject();
}

const GoOnline = () => {
    SetonlineStatus(1);
    localStorage.setItem("online",1);
    SetonlineStatusSwitcher(false);
}

const GoOffline = () => {
  SetonlineStatus(0);
  localStorage.setItem("online",0);
  SetonlineStatusSwitcher(true);
}

//run to check services
useEffect(() => {


  TaskService.getUserInfo();
  TaskService.getTaskData();
  config.checkUserAuthorization(1);

},[])
//run to check services





  const classestwo = useStylestwo();
  const theme = useTheme();
  const history = useHistory();
  const [open, setOpen] = React.useState(false);
  const [openRight, setOpenRight] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const rightHandleDrawerOpen = () => {
    setOpenRight(true);
  };

  const rightHandleDrawerClose = () => {
    setOpenRight(false);
  };

  const changePage = useCallback((Contacts) => {

    if(Contacts == LocalizeComponent.contactsName){
      return history.push('/contactlist'), [history];
    }else if(Contacts == LocalizeComponent.myTasks){
      return history.push('/mytasks'), [history];
    }

  });

  //notification part

  const goToContacts = useCallback((Contacts) => {

      return history.push({pathname: '/contactlist'}), [history];

  });


// <BlockComponent items={items} distance={distance}/>

  const [dialogStatus,setDialogStatus] = useState(false);
  const [leftbutton,setLeftbutton] = useState('');
  const [rightbutton,setRightbutton] = useState('');
  const [dialogText,setDialogText] = useState('');
  const [detailProjectId,setDetailProjectId] = useState(0);
  const [detailMessage,setDetailMessage] = useState("");


  const CloseDrawer = () => {
    setOpen(false);
    setOpenRight(false);
  }




  const handleSwitch = (event) => {
    var SwitcherValue = event.target.checked;
    var saveSwitcherValue = 2;
    if(SwitcherValue == true){
      saveSwitcherValue = 1;
    }
    localStorage.setItem("switcher",saveSwitcherValue);

    SetswithState(SwitcherValue);
  }

  const handleSwitchOnlineStatusSwitcher = (event) => {
    var SwitcherValue = event.target.checked;
    SetonlineStatusSwitcher(SwitcherValue);
    GoOffline();
  }




  return (

    <div id="opacityControl" >
      <MenuComponent />

      <div className="projectContainer">








      {openRight === false ? (
        <div>




          {
            approveStatus === 1 &&
            emailStatus === 1 &&
            (

               <Grid container className="withoutScroll" >

                {
                  (
                    status == false &&
                    onlineStatus == 1
                  ) && (
                    <LinearProgress className="BloggerProgress" color="secondary" />
                  )
                }


                {

                  currentTask === 0 &&
                  status !== false &&
                  onlineStatus === 1 &&
                  (
                    <DistrubuteComponent latitude={latitude} longitude={longitude} item={items[0]} status={status} timerVariable={timerVariable} timerCircleVariable={timerCircleVariable} userPoints={userPoints} />
                  )

                }


                   {
                     currentTask != 0 && (
                       <div className="CurrentTask">
                         <div className="CurrentTaskTwo_2">

                             <div className="centerElements goOnlineStyleMargin" onClick={event => CheckTypeAndGoToTask(currentItem)} >
                               <div className="projectStyleButtonFrame projectBackgroundColor">
                                 <div className="projectStyleButton robotoFont projectFontSize centerText whiteFont">
                                     {LocalizeComponent.continue_task}
                                 </div>
                               </div>
                             </div>

                         </div>
                       </div>


                    )

                  }



                  {
                    (
                      onlineStatus === 0
                    ) && (
                    <div className="CurrentTask">
                      <div className="CurrentTaskTwo_2">

                          <div className="centerElements goOnlineStyleMargin" onClick={event => GoOnline()} >
                            <div className="projectStyleButtonFrame projectBackgroundColor">
                              <div className="projectStyleButton robotoFont projectFontSize centerText whiteFont">
                                  {LocalizeComponent.go_online}
                              </div>
                            </div>
                          </div>

                      </div>
                    </div>
                    )

                  }







                   {status === false ? (
                     <div></div>
                    ) : (

                      <div></div>

                    )}



               </Grid>

             )
           }

           {
             approveStatus === 0 &&
             (
               <div className="approvalBysystem">
                  <div className="approvalText blink_me">
                      {LocalizeComponent.verification}
                  </div>
               </div>
             )
           }

           {
             emailStatus === 0 &&
             (
               <div className="approvalBysystem">
                  <div className="approvalText blink_me">
                      {LocalizeComponent.emailstatus}
                  </div>
               </div>
             )
           }


             <ConfirmDialogComponent status={dialogStatus} left={leftbutton} right={rightbutton} text={dialogText}/>


        </div>
       ) : (




             <div></div>


       )}







    </div>
    </div>






  );
};


 export default connect()(BloggerDashboardComponent);


 // <ShowPush items={items} distance={distance} status={status} timerVariable={timerVariable} timerCircleVariable={timerCircleVariable}/>
