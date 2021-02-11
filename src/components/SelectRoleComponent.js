import React, {useState,useEffect,useMemo} from 'react';
// import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonItem, IonLabel, IonList, IonItemDivider } from '@ionic/react';
import '../css/mainStyles.scss';
import '../css/selectRole.scss';
import LocalizeComponent from '../localize/LocalizeComponent';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import {
  makeStyles,
} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { connect } from 'react-redux';
import SelectRoleService from '../services/SelectRoleService';
import ConfirmDialogComponent from '../helperComponents/ConfirmDialogComponent';
import Observable from '../services/Observable';


import { increment, decrement,save_email } from '../actions/actions';
import {
  Redirect
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
    backgroundColor:'#161730',
  },
}));



const schema = yup.object().shape({
  email: yup.string().required("Required").email(),
});




const SelectRoleComponent = (props) => {

  const [redirect,Setredirect] = useState(false);
  const [route,SetRoute] = useState("");

  const classes = useStyles();
  const {  handleSubmit, errors,setError } = useForm({
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


  const saveRole = ((role) => {
    localStorage.setItem("role",role);
  });


  useEffect(() => {

    const observ = Observable.getData_subject().subscribe((data) => {
      if(data == "cancel"){
        console.log("cancel");
        setDialogStatus(false);
      }else if(data == "confirm"){

        var sendobj = {
          role:role
        }
        //console.log(role);

        SelectRoleService.setRole(sendobj);

      }
    });

    const listenRole = SelectRoleService.listenRole().subscribe((data) => {
      //console.log(data);
      saveRole(data.role);

      if(data.role == 1){
        SetRoute("/blogger");
        Setredirect(true);
      }else if(data.role == 2){
        SetRoute("/apply");
        Setredirect(true);
      }

      //continue to next page
    });
    //unsubscribe

    return () => {
        observ.unsubscribe();
        listenRole.unsubscribe();
    }

    //unsubscribe

  }, [role]);


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

        {redirect === false ? (
          <Box>

          </Box>
         ) : (
           <Redirect to={route} />
         )}




        </Grid>
      </div>


  );
};


 export default connect(mapStateToProps,mapDispatchToProps)(SelectRoleComponent);
