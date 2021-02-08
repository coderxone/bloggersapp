import React, {useState,useMemo,useEffect,useCallback} from 'react';
// import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonItem, IonLabel, IonList, IonItemDivider } from '@ionic/react';
import '../css/mainStyles.css';
import '../css/bloggerdashboard.css';
import LocalizeComponent from '../localize/LocalizeComponent';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import {
  withStyles,
  makeStyles,
  useTheme,
} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Logo from '../icons/logo_circle_new_circle.png';
import Box from '@material-ui/core/Box';
import { connect } from 'react-redux';
import AuthService from '../services/AuthService';
import HomeService from '../services/Homeservice';
import DialogComponent from '../components/DialogComponent';
import config from '../config/config.js';
import { Plugins} from "@capacitor/core";
import Observable from '../services/Observable';
import BloggerService from '../services/BloggersService';
import SkeletonComponent from '../helperComponents/SkeletonComponent';
import { increment, decrement,save_email } from '../actions/actions';
import {
  Link,useHistory,
} from "react-router-dom";
import { LastLocationProvider } from 'react-router-last-location';

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
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ConfirmDialogComponent from '../helperComponents/ConfirmDialogComponent';
import { useLastLocation } from 'react-router-last-location';



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


const drawerWidth = 240;

const useStylestwo = makeStyles((theme) => ({
  root: {
    display: 'flex',
    height:'100%'
  },
  icon:{
    color:"white"
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
  drawerPaper: {
    width: drawerWidth,
    backgroundColor:"#161730",
    color:"white",
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',



  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(1),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
    backgroundColor:"#161730",
    color:"white",
    height:"100%",
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
    height:'100%',
  },
}));

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


const BlockComponent = (props) => {

  const items = props.items;
  const dist = props.distance;


  const content = useMemo(() => {

    return items.map((item,index) =>

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
                              {item.sum} $
                        </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </Link>

      );

  },[props.items]);



  return (
    <div className="fullWidth withoutScroll" >
      {content}
    </div>
  );

}




const BloggerDashboardComponent = (props) => {

  const lastLocation = useLastLocation();

  const checkingEmail = useMemo(() => {
    const locationData = props.location;
    if(locationData.data){
      localStorage.setItem("checkingEmail",checkingEmail);
      return props.location.data.user_email;

    }else{
      return localStorage.getItem("checkingEmail");
    }
  },[]);

  const classes = useStyles();
  const { register, handleSubmit, errors,setError } = useForm({
    resolver: yupResolver(schema)
  });
  var obj = {
    email:""
  };

  const TimeoutRequest = () => {
    setTimeout(function(){
        setRequestStatus(true);
        //console.log("checking again");
    },4000);
  }


  const [storageData,setStorageData] = useState(obj);

  const [cancelDoubleEvent,setCancelDoubleEvent] = useState(0);

  const [closeDialog,setCloseDialog] = useState(false);

  const [items,SetItems] = useState([]);

  const [status,SetStatus] = useState(false);

  const [distance,setDistance] = useState(20);

  const { Geolocation} = Plugins;

  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  const [firstLoadStorage,setFirstLoadStorage] = useState(true);
  const checkData = (() => {

        //console.log("searching");
        if((latitude != 0) && (longitude != 0)){
          BloggerService.setAllData(latitude,longitude);
        }
//xx
        if(firstLoadStorage == true){

          if(ListStorageData != false){


            SetItems(ListStorageData);
            setDistance(tempstorageDistanceState);
            SetStatus(true);
            console.log("setted");
            setFirstLoadStorage(false);
            setFixSearchTwo(true);
          }

        }

  });

  const [requestStatus,setRequestStatus] = useState(true);
  const [fixSearch,setFixSearch] = useState(false);
  const [fixSearchTwo,setFixSearchTwo] = useState(true);
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
  useEffect(() => {

    const BloggerListen = BloggerService.listenUserDataG().subscribe((data) => {

        console.log(data);
        if((data.sdata.length > 0) && (data.status == "ok")){
          const insertArray = [...items];
          var deleteArray = new Array();
          if(insertArray.length > data.sdata.length){ //delete elements
            //console.log("array less correct");
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

          }else{//add or update elements in array
            //console.log("another");
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
          }

          //save in storage
          //console.log(insertArray);
          var json = JSON.stringify(insertArray);
          localStorage.setItem("tempstorageData",json);
          localStorage.setItem("tempstorageDistance",data.distance);

          SetItems(insertArray);
          setDistance(data.distance);
          SetStatus(true);
          setFixSearchTwo(true);
          setFixSearch(true);


        }else if(data.status == "later"){
          //console.log("request denied");
          setRequestStatus(false);
          SetItems([]);
          SetStatus(false);
        }else{
          SetStatus(false);
        }

    });

    const WatchPosition = async function WatchPosition(){

      try{
        const wait = Geolocation.watchPosition({}, (position, err) => {

          if(err){
            return false;
          }
          if(position){
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);

            if(fixSearchTwo == true){
              setFixSearch(true);
            }


          }


        });
      }catch(e){
        //console.log(e);
      }


    };

    const b = Observable.subscribeByTimer_10_second().subscribe(data => {
      if(requestStatus == true){
        //console.log("request send");
        WatchPosition();
        //checkData();

      }else{
        TimeoutRequest();
        console.log("denied 2");
        SetItems([]);
        SetStatus(false);
      }

    });


    WatchPosition();

    if(lastLocation != null){
      if(lastLocation.pathname == "/detailtask"){

        setFixSearch(true);
        setFixSearchTwo(true);
      }
    }




    //unsubscribe

    return () => {
        BloggerListen.unsubscribe();
        b.unsubscribe();
    }

    //unsubscribe

  }, [latitude,longitude,status,requestStatus,fixSearchTwo]);


  useMemo(() => {
    if(fixSearch == true){
      checkData();
      setFixSearch(false);
      setFixSearchTwo(false);
    }
  },[fixSearch]);


  const classestwo = useStylestwo();
  const theme = useTheme();
  const history = useHistory();
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
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

//init functions
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

  const CloseDrawer = () => {
    setOpen(false);
  }


//xx

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
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classestwo.menuButton, open && classestwo.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" onClick={event => CloseDrawer()} noWrap>
            Creator dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classestwo.drawer}
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
        <List >
          {['Contacts','MyTasks'].map((text, index) => (
            <ListItem button key={text} onClick={event => changePage(text)}>
              <ListItemIcon className={classestwo.icon}>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />

      </Drawer>
      <main
        className={clsx(classestwo.content, {
          [classestwo.contentShift]: open,
        })}
      >
        <div className={classestwo.drawerHeader} />


          {status === false ? (
            <Grid container className="withoutScroll">
               <SkeletonComponent/>
            </Grid>
           ) : (
             <Grid container className="withoutScroll">
                <BlockComponent items={items} distance={distance}/>
             </Grid>
           )}


           <ConfirmDialogComponent status={dialogStatus} left={leftbutton} right={rightbutton} text={dialogText}/>
      </main>
    </div>






  );
};


 export default connect(mapStateToProps,mapDispatchToProps)(BloggerDashboardComponent);
