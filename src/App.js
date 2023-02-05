import React, {useEffect,Suspense, lazy} from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from "react-router-dom";
import { LastLocationProvider } from 'react-router-last-location';
import Home from './pages/Home';

// import AuthorizationComponent from './components/AuthorizationComponent';
//import RestorepasswordComponent from './components/RestorepasswordComponent';
import HomeService from './services/Homeservice';
// import MainComponent from './components/MainComponent';

import LoaderComponent from'./helperComponents/PageLoaderComponents/PageLoaderComponent';
const MainComponent= lazy(() => import('./components/MainComponent'));
const AuthorizationComponent = lazy(() => import('./components/AuthorizationComponent'));
const RestorepasswordComponent = lazy(() => import('./components/RestorepasswordComponent'));
const ApplyComponent = lazy(() => import('./components/ApplyComponent'));
const PaymentComponent  = lazy(() => import('./components/PaymentComponent'));
const BusinessDashboard  = lazy(() => import('./components/businessDashboard'));
const DetailComponent  = lazy(() => import('./components/DetailComponent'));
const MDetailComponent  = lazy(() => import('./components/businessComponents/MDetailComponent'));
const SubDetailComponent  = lazy(() => import('./components/SubDetailComponent'));
const ProfileComponent  = lazy(() => import('./components/ProfileComponent'));
const RateComponent = lazy(() => import('./components/RateComponent'));
const SelectRoleComponent = lazy(() => import('./components/SelectRoleComponent'));
const BloggerDashboardComponent = lazy(() => import('./components/BloggerDashboardComponent'));
const DetailTaskComponent = lazy(() => import('./components/DetailTaskComponent'));
const SuggestComponent= lazy(() => import('./components/SuggestComponent'));
const ContactListComponent= lazy(() => import('./components/contactListComponent'));
const TaskComponent= lazy(() => import('./components/TaskComponent'));
const RedirectComponent= lazy(() => import('./components/RedirectComponent'));
const DandelionComponent= lazy(() => import('./components/dandelionComponent'));
const BloggerAnswersComponent= lazy(() => import('./components/BloggerAnswersComponent'));
const AdminComponent= lazy(() => import('./components/adminComponents/AdminComponent'));
const TestComponent= lazy(() => import('./components/testComponents/TestComponents'));
const AboutUsComponent= lazy(() => import('./components/AboutUsComponent'));
const ConfirmComponent= lazy(() => import('./components/serviceComponents/ConfirmComponent'));
const ActivationEmail= lazy(() => import('./components/emailTemplates/ActivationEmail'));
const ChooseWayComponent= lazy(() => import('./components/ApplyComponents_model1/ChooseWayComponent'));
const NewApplyComponent= lazy(() => import('./components/ApplyComponents_model1/NewApplyComponent'));
const VideoComponent= lazy(() => import('./helperComponents/VideoComponent'));
const Model1DetailTaskComponent= lazy(() => import('./components/ApplyComponents_model1/Model1DetailTaskComponent'));
const creatorComponent= lazy(() => import('./components/introductionComponents/creatorComponent'));
const BusinessIntroComponent= lazy(() => import('./components/introductionComponents/BusinessIntroComponent'));
const userProfileComponent = lazy(() => import('./components/profileComponents/userProfileComponent'));
const exploreProfileComponent = lazy(() => import('./components/profileComponents/exploreProfileComponent'));
const businessUserProfileComponent = lazy(() => import('./components/profileComponents/businessUserProfileComponent'));
const WhyEchohubComponent = lazy(() => import('./components/introductionComponents/WhyEchohubComponent'));
const MSubdetailComponent = lazy(() => import('./components/businessComponents/MSubdetailComponent'));
const BloggerListComponent = lazy(() => import('./components/BloggerPullComponents/BloggerListWComponent'));
const PaypalMembershipComponent  =lazy(() => import('./components/PaymentSubComponents/PaypalMembershipComponent'));
const BloggerListWhiteComponent = lazy(() => import('./components/BloggerPullComponents/BloggerListWhiteComponent'));
const LastCreatorsPostComponent = lazy(() => import('./components/BloggerPullComponents/LastCreatorsPostComponent'));
const NewsComponent = lazy(() => import('./components/NewsComponents/NewsComponent'));
const NewsListComponent = lazy(() => import('./components/NewsComponents/NewsListComponent'));
const ShowNewsComponent = lazy(() => import('./components/NewsComponents/ShowNewsComponent'));


