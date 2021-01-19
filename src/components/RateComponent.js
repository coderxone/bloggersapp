import React, {useState,useEffect,useConstructor,useLayoutEffect} from 'react';
// import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonItem, IonLabel, IonList, IonItemDivider } from '@ionic/react';
import '../css/mainStyles.css';
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
import RateService from '../services/RateService';
import config from '../config/config.js';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import StarIcon from '@material-ui/icons/Star';

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
        borderColor: '#8936f4',
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
  rate: yup.string().required("Required"),
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


const RateComponent = (props) => {

  var raitingId = 0;
  const locationData = props.location;
  if(locationData.data){
    raitingId = props.location.data;
    localStorage.setItem("raitingId",raitingId);
  }else{
    raitingId = localStorage.getItem("raitingId");
  }

  console.log(raitingId);

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

  const [rateindex,setRateIndex] = useState(0);

  var rateObject = {
    status:0,
    class:"usualColorStatus"
  }

  var rateArray = new Array();

  for(var i = 0;i < 5;i++){
    rateArray.push(rateObject);
  }

  const [rateArrayStatus,setRateArrayStatus] = useState(rateArray);

  const onSubmit = ((data) => {

      var raiteMessage = data.rate;
      console.log(data);

    //AuthService.sendRestorePassword(data);//find user

  });

  const rateEvent = ((rate) => {

    console.log(rate);
    var newRate = rateArray;
    var newratecount = rate - 1;

    for(var i = 0;i < 5;i++){
      if(i < newratecount){
        console.log(1);
        newRate[i].class = "yellowColorStatus";
        console.log(newRate[i].class);
      }else{
        console.log(2);
        newRate[i].class = "usualColorStatus";
        console.log(newRate[i].class);
      }

    }

    rateArray = newRate;
    console.log(newRate);

    const list = rateArrayStatus.concat(newRate);
    setRateArrayStatus(list);

  });



  useEffect(() => {


    const listenRateService = RateService.listenRate().subscribe(data => {
      console.log(data);
    });

    //unsubscribe

    return () => {

    }

    //unsubscribe

  }, []);


  useLayoutEffect(() => {
    //initiase functions
    var sendData = {
      rate:5,
      userId:raitingId
    }
    RateService.setRate(sendData);

  }, []);


  return (

   	<div className={classes.root}>
        <Grid container >

          <div className="back-icon-div">
              <ArrowBackIosIcon className="back-icon"/>
          </div>

          <div className="StarDiv">

              <div  onClick={(event) => rateEvent(1)} ><StarIcon className={"firstStar " + rateArrayStatus[0].class} /></div>
              <div  onClick={(event) => rateEvent(2)} ><StarIcon  className={"secondStar " + rateArrayStatus[1].class} /></div>
              <div  onClick={(event) => rateEvent(3)} ><StarIcon  className={"secondStar " + rateArrayStatus[2].class} /></div>
              <div  onClick={(event) => rateEvent(4)} ><StarIcon  className={"secondStar " + rateArrayStatus[3].class} /></div>
              <div  onClick={(event) => rateEvent(5)} ><StarIcon  className={"secondStar " + rateArrayStatus[4].class} /></div>
          </div>

          <div className="commentBox">

            <form onSubmit={handleSubmit(onSubmit)}   className={classes.margin}>

            <CssTextField
              inputRef={register}
              name="rate"
              className="textArea"
              id="rate"
              type="text"
              multiline
              helperText={errors.rate?.message}
              variant="outlined"
              placeholder={LocalizeComponent.rateDescribe}
              label={LocalizeComponent.rate} />

            <div className="buttonDiv buttonMargin">
                    <input  className="buttonStyle center-button" type="submit" value={LocalizeComponent.continue_button}/>
              </div>

            </form>

          </div>


          </Grid>
      </div>


  );
};


 export default connect(mapStateToProps,mapDispatchToProps)(RateComponent);
