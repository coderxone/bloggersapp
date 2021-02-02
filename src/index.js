import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './store/rootReducer'
import HomeService from './services/Homeservice';
import config from './config/config.js';
const store = createStore(rootReducer,applyMiddleware(thunk));


//connect to server
HomeService.initialConnect();
//connect to server
//connect user

//check online users
HomeService.listenOnlineUsers().subscribe(data => {
  console.log(data);
});
//check online users

//check messages for user

HomeService.listencheckAutomaticMessages().subscribe(data => {
  console.log(data);
});

var us_email = config.getUserEmail();

if(us_email){
  var s = {
          email:us_email,
          role:config.getUserRole(),
          type:1
        }


  HomeService.checkAutomaticMessages(s);
}


//check messages for user

//send single Email

// var area = this.sendForm.get('sendArea').value;
//
//      var data = {
//        area:area,
//        device:this.homeservice.deviceid,
//        email:this.homeservice.email,
//        role:this.homeservice.role
//      }
//
//      console.log(data);
//      //return false;
//
//      this.adminservice.sendMail(data);
//sendFPMtoTopicAndroid

// socket.emit('sendMail', data);

//send single Email

//send push with email
// var s = {
//         email:this.homeservice.email,
//         role:this.homeservice.role,
//         type:1
//       }
//
//       this.publicservice.checkAutomaticMessages(s);

// checkAutomaticMessages(data){
//
//     this.socket.emit("checkAutomaticMessages",data);
//
//   }
//
//   listencheckAutomaticMessages():Observable<any>{
//
//     return new Observable<any>(observer => {
//        this.socket.on("checkAutomaticMessages",data => {
//              observer.next(data);
//        })
//     })
//
//   }

//send push with email

HomeService.joinUser();
//connect user


  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
  document.getElementById('root'));




// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
