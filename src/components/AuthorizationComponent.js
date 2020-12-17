import React, {useState,useEffect} from 'react';
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
  password: yup.string().required('No password provided.')
  .min(6, LocalizeComponent.password_length)
  .matches(/^[A-Za-z0-9_]{6,}$/, 'Password should contain only letters and numbers.'),
});



const AuthorizationComponent = (props) => {

  const classes = useStyles();
  const { register, handleSubmit, errors,setError } = useForm({
    resolver: yupResolver(schema)
  });
  var obj = {
    count: 0,
    email:"",
    password:""
  };

  const [count,setCount] = useState(0);
  const [storageData,setStorageData] = useState(obj);


  const onSubmit = ((data) => {


    setStorageData(prevState => {

      prevState.email = data.email;
      prevState.password = data.password;

    });



    AuthService.sendAuthData(data);
  });






  useEffect(() => {

        const authSubscribe = AuthService.getAuthData().subscribe(data => {

          if((data.status == "olduser") && (data.password == true)){

            props.dispatch(save_email(storageData));

          }else if(data.status == "newuser"){

                props.dispatch(save_email(storageData));

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

    },[]);


  return (

   	<div className={classes.root}>
        <Grid container >

          <Grid item xs={12}>
            <Paper className={classes.paper}>

              <Box mt={3} >
                <img src={Logo} alt="Logo" className="MainLogo" />
              </Box>

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

                  <Link className="colorWhite" to="/restore">{LocalizeComponent.restore_password}</Link>



              </Box>

            </Paper>
          </Grid>

          </Grid>
      </div>


  );
};


 export default connect(mapStateToProps,mapDispatchToProps)(AuthorizationComponent);
