import React, {useEffect} from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route
} from "react-router-dom";
import { LastLocationProvider } from 'react-router-last-location';
import Home from './pages/Home';
import AuthorizationComponent from './components/AuthorizationComponent';
import RestorepasswordComponent from './components/RestorepasswordComponent';
import ApplyComponent from './components/ApplyComponent';
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
import exploreProfileComponent from './components/profileComponents/exploreProfileComponent';
import businessUserProfileComponent from './components/profileComponents/businessUserProfileComponent';
import WhyEchohubComponent from './components/introductionComponents/WhyEchohubComponent';
import MSubdetailComponent from './components/businessComponents/MSubdetailComponent';
import BloggerListComponent from './components/BloggerPullComponents/BloggerListWComponent';
import PaypalMembershipComponent from './components/PaymentSubComponents/PaypalMembershipComponent';
import BloggerListWhiteComponent from './components/BloggerPullComponents/BloggerListWhiteComponent';
import LastCreatorsPostComponent from './components/BloggerPullComponents/LastCreatorsPostComponent';
import NewsComponent from './components/NewsComponents/NewsComponent';
import NewsListComponent from './components/NewsComponents/NewsListComponent';
import ShowNewsComponent from './components/NewsComponents/ShowNewsComponent';


const App = () => {

  useEffect(() => {

    //connect to server
    HomeService.initialConnect();
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
                <Route path="/subscribe" back={true} component={PaypalMembershipComponent} exact={true} />
                <Route path="/business" back={true} component={BusinessDashboard} exact={true} />
                <Route path="/detail" back={true} component={DetailComponent} exact={true} />
                <Route path="/mdetail" back={true} component={MDetailComponent} exact={true} />
                <Route path="/subdetail" back={true} component={SubDetailComponent} exact={true} />
                <Route path="/msubdetail" back={true} component={MSubdetailComponent} exact={true} />
                <Route path="/profile" back={true} component={ProfileComponent} exact={true} />
                <Route path="/rate"  back={true} component={RateComponent} exact={true} />
                <Route path="/role"  back={true} component={SelectRoleComponent} exact={true} />
                <Route path="/blogger"   component={BloggerDashboardComponent} exact={true} />
                <Route path="/detailtask"  back={true} component={DetailTaskComponent} exact={true} />
                <Route path="/mdetailtask"  back={true} component={Model1DetailTaskComponent} exact={true} />
                <Route path="/suggest"  back={true} component={SuggestComponent} exact={true} />
                <Route path="/contactlist"  back={true} component={ContactListComponent} exact={true} />
                <Route path="/mytasks"  back={true} component={TaskComponent} exact={true} />
                <Route path="/dandelion"  back={true} component={DandelionComponent} exact={true} />
                <Route path="/blogger-answers"  back={true} component={BloggerAnswersComponent } exact={true} />
                <Route path="/approve"  back={true} component={AdminComponent } exact={true} />
                <Route path="/emailtemplate"  back={true} component={ActivationEmail } exact={true} />
                <Route path="/choose-creator"  back={true} component={BloggerListComponent} exact={true} />
                <Route path="/business-orders-for-bloggers"  back={true} component={BloggerListWhiteComponent} exact={true} />
                <Route path="/last-bloggers-posts"  back={true} component={LastCreatorsPostComponent} exact={true} />
                <Route path="/chooseway"  back={true} component={ChooseWayComponent} exact={true} />
                <Route path="/main"  component={MainComponent} exact={true} />
                <Route path="/about"  back={true} component={AboutUsComponent} exact={true} />
                <Route path="/follow/:id" back={true} component={RedirectComponent} exact={true} />
                <Route path="/confirm/:id" back={true} component={ConfirmComponent} exact={true} />
                <Route path="/video" back={true} component={VideoComponent} exact={true} />
                <Route path="/creator" back={true} component={creatorComponent} exact={true} />
                <Route path="/businessintro" back={true} component={BusinessIntroComponent} exact={true} />
                <Route path="/userprofile" back={true} component={userProfileComponent} exact={true} />
                <Route path="/explore_profile" back={true} component={exploreProfileComponent} exact={true} />
                <Route path="/businessprofile" back={true} component={businessUserProfileComponent} exact={true} />
                <Route path="/why" back={true} component={WhyEchohubComponent} exact={true} />
                <Route path="/bloggerlist" back={true} component={BloggerListComponent} exact={true} />
                <Route path="/create-news/:id" back={true} component={NewsComponent} exact={true} />
                <Route path="/news/:id" back={true} component={ShowNewsComponent} exact={true} />
                <Route path="/latest-news"  back={true} component={NewsListComponent} exact={true} />
                <Route path="/test"  back={true} component={NewsListComponent} exact={true} />
                <Route exact path="/" render={() => <Redirect to="/main" />} />
                </LastLocationProvider>
              </Router>
  );

};
//0 - under consideration by business,1 confirmed,2 rejected, 3 Suggest to update things
export default App;
