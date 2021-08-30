import React, {useState,useCallback,useMemo} from 'react';
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
import FilterListIcon from '@material-ui/icons/FilterList';
import Switch from '@material-ui/core/Switch';
import FacebookWebLoginComponent from '../../helperComponents/FacebookWebLoginComponent';
import {
  Link,
} from "react-router-dom";
import {useSelector,useDispatch} from 'react-redux';
import {handleSwitch,handleSwitchOnlineStatusSwitcher,SetUserRole,SetUserAuthorization} from '../../features/counter-slice';
import MobileAppComponent from '../../helperComponents/mobileAppComponent';
import { Capacitor } from '@capacitor/core';





const mapStateToProps = (state) => {
  return {
      somethingFromStore: state.somethingFromStore
  }
}

const ExampleComponent = (props) => {

  const businessMenuState = useSelector(state => state.counter.businessDashboard.menuState);
  const bloggerPermission = useSelector(state => state.counter.bloggerDashboard.blogger_autorization_menu);
  const authorized_user = useSelector(state => state.counter.authorized_user);
  const swithState = useSelector((state) => state.counter.bloggerDashboard.swithState);
  const onlineStatusSwitcher = useSelector((state) => state.counter.bloggerDashboard.onlineStatusSwitcher);
  const approveStatus = useSelector(state => state.counter.bloggerDashboard.approveStatus);
  const emailStatus = useSelector(state => state.counter.bloggerDashboard.emailStatus);
  const mobileDialogStatus = useSelector(state => state.counter.mobileDialogStatus);
  const dispatch = useDispatch();

  const history = useHistory();

  const stateFromprops = props.somethingFromStore;

  const GoToLogin = useCallback(() => {

      return history.push({pathname: '/login'}), [history];

  });

  const Logout = useCallback(() => {

              config.LogoutUser();
      return history.push({pathname: '/main'}), [history];

  });


  const openNav = () => {
    document.getElementById("mySidenav").style.width = "70%";
    document.getElementById("opacityControl").style.backgroundColor = "rgba(229, 229, 229, 0.4)";
  }

  const closeNav = (event) => {
    event.preventDefault();
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("opacityControl").style.backgroundColor = "transparent";
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


  const authorization = useSelector(state => state.counter.bloggerDashboard.authorization);
  const userRole = useSelector(state => state.counter.bloggerDashboard.role);

  useMemo(() => {
    let checkUserAuthorization = config.CheckIfAuthorized();
    dispatch(SetUserAuthorization(checkUserAuthorization));

    let userRole = Number(config.getUserRole());
    dispatch(SetUserRole(userRole))
  });





  const logoStatus = 0;






  return (

    <>
      <div id="mySidenav" className="sidenav">
        <div className="mySidenavChild">

            <a  className="closebtn" onClick={closeNav}>&times;</a>

          {
            authorization === true &&
            bloggerPermission === 1 && (
              <div>
                  <div className="menuLeftMargin">
                    <Link to={{pathname: "/contactlist"}}>{LocalizeComponent.contactsName}</Link>
                    <Link to={{pathname: "/mytasks"}}>{LocalizeComponent.myTasks}</Link>

                  </div>
                  <div className="menuTopMargin menuLeftMargin">
                    {

                      userRole === 1 ? (
                        <Link to={{pathname: "/blogger"}}>{LocalizeComponent.user_13}</Link>
                      ) : (
                        <Link to={{pathname: "/business"}}>{LocalizeComponent.user_13}</Link>
                      )
                    }
                  </div>

                  <div className=" menuLeftMargin">
                    <Link to={{pathname: "/userprofile"}}>{LocalizeComponent.user_11}</Link>
                  </div>

              </div>
            )
          }

          {
            authorization === true &&
            businessMenuState === 1 && (
              <div>
                  <div className="menuLeftMargin">
                    <Link to={{pathname: "/contactlist"}}>{LocalizeComponent.contactsName}</Link>
                    <Link to={{pathname: "/chooseway"}}>{LocalizeComponent.newReq}</Link>

                  </div>
                  <div className="menuTopMargin menuLeftMargin">
                    {

                      userRole === 1 ? (
                        <Link to={{pathname: "/blogger"}}>{LocalizeComponent.user_13}</Link>
                      ) : (
                        <Link to={{pathname: "/business"}}>{LocalizeComponent.user_13}</Link>
                      )
                    }
                  </div>

                  <div className=" menuLeftMargin">
                    <Link to={{pathname: "/businessprofile"}}>{LocalizeComponent.user_11}</Link>
                  </div>

              </div>
            )
          }


          <div className="menuLogout"  onClick={Logout}>
              <div className="menuLeftMargin menuLogoutText">
                  {LocalizeComponent.user_12}
              </div>
          </div>


        </div>

      </div>

      <div id="mySidenavR" className="sidenavR">
        <div className="mySidenavChild">
            <a  className="closebtn" onClick={closeNavR}>&times;</a>


          {
            bloggerPermission === 0 &&
            businessMenuState === 0
             && (
              <div>
                  <div className="menuLeftMargin">
                    <Link to={{pathname: "/creator"}}>{LocalizeComponent.Creator}</Link>
                    <Link to={{pathname: "/businessintro"}}>{LocalizeComponent.Business}</Link>
                  </div>

                  <div className="menuTopMargin menuLeftMargin">
                    <Link to={{pathname: "/main"}}>{LocalizeComponent.home}</Link>
                    <Link to={{pathname: "/about"}}>{LocalizeComponent.About_Connect}</Link>
                    <Link to={{pathname: "/why"}}>{LocalizeComponent.Why}</Link>
                    <a target="_blank" href="mailto:info@echohub.io">{LocalizeComponent.contactUs}</a>
                      {
                        Capacitor.platform === 'web' && (
                             <MobileAppComponent status={mobileDialogStatus}/>
                        )
                      }
                  </div>
                {
                  authorization === true && (
                    <div className="menuTopMargin menuLeftMargin">
                      {

                        userRole === 1 ? (
                          <Link to={{pathname: "/blogger"}}>{LocalizeComponent.user_13}</Link>
                        ) : (
                          <Link to={{pathname: "/business"}}>{LocalizeComponent.user_13}</Link>
                        )
                      }
                    </div>
                  )
                }


                  <div className="menuDevider menuTopMargin"></div>

                {
                  authorization === true ? (
                    <div className="menuLogout"  onClick={Logout}>
                        <div className="menuLeftMargin menuLogoutText">
                            {LocalizeComponent.user_12}
                        </div>
                    </div>
                  ) : (
                    <div>
                      <div className="menuLogIn"  onClick={GoToLogin}>
                          <div className="menuSignUpText ">
                              {LocalizeComponent.log_in}
                          </div>
                      </div>

                      <div className="menuCenterSocial">

                          <FacebookWebLoginComponent />

                      </div>
                    </div>
                  )
                }


              </div>
            )
          }


          {
            businessMenuState === 1 &&
            (
              <div>
                  <div className="menuLeftMargin">
                    <a target="_blank" href="mailto:info@echohub.io">{LocalizeComponent.contactUs}</a>
                  </div>
              </div>

            )
          }

          {
            bloggerPermission === 1 &&
            approveStatus === 1 &&
            emailStatus === 1 && (
              <div className="switchBoxMenu">
                <div className="switchBoxTwo">

                  <div className="lswitchBoxTwo">
                    {LocalizeComponent.searchLocal}
                  </div>
                  <div className="rswitchBoxTwo">
                    <Switch
                      checked={swithState}
                      onChange={event => dispatch(handleSwitch(event))}
                      color="primary"
                      className="switchCheckbox"
                      name="checkedA"
                      inputProps={{ 'aria-label': 'primary checkbox' }}
                    />

                  </div>


                </div>
                <div className="switchBoxTwo">

                  <div className="lswitchBoxTwo">
                    {LocalizeComponent.Go_offline}
                  </div>
                  <div className="rswitchBoxTwo">
                    <Switch
                      checked={onlineStatusSwitcher}
                      onChange={event => dispatch(handleSwitchOnlineStatusSwitcher(event))}
                      color="primary"
                      className="switchCheckbox"
                      name="checkedA"
                      inputProps={{ 'aria-label': 'primary checkbox' }}
                    />

                  </div>


                </div>

              </div>
            )
          }






        </div>

      </div>

      {
        //not authorized_user
        bloggerPermission === 0 &&
        businessMenuState === 0 &&
        (
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


            <div className="menuSignUpCover"  onClick={GoToLogin}>
              {
                authorization === false && (
                  <div className="menuSignUp"  onClick={GoToLogin}>
                    <div className="menuSignUpText rightText">
                        {LocalizeComponent.Sign_up}
                    </div>
                  </div>

                )
              }
            </div>

            <div className="menuIcon" onClick={openNavR}>
              <MenuIcon className="menuIconColor"/>
            </div>
          </div>
        )
        //not authorized_user
      }

      {
        //blogger dashboard
        bloggerPermission === 1
        && (
          <div className="menuContainer">

            <div className="leftMenuIcon" onClick={openNav}>
              <MenuIcon className="menuIconColor"/>
            </div>



            <div className="menuIcon" onClick={openNavR}>
              <FilterListIcon className="menuIconColor"/>
            </div>
          </div>
        )
        //blogger dashboard
      }

      {
        //business dashboard
        businessMenuState === 1
        && (
          <div className="menuContainer">

            <div className="leftMenuIcon" onClick={openNav}>
              <MenuIcon className="menuIconColor"/>
            </div>



            <div className="menuIcon" onClick={openNavR}>
              <FilterListIcon className="menuIconColor"/>
            </div>
          </div>
        )
        //business dashboard
      }



    </>



  );
};
//<Link to={{pathname: "/userprofile"}}>{LocalizeComponent.pricing}</Link>

 export default connect(mapStateToProps)(ExampleComponent);
