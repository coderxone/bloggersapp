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
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Logo from '../icons/Logo_Echohub_1_part.png';
import LogoTwo from '../icons/Logo_Echohub_2_part.png';
import Box from '@material-ui/core/Box';
import { connect } from 'react-redux';
import AuthService from '../services/AuthService';
import DandelionComponent from '../components/dandelionComponent';
import Observable from '../services/Observable';
import { increment, decrement,save_email,save_multiData,multiSave } from '../actions/actions';
import config from '../config/config.js';
import ReactDOMServer from 'react-dom/server';
import ActivationEmail from '../components/emailTemplates/ActivationEmail';
import sendMailService from '../services/sendMailService';
//facebook web login
import FacebookWebLoginComponent from '../helperComponents/FacebookWebLoginComponent';
import {
  Link, Redirect,useHistory
} from "react-router-dom";






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
        borderColor: 'red',
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
  email: yup.string().required("Required").email(),
  password: yup.string().required('No password provided.')
  .min(6, LocalizeComponent.password_length)
  .matches(/^[A-Za-z0-9_]{6,}$/, 'Password should contain only letters and numbers.'),
});



const AuthorizationComponent = (props) => {

  const [redirect,Setredirect] = useState(false);
  const [route,SetRoute] = useState("");
  const classes = useStyles();
  const { register, handleSubmit, errors,setError } = useForm({
    resolver: yupResolver(schema)
  });
  var obj = {
    count: 0,
    email:"",
    password:"",
    name:"",
    picture:"",
    social:0,
  };


  const [storageData,setStorageData] = useState(obj);


  const onSubmit = ((data) => {

    //console.log(data);

    data.picture = "no-image.png";
    data.name = "0";
    data.social = 0;
    data.facebookToken = config.getUserItemNameByToken("facebooktoken");
    data.googleToken = config.getUserItemNameByToken("googletoken");

    const newState = {...storageData};
    newState.email = data.email;
    newState.password = data.password;
    newState.picture = data.picture;
    newState.name = data.name;
    newState.social = data.social;

    setStorageData(newState);

    AuthService.sendAuthData(data);
  });

  const checkSocialData = (() => {
//xx
    //console.log("checking social data");
    var memoryEmail = config.getUserItemName("social");

    if(memoryEmail){

      if(memoryEmail == "ok"){
        var data = {
          email:config.getUserItemName("email"),
          name:config.getUserItemName("name"),
          picture:config.getUserItemName("picture"),
          password:config.getdeviceid(),
          social:1,
          facebookToken:config.getUserItemNameByToken("facebooktoken"),
          googleToken:config.getUserItemNameByToken("googletoken"),
        }

        const newState = {...storageData};
        newState.email = config.getUserItemName("email");
        newState.password = config.getdeviceid();
        newState.picture = config.getUserItemName("picture");
        newState.name = config.getUserItemName("name");
        newState.social = 1;

        setStorageData(newState);

        AuthService.sendAuthData(data);

        props.dispatch(multiSave({name:"social",value:"not"}));


      }

    }


  });


  const checkUserAuthorization = () => {

    var checkUserAuthorization = config.getUserAutorization();

      if(checkUserAuthorization !== false){

          let currentUrl = config.getCurrentUrl();

          let exeptionArray = config.getRedirectExeption();


          if(exeptionArray.indexOf(currentUrl) >= 0){
            return false;
          }

          // console.log(currentUrl);
          //
          // return false;

          var enablelogin = localStorage.getItem("enablelogin");

          if(enablelogin == 1 && enablelogin){
            localStorage.setItem("enablelogin",2);
            localStorage.setItem("role",2);
            SetRoute("/payment");
            Setredirect(true);
          }else{
              if(checkUserAuthorization.role == 1){
                  if(checkUserAuthorization.additionalData == "0"){
                    SetRoute("/blogger-answers");
                    Setredirect(true);
                  }else{
                    SetRoute("/blogger");
                    Setredirect(true);
                  }
              }else if(checkUserAuthorization.role == 2){
                SetRoute("/business");
                Setredirect(true);
              }else if(checkUserAuthorization.role == 3){
                SetRoute("/approve");
                Setredirect(true);
              }
          }



      }

  }



  const BackButton = () => {
    document.addEventListener('ionBackButton', (ev) => {
      ev.detail.register(10, () => {
        SetRoute("/main");
        Setredirect(true);
      });
    });
  }




  useEffect(() => {
//xx
        const authSubscribe = AuthService.getAuthData().subscribe(data => {

          console.log(data);

          if((data.status === "olduser") && (data.password === true)){


            props.dispatch(save_email(storageData));
            props.dispatch(save_multiData({_object:'role',name:data.role}));
            props.dispatch(save_multiData({_object:'additionalData',name:data.additionalData}));
          //  console.log(data);
          //{status: "olduser", password: false, role: 0, additionalData: "0"}

          var enablelogin = localStorage.getItem("enablelogin");

          if(enablelogin){
            if(enablelogin == "1"){
              localStorage.setItem("enablelogin",2);
              localStorage.setItem("role",2);
              SetRoute("/payment");
              Setredirect(true);
            }else{
              if(data.role === 2){
                  SetRoute("/business");
                  Setredirect(true);
              }else if(data.role === 1){

                if(data.additionalData == "0"){
                  SetRoute("/blogger-answers");
                  Setredirect(true);
                }else{
                  SetRoute("/blogger");
                  Setredirect(true);
                }

              }else if(data.role == 3){
                SetRoute("/approve");
                Setredirect(true);
              }
            }
          }else{
            if(data.role === 2){
                SetRoute("/business");
                Setredirect(true);
            }else if(data.role === 1){

              if(data.additionalData == "0"){
                SetRoute("/blogger-answers");
                Setredirect(true);
              }else{
                SetRoute("/blogger");
                Setredirect(true);
              }

            }else if(data.role == 3){
              SetRoute("/approve");
              Setredirect(true);
            }else if(data.role == 0){
              SetRoute("/role");
              Setredirect(true);
            }
          }



          }else if(data.status === "newuser"){

                var generatedLink = data.link;
                var sendEmail = data.email;
                var content = ReactDOMServer.renderToString(<ActivationEmail email={sendEmail} url={generatedLink} />);
                var title = LocalizeComponent.text4;

                var sendObject = {
                  "email":sendEmail,
                  "title":title,
                  "html":content
                }

                sendMailService.sendMailToUser(sendObject);

                //send to admin
                var sendObjectAdmin = {
                  "email":"info@echohub.io",
                  "title":"new registered user " + sendEmail,
                  "html":"<h1>echohub.io have new registered user " + sendEmail + "</h2>"
                }

                sendMailService.sendMailToUser(sendObjectAdmin);
                //send to admin

  //xx
                props.dispatch(save_email(storageData));

                var enablelogin = localStorage.getItem("enablelogin");

                if(enablelogin){
                  if(enablelogin == "1"){
                    localStorage.setItem("enablelogin",2);
                    localStorage.setItem("role",2);

                    SetRoute("/payment");
                    Setredirect(true);
                  }else{
                    SetRoute("/role");
                    Setredirect(true);
                  }
              }else{
                SetRoute("/role");
                Setredirect(true);
              }




          }else{
              //xx
            setError("password", {
                  type: "manual",
                  message: "incorrect password for user " + storageData.email
                });


          }
          //props.dispatch({type:"save_email",email:"test@gmail.com"});

        });

        //unsibscribe
        return () => {
          authSubscribe.unsubscribe();
        }
        //unsibscribe

    },[props,setError,storageData]);

    useEffect(() => {
//xx
        const timeListener = Observable.subscribeByTimer_5_second().subscribe(data => {
            checkSocialData();
        });

        checkUserAuthorization();
        BackButton();
    },[]);

  return (

   	<div className={classes.root}>
        <Grid container >



          <Grid item xs={12}>
            <Paper className={classes.paper}>

                <div className="MainLCenterWrap">

                  <div className="MainLogoCenter"><DandelionComponent /></div>

                </div>


            </Paper>
          </Grid>


          <Grid item xs={12} >
            <Paper  className={classes.paper}>

              <Box mt={1} className="mainCentralDiv">
                  {LocalizeComponent.login}
              </Box>

            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper className={classes.paper}>

              <form onSubmit={handleSubmit(onSubmit)}   className={classes.margin}>

                <CssTextField

                  inputRef={register}

                  name="email"
                  className="secondMargin"
                  id="email"
                  type="email"
                  helperText={errors.email?.message}
                  variant="outlined"
                  label="Email" />

                  <CssTextField

                    name="password"
                    id="password"
                    label="Password"
                    type="password"
                    className="secondMargin"
                    variant="outlined"
                    autoComplete="current-password"
                    helperText={errors.password?.message}
                    inputRef={register}

                  />


                <div className="buttonDiv">
                      <input  className="buttonStyle" type="submit" value={LocalizeComponent.login_button}/>
                </div>
            </form>

            </Paper>
          </Grid>







          <div className="buttonCenterSocial">

              <FacebookWebLoginComponent />

          </div>

          <Grid item xs={12} >
            <Paper  className={classes.paper}>

              <Box mt={1} className="forgot-password">

                  <Link className="appColor" to="/restore">{LocalizeComponent.restore_password}</Link>

              </Box>




               {redirect === false ? (
                 <Box>

                 </Box>
                ) : (
                  <Redirect to={route} />
                )}


            </Paper>
          </Grid>






          </Grid>
      </div>


  );
};


 export default connect()(AuthorizationComponent);
