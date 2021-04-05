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
import Geolocation from '@react-native-community/geolocation';
import Observable from '../services/Observable';
import BloggerService from '../services/BloggersService';
import SkeletonComponent from '../helperComponents/SkeletonComponent';
import { increment, decrement,save_email,save_multiData } from '../actions/actions';
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

  // const TimeoutRequest = () => {
  //   setTimeout(function(){
  //       setRequestStatus(true);
  //       //console.log("checking again");
  //   },4000);
  // }

  const [timerVariable,SettimerVariable] = useState(60);
  const [timerCircleVariable,SettimerCircleVariable] = useState(100);

  const [items,SetItems] = useState([]);

  const [status,SetStatus] = useState(false);
  const [currentTask,SetcurrentTask] = useState(0);
  const [currentItem,SetcurrentItem] = useState({});

  const [distance,setDistance] = useState("- mi");

  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  //const [searchcountD,SetsearchcountD] = useState(0);
  const [firstLoadStorage,setFirstLoadStorage] = useState(true);
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

  },[])

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

      BloggerService.setAllData(latitude,longitude,gps);
    }
  },[latitude,longitude,swithState]);

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
    const BloggerListen = BloggerService.listenUserDataG().subscribe((data) => {//items
          //console.log(currentTask);
          if((currentTask === 0) && (onlineStatus === 1) && (approveStatus == 1)){ //if user don't have current task
            RenderFunction(data);
          }else{
            SetStatus(false);
          }


    });


    return () => {
      BloggerListen.unsubscribe();
    }

  },[currentTask,onlineStatus,approveStatus]);



const SuccessLocationWatcher = (position) => {
      //checkData();
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
}

const ErrorPosition = (data) => {
  console.log(data);
  try{
    Geolocation.requestAuthorization();
  }catch(e){

  }

}

