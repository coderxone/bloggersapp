import React,{useState, useEffect} from 'react';
import { Observable, of,interval, Subject } from 'rxjs';
import socket from '../config/socket.js';
import config from '../config/config.js';
import cryptLibrary from '../helpers/CryptLibrary';

const observ_subject = new Subject();

const authService = {

      getDataAds:() => {

        socket.on('homeStart', (data) => {
           observ_subject.next(data);
        });

        const deviceid = config.getdeviceid();
        socket.emit('homeStart', {deviceid:deviceid});

        return observ_subject;

      },

      sendAuthData: senddata => {
          //console.log(senddata);
          var datas = {
            "deviceid":config.getdeviceid(),
            "email":senddata.email,
            "password":senddata.password
          }
          var encryptedData = cryptLibrary.encrypt(datas);

          socket.emit("setRegistration",encryptedData);

      },

      getAuthData:() => {

        socket.on("setRegistration",(data) => {
            //console.log(data);
            observ_subject.next(cryptLibrary.decrypt(data));
        });

        return observ_subject;
      },

      sendRestorePassword:(data) => {
        var datas = {
          "deviceid":config.getdeviceid(),
          "email":data.email
        }

        var encryptedData = cryptLibrary.encrypt(datas);

        socket.emit("setRestorePassword",encryptedData);
      },

      getRestorePassword:() => {
        socket.on("setRestorePassword",(data) => {
            //console.log(data);
            observ_subject.next(cryptLibrary.decrypt(data));
        });

        return observ_subject;
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


export default authService;
