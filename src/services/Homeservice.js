import React,{useState, useEffect} from 'react';
import { Observable, of,interval, Subject } from 'rxjs';
import socket from '../config/socket.js';
import config from '../config/config.js';


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

        // useEffect(() => {
        //   // Update the document title using the browser API
        //   useState([{ io: socket }])
        // });

      }


 function reConnect(){

 }

const homeservice = {

      initialConnect:() => {
        initSocket();
        reConnect();
        config.setDeviceid();

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


export default homeservice;
//export socket;
