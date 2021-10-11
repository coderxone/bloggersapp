import React, {useState,useMemo,useEffect,useCallback} from 'react';
// import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonItem, IonLabel, IonList, IonItemDivider } from '@ionic/react';
import '../css/mainStyles.scss';
import '../css/bloggerdashboard.scss';
import LocalizeComponent from '../localize/LocalizeComponent';
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
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import ConfirmDialogComponent from '../helperComponents/ConfirmDialogComponent';
import { useLastLocation } from 'react-router-last-location';
import FilterListIcon from '@material-ui/icons/FilterList';
import DirectionComponent from '../components/DirectionComponent';
import DetailTaskService from '../services/DetailTaskService';
import TaskService from '../services/TaskService';
import LinearProgress from '@material-ui/core/LinearProgress';
import Homeservice from '../services/Homeservice';
import config from '../config/config';
import { Capacitor } from '@capacitor/core';
import { Plugins } from '@capacitor/core';
import VideoComponent from '../components/BloggerDashboardComponents/VideoComponent';
import MenuComponent from '../components/MenuComponents/MenuComponent';
import ShowPushComponentM2 from '../components/BloggerDashboardComponents/ShowPushComponentM2';
import { enableBloggerMenu,disableBloggerMenu,SetswithState,SetonlineStatusSwitcher,SetonlineStatus,GoOffline,GoOnline,SetapproveStatus,SetEmailStatus } from '../features/counter-slice';
import { useSelector, useDispatch } from 'react-redux';
const { Geolocation } = Plugins;


//xxx


const DirectionPush = (props) => {

  const latitude = props.latitude;
  const longitude = props.longitude;
  const item = props.item;
  const status = props.status;
  const timerVariable = props.timerVariable;
  const timerCircleVariable = props.timerCircleVariable;
  const distance = props.distance;


  return (
    <div>
      <DirectionComponent latitude={latitude} longitude={longitude} item={item} status={status} />
      <ShowPushComponentM2 item={item} distance={distance} status={status} timerVariable={timerVariable} timerCircleVariable={timerCircleVariable}/>
    </div>

  )
}

//xxxz
const DistrubuteComponent = (props) => {

  const latitude = props.latitude;
  const longitude = props.longitude;
  const item = props.item;
  const status = props.status;
  const timerVariable = props.timerVariable;
  const timerCircleVariable = props.timerCircleVariable;
  const userPoints = props.userPoints;
  const distance = props.distance;

  //console.log(item)

  if(status === true){
    if(item.type === 2){
        return <DirectionPush distance={distance} longitude={longitude} latitude={latitude} timerVariable={timerVariable} timerCircleVariable={timerCircleVariable} item={item} status={status}/>
    }else if(item.type === 1){
        return <VideoComponent status={status} item={item} timerVariable={timerVariable} timerCircleVariable={timerCircleVariable} userPoints={userPoints} />;
    }
  }else{
    return false;
  }


}



