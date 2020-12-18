import React,{useState, useEffect} from 'react';
import { Observable, of,interval, Subject } from 'rxjs';
import socket from '../config/socket.js';
import config from '../config/config.js';
import cryptLibrary from '../helpers/CryptLibrary';

const observ_subject = new Subject();
const observ_subjecttwo = new Subject();
const observ_subjectthree = new Subject();
const observ_subjectfour = new Subject();

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


      getDetailApprovedData:(data) => {
        var datas = {
          "deviceid":config.getdeviceid(),
          "email":config.getUserEmail(),
          "role":config.getUserRole(),
          "data":data
        }

        var encryptedData = cryptLibrary.encrypt(datas);

        socket.emit("checkvideoApproved",encryptedData);
      },

      listenDetailApprovedData:() => {
        socket.on("checkvideoApproved",(data) => {
            //console.log(data);
            observ_subjectthree.next(cryptLibrary.decrypt(data));
        });
        return observ_subjectthree;
      },

      setApprove:(id) => {
        var datas = {
          "deviceid":config.getdeviceid(),
          "email":config.getUserEmail(),
          "role":config.getUserRole(),
          "id":id
        }

        var encryptedData = cryptLibrary.encrypt(datas);


        socket.emit("setApprove",encryptedData);
      },

      listenApprove:() => {
        socket.on("setApprove",(data) => {
            //console.log(data);
            observ_subjecttwo.next(cryptLibrary.decrypt(data));
        });

        return observ_subjecttwo;
      },

      getviews:(data) => {
        var datas = {
          "deviceid":config.getdeviceid(),
          "email":config.getUserEmail(),
          "role":config.getUserRole(),
          "project_id":data.project_id
        }

        var encryptedData = cryptLibrary.encrypt(datas);

        socket.emit("checkviews",encryptedData);
      },

      listenViews:() => {
        socket.on("checkviews",(data) => {
            //console.log(data);
            observ_subjectfour.next(cryptLibrary.decrypt(data));
        });

        return observ_subjectfour;
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