const App = () => {

  useEffect(() => {

    //connect to server
    HomeService.initialConnect();
    //connect to server

  },[]);

  return (
              <Router>
                <Suspense fallback={<LoaderComponent/>}>
                  <LastLocationProvider>
                    <Switch>
                      <Route path="/home" component={Home} exact={true} />
                      <Route path="/login" back={true} component={AuthorizationComponent}  />
                      <Route path="/restore" back={true} component={RestorepasswordComponent} />
                      <Route path="/apply" back={true} component={ApplyComponent}  />
                      <Route path="/applyn" back={true} component={NewApplyComponent} />
                      <Route path="/payment" back={true} component={PaymentComponent}  />
                      <Route path="/subscribe" back={true} component={PaypalMembershipComponent}  />
                      <Route path="/business" back={true} component={BusinessDashboard}  />
                      <Route path="/detail" back={true} component={DetailComponent}  />
                      <Route path="/mdetail" back={true} component={MDetailComponent}  />
                      <Route path="/subdetail" back={true} component={SubDetailComponent}  />
                      <Route path="/msubdetail" back={true} component={MSubdetailComponent}  />
                      <Route path="/profile" back={true} component={ProfileComponent}  />
                      <Route path="/rate"  back={true} component={RateComponent}  />
                      <Route path="/role"  back={true} component={SelectRoleComponent}  />
                      <Route path="/blogger"   component={BloggerDashboardComponent}  />
                      <Route path="/detailtask"  back={true} component={DetailTaskComponent}  />
                      <Route path="/mdetailtask"  back={true} component={Model1DetailTaskComponent}  />
                      <Route path="/suggest"  back={true} component={SuggestComponent}  />
                      <Route path="/contactlist"  back={true} component={ContactListComponent}  />
                      <Route path="/mytasks"  back={true} component={TaskComponent}  />
                      <Route path="/dandelion"  back={true} component={DandelionComponent}  />
                      <Route path="/blogger-answers"  back={true} component={BloggerAnswersComponent }  />
                      <Route path="/approve"  back={true} component={AdminComponent } />
                      <Route path="/emailtemplate"  back={true} component={ActivationEmail }  />
                      <Route path="/choose-creator"  back={true} component={BloggerListComponent}  />
                      <Route path="/business-orders-for-bloggers"  back={true} component={BloggerListWhiteComponent}  />
                      <Route path="/last-bloggers-posts"  back={true} component={LastCreatorsPostComponent}  />
                      <Route path="/chooseway"  back={true} component={ChooseWayComponent}  />
                      <Route path="/main"  component={MainComponent}  />
                      <Route path="/about"  back={true} component={AboutUsComponent}  />
                      <Route path="/follow/:id" back={true} component={RedirectComponent} exact={true} />
                      <Route path="/confirm/:id" back={true} component={ConfirmComponent} exact={true} />
                      <Route path="/video" back={true} component={VideoComponent}  />
                      <Route path="/creator" back={true} component={creatorComponent}  />
                      <Route path="/businessintro" back={true} component={BusinessIntroComponent}  />
                      <Route path="/userprofile" back={true} component={userProfileComponent}  />
                      <Route path="/explore_profile" back={true} component={exploreProfileComponent}  />
                      <Route path="/businessprofile" back={true} component={businessUserProfileComponent}  />
                      <Route path="/why" back={true} component={WhyEchohubComponent}  />
                      <Route path="/bloggerlist" back={true} component={BloggerListComponent}  />
                      <Route path="/create-news/:id" back={true} component={NewsComponent} exact={true} />
                      <Route path="/news/:id" back={true} component={ShowNewsComponent} exact={true} />
                      <Route path="/*/:id" back={true} component={ShowNewsComponent} exact={true} />
                      <Route path="/latest-news"  back={true} component={NewsListComponent} />
                      <Route path="/test"  back={true} component={NewsListComponent} exact={true} />
                      <Route exact path="/" render={() => <Redirect to="/main" />} />
                    </Switch>
                  </LastLocationProvider>
                </Suspense>
                
              </Router>
  );

};
//0 - under consideration by business,1 confirmed,2 rejected, 3 Suggest to update things
export default App;
