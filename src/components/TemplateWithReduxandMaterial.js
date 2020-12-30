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
import config from '../config/config.js';

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



const ErrorDiv = (props) => {
  console.log(props);
  const errorMessage = props.message;

  if(errorMessage != undefined){
    return <MessageComponent message={errorMessage}/>
  }else{
    return <div></div>
  }

}







const ProfileComponent = (props) => {

  var checkingEmail = "";
  const locationData = props.location;
  if(locationData.data){
    checkingEmail = props.location.data.user_email;
    localStorage.setItem("checkingEmail",checkingEmail);
    // localStorage.setItem("checkingItemData",JSON.stringify(ItemData));
  }else{
    checkingEmail = localStorage.getItem("checkingEmail");
  }

  console.log(checkingEmail);

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


      setStorageData(prevState => {
          return obj.email = data.email;
      });


    AuthService.sendRestorePassword(data);//find user

  });



  useEffect(() => {

    const sendedEmailService = HomeService.listenSendMail().subscribe(data => {

      if(data.status == "sended"){
        setCloseDialog(true);
      }
    });

    const restoredPassword = AuthService.getRestorePassword().subscribe(data => {

      if(data.status == "usernotfound"){
        setError("email", {
              type: "manual",
              message: LocalizeComponent.user_not_found
            });
      }else{
          //user found send email to him with login and password
          var sendObject = {
            email:storageData.email
          }
          HomeService.sendNodeMail(sendObject);

      }
    });
    //unsubscribe

    return () => {
      sendedEmailService.unsubscribe();
      restoredPassword.unsubscribe();
    }

    //unsubscribe

  }, []);


  useLayoutEffect(() => {

    //initiase functions


  }, []);


  return (

   	<div className={classes.root}>
        <Grid container >


          </Grid>
      </div>


  );
};


 export default connect(mapStateToProps,mapDispatchToProps)(ProfileComponent);
