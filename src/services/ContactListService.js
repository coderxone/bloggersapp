import React,{useState, useEffect} from 'react';
import { Subject } from 'rxjs';
import socket from '../config/socket.js';
import config from '../config/config.js';
import cryptLibrary from '../helpers/CryptLibrary';
const observ_subject = new Subject();
const observ_subject2 = new Subject();
const timer10s = new Subject();

const ConstactListService = {

          getContactData:(comingData) => {


            var data = {
              "deviceid":config.getdeviceid(),
              "email":config.getUserEmail()
            }

            console.log(data);

            var encryptedData = cryptLibrary.encrypt(data);

            socket.emit("getAllContactsMessages",encryptedData);
          },

          listenContactData:() => {
            socket.on("getAllContactsMessages",(data) => {
                //console.log(data);
                observ_subject.next(cryptLibrary.decrypt(data));
            });

            return observ_subject;
          },



      }


export default ConstactListService;
