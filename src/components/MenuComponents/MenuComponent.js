import React, {useState,useCallback} from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import LocalizeComponent from '../../localize/LocalizeComponent';
import config from '../../config/config.js';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import '../../components/MenuComponents/Menu.scss';
import logo from '../../images/Logo_Echohub.png';
import MenuIcon from '@material-ui/icons/Menu';
import { multiSave } from '../../actions/actions';
import { useHistory } from "react-router-dom";
import FacebookWebLoginComponent from '../../helperComponents/FacebookWebLoginComponent';
import {
  Link,
} from "react-router-dom";


const mapStateToProps = (state) => {
  return {
      somethingFromStore: state.somethingFromStore
  }
}

const ExampleComponent = (props) => {

  const history = useHistory();

  const stateFromprops = props.somethingFromStore;

  const GoToLogin = useCallback(() => {

      return history.push({pathname: '/login'}), [history];

  });


  const openNav = () => {
    document.getElementById("mySidenav").style.width = "70%";
    document.getElementById("opacityControl").style.opacity = "0.3";
    document.getElementById("opacityControlMenu").style.opacity = "0.3";
  }

  const closeNav = (event) => {
    event.preventDefault();
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("opacityControl").style.opacity = "1";
    document.getElementById("opacityControlMenu").style.opacity = "1";
  }

  const openNavR = () => {
    document.getElementById("mySidenavR").style.width = "70%";
    document.getElementById("mySidenavR").style.marginLeft = "30%";
    document.getElementById("opacityControl").style.backgroundColor = "rgba(229, 229, 229, 0.4)";


  }

  const closeNavR = (event) => {
    event.preventDefault();
    document.getElementById("mySidenavR").style.width = "0";
    document.getElementById("mySidenavR").style.marginLeft = "0%";
    document.getElementById("opacityControl").style.backgroundColor = "transparent";


  }

  const logoStatus = 1;

  return (

    <>
      <div id="mySidenav" className="sidenav">
        <div className="mySidenavChild">

            <a  className="closebtn" onClick={closeNav}>&times;</a>
            <a href="#">About</a>
            <a href="#">Services</a>
            <a href="#">Clients</a>
            <a href="#">Contact</a>

        </div>

      </div>

      <div id="mySidenavR" className="sidenavR">
        <div className="mySidenavChild">
            <a  className="closebtn" onClick={closeNavR}>&times;</a>
            <div className="menuLeftMargin">
              <Link to={{pathname: "/creator"}}>{LocalizeComponent.Creator}</Link>
              <Link to={{pathname: "/businessintro"}}>{LocalizeComponent.Business}</Link>
            </div>

            <div className="menuTopMargin menuLeftMargin">
              <Link to={{pathname: "/main"}}>{LocalizeComponent.home}</Link>
              <Link to={{pathname: "/about"}}>{LocalizeComponent.About_Connect}</Link>

              <a href="#">{LocalizeComponent.pricing}</a>
              <a href="#">{LocalizeComponent.Why}</a>
              <a target="_blank" href="mailto:info@echohub.io">{LocalizeComponent.contactUs}</a>
            </div>

            <div className="menuDevider menuTopMargin"></div>

            <div className="menuLogIn"  onClick={GoToLogin}>
                <div className="menuSignUpText">
                    {LocalizeComponent.log_in}
                </div>
            </div>

            <div className="menuCenterSocial">

                <FacebookWebLoginComponent />

            </div>




        </div>

      </div>
      <div className="menuContainer">

        {
          logoStatus === 0 ? (
            <img className="menuLogoStyle" src={logo} alt="echohub.io logo"/>
          ) : (
            <div className="menuLogoStyleTwo">
              <div className="menuLogoStyleTwoText">
                  ECHOHUB.IO
              </div>
            </div>
          )
        }


        <div className="menuSignUp"  onClick={GoToLogin}>
            <div className="menuSignUpText">
                {LocalizeComponent.Sign_up}
            </div>
        </div>

        <div className="menuIcon" onClick={openNavR}>
          <MenuIcon className="menuIconColor"/>
        </div>
      </div>


    </>



  );
};


 export default connect(mapStateToProps)(ExampleComponent);
