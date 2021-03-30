import React,{useState, useEffect} from 'react';
import { Subject } from 'rxjs';
import socket from '../config/socket.js';
import config from '../config/config.js';
import cryptLibrary from '../helpers/CryptLibrary';
const observ_subject = new Subject();
const observ_subject2 = new Subject();
const timer10s = new Subject();

const profileService = {

          getAdminData:(comingData) => {


            var data = {
              "deviceid":config.getdeviceid(),
              "email":config.getUserEmail(),
            }

            //console.log(data);

            var encryptedData = cryptLibrary.encrypt(data);

            socket.emit("getAdminData",encryptedData);
          },

          listenAdminData:() => {
            socket.on("getAdminData",(data) => {
                //console.log(data);
                observ_subject.next(cryptLibrary.decrypt(data));
            });

            return observ_subject;
          },

          ApproveUser:(id,action) => {

            var data = {
              "deviceid":config.getdeviceid(),
              "email":config.getUserEmail(),
              "id":id,
              "action":action
            }

            console.log(data);

            var encryptedData = cryptLibrary.encrypt(data);

            socket.emit("ApproveUser",encryptedData);
          },

          listenApproveUser:() => {
            socket.on("ApproveUser",(data) => {
                //console.log(data);
                observ_subject2.next(cryptLibrary.decrypt(data));
            });

            return observ_subject2;
          },



      }


export default profileService;
