import React, {useState,useEffect,useMemo} from 'react';
// import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonItem, IonLabel, IonList, IonItemDivider } from '@ionic/react';
import '../css/mainStyles.scss';
import LocalizeComponent from '../localize/LocalizeComponent';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import {
  withStyles,
  makeStyles,
} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import AlertSuccessComponent from '../helperComponents/AlertSuccessComponent';
import AlertDangerComponent from '../helperComponents/AlertDangerComponent';
import GoBack from '../helperComponents/goBackComponent';
import RateService from '../services/RateService';
import StarIcon from '@material-ui/icons/Star';
import GoBackWithCenterComponent from '../helperComponents/goBackAbsoluteComponent';
import config from '../config/config.js';

import { increment, decrement,save_email } from '../actions/actions';
import {
  Link,
  useHistory,
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
    backgroundColor:'transparent',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    backgroundColor:'transparent',
  },
}));



const CssTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: '#0083ff',
    },
    '& label': {
      color: '#0083ff',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#0083ff',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#0083ff',
      },
      '&:hover fieldset': {
        borderColor: 'yellow',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#0083ff',
      },
      '& input:valid + fieldset': {
        borderColor: '#0083ff',
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
  //console.log(props);
  const errorMessage = props.message;

  if(errorMessage != undefined){
    return <MessageComponent message={errorMessage}/>
  }else{
    return <div></div>
  }

}


const RateComponent = (props) => {

  var raitingId = useMemo(() => {
    const locationData = props.location;
    if(locationData.data){
      localStorage.setItem("raitingId",props.location.data);
      return props.location.data;
    }else{
      return localStorage.getItem("raitingId");
    }
  },[]);


  //console.log(raitingId);

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

  const [sucessState,setSucessState] = useState(false);
  const [dangerState,setDangerState] = useState(false);

  const [ratetext,setRateText] = useState('');

  const [alertText,setAlertText] = useState("Success action Thanks!");

  var rateObject = {
    status:0,
    class:"usualColorStatus"
  }

  var rateArray = new Array();



  const [rateArrayStatus,setRateArrayStatus] = useState([
    {
      id:0,
      status:0,
      class:"usualColorStatus"
    },
    {
      id:1,
      status:0,
      class:"usualColorStatus"
    },
    {
      id:2,
      status:0,
      class:"usualColorStatus"
    },

    {
      id:3,
      status:0,
      class:"usualColorStatus"
    },
    {
      id:4,
      status:0,
      class:"usualColorStatus"
    },
  ]);




  const onSubmit = ((data) => {

      var raiteMessage = data.rate;
      //console.log(data);
      //rateindex
      //console.log(rateindex);

      if((rateindex == 0) || (raiteMessage.length < 1)){

        setAlertText(LocalizeComponent.rateAction);
        setDangerState(true);
        hideAlert();

      }else{
        var sendData = {
          rate:rateindex,
          userId:raitingId,
          text:raiteMessage
        }
        RateService.setRate(sendData);
      }




  });

  const rateEvent = ((rate) => {

    var newratecount = rate;

    setSucessState(false);

    const newrateArrayStatus = [...rateArrayStatus];

    for(var i = 0;i < newrateArrayStatus.length;i++){
      if(i < newratecount){
          newrateArrayStatus[i].class = "yellowColorStatus";
      }else{
          newrateArrayStatus[i].class = "usualColorStatus";
      }
    }
    setRateArrayStatus(newrateArrayStatus);
    setRateIndex(rate);

  });

  const setRateInputValue = ((event) => {
    var value = event.target.value;

    setRateText(value);
    //setRateText

  });

  const hideAlert = () => {

    setTimeout(function(){
      setSucessState(false);
      setDangerState(false);
    },3000);
  }



  useEffect(() => {


    const listenRateService = RateService.listenRate().subscribe(data => {
      //console.log(data);
      if(data.status == "ok"){
        setRateText("");//clean input
        setAlertText(LocalizeComponent.successAction);//setText in Alert
        setSucessState(true);//show alert
        hideAlert();//hide alert through 2 sec
      }else if(data.status = "exist_user"){

        setAlertText(LocalizeComponent.cantRate);
        setDangerState(true);
        hideAlert();

      }
    });

    //unsubscribe

    return () => {
        listenRateService.unsubscribe();
    }

    //unsubscribe

  }, []);


  useEffect(() => {
    //initiase functions

    var sendData = {
      rate:5,
      userId:raitingId,
      text:""
    }
    //RateService.setRate(sendData);
    config.checkUserAuthorization(2);

  }, []);


  return (

   	<div className={classes.root}>
        <Grid container >

          <GoBackWithCenterComponent center={LocalizeComponent.rate}/>

          <GoBack/>


          <div className="StarDiv">

              <div  onClick={(e) => rateEvent(1)} ><StarIcon className={"firstStar " + rateArrayStatus[0].class} /></div>
              <div  onClick={(e) => rateEvent(2)} ><StarIcon  className={"secondStar " + rateArrayStatus[1].class} /></div>
              <div  onClick={(e) => rateEvent(3)} ><StarIcon  className={"secondStar " + rateArrayStatus[2].class} /></div>
              <div  onClick={(e) => rateEvent(4)} ><StarIcon  className={"secondStar " + rateArrayStatus[3].class} /></div>
              <div  onClick={(e) => rateEvent(5)} ><StarIcon  className={"secondStar " + rateArrayStatus[4].class} /></div>
              
          </div>

          <div className="commentBox">

            <form onSubmit={handleSubmit(onSubmit)}   className={classes.margin}>

            <CssTextField
              inputRef={register}
              name="rate"
              className="textArea"
              onChange={setRateInputValue}
              id="rate"
              type="text"
              multiline
              value={ratetext}
              helperText={errors.rate?.message}
              variant="outlined"
              placeholder={LocalizeComponent.rateDescribe}
              label={LocalizeComponent.rate} />

            <div className="buttonDiv buttonMargin">
                    <input  className="buttonStyle center-button" type="submit" value={LocalizeComponent.rate}/>
              </div>

            </form>

          </div>


          <AlertSuccessComponent state={sucessState} text={alertText}/>
          <AlertDangerComponent state={dangerState} text={alertText}/>

          </Grid>

      </div>


  );
};


 export default connect(mapStateToProps,mapDispatchToProps)(RateComponent);
