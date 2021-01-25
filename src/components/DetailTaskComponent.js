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
import DetailTaskService from '../services/DetailTaskService';
import AlertSuccessComponent from '../helperComponents/AlertSuccessComponent';

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




const DetailTaskComponent = (props) => {

  var detailData = "";
  const locationData = props.location;
  if(locationData.data){
    detailData = JSON.stringify(props.location.data);
    localStorage.setItem("detailItem",detailData);
    // localStorage.setItem("checkingItemData",JSON.stringify(ItemData));
  }else{
    detailData = JSON.parse(localStorage.getItem("detailItem"));
  }

  console.log(detailData);

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




  });

  const [swithbutton,SetSwithButton] = useState(false);
  const [url,SetUrl] = useState("");

  const GenerateUrl = (() => {
      DetailTaskService.generateUrl(detailData.id);
  });

  const [sucessState,SetSucessState] = useState(false);
  const [alertText,SetalertText] = useState("");

  const hideAlert = () => {

    setTimeout(function(){
      SetSucessState(false);
    },3000);
  }

  const CopyUrl = (() => {
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = document.location.origin + "/checkurl/" + url;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);

    SetalertText("copied to clipboard");//setText in Alert
    SetSucessState(true);//show alert
    hideAlert();
    //this.homeservice.Toast("copied to clipboard");
  });

  const [inputtext,SetInputText] = useState("");

  const setText = ((string) => {
      SetInputText(string);
  });

  const Share = (() => {

  });



  useEffect(() => {

    const unsub = DetailTaskService.listenGenerateUrl().subscribe(data => {
        console.log(data);

        if(data.status == "ok"){
          var generatedUrl = data.url;
          SetUrl(generatedUrl);
          SetSwithButton(true);
        }
        console.log(generatedUrl);
    });
    //unsubscribe

    return () => {
        unsub.unsubscribe();
    }

    //unsubscribe

  }, []);


  useLayoutEffect(() => {

    //initiase functions


  }, []);


  return (

   	<div className={classes.root}>
        <Grid container >
              <div className="descriptBox">
                  <div className="descriptionText">
                      Name of business: {detailData.url}
                      <br/>
                      Description: {detailData.description}
                      <br/>
                      Location: {detailData.location_name}
                  </div>
              </div>

              {swithbutton === false ? (
                <div className="buttonBox">
                    <div className="generateButton" onClick={GenerateUrl}>
                        <div className="generateButtonText"  >
                            generate url
                        </div>
                    </div>
                </div>
               ) : (
                 <div className="buttonBox">
                     <div className="generateButton" onClick={CopyUrl}>
                         <div className="generateButtonText"  >
                             copy url
                         </div>
                     </div>
                 </div>
               )}


               <div className="setBox">
                 <div className="ShareNameBox">
                    <div className="ShareNameText">
                        Share to All your networks (automatically)
                    </div>
                 </div>

                 <input type="text" value={inputtext}  onChange={event => setText(event.target.value)} className="setInputStyle" name="setUrl"></input>

                   <div className="buttonBoxSet">
                       <div className="generateButtonSet" onClick={Share}>
                           <div className="generateButtonTextSet"  >
                               share
                           </div>
                       </div>
                   </div>


               </div>

               <div className="buttonShare">
                   <div className="generateButton" >
                       <div className="generateButtonText"  >
                           Complete this task with a friend influencer
                       </div>
                   </div>
               </div>
               <div className="buttonShare">
                   <div className="generateButton" >
                       <div className="generateButtonText"  >
                           Share this task with a friend influencer
                       </div>
                   </div>
               </div>




              <AlertSuccessComponent state={sucessState} text={alertText}/>

          </Grid>
      </div>


  );
};


 export default connect(mapStateToProps,mapDispatchToProps)(DetailTaskComponent);
