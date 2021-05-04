import React,{useState, useEffect} from 'react';
import { Subject } from 'rxjs';
import socket from '../config/socket.js';
import config from '../config/config.js';
import cryptLibrary from '../helpers/CryptLibrary';
import BusinessActivation from '../components/emailTemplates/businessActivation';
import ReactDOMServer from 'react-dom/server';
import { renderEmail } from 'react-html-email';
const observ_subject = new Subject();



const taskService = {


          sendMailToBusiness:() => {

            var content = ReactDOMServer.renderToString(<BusinessActivation/>);
            //var content = renderEmail(<BusinessActivation/>);

            console.log(content);

            var data = {
              "deviceid":config.getdeviceid(),
              "email":config.getUserEmail(),
              "role":config.getUserRole(),
              //"sendmail":"2clickorg@gmail.com",
              "sendmail":"orazgulzhahan@gmail.com",
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


      }


export default taskService;
