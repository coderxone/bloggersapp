import React,{useState, useEffect} from 'react';
import { Subject } from 'rxjs';
import socket from '../config/socket.js';
import config from '../config/config.js';
import cryptLibrary from '../helpers/CryptLibrary';
const observ_subject = new Subject();
const observ_subject2 = new Subject();
const timer10s = new Subject();

const redirectService = {

          setViews:(comingData) => {


            var data = {
              "deviceid":config.getdeviceid(),
              "email":config.getUserEmail(),
              "ip": comingData.ip,
              "hash": comingData.hash,
            }

            var encryptedData = cryptLibrary.encrypt(data);

            socket.emit("setviews",encryptedData);
          },

          getViews:() => {
            socket.on("setviews",(data) => {
                //console.log(data);
                observ_subject2.next(cryptLibrary.decrypt(data));
            });

            return observ_subject2;
          },

          getIpAddress:() => {
            fetch('https://api.ipify.org?format=json')
              .then(response => response.json())
              .then(data =>  observ_subject.next(data.ip));

              return observ_subject;
          },



      }


export default redirectService;
