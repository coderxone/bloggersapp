import React,{useState, useEffect} from 'react';
import { Observable, of,interval, Subject } from 'rxjs';
import socket from '../config/socket.js';
import config from '../config/config.js';
import cryptLibrary from '../helpers/CryptLibrary';
const observ_subject = new Subject();
const observ_subject2 = new Subject();
const timer10s = new Subject();

const DetailTaskService = {

          generateUrl:(id) => {

            var data = {
              deviceid:config.getdeviceid(),
              email:config.getUserEmail(),
              id: id,
              status:"set" //check
            }

            console.log(data);

            var encryptedData = cryptLibrary.encrypt(data);

            socket.emit("makeHref",encryptedData);
          },

          listenGenerateUrl:() => {
            socket.on("makeHref",(data) => {
                //console.log(data);
                observ_subject.next(cryptLibrary.decrypt(data));
            });

            return observ_subject;
          },


          setUrl:(obj) => {

            var data = {
              deviceid:config.getdeviceid(),
              email:config.getUserEmail(),
              id: obj.id,
              videotype:obj.videotype,
              url:obj.url,
              status:obj.set //check
            }

            //console.log(data);

            var encryptedData = cryptLibrary.encrypt(data);

            socket.emit("setvideo",encryptedData);
          },

          listenSetUrl:() => {
            socket.on("setvideo",(data) => {
                //console.log(data);
                observ_subject2.next(cryptLibrary.decrypt(data));
            });

            return observ_subject2;
          },


          checkUrl:(obj) => {

            var data = {
              deviceid:config.getdeviceid(),
              email:config.getUserEmail(),
              id: obj.id,
              status:obj.set //check
            }

            //console.log(data);

            var encryptedData = cryptLibrary.encrypt(data);

            socket.emit("checkvideo",encryptedData);
          },

          listenCheckUrl:() => {
            socket.on("checkvideo",(data) => {
                //console.log(data);
                observ_subject2.next(cryptLibrary.decrypt(data));
            });

            return observ_subject2;
          },



      }


export default DetailTaskService;
