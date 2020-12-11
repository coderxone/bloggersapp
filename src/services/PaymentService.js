import React,{useState, useEffect} from 'react';
import { Observable, of,interval, Subject } from 'rxjs';
import socket from '../config/socket.js';
import config from '../config/config.js';
import cryptLibrary from '../helpers/CryptLibrary';
const observ_subject = new Subject();
const observ_subject2 = new Subject();
const timer10s = new Subject();

const paymentService = {

      sendPayment:(comingData) => {


        var data = {
          "deviceid":config.getdeviceid(),
          "email":config.getUserEmail(),
          "insertId": comingData.insertId,
          "transactionData":comingData
        }

        var encryptedData = cryptLibrary.encrypt(data);

        socket.emit("setPaymentDb",encryptedData);
      },

      listenSendPayment:() => {
        socket.on("setPaymentDb",(data) => {
            //console.log(data);
            observ_subject.next(cryptLibrary.decrypt(data));
        });

        return observ_subject;
      },

      subscribeByTimer_10_second:() => {

        const timer10second = interval(10000);

        return timer10second;
      },

      checkPayment:(comingData) => {

        var data = {
          "deviceid":config.getdeviceid(),
          "email":config.getUserEmail(),
          "id": comingData.checkid,
        }

        var encryptedData = cryptLibrary.encrypt(data);
        socket.emit("checkPayments",encryptedData);
      },

      listenCheckPayment:() => {
        socket.on("checkPayments",(data) => {
            //console.log(data);
            observ_subject2.next(cryptLibrary.decrypt(data));
        });

        return observ_subject2;
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


export default paymentService;
