import React,{useState, useEffect} from 'react';
import { Observable, of,interval, Subject } from 'rxjs';
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
          "sendemail":data.email
        }

        socket.emit("sendmail",cryptLibrary.encrypt(datas));
      },

      listenApplyData:() => {
        socket.on("sendmail",data => {
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
