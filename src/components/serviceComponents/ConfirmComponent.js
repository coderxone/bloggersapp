import React, {useState,useEffect,useMemo} from 'react';
// import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonItem, IonLabel, IonList, IonItemDivider } from '@ionic/react';
import { connect } from 'react-redux';
import RedirectService from '../../services/redirectService';
import config from '../../config/config.js';

import { increment, decrement,save_email } from '../../actions/actions';
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


const ConfirmComponent = (props) => {


  var hash = useMemo(() => {

      return props.match.params.id;

  },[]);

  //console.log(hash);

  const sendConfirmation = (hash) => {
    RedirectService.sendConfirm(hash);
  }


  useEffect(() => {


    const listener = RedirectService.getConfirm().subscribe(data => {
      if(data.status == "ok"){
        window.location.href = "https://echohub.io/login";
      }
    });

    if(hash !== ""){
      sendConfirmation(hash);
    }



    //unsubscribe

    return () => {
        listener.unsibscribe();
    }

    //unsubscribe

  }, [hash]);






  return (

        <div></div>

  );
};


 export default connect(mapStateToProps,mapDispatchToProps)(ConfirmComponent);
