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


const App = () => {

  useEffect(() => {

    //connect to server
    const service = HomeService.initialConnect();
    //connect to server

  },[])

  return (

              <Router>
                <LastLocationProvider>
                <Route path="/home" component={Home} exact={true} />
                <Route path="/login" component={AuthorizationComponent} exact={true} />
                <Route path="/restore" component={RestorepasswordComponent} exact={true} />
                <Route path="/apply" component={ApplyComponent} exact={true} />
                <Route path="/payment" component={PaymentComponent} exact={true} />
                <Route path="/business" component={BusinessDashboard} exact={true} />
                <Route path="/detail" component={DetailComponent} exact={true} />
                <Route path="/subdetail" component={SubDetailComponent} exact={true} />
                <Route path="/profile" component={ProfileComponent} exact={true} />
                <Route path="/rate" component={RateComponent} exact={true} />
                <Route path="/role" component={SelectRoleComponent} exact={true} />
                <Route path="/blogger" component={BloggerDashboardComponent} exact={true} />
                <Route path="/detailtask" component={DetailTaskComponent} exact={true} />
                <Route path="/suggest" component={SuggestComponent} exact={true} />
                <Route path="/contactlist" component={ContactListComponent} exact={true} />
                <Route path="/mytasks" component={TaskComponent} exact={true} />
                <Route path="/dandelion" component={DandelionComponent} exact={true} />
                <Route path="/maindandelion" component={MainPageDandelion} exact={true} />
                <Route path="/animation" component={AnimationComponent} exact={true} />
                <Route path="/animationtwo" component={AnimationTwoComponent} exact={true} />
                <Route path="/animationtwof" component={AnimationTwoFactory } exact={true} />
                <Route path="/animationblogger" component={BloggerAnimationComponent } exact={true} />
                <Route path="/blogger-answers" component={BloggerAnswersComponent } exact={true} />
                <Route path="/approve" component={AdminComponent } exact={true} />
                <Route path="/main" component={MainComponent} exact={true} />


                <Route path="/follow/:id" component={RedirectComponent} exact={true} />
                <Route exact path="/" render={() => <Redirect to="/main" />} />
                </LastLocationProvider>
              </Router>

  );



};
//0 - under consideration by business,1 confirmed,2 rejected, 3 Suggest to update things
export default App;
