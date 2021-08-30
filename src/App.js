import React, {useEffect} from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { LastLocationProvider } from 'react-router-last-location';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';
import MapComponent from './components/MapComponent';
import AuthorizationComponent from './components/AuthorizationComponent';
import RestorepasswordComponent from './components/RestorepasswordComponent';
import ApplyComponent from './components/ApplyComponent';
import ReactMapComponent from './components/MaterialMapComponent';
import ReactGeoCodeComponent from './components/GeocodeComponent';
import PaymentComponent from './components/PaymentComponent';
import BusinessDashboard from './components/businessDashboard';
import DetailComponent from './components/DetailComponent';
import MDetailComponent from './components/businessComponents/MDetailComponent';
import SubDetailComponent from './components/SubDetailComponent';
import ProfileComponent from './components/ProfileComponent';
import RateComponent from './components/RateComponent';
import SelectRoleComponent from './components/SelectRoleComponent';
import BloggerDashboardComponent from './components/BloggerDashboardComponent';
import DetailTaskComponent from './components/DetailTaskComponent';
import HomeService from './services/Homeservice';
import SuggestComponent from './components/SuggestComponent';
import ContactListComponent from './components/contactListComponent';
import TaskComponent from './components/TaskComponent';
import RedirectComponent from './components/RedirectComponent';
import MainComponent from './components/MainComponent';
import DandelionComponent from './components/dandelionComponent';
import AnimationTwoComponent from './components/AnimationTwoComponent';
import AnimationTwoFactory from './components/businessComponents/AnimationTwoFactory';
import BloggerAnimationComponent from './components/bloggerComponents/BloggerAnimationComponent';
import AnimationComponent from './components/AnimationComponent';
import MainPageDandelion from './components/MainPageDandelion';
import BloggerAnswersComponent from './components/BloggerAnswersComponent';
import AdminComponent from './components/adminComponents/AdminComponent';
import TestComponent from './components/testComponents/TestComponents';
import AboutUsComponent from './components/AboutUsComponent';
import ConfirmComponent from './components/serviceComponents/ConfirmComponent';
import ActivationEmail from './components/emailTemplates/ActivationEmail';
import ChooseWayComponent from './components/ApplyComponents_model1/ChooseWayComponent';
import NewApplyComponent from './components/ApplyComponents_model1/NewApplyComponent';
import VideoComponent from './helperComponents/VideoComponent';
import Model1DetailTaskComponent from './components/ApplyComponents_model1/Model1DetailTaskComponent';
import creatorComponent from './components/introductionComponents/creatorComponent';
import BusinessIntroComponent from './components/introductionComponents/BusinessIntroComponent';
import userProfileComponent from './components/profileComponents/userProfileComponent';
import businessUserProfileComponent from './components/profileComponents/businessUserProfileComponent';
import userProfilePhotoUpload from './components/profileComponents/userProfilePhotoUpload';
import WhyEchohubComponent from './components/introductionComponents/WhyEchohubComponent';
import MSubdetailComponent from './components/businessComponents/MSubdetailComponent';
import BloggerListComponent from './components/BloggerPullComponents/BloggerListComponent';
import CreatorsAnimComponent from './components/MainPageComponents/CreatorsAnimComponent';


const App = () => {

  useEffect(() => {

    //connect to server
    const service = HomeService.initialConnect();
    //connect to server

  },[]);

  return (
              <Router>
                <LastLocationProvider>
                <Route path="/home" component={Home} exact={true} />
                <Route path="/login" back={true} component={AuthorizationComponent} exact={true} />
                <Route path="/restore" back={true} component={RestorepasswordComponent} exact={true} />
                <Route path="/apply" back={true} component={ApplyComponent} exact={true} />
                <Route path="/applyn" back={true} component={NewApplyComponent} exact={true} />
                <Route path="/payment" back={true} component={PaymentComponent} exact={true} />
                <Route path="/business" back={true} component={BusinessDashboard} exact={true} />
                <Route path="/detail" back={true} component={DetailComponent} exact={true} />
                <Route path="/mdetail" back={true} component={MDetailComponent} exact={true} />
                <Route path="/subdetail" back={true} component={SubDetailComponent} exact={true} />
                <Route path="/msubdetail" back={true} component={MSubdetailComponent} exact={true} />
                <Route path="/profile" back={true} component={ProfileComponent} exact={true} />
                <Route path="/rate"  back={true} component={RateComponent} exact={true} />
                <Route path="/role"  back={true} component={SelectRoleComponent} exact={true} />
                <Route path="/blogger"  back={true} component={BloggerDashboardComponent} exact={true} />
                <Route path="/detailtask"  back={true} component={DetailTaskComponent} exact={true} />
                <Route path="/mdetailtask"  back={true} component={Model1DetailTaskComponent} exact={true} />
                <Route path="/suggest"  back={true} component={SuggestComponent} exact={true} />
                <Route path="/contactlist"  back={true} component={ContactListComponent} exact={true} />
                <Route path="/mytasks"  back={true} component={TaskComponent} exact={true} />
                <Route path="/dandelion"  back={true} component={DandelionComponent} exact={true} />
                <Route path="/maindandelion"  back={true} component={MainPageDandelion} exact={true} />
                <Route path="/animation"  back={true} component={AnimationComponent} exact={true} />
                <Route path="/animationtwo"  back={true} component={AnimationTwoComponent} exact={true} />
                <Route path="/animationtwof"  back={true} component={AnimationTwoFactory } exact={true} />
                <Route path="/animationblogger"  back={true} component={BloggerAnimationComponent } exact={true} />
                <Route path="/blogger-answers"  back={true} component={BloggerAnswersComponent } exact={true} />
                <Route path="/approve"  back={true} component={AdminComponent } exact={true} />
                <Route path="/emailtemplate"  back={true} component={ActivationEmail } exact={true} />
                <Route path="/test"  back={true} component={CreatorsAnimComponent} exact={true} />
                <Route path="/chooseway"  back={true} component={ChooseWayComponent} exact={true} />
                <Route path="/main"  component={MainComponent} exact={true} />
                <Route path="/about"  back={true} component={AboutUsComponent} exact={true} />
                <Route path="/follow/:id" back={true} component={RedirectComponent} exact={true} />
                <Route path="/confirm/:id" back={true} component={ConfirmComponent} exact={true} />
                <Route path="/video" back={true} component={VideoComponent} exact={true} />
                <Route path="/creator" back={true} component={creatorComponent} exact={true} />
                <Route path="/businessintro" back={true} component={BusinessIntroComponent} exact={true} />
                <Route path="/userprofile" back={true} component={userProfileComponent} exact={true} />
                <Route path="/businessprofile" back={true} component={businessUserProfileComponent} exact={true} />
                <Route path="/why" back={true} component={WhyEchohubComponent} exact={true} />
                <Route path="/bloggerlist" back={true} component={BloggerListComponent} exact={true} />
                <Route exact path="/" render={() => <Redirect to="/main" />} />
                </LastLocationProvider>
              </Router>
  );

};
//0 - under consideration by business,1 confirmed,2 rejected, 3 Suggest to update things
export default App;
