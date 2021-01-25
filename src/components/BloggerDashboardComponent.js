import React, {useState,useEffect,useConstructor,useLayoutEffect} from 'react';
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
import { Plugins} from "@capacitor/core";
import Observable from '../services/Observable';
import BloggerService from '../services/BloggersService';
import SkeletonComponent from '../helperComponents/SkeletonComponent';
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


const BlockComponent = (props) => {

  const items = props.items;
  const dist = props.distance;

  const content = items.map((item,index) =>

    <div key={item.id} className="MainBlock withoutScroll">
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

  );



  return (
    <div className="fullWidth withoutScroll" >
      {content}
    </div>
  );


}




const BloggerDashboardComponent = (props) => {

  var checkingEmail = "";
  const locationData = props.location;
  if(locationData.data){
    checkingEmail = props.location.data.user_email;
    localStorage.setItem("checkingEmail",checkingEmail);
    // localStorage.setItem("checkingItemData",JSON.stringify(ItemData));
  }else{
    checkingEmail = localStorage.getItem("checkingEmail");
  }

  //console.log(checkingEmail);

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

  const [items,SetItems] = useState([]);

  const [status,SetStatus] = useState(false);

  const [distance,setDistance] = useState(20);

  const onSubmit = ((data) => {




  });

  const { Geolocation} = Plugins;

  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  const checkData = (() => {

        if((latitude != 0) && (longitude != 0)){

          BloggerService.setAllData(latitude,longitude);

        }

  });



  useEffect(() => {

    const BloggerListen = BloggerService.listenUserDataG().subscribe((data) => {

        if(data.sdata.length > 0){
          const insertArray = [...items];
          for(var i = 0;i < data.sdata.length;i++){
            insertArray[i] = data.sdata[i];
          }

          SetItems(insertArray);
          setDistance(data.distance);
          SetStatus(true);
        }else{
          SetStatus(false);
        }

    });

    Observable.subscribeByTimer_10_second().subscribe(data => {
        checkData();
    });


    async function WatchPosition(){

      try{
        const wait = Geolocation.watchPosition({}, (position, err) => {

          if(err){
            return false;
          }
          if(position){
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
          }


        });
      }catch(e){
        //console.log(e);
      }


    };

    Observable.subscribeByTimer_4_second().subscribe((data) => {

      WatchPosition();

      setTimeout(function(){
        checkData();
      },2000);

      if((latitude != 0) && (longitude != 0)){
        //console.log(latitude);
        //console.log(longitude);
      }

    });



    WatchPosition();


    //unsubscribe

    return () => {

    }

    //unsubscribe

  }, [latitude,longitude,status]);


  useLayoutEffect(() => {

    //initiase functions


  }, []);


  return (

   	<div className={classes.root}>

      {status === false ? (
        <Grid container className="withoutScroll">
           <SkeletonComponent/>
        </Grid>
       ) : (
         <Grid container className="withoutScroll">
            <BlockComponent items={items} distance={distance}/>
         </Grid>
       )}

      </div>


  );
};


 export default connect(mapStateToProps,mapDispatchToProps)(BloggerDashboardComponent);
