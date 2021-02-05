import { Subject } from 'rxjs';
import socket from '../config/socket.js';
import config from '../config/config.js';
import cryptLibrary from '../helpers/CryptLibrary';
import soundfile from '../voice/to-the-point.ogg';
import soundfiletwo from '../voice/to-the-point.mp3';
import Observable from '../services/Observable';


const observ_subject = new Subject();
const observ_subjectTwo = new Subject();
// const timer10s$ = new Subject<any>();
// const timer60s = new Subject<any>();
// const timer300000s$ = new Subject<any>();


const initSocket = (() => {

        socket.on('connect',function () {
            console.log('connected to server');
          });
        socket.on('disconnect',function(){
          console.log('disconnected from server');
        });

      });


 function reConnect(){

 }

 const listenServices = (() => {

   //listen online users
   homeservice.listenOnlineUsers().subscribe(data => {
     console.log(data);
   });

   homeservice.listencheckAutomaticMessages().subscribe(data => {
     console.log(data);
   });

   homeservice.listenNotificationsMessages().subscribe(data => {//count of new messages
     console.log(data);

     homeservice.notificationVoice();
   });

   homeservice.joinUser();//connect as user
   homeservice.checkNotificationsMessages();//check for new messages
   homeservice.fiveMinutObserver();

   //check automatic messages
   var us_email = config.getUserEmail();

   if(us_email){
     var s = {
             email:us_email,
             role:config.getUserRole(),
             type:1
           }
     homeservice.checkAutomaticMessages(s);
   }
   //check automatic messages

 });



const homeservice = {

      initialConnect:() => {
        initSocket();
        reConnect();
        config.setDeviceid();
        listenServices();
      },

      sendFirstRequest:() => {

        socket.on('homeStart', (data) => {
           observ_subject.next(data);
        });

        const deviceid = config.getdeviceid();
        socket.emit('homeStart', {deviceid:deviceid});

        return observ_subject;

      },

      sendData_subject: data => {
        return observ_subject.next(data);
      },

      getData_subject:() => {
        return observ_subject;
      },

      joinUser:() => {

        var email = config.getUserEmail();

        if(email == false){
          return false;
        }else{
          var datas = {
            "deviceid":config.getdeviceid(),
            "email":config.getUserEmail()
          }

          console.log(datas);

          var encryptedData = cryptLibrary.encrypt(datas);

          socket.emit("onlineUsers",encryptedData);

        }

      },

      listenOnlineUsers:() => {

        socket.on("onlineUsers",data => {
            observ_subject.next(cryptLibrary.decrypt(data));
        })

        return observ_subject;
      },

      checkAutomaticMessages:(data) => {

          socket.emit("checkAutomaticMessages",cryptLibrary.encrypt(data));

      },

      listencheckAutomaticMessages:() => {

        socket.on("checkAutomaticMessages",data => {
                     observ_subject.next(cryptLibrary.decrypt(data));
        })

        return observ_subject;
      },

      fiveMinutObserver:() => {
        Observable.subscribeByTimer_5_min().subscribe(data => {
          this.checkNotificationsMessages();//check for new messages
        });
      },

      sendNodeMail:(data) => {
        var datas = {
          "deviceid":config.getdeviceid(),
          "sendemail":data.email
        }

        //console.log(data);

        socket.emit("sendmail",cryptLibrary.encrypt(datas));
      },

      listenSendMail:() => {
        socket.on("sendmail",data => {
            observ_subject.next(cryptLibrary.decrypt(data));
        })

        return observ_subject;
      },

      sendApplyData:(data) => {
        var datas = {
          "deviceid":config.getdeviceid(),
          "email":config.getUserEmail(),
          "data":data,
        }

        socket.emit("sendFormData",cryptLibrary.encrypt(datas));
      },

      listenApplyData:() => {
        socket.on("sendFormData",data => {
            observ_subject.next(cryptLibrary.decrypt(data));
        })

        return observ_subject;
      },

      test:(test => {
        return "test";
      }),

      notificationVoice:() => {
        const audio = new Audio(soundfile);
        audio.play();
      },

      checkNotificationsMessages:() => {
        var data = {
          "deviceid":config.getdeviceid(),
          "email":config.getUserEmail()
        }

        socket.emit("checkNewMessage",cryptLibrary.encrypt(data));

      },
      listenNotificationsMessages:() => {
        socket.on("checkNewMessage",data => {
            observ_subjectTwo.next(cryptLibrary.decrypt(data));
        })

        return observ_subjectTwo;
      },

      async_function: async function(){ //a function that returns a promise

          return new Promise(function(resolve,reject){
            resolve("async");
          })


        },


      without_async: function(){ //a function that returns a promise

          return new Promise(function(resolve,reject){
            resolve("async");
          })


        },

      }


export default homeservice;
//export socket;
