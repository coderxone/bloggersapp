import React,{useState, useEffect} from 'react';
import { Observable, of,interval, Subject } from 'rxjs';
import socket from '../config/socket.js';
import config from '../config/config.js';
import cryptLibrary from '../helpers/CryptLibrary';
const observ_subject = new Subject();


const newService = {

          updateUsersData:(data) => {

            var data = {
              "deviceid":config.getdeviceid(),
              "email":config.getUserEmail(),
              "data":data
            }

            var encryptedData = cryptLibrary.encrypt(data);
            socket.emit("updateUserData",encryptedData);

          },

          listenUpdateUsersData:() => {
            socket.on("updateUserData",(data) => {
                //console.log(data);
                observ_subject.next(cryptLibrary.decrypt(data));
            });
            return observ_subject;
          },

      }


export default newService;
