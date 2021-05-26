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
import { increment, decrement,save_email,save_multiData } from '../actions/actions';
import config from '../config/config.js';
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
    password:""
  };


  const [storageData,setStorageData] = useState(obj);


  const onSubmit = ((data) => {

    //console.log(data);

    const newState = {...storageData};
    newState.email = data.email;
    newState.password = data.password;
    setStorageData(newState);


    AuthService.sendAuthData(data);
  });


  const checkUserAuthorization = () => {

    var checkUserAuthorization = config.getUserAutorization();

      if(checkUserAuthorization !== false){

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
          }else if(checkUserAuthorization.role == 0){
            SetRoute("/approve");
            Setredirect(true);
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

        const authSubscribe = AuthService.getAuthData().subscribe(data => {

          if((data.status === "olduser") && (data.password === true)){


            props.dispatch(save_email(storageData));
            props.dispatch(save_multiData({_object:'role',name:data.role}));
            props.dispatch(save_multiData({_object:'additionalData',name:data.additionalData}));
          //  console.log(data);

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

              }else if(data.role == 0){
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

            }else if(data.role == 0){
              SetRoute("/approve");
              Setredirect(true);
            }
          }



          }else if(data.status === "newuser"){

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
        checkUserAuthorization();
        BackButton();
    },[]);

  return (

   	<div className={classes.root}>
        <Grid container >

          <FacebookWebLoginComponent/>

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
