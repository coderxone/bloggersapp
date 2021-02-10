import React, {useState,useEffect,useMemo,useCallback} from 'react';
import clsx from 'clsx';
// import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonItem, IonLabel, IonList, IonItemDivider } from '@ionic/react';
import '../css/businessDashboard.scss';
import LocalizeComponent from '../localize/LocalizeComponent';
import BusinesService from '../services/BusinessService';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import Observable from '../services/Observable';
import ConfirmDialogComponent from '../helperComponents/ConfirmDialogComponent';
import * as yup from "yup";
import {
  withStyles,
  makeStyles,
  useTheme,
} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Logo from '../icons/logo_circle_new_circle.png';
import Box from '@material-ui/core/Box';
import { connect } from 'react-redux';
import AuthService from '../services/AuthService';
import HomeService from '../services/Homeservice';
import DialogComponent from '../components/DialogComponent';

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

import Avatar from '@material-ui/core/Avatar';

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';


import FolderIcon from '@material-ui/icons/Folder';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';



import { increment, decrement,save_email } from '../actions/actions';
import {
  Link,useHistory,
} from "react-router-dom";

import Chart from "react-google-charts";




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
    backgroundColor:'#0083ff',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    backgroundColor:'#0083ff',
  },
}));


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



  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(0),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
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
    height:'100%',
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


const ErrorDiv = (props) => {
  console.log(props);
  const errorMessage = props.message;

  if(errorMessage != undefined){
    return <MessageComponent message={errorMessage}/>
  }else{
    return <div></div>
  }

}

const useStylesthree = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  demo: {
    // backgroundColor: "black",
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
}));



const BlockComponent = (props) => {

  const items = props.items;

  const content = useMemo(() => {

    return items.map((item,index) =>

      <Link key={item.id} className="deleteUrlClass"
          to={{
            pathname: "/detail",
            data: item // your data array of objects
          }}
          >
            <div  className="MainBlock withoutScroll">
              <div  className="firstLevel">
                  <div className="firstLevelText">
                      {item.url} - {item.description}
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
//xx



const BusinessDashboard = (props) => {

  const classestwo = useStylestwo();

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const classes = useStyles();
  const { register, handleSubmit, errors,setError } = useForm({
    resolver: yupResolver(schema)
  });
  var obj = {
    email:""
  };


  const [storageData,setStorageData] = useState(obj);



  const [cancelDoubleEvent,setCancelDoubleEvent] = useState(0);

  const [closeDialog,setCloseDialog] = useState(false);



  const onSubmit = ((data) => {

      const newValue = {...storageData};
      newValue.email = data.email;
      setStorageData(newValue);

    AuthService.sendRestorePassword(data);//find user

  });



//xx
  const [ listArray, setListArray ] = useState([]);

  useEffect(() => {

    const businessConst = BusinesService.listenBusinessCore().subscribe(data => {

      //console.log(data.sdata);
      const list = listArray.concat(data.sdata);

      setListArray(list);


    });


    return () => {
      businessConst.unsubscribe();
    }

    //unsubscribe

  }, []);

  useEffect(() => {
    BusinesService.getBusinessData();
  },[])

  var w = window.innerWidth / 2;
  var h = window.innerHeight / 3;

  const history = useHistory();

  const changePage = useCallback((Contacts) => {

    if(Contacts == "Contacts"){
      return history.push('/contactlist'), [history]
    }else if(Contacts == "New Request"){
      return history.push('/apply'), [history]
    }

  });

  //notification part

  const goToContacts = useCallback((Contacts) => {

      return history.push({pathname: '/contactlist'}), [history];

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

  const CloseDrawer = () => {
    setOpen(false);
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
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classestwo.menuButton, open && classestwo.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6"  onClick={event => CloseDrawer()} noWrap>
            Business dashboard
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
          {['Contacts', 'New Request'].map((text, index) => (
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


                <BlockComponent items={listArray}/>


                <ConfirmDialogComponent status={dialogStatus} left={leftbutton} right={rightbutton} text={dialogText}/>
      </main>
    </div>


  );
};


 export default connect(mapStateToProps,mapDispatchToProps)(BusinessDashboard);
