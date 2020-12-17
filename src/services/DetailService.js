import React,{useState, useEffect} from 'react';
import { Observable, of,interval, Subject } from 'rxjs';
import socket from '../config/socket.js';
import config from '../config/config.js';
import cryptLibrary from '../helpers/CryptLibrary';

const observ_subject = new Subject();

const detailservice = {

      getDetailData:(data) => {
        var datas = {
          "deviceid":config.getdeviceid(),
          "email":config.getUserEmail(),
          "role":config.getUserRole(),
          "data":data
        }

        var encryptedData = cryptLibrary.encrypt(datas);

        socket.emit("checkvideo",encryptedData);
      },

      listenDetailData:() => {
        socket.on("checkvideo",(data) => {
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


export default detailservice;
