import React, {useState,useEffect,useMemo} from 'react';
// import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonItem, IonLabel, IonList, IonItemDivider } from '@ionic/react';
import '../css/mainStyles.css';
import '../css/contactListComponent.css';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
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




const ContactListComponent = (props) => {


  var checkingEmail = useMemo(() => {

      const locationData = props.location;
      if(locationData.data){
        //save in browser memory
        localStorage.setItem("checkingEmail",checkingEmail);
        //return object;
        return props.location.data.user_email;
        // localStorage.setItem("checkingItemData",JSON.stringify(ItemData));
      }else{
        return localStorage.getItem("checkingEmail");
      }

  },[]);




  const classes = useStyles();
  const { register, handleSubmit, errors,setError } = useForm({
    resolver: yupResolver(schema)
  });



  const [cancelDoubleEvent,setCancelDoubleEvent] = useState(0);

  const [closeDialog,setCloseDialog] = useState(false);

  const onSubmit = ((data) => {




  });



  useEffect(() => {


    //unsubscribe

    return () => {

    }

    //unsubscribe

  }, []);


  useEffect(() => {

    //initiase functions


  }, []);

  const eliotIco = "https://www.daily-sun.com/assets/news_images/2017/08/14/thumbnails/Daily-Sun-38-01-14-08-2017.jpg";

  const [messageCount,setMessageCount] = useState(3);
  const [online,setOnline] = useState(1);
  var contactObj = {
    name:"testName",
    date:"someDate",
    message:"newMessage",
    count:3

  }
  const [contact,setContact] = useState(contactObj);

  return (

   	<div className={classes.root}>
        <Grid container >

              <div  className="mainList" >
                  <div className="pleftBlock">
                    <div style ={ { backgroundPosition: "center",backgroundRepeat:"no-repeat",backgroundSize:"cover",background: "url("+eliotIco+") no-repeat center/cover" }  } className="pleftBlockOne"></div>
                    <div className="pleftBlockTwo">

                    {online > 1 ? (

                          <FiberManualRecordIcon className="mysize "/>

                     ) : (

                          <FiberManualRecordIcon className="mysize-offline"/>

                     )}


                    </div>
                  </div>
                  <div className="prightBlock">
                    <div className="prightBlockOne">
                      <div className="prightBlockOneTwo">
                        <div className="prightBlockOneTwoText">
                          {contact.name}
                        </div>

                      </div>
                      <div className="prightBlockOneThree">
                        <div className="prightBlockOneThreeText">
                          {contact.date}
                        </div>
                      </div>
                    </div>

                    <div className="prightBlockTwo">
                      <div className="prightBlockTwoOne">
                        <div className="prightBlockTwoOneText">
                          {contact.message}
                        </div>

                      </div>
                      {messageCount > 0 ? (
                        <div className="prightBlockTwoTwo">
                              <div className="prightBlockTwoTwoNumber">
                                  {contact.count}
                              </div>
                        </div>
                       ) : (
                         <div></div>
                       )}

                    </div>


                  </div>
              </div>


          </Grid>
      </div>


  );
};


 export default connect(mapStateToProps,mapDispatchToProps)(ContactListComponent);
