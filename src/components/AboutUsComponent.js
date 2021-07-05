import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import config from '../config/config.js';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import DandelionComponent from '../components/dandelionComponent';
import GoBackAbsolute from '../helperComponents/goBackAbsoluteComponent';
import { increment, decrement,save_email } from '../actions/actions';
import {
  Link,
} from "react-router-dom";



const AdminComponent = () => {



  return (

    <Grid container >

      <div className="MainLCenterWrapAbout">

          <div className="MainLogoCenter"><DandelionComponent /></div>

      </div>

      <div className="ListDivider TopM"></div>

      <div className="aboutUsComponent">
      We are a startup team from Silicon Valley. We are glad to serve people.
      if you have any questions please write us to
      E-mail: <a  target="_blank" href="mailto:info@echohub.io">info@echohub.io</a>

      </div>

      <div className="ListDivider"></div>

      <div className="Echohub_policyAbout DivAppBackground">
          <div className="echohub_child">
             <div className="echohub_child_text">
                 All rights reserved
             </div>
             <div className="echohub_child_text" >
               <a  className="echohub_child_text_url"  target="_blank" href="https://twitter.com/EchohubI">Follow us on Twitter</a>
             </div>

             <div className="echohub_child_text" >
               <a  className="echohub_child_text_url"  target="_blank" href="https://youtube.com/channel/UC-tvKHO66_pcfeOrh1n2YQg">Follow us on Youtube</a>
             </div>

             <div className="echohub_child_text" >
               <a  className="echohub_child_text_url"  target="_blank" href="https://www.tiktok.com/@echohub.io?lang=en">Follow us on TikTok</a>
             </div>
          </div>

          <div className="echohub_child">
            <div className="echohub_child_text">
              E-mail: <a className="echohub_child_text_url"  target="_blank" href="mailto:info@echohub.io">info@echohub.io</a>
            </div>

            <div className="echohub_child_text">
               <a  className="echohub_child_text_url"  target="_blank" href="https://www.facebook.com/permalink.php?story_fbid=2446311895515266&id=100004094374192">Follow us on Facebook</a>
            </div>

            <div className="echohub_child_text" >
              <a  className="echohub_child_text_url"  target="_blank" href="https://instagram.com/echohub.io?igshid=fm0hdtx3u10y">Follow us on Instagram</a>
            </div>




          </div>
          <div className="echohub_child">
            <div className="echohub_child_text">
              <div className="textPadding">
                <a  className="echohub_child_text_url"  target="_blank" href="http://echohub.io/echohub_documents/PrivacyPolicy.docx">Privacy policy</a>
              </div>

              <div className="textPadding">
                <a  className="echohub_child_text_url"  target="_blank" href="http://echohub.io/echohub_documents/PrivacyPolicy.docx">Denial of responsibility</a>
              </div>

              <div className="textPadding">
                Subscribe to news
              </div>

              <div className="textPadding">
                <a  className="echohub_child_text_url"  target="_blank" href="http://echohub.io/echohub_documents/PrivacyPolicy.docx">Reviews</a>
              </div>

            </div>
          </div>
        </div>

        <GoBackAbsolute/>

    </Grid>


  );
};


 export default connect()(AdminComponent);
