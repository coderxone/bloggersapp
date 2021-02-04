import React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route,
  Link
} from "react-router-dom";


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
import MainComponent from './components/MainComponent';
import SuggestComponent from './components/SuggestComponent';
import ContactListComponent from './components/contactListComponent';






const App = () => (
    // <IonApp>
    //   <IonReactRouter>
    //     <IonRouterOutlet>
            <Router>
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
              <Route path="/main" component={MainComponent} exact={true} />
              <Route path="/suggest" component={SuggestComponent} exact={true} />
              <Route path="/contactlist" component={ContactListComponent} exact={true} />
              <Route exact path="/" render={() => <Redirect to="/login" />} />
            </Router>
    //     </IonRouterOutlet>
    //   </IonReactRouter>
    // </IonApp>
);

export default App;
