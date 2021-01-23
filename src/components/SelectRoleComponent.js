import React, {useState,useEffect,useConstructor,useLayoutEffect} from 'react';
// import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonItem, IonLabel, IonList, IonItemDivider } from '@ionic/react';
import '../css/mainStyles.css';
import '../css/selectRole.css';
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
import SelectRoleService from '../services/SelectRoleService';
import DialogComponent from '../components/DialogComponent';
import config from '../config/config.js';
import ConfirmDialogComponent from '../helperComponents/ConfirmDialogComponent';
import Observable from '../services/Observable';


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







const SelectRoleComponent = (props) => {

  var checkingEmail = "";


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

  const [role,setRole] = useState(1);

  const selectRoleEvent = (roleType) => {
      console.log(roleType);

      setRole(roleType);
      setDialogText(LocalizeComponent.continue);
      setDialogLeft(LocalizeComponent.no);
      setDialogRight(LocalizeComponent.yes);
      setDialogStatus(true);


  }
  //status={} text={} left={} right={}
  const [dialogStatus,setDialogStatus] = useState(false);
  const [dialogText,setDialogText] = useState("text");
  const [dialogLeft,setDialogLeft] = useState("text");
  const [dialogRight,setDialogRight] = useState("text");

  useEffect(() => {

    const observ = Observable.getData_subject().subscribe((data) => {
      if(data == "cancel"){
        console.log("cancel");
        setDialogStatus(false);
      }else if(data == "confirm"){

        var sendobj = {
          role:role
        }

        console.log(role);

        SelectRoleService.setRole(sendobj);

      }
    });

    const listenRole = SelectRoleService.listenRole().subscribe((data) => {
      console.log(data);

      //continue to next page
    });
    //unsubscribe

    return () => {
        observ.unsubscribe();
        listenRole.unsubscribe();
    }

    //unsubscribe

  }, [role]);


  useLayoutEffect(() => {

    //initiase functions


  }, []);


  return (

   	<div className={classes.root}>
        <Grid container >

        <ConfirmDialogComponent  status={dialogStatus} text={dialogText} left={dialogLeft} right={dialogRight}/>

        <div className="profileBlock additionalMarginTop">
            <div className="profileInformation">
                {LocalizeComponent.selectRole}
            </div>
        </div>

        <div className="RoleBox">

            <div className="ChildRoleBox" onClick={(event) => selectRoleEvent(1)}>
                <div className="role_button_style">{LocalizeComponent.blogger}</div>

            </div>

        </div>
        <div className="RoleBoxTwo">

            <div className="ChildRoleBox"  onClick={(event) => selectRoleEvent(2)}>
                <div className="role_button_style">{LocalizeComponent.business}</div>
            </div>

        </div>

        <div>

        </div>




        </Grid>
      </div>


  );
};


 export default connect(mapStateToProps,mapDispatchToProps)(SelectRoleComponent);
