import React, {useState,useEffect,useMemo} from 'react';
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
import {
  Link,
} from "react-router-dom";


const mapStateToProps = (state) => {
  return {
      somethingFromStore: state.somethingFromStore
  }
}

const ExampleComponent = (props) => {

  const stateFromprops = props.somethingFromStore;

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

    // document.getElementById("opacityControl").style.opacity = "0.3";
    // document.getElementById("opacityControlMenu").style.opacity = "0.3";
  }

  const closeNavR = (event) => {
    event.preventDefault();
    document.getElementById("mySidenavR").style.width = "0";
    document.getElementById("mySidenavR").style.marginLeft = "0%";
    document.getElementById("opacityControl").style.backgroundColor = "transparent";

    //background: rgb(2,0,36);
    // document.getElementById("opacityControl").style.opacity = "1";
    // document.getElementById("opacityControlMenu").style.opacity = "1";
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
              <a href="#">{LocalizeComponent.Creator}</a>
              <a href="#">{LocalizeComponent.Business}</a>
            </div>

            <div className="menuPadding menuLeftMargin">
              <a href="#">{LocalizeComponent.home}</a>
              <a href="#">{LocalizeComponent.About_Connect}</a>
              <a href="#">{LocalizeComponent.pricing}</a>
              <a href="#">{LocalizeComponent.Why}</a>
              <a href="#">{LocalizeComponent.contactUs}</a>
            </div>




        </div>

      </div>
      <div className="menuContainer" id="opacityControlMenu">

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


        <div className="menuSignUp">
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
