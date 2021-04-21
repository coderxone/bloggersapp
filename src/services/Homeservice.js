import { Subject } from 'rxjs';
import socket from '../config/socket.js';
import config from '../config/config.js';
import cryptLibrary from '../helpers/CryptLibrary';
import soundfile from '../voice/to-the-point.ogg';
import soundfileNotif from '../voice/notification.mp3';
import soundfileAccept from '../voice/sms.mp3';
import soundfiletwo from '../voice/to-the-point.mp3';
import soundfileReject from '../voice/notificationRej.mp3';
import Observable from '../services/Observable';





const observ_subject = new Subject();
const observ_subjectTwo = new Subject();
const observ_subjectParams = new Subject();
const observ_subjectFormData = new Subject();
const observ_subjectFirebase = new Subject();
const observ_saveTokenFirebase = new Subject();
const observ_saveNativeTokenFirebase = new Subject();
const observ_saveTemporaryToken = new Subject();
const observ_saveAllBan = new Subject();
// const timer10s$ = new Subject<any>();
// const timer60s = new Subject<any>();
// const timer300000s$ = new Subject<any>();


const initSocket = (() => {

        socket.on('connect',function () {
          //  console.log('connected to server');
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
     //console.log(data);
   });

   homeservice.listencheckAutomaticMessages().subscribe(data => {
    // console.log(data);
   });

   homeservice.listenNotificationsMessages().subscribe(data => {//count of new messages

     //console.log(data);

     if(data.count > 0){

       // config.TurnOnNotification();
       //
       // return false;
       if(config.getNotificationCount() != data.count){
         config.TurnOnNotification();
       }

       var notStatus = config.getNotificationStatus();
      // console.log(notStatus);
       if(notStatus == true){
         //console.log("dialog request");
         var messageObj = {
           alert:"opendialog",
           projectId:data.details[data.details.length - 1].projectId,
           message:data.details[data.details.length - 1].message
         }
         Observable.sendData_subjectDilog(messageObj);
         homeservice.notificationVoice();
         config.turnOffNotification();
         config.saveNotificationCount(data.count);
       }


     }


   });
//xx
   homeservice.listenSystemParams().subscribe(data => {
     //console.log(data);
     var categories = data.categories;
     var string_categories = JSON.stringify(categories);
     localStorage.setItem("categories",string_categories);

     var businessCategories = data.businessCategories;
     var string_businessCategories = JSON.stringify(businessCategories);
     localStorage.setItem("businessCategories",string_businessCategories);

     var businessGoals = data.businessGoals;
     var string_businessGoals = JSON.stringify(businessGoals);
     localStorage.setItem("businessGoals",string_businessGoals);

     var famousPrice = data.alldata.famousPrice;
     localStorage.setItem("famousPrice",famousPrice);
     var minPrice = data.alldata.pricevideo;
     localStorage.setItem("minPrice",minPrice);
      var s = JSON.stringify(data.socialNetworkList);
      //console.log(s);
      localStorage.setItem("soc",s);
     //listenServices();
   });

   homeservice.listenSubscribeToWebFirebaseToken().subscribe(data => {
      //console.log(data);
   });
   homeservice.listensaveWebFirebaseToken().subscribe(data => {
      //console.log(data);
   });
   homeservice.listenTemporaryFirebaseToken().subscribe(data => {
    //  console.log(data);
   });
   homeservice.listenFirebaseToken();//listen firebase records

   //homeservice.WebPushNotification();




   homeservice.checkSystemParams();
   homeservice.joinUser();//connect as user
   homeservice.checkNotificationsMessages();//check for new messages
   homeservice.fiveMinutObserver();

   //check automatic messages
   var us_email = config.getUserEmail();

   if(us_email){
     var s = {
             email:us_email,
             role:config.getUserRole(),
             type:1,
             deviceId:config.getdeviceid(),
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

          //console.log(datas);

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
        Observable.subscribeByTimer_15_second().subscribe(data => {
          homeservice.checkNotificationsMessages();//check for new messages
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
            observ_subjectFormData.next(cryptLibrary.decrypt(data));
        })

        return observ_subjectFormData;
      },
      checkSystemParams:(data) => {
        var datas = {
          "deviceid":config.getdeviceid(),
          "email":config.getUserEmail(),
          "data":data,
        }

        socket.emit("load_all_info",cryptLibrary.encrypt(datas));
      },

      listenSystemParams:() => {
        socket.on("load_all_info",data => {
            observ_subjectParams.next(cryptLibrary.decrypt(data));
        })

        return observ_subjectParams;
      },

      test:(test => {
        return "test";
      }),

      notificationVoice:() => {

        try{
          const audio = new Audio(soundfile);
          audio.play();
        }catch(e){

        }

      },
      notificationVoiceR:() => {

        try{
          const audio = new Audio(soundfileNotif);
          audio.play();
        }catch(e){

        }

      },
      notificationVoiceA:() => {

        try{
          const audio = new Audio(soundfileAccept);
          audio.play();
        }catch(e){

        }

      },
      notificationVoiceReject:() => {

        try{
          const audio = new Audio(soundfileReject);
          audio.play();
        }catch(e){

        }

      },

      checkNotificationsMessages:async () => {
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

      subscribeToWebFirebaseToken:(token) => {
        var data = {
          email:config.getUserEmail(),
          deviceid:config.getdeviceid(),
          token:token,
          topicName:"people"
        }

        socket.emit("subscribeToTopic",cryptLibrary.encrypt(data));
      },
      listenSubscribeToWebFirebaseToken:(token) => {
        socket.on("subscribeToTopic",data => {
            observ_subjectFirebase.next(cryptLibrary.decrypt(data));
        })

        return observ_subjectFirebase;
      },

      saveWebFirebaseToken:(token) => {
        var data = {
          email:config.getUserEmail(),
          deviceid:config.getdeviceid(),
          token:token
        }

        socket.emit("setWebFirebaseToken",cryptLibrary.encrypt(data));
      },
      listensaveWebFirebaseToken:(token) => {
        socket.on("setWebFirebaseToken",data => {
            observ_saveTokenFirebase.next(cryptLibrary.decrypt(data));
        })

        return observ_saveTokenFirebase;
      },


      listenFirebaseToken:() => {
        Observable.subscribeByTimer_10_second().subscribe(data => {
          //check just token
          var checkToken = localStorage.getItem("listenfirebaseToken");
          var storageToken = localStorage.getItem("firebaseToken");

          if(checkToken){
              if(checkToken == "1"){
                var emailStatus = config.getUserEmail();
                if(emailStatus !== false){
                  homeservice.saveWebFirebaseToken(storageToken);
                  homeservice.subscribeToWebFirebaseToken(storageToken);
                  localStorage.setItem("listenfirebaseToken","0");
                }

              }
          }
          //check just token
          //listen web firebase token


          var nativeTokenActive = localStorage.getItem("saveNativeFirebaseTokenActive");
          if(nativeTokenActive){
            var SavedNativeToken = localStorage.getItem("saveNativeFirebaseToken");
            if(SavedNativeToken){
              var emailStatus = config.getUserEmail();
              if(emailStatus !== false){
                homeservice.saveNativeFirebaseToken(SavedNativeToken);
                homeservice.subscribeToWebFirebaseToken(SavedNativeToken);
                localStorage.setItem("saveNativeFirebaseTokenActive","0");
              }else{
                //send to temp user storage
                homeservice.SaveTemporaryFirebaseToken(SavedNativeToken);
                homeservice.subscribeToWebFirebaseToken(SavedNativeToken);
              }
            }
          }
          //listen web firebase token

        });
      },

      saveNativeFirebaseToken:(token) => {
        var data = {
          email:config.getUserEmail(),
          deviceid:config.getdeviceid(),
          token:token
        }

        socket.emit("setFirebaseToken",cryptLibrary.encrypt(data));
      },
      listensaveNativeFirebaseToken:() => {
        socket.on("setFirebaseToken",data => {
            observ_saveNativeTokenFirebase.next(cryptLibrary.decrypt(data));
        })

        return observ_saveNativeTokenFirebase;
      },


      SaveTemporaryFirebaseToken:(token) => {

        var data = {
          deviceid:config.getdeviceid(),
          token:token
        }

        socket.emit("setTemporaryToken",cryptLibrary.encrypt(data));

      },

      listenTemporaryFirebaseToken:() => {
        socket.on("setTemporaryToken",data => {
            observ_saveTemporaryToken.next(cryptLibrary.decrypt(data));
        })

        return observ_saveTemporaryToken;
      },
//xx

      CheckAllBanVideos:() => {

        var data = {
          deviceid:config.getdeviceid(),
          email:config.getUserEmail(),
        }

        socket.emit("checkAllBannedvideo",cryptLibrary.encrypt(data));

      },

      listenCheckAllBanVideos:() => {
        socket.on("checkAllBannedvideo",data => {
            observ_saveAllBan.next(cryptLibrary.decrypt(data));
        })

        return observ_saveAllBan;
      },


      async_function: async function(){ //a function that returns a promise

          return new Promise(function(resolve,reject){
            resolve("async");
          });

        },


      without_async: function(){ //a function that returns a promise

          return new Promise(function(resolve,reject){
            resolve("async");
          });

        },

      }


export default homeservice;
//export socket;