useEffect(() => {


  const DialogNotif = Observable.getData_subject().subscribe(data => {
    if(data == "confirm"){
      goToContacts();
      //go to page with id
    }else if(data == "cancel"){
      setDialogStatus(false);
    }

  });

  const RoutePassing = Observable.getRoute().subscribe(data => {

    if(data.status === "ok"){
      setDistance(data.distance)
    }

  });

  const AnyDataCommunicate = Observable.getAny().subscribe(data => {

    if(data.action === "cancelTask"){
        if(data.status == 1){

        }
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
        }

      }
  });
//xx
  const TaskServiceListenUserInfo = TaskService.listengetUserInfo().subscribe(data => {
    //console.log(data);
      if(data.status == "ok"){
        if(data.results[0].verified == 1){
            SetapproveStatus(1);
            props.dispatch(save_multiData({_object:'approvestatus',name:"1"}));
        }else if(data.results[0].verified == 0){
            SetapproveStatus(0);
            props.dispatch(save_multiData({_object:'approvestatus',name:"0"}));
        }
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

  const checkTimer = Observable.subscribeByTimer_30_second().subscribe(sec => {
    TaskService.getUserInfo();
  });



  if(lastLocation != null){
    if(lastLocation.pathname == "/detailtask"){

       checkData();
    }
  }

  var options = {
    maximumAge: 40000,
    enableHighAccuracy: true,
    timeout: 40000
  }
    try{
      Geolocation.setRNConfiguration(locationConfig);
    }catch(e){

    }



    const watchId = Geolocation.watchPosition(SuccessLocationWatcher, ErrorPosition, options);


    return () => {
        Geolocation.clearWatch(watchId);
        DialogNotif.unsubscribe();
        DialogExecute.unsubscribe();
        RoutePassing.unsubscribe();
        AnyDataCommunicate.unsubscribe();
        ListenlistenSetUrl.unsubscribe();
        listenSubmittedOrder.unsubscribe();
        TaskServiceListen.unsubscribe();
        TaskServiceListenUserInfo.unsubscribe();
        checkTimer.unsubscribe();

    }

},[])
///---------

const IncrementFunction = () => {
  SettimerCircleVariable(previousValue => previousValue - 1.66);
  SettimerVariable(previousValue => previousValue - 1);
}

const RefreshIncrement = () => {
  SettimerCircleVariable(previousValue => 100);
  SettimerVariable(previousValue => 60);
}

useMemo(() => {
  if(timerVariable == 0){

    var obj = {
      action:"cancelTask",
      status:1
    }
    RefreshIncrement();
    SetStatus(false);
    //send request to reject task because of timer
    //Observable.sendAny(obj);
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
    GoToTask(item);
});

const GoToTask = useCallback((item) => {

    return history.push({pathname: '/detailtask',data:item}), [history];

});
//xx
const rejectOrder = (item) => {
  var obj = {
    id:item.id,
    approvetask:4
  }
  DetailTaskService.submitOrder(obj);
  SetStatus(false);
  Homeservice.notificationVoiceReject();
}
//xx
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

    if(Contacts == "Contacts"){
      return history.push('/contactlist'), [history];
    }else if(Contacts == "MyTasks"){
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

    <div className={classestwo.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classestwo.appBar, {
          [classestwo.appBarShift]: open,
        })}
      >
        <Toolbar>
            <div className="myToolbar">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classestwo.menuButton, open && classestwo.hide) + " leftM"}
          >
            <MenuIcon />
          </IconButton>

          <Typography className="centerM" variant="h6" onClick={event => CloseDrawer()} noWrap>
            Creator dashboard
          </Typography>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={rightHandleDrawerOpen}
            className={clsx(classestwo.menuButton, open && classestwo.hide) + " rightM"}
          >
            <FilterListIcon />
          </IconButton>
          </div>
        </Toolbar>
      </AppBar>


          <Drawer
            className={classestwo.drawer + " leftDrawer"}
            variant="persistent"
            anchor="left"
            open={open}
            classes={{
              paper: classestwo.drawerPaper,
            }}
          >
            <div className={classestwo.drawerHeader}>
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
              </IconButton>
            </div>
            <Divider />

            {
              approveStatus === 1 &&
              (
                <List >
                  {['Contacts','MyTasks','Earning','Account'].map((text, index) => (
                    <ListItem button key={text} onClick={event => changePage(text)}>
                      <ListItemIcon className={classestwo.icon}>
                        {index == 0 && <InboxIcon />}
                        {index == 1 && <MailIcon />}
                        {index == 2 && <PaymentIcon />}
                        {index == 3 && <PersonOutlineIcon />}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                    </ListItem>
                  ))}
                </List>

            )
          }

            <Divider />

          </Drawer>




      {openRight === false ? (
        <main
          className={clsx(classestwo.content, {
            [classestwo.contentShift]: open,
          })}
        >
          <div className={classestwo.drawerHeader} />



          {
            approveStatus === 1 &&
            (

               <Grid container className="withoutScroll">

                {
                  (
                    status == false &&
                    onlineStatus == 1
                  ) && (
                    <LinearProgress className="BloggerProgress" color="secondary" />
                  )
                }



                 <DirectionComponent latitude={latitude} longitude={longitude} item={items[0]} status={status} />

                   {
                     currentTask != 0 && (
                       <div className="CurrentTask">
                         <div className="CurrentTaskTwo_2">
                              <div className="buttonStylePush" onClick={event => GoToTask(currentItem)}>
                                 <div className="CurrentTaskTwo_2Text">Continue Task</div>
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
                           <div className="buttonStylePush" onClick={event => GoOnline()}>
                              <div className="CurrentTaskTwo_2Text">Go Online</div>
                          </div>
                      </div>
                    </div>
                    )

                  }







                   {status === false ? (
                     <div></div>
                    ) : (

                      <div className="mainPush_root">
                        <div className="declineButtonBlock">
                           <div className="declineButtonStyle" onClick={event => rejectOrder(items[0])}>
                               Decline
                           </div>
                        </div>
                        <div className="mainPush">
                          <div className="mainPushColumsOne">
                            <div className="mainPushColumsOneLeft">
                                <div className="mainPushColumsOneLeft_1">Do before {items[0].date}</div>
                                <div className="mainPushColumsOneLeft_2">{items[0].url}</div>
                                <div className="mainPushColumsOneLeft_3">Distance: {distance}</div>

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
                                  Included Echohub pay and customer tip
                              </div>
                              <div className="mainPushColumsTwo_3_Third">
                                (Total may be higher)
                              </div>
                            </div>
                            <div className="mainPushColumsTwo_2">
                                <div className="buttonStylePush" onClick={event => StartTask(items[0])}>
                                    <div className="buttonStylePushText">Accept</div>
                                </div>
                            </div>


                          </div>

                        </div>
                      </div>

                    )}



               </Grid>

             )
           }

           {
             approveStatus === 0 &&
             (
               <div className="approvalBysystem">
                  <div className="approvalText">
                      verifying your email, you will receive an email notification within 4 hours. We will send you email notification.
                  </div>

               </div>
             )
           }


             <ConfirmDialogComponent status={dialogStatus} left={leftbutton} right={rightbutton} text={dialogText}/>


        </main>
       ) : (


         <Drawer
           className={classestwo.drawerRight + " leftDrawer"}
           variant="persistent"
           anchor="right"
           open={openRight}
           classes={{
             paper: classestwo.drawerPaper,
           }}
         >
           <div className={classestwo.drawerHeaderRight}>
             <IconButton onClick={rightHandleDrawerClose}>
               {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
             </IconButton>
           </div>
           <Divider />

             {
               approveStatus === 1 &&
               (
                 <div>
                 <div className="switchBoxTwo">

                   <div className="lswitchBoxTwo">
                     {LocalizeComponent.searchLocal}
                   </div>
                   <div className="rswitchBoxTwo">
                     <Switch
                       checked={swithState}
                       onChange={handleSwitch}
                       color="primary"
                       className="switchCheckbox"
                       name="checkedA"
                       inputProps={{ 'aria-label': 'primary checkbox' }}
                     />

                   </div>


                 </div>
                 <div className="switchBoxTwo">

                   <div className="lswitchBoxTwo">
                     {LocalizeComponent.Go_offline}
                   </div>
                   <div className="rswitchBoxTwo">
                     <Switch
                       checked={onlineStatusSwitcher}
                       onChange={handleSwitchOnlineStatusSwitcher}
                       color="primary"
                       className="switchCheckbox"
                       name="checkedA"
                       inputProps={{ 'aria-label': 'primary checkbox' }}
                     />

                   </div>


                 </div>

               </div>
               )
             }

           <Divider />

         </Drawer>
       )}








    </div>






  );
};


 export default connect()(BloggerDashboardComponent);
