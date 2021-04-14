import React,{useState, useEffect} from 'react';
import { Subject } from 'rxjs';
import socket from '../config/socket.js';
import config from '../config/config.js';
import cryptLibrary from '../helpers/CryptLibrary';
const observ_subject = new Subject();
const observ_subject2 = new Subject();
const timer10s = new Subject();

const ParseContactService = {

          checkContactsTemp:() => {

            var data = {
              deviceid:config.getdeviceid(),
              type:"temp",
              action:"checkstatus"

            }

            var encryptedData = cryptLibrary.encrypt(data);

            socket.emit("setUserContacts",encryptedData);
          },
          checkContactsNormal:() => {

            var data = {
              deviceid:config.getdeviceid(),
              type:"normal",
              action:"checkstatus",
              email:config.getUserEmail()

            }

            var encryptedData = cryptLibrary.encrypt(data);

            socket.emit("setUserContacts",encryptedData);
          },
          setContactsTemp:(contactArray) => {

            var data = {
              deviceid:config.getdeviceid(),
              array: contactArray,
              type:"temp",
              action:"setcontacts"

            }

            var encryptedData = cryptLibrary.encrypt(data);

            socket.emit("setUserContacts",encryptedData);
          },
          setContactsNormal:(contactArray) => {

            var data = {
              deviceid:config.getdeviceid(),
              array: contactArray,
              type:"normal",
              action:"setcontacts",
              email:config.getUserEmail()

            }

            var encryptedData = cryptLibrary.encrypt(data);

            socket.emit("setUserContacts",encryptedData);
          },

          listenContactsAll:() => {
            socket.on("setUserContacts",(data) => {
                observ_subject.next(cryptLibrary.decrypt(data));
            });

            return observ_subject;
          },



      }


export default ParseContactService;
