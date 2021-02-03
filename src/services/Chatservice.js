import React,{useState, useEffect} from 'react';
import { Observable, of,interval, Subject } from 'rxjs';
import socket from '../config/socket.js';
import config from '../config/config.js';
import cryptLibrary from '../helpers/CryptLibrary';
const observ_subject = new Subject();
const observ_subject2 = new Subject();
const timer10s = new Subject();

const profileService = {

          checkGetAllMessages:(data) => {

            var data = {
              "deviceid":config.getdeviceid(),
              "email":config.getUserEmail(),
              sendemail:data.currentEmail,
              projectId:data.projectId,
            }

            var encryptedData = cryptLibrary.encrypt(data);

            socket.emit("getAllMessages",encryptedData);
          },

          listenAllMessages:() => {
            socket.on("getAllMessages",(data) => {
                //console.log(data);
                observ_subject.next(cryptLibrary.decrypt(data));
            });

            return observ_subject;
          },


          readMessage:(data) => {

            var data = {
              "deviceid":config.getdeviceid(),
              "email":config.getUserEmail(),
              sendemail:data.currentEmail,
              projectId:data.projectId,
            }

            var encryptedData = cryptLibrary.encrypt(data);

            socket.emit("setReaded",encryptedData);
          },

          listenReadMessage:() => {
            socket.on("setReaded",(data) => {
                //console.log(data);
                observ_subject.next(cryptLibrary.decrypt(data));
            });

            return observ_subject;
          },


          sendMessage:(data) => {

            var data = {
              "deviceid":config.getdeviceid(),
              "email":config.getUserEmail(),
              sendemail:data.currentEmail,
              projectId:data.projectId,
            }

            var encryptedData = cryptLibrary.encrypt(data);

            socket.emit("Message",encryptedData);
          },

          listengetMessage:() => {
            socket.on("Message",(data) => {
                //console.log(data);
                observ_subject.next(cryptLibrary.decrypt(data));
            });

            return observ_subject;
          },



      }


export default profileService;
