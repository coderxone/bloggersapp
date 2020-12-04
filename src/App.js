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




/* Core CSS required for Ionic components to work properly */
// import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
// import '@ionic/react/css/normalize.css';
// import '@ionic/react/css/structure.css';
// import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
// import '@ionic/react/css/padding.css';
// import '@ionic/react/css/float-elements.css';
// import '@ionic/react/css/text-alignment.css';
// import '@ionic/react/css/text-transformation.css';
// import '@ionic/react/css/flex-utils.css';
// import '@ionic/react/css/display.css';

/* Theme variables */
// import './theme/variables.css';

// const App: React.FC = () => (
//   <IonApp>
//     <IonReactRouter>
//       <IonRouterOutlet>
//         <Route path="/home" component={Home} exact={true} />
//         <Route path="/map" component={MapComponent} exact={true} />
//         <Route path="/login" component={AuthorizationComponent} exact={true} />
//         <Route exact path="/" render={() => <Redirect to="/home" />} />
//       </IonRouterOutlet>
//     </IonReactRouter>
//   </IonApp>
// );

const App = () => (
    // <IonApp>
    //   <IonReactRouter>
    //     <IonRouterOutlet>
            <Router>
              <Route path="/home" component={Home} exact={true} />
              <Route path="/login" component={AuthorizationComponent} exact={true} />
              <Route path="/restore" component={RestorepasswordComponent} exact={true} />
              <Route path="/apply" component={ApplyComponent} exact={true} />
              <Route exact path="/" render={() => <Redirect to="/home" />} />
            </Router>
    //     </IonRouterOutlet>
    //   </IonReactRouter>
    // </IonApp>
);

export default App;
