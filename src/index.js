import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
// import thunk from 'redux-thunk';
import { createStore } from 'redux';
//import { createStore, applyMiddleware } from 'redux';
import rootReducer from './store/rootReducer';
import newStore from './features/store';
const store = createStore(rootReducer);

//const store = createStore(rootReducer,applyMiddleware(thunk));


//connect user


  ReactDOM.render(
    <Provider store={newStore} >
      <App />
    </Provider>,
  document.getElementById('root'));


// serviceWorker.unregister();
