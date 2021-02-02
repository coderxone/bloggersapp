import { Subject } from 'rxjs';
import socket from '../config/socket.js';
import config from '../config/config.js';
import cryptLibrary from '../helpers/CryptLibrary';


const observ_subject = new Subject();
// const timer10s$ = new Subject<any>();
// const timer60s = new Subject<any>();
// const timer300000s$ = new Subject<any>();


function initSocket(){

        socket.on('connect',function () {
            console.log('connected to server');
          });
        socket.on('disconnect',function(){
          console.log('disconnected from server');
        });

      }


 function reConnect(){

 }

const homeservice = {

      initialConnect:() => {
        initSocket();
        reConnect();
        config.setDeviceid();
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

        // amount: 1200
        // coord: "{"title":"1240 Monument Blvd, Concord, CA 94520, USA","geometry":{"lat":37.9485947,"lng":-122.049748},"name":"1240 Monument Blvd, Concord, CA 94520, USA","fullData":[{"long_name":"1240","short_name":"1240","types":["street_number"]},{"long_name":"Monument Boulevard","short_name":"Monument Blvd","types":["route"]},{"long_name":"Concord","short_name":"Concord","types":["locality","political"]},{"long_name":"Contra Costa County","short_name":"Contra Costa County","types":["administrative_area_level_2","political"]},{"long_name":"California","short_name":"CA","types":["administrative_area_level_1","political"]},{"long_name":"United States","short_name":"US","types":["country","political"]},{"long_name":"94520","short_name":"94520","types":["postal_code"]}]}"
        // date: "12/04/2020"
        // description: "sdsdsds sdsds"
        // time: "04:11 PM"
        // title: "sdsdsds sdsds"

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
