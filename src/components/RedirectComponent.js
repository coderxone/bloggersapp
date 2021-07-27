import React, {useState,useEffect,useMemo} from 'react';
// import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonItem, IonLabel, IonList, IonItemDivider } from '@ionic/react';
import { connect } from 'react-redux';
import RedirectService from '../services/redirectService';
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


const RedirectComponent = (props) => {


  var hash = useMemo(() => {

      return props.match.params.id;

  },[]);

  //console.log(hash);

  const [ip,SetIp] = useState('');


  useEffect(() => {

    const GetUrlListener = RedirectService.getIpAddress().subscribe(ip => {
      //console.log(ip);
      SetIp(ip)
    });

    const getViews = RedirectService.getViews().subscribe(data => {
      console.log(data);
      if(data.status == "ok"){
        window.location.replace(data.redirecturl);
      }
    });
    //unsubscribe

    return () => {
        GetUrlListener.unsubscribe();
        getViews.unsubscribe();
    }

    //unsubscribe

  }, []);


  useMemo(() => {

    if(ip.length > 0){
      var data = {
        ip:ip,
        hash:hash
      }

      RedirectService.setViews(data);
    }


  },[ip]);

  // const SetViews = () => {
  //   var data = {
  //     ip:this.ip,
  //     hash:this.hash
  //   }
  // }



  return (

        <div></div>

  );
};


 export default connect(mapStateToProps,mapDispatchToProps)(RedirectComponent);
