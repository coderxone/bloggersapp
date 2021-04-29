import React, {useEffect} from 'react';
import config from '../../config/config.js';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import sendMailService from '../../services/sendMailService';




const AdminComponent = (props) => {

  useEffect(() => {
      const listenUserDataTask = sendMailService.listenUserDataTask().subscribe(data => {
        console.log(data);
      });
      sendMailService.sendMailToBusiness();

      return () => {
        listenUserDataTask.unsubscribe();
      }

  },[]);

  return (

    <Grid container >




    </Grid>


  );
};


 export default connect()(AdminComponent);