//xx
const BloggerDashboardComponent = (props) => {

  const dispatch = useDispatch();

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

  const approveStatus = useSelector(state => state.counter.bloggerDashboard.approveStatus);
  const emailStatus = useSelector(state => state.counter.bloggerDashboard.emailStatus);
  const bloggerPermission = useSelector(state => state.counter.bloggerDashboard.blogger_autorization_menu);

  // const TimeoutRequest = () => {
  //   setTimeout(function(){
  //       setRequestStatus(true);
  //       //console.log("checking again");
  //   },4000);
  // }

  const timeValueOne = 300;
  const timeValueCircle = 500;
  // const timeValueOne = 10;
  // const timeValueCircle = 100;

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
  const swithState = useSelector((state) => state.counter.bloggerDashboard.swithState);
  const onlineStatusSwitcher = useSelector((state) => state.counter.bloggerDashboard.onlineStatusSwitcher);
  const onlineStatus = useSelector((state) => state.counter.bloggerDashboard.onlineStatus);

  useMemo(() => {
      var onlineStatus = localStorage.getItem("online");
      // localStorage.setItem("online",0);
      // return false;
      if(onlineStatus){
        if(onlineStatus == 1){
          dispatch(SetonlineStatus(1));
          dispatch(SetonlineStatusSwitcher(false));
        }else{
          dispatch(SetonlineStatus(0));
          dispatch(SetonlineStatusSwitcher(true));
        }
      }
  },[]);

  useMemo(() => {

    var currentSwitcher = localStorage.getItem("switcher");
    if(currentSwitcher){
      if(currentSwitcher == 1){
        dispatch(SetswithState(true));
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
        // console.log("swithch == " + swithState);
        // console.log("status == " + status);
        // console.log("incrementCoordinates == " + incrementCoordinates);
        // console.log("currentTask == " + currentTask);
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
        //console.log("gps" + gps);
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
        dispatch(SetapproveStatus(1));
        dispatch(enableBloggerMenu());
      }else if(localApprove_status == "0"){
        dispatch(SetapproveStatus(0));
      }
    }
    //approvestatus
  },[])
//xx
  useMemo(() => {
    var localApprove_status = config.getUserItemName("emailstatus");
    if(localApprove_status != false){
      if(localApprove_status == "1"){
        dispatch(SetEmailStatus(1));
        dispatch(enableBloggerMenu());
      }else if(localApprove_status == "0"){
        dispatch(SetEmailStatus(0));
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
          //console.log(currentTask,onlineStatus,approveStatus,emailStatus);
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
        //  console.log(data)
          let items = data.items;
          //console.log(items[0])
          rejectOrder(items[0]);
          //console.log('cancelled');
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

        checkTimer.unsubscribe();
        listenBanVideos.unsubscribe();
        checkTimer10Sec.unsubscribe();

    }

},[])


useEffect(() => {
  const TaskServiceListenUserInfo = TaskService.listengetUserInfo().subscribe(data => {
    //console.log(data);
      if(data.status == "ok"){

        //saving user Points
        let userPointsX = data.results[0].points;

        if(userPoints !== Number(userPointsX)){
          SetUserPoints(Number(userPointsX));
          props.dispatch(multiSave({name:'points',value:userPointsX}));
        }

        //saving user Points
      if(emailStatus === 0){
        if(data.results[0].email_confirmed == 1){
          dispatch(SetEmailStatus(1));
          dispatch(enableBloggerMenu());
          props.dispatch(multiSave({name:'emailstatus',value:"1"}));
        }
      }

        if(approveStatus === 0){
          if(data.results[0].verified == 1){
              dispatch(SetapproveStatus(1));
              dispatch(enableBloggerMenu());
              props.dispatch(save_multiData({_object:'approvestatus',name:"1"}));
          }
        }

      }
  });


  return () => {
    TaskServiceListenUserInfo.unsubscribe();
  }
},[userPoints,emailStatus,approveStatus]);
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
      status:1,
      items:items
    }
    RefreshIncrement();
    //xxx
    SetStatus(false);//uncomment
    //send request to reject task because of timer
    Observable.sendAny(obj);//uncomment
  }
},[timerVariable,items]);

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


//run to check services
useEffect(() => {


  TaskService.getUserInfo();
  TaskService.getTaskData();
  config.checkUserAuthorization(1);

},[])
//run to check services


  const history = useHistory();




  //notification part

  const goToContacts = useCallback((Contacts) => {

      return history.push({pathname: '/contactlist'}), [history];

  });




  const [dialogStatus,setDialogStatus] = useState(false);
  const [leftbutton,setLeftbutton] = useState('');
  const [rightbutton,setRightbutton] = useState('');
  const [dialogText,setDialogText] = useState('');
  const [detailProjectId,setDetailProjectId] = useState(0);
  const [detailMessage,setDetailMessage] = useState("");




  return (

    <div id="opacityControl" >
      <MenuComponent  />

      <div className="projectContainer">

          {
            approveStatus === 1 &&
            emailStatus === 1 &&
            (

               <div container className="withoutScroll" >

                {
                  (
                    status == false &&
                    onlineStatus == 1 &&
                    currentTask === 0
                  ) && (

                    <div>
                      <LinearProgress className="BloggerProgress" color="secondary" />

                      <div className="approvalBysystem">
                         <div className="approvalText blink_me">
                             {LocalizeComponent.user_10}
                         </div>
                      </div>
                    </div>
                  )
                }


                {

                  currentTask === 0 &&
                  status !== false &&
                  onlineStatus === 1 &&
                  (
                    <DistrubuteComponent distance={distance} latitude={latitude} longitude={longitude} item={items[0]} status={status} timerVariable={timerVariable} timerCircleVariable={timerCircleVariable} userPoints={userPoints} />
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

                          <div className="centerElements goOnlineStyleMargin" onClick={event => dispatch(GoOnline())} >
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











               </div>

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
    </div>






  );
};


 export default connect()(BloggerDashboardComponent);
