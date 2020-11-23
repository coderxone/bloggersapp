import React,{useState, useEffect} from 'react';
import { Observable, of,interval, Subject } from 'rxjs';
import socket from '../config/socket.js';


const authService = {

      initialConnect:() => {


      },

      getDataAds:() => {

        socket.on('homeStart', (data) => {
           observ_subject.next(data);
        });

        const deviceid = config.getdeviceid();
        socket.emit('homeStart', {deviceid:deviceid});

        return observ_subject;

      },

      sendData_subject: data => {

        // var datas = {
        //   "deviceid":this.homeservice.deviceid,
        //   "email":data.email,
        //   "name":data.name,
        //   "password":data.password
        // }
        //
        //
        // this.socket.emit("setRegistration",datas);
        //
        // var data = {
        //   "deviceid":this.homeservice.deviceid,
        //   "email":datas.email,
        //   "password":datas.password
        // }
        //
        // this.socket.emit("setLogin",data);

        return observ_subject.next(data);
      },

      getData_subject:() => {
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


export default authService;
