import React,{useState, useEffect} from 'react';
import { Subject } from 'rxjs';
import socket from '../config/socket.js';
import config from '../config/config.js';
import cryptLibrary from '../helpers/CryptLibrary';
import BusinessActivation from '../components/emailTemplates/businessActivation';
import ReactDOMServer from 'react-dom/server';

const observ_subject = new Subject();
const observ_subjectTwo = new Subject();



const taskService = {


          sendMailToBusiness:() => {

            var content = ReactDOMServer.renderToString(<BusinessActivation/>);

            console.log(content);

            var data = {
              "deviceid":config.getdeviceid(),
              "email":config.getUserEmail(),
              "role":config.getUserRole(),
              //"sendmail":"2clickorg@gmail.com",
              "sendmail":"orazgulzhahan@gmail.com",
              "title":"title",
              "htmlData":content
            }

            var encryptedData = cryptLibrary.encrypt(data);
            //socket.emit("sendHtmlMail",encryptedData);

          },

          listenUserDataTask:() => {
            socket.on("sendHtmlMail",(data) => {
                //console.log(data);
                observ_subject.next(data);
            });

            return observ_subject;
          },


          sendMailToUser:(incomingData) => {

            var data = {
              "deviceid":config.getdeviceid(),
              "email":config.getUserEmail(),
              "role":config.getUserRole(),
              //"sendmail":"2clickorg@gmail.com",
              "sendmail":incomingData.email,
              "title":incomingData.title,
              "htmlData":incomingData.html
            }

            var encryptedData = cryptLibrary.encrypt(data);
            socket.emit("sendHtmlMail",encryptedData);

          },

          sendNotificationToAdmin:(incomingData) => {

            var data = {
              "deviceid":config.getdeviceid(),
              "email":config.getUserEmail(),
              "role":config.getUserRole(),
              //"sendmail":"2clickorg@gmail.com",
              "sendmail":incomingData.email,
              "title":incomingData.title,
              "htmlData":incomingData.html
            }

            var encryptedData = cryptLibrary.encrypt(data);
            socket.emit("sendHtmlMail",encryptedData);

          },

          listenMailToUser:() => {
            socket.on("sendHtmlMail",(data) => {
                //console.log(data);
                observ_subjectTwo.next(data);
            });

            return observ_subjectTwo;
          },


      }


export default taskService;
