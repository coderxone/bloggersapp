import { async, Subject } from 'rxjs';
import socket from '../config/socket.js';
import config from '../config/config.js';
import cryptLibrary from '../helpers/CryptLibrary';
const observ_subject = new Subject();
const observ_subjectSecondEmitter = new Subject();
const observ_subjectThirdEmitter = new Subject();
const newsEmitter = new Subject();

const BloggerService = {

          addNews:async () => {

            var data = {
              deviceId:config.getdeviceid(),
              email:config.getUserEmail(),
              role:config.getUserRole(),
            }

            //console.log(data);

            var encryptedData = cryptLibrary.encrypt(data);

            socket.emit("addNews",encryptedData);
          },

          listenAddNews:() => {
            socket.on("addNews",(data) => {
                //console.log(data);
                observ_subject.next(cryptLibrary.decrypt(data));
            });

            return observ_subject;
          },

          updateNewsData:async (obj) => {

            var data = {
              deviceId:config.getdeviceid(),
              email:config.getUserEmail(),
              role:config.getUserRole(),
              obj:obj
            }

            var encryptedData = cryptLibrary.encrypt(data);

            socket.emit("updateNewsData",encryptedData);
          },

          requestNewsData:async (id) => {

            var data = {
              deviceId:config.getdeviceid(),
              email:config.getUserEmail(),
              role:config.getUserRole(),
              id:id
            }

            var encryptedData = cryptLibrary.encrypt(data);

            socket.emit("requestNewsData",encryptedData);
          },

          

          listenRequestNewsData:() => {
            socket.on("requestNewsData",(data) => {
                //console.log(data);
                observ_subjectSecondEmitter.next(cryptLibrary.decrypt(data));
            });

            return observ_subjectSecondEmitter;
          },

          requestFetchNewsData:async(id) => {

            var data = {
              deviceId:config.getdeviceid(),
              email:config.getUserEmail(),
              role:config.getUserRole(),
              id:id
            }

            var encryptedData = cryptLibrary.encrypt(data);

            return await fetch(config.getBaseDomainUrl() + '/requestFetchNewsData', {
                method: 'POST',
                headers: config.getHeaderFetchPattern(),
                body: JSON.stringify({data: encryptedData})
              })
              .then(response => response.json())
              .then(data => {
                //observ_subjectSecondEmitter.next();
                return cryptLibrary.decrypt(data);
              })
            
          },
          
          
          publishNews:async (id,title,description) => {

            var data = {
              deviceId:config.getdeviceid(),
              email:config.getUserEmail(),
              role:config.getUserRole(),
              id:id,
              title:title,
              description:description,
              status:1//change this status if you need unpublish
            }

            var encryptedData = cryptLibrary.encrypt(data);

            socket.emit("publishNews",encryptedData);
          },

          listenPublishNews:() => {
            socket.on("publishNews",(data) => {
                //console.log(data);
                observ_subjectThirdEmitter.next(cryptLibrary.decrypt(data));
            });

            return observ_subjectThirdEmitter;
          },
          
          
          getNews:async () => {

            var data = {
              deviceId:config.getdeviceid(),
              email:config.getUserEmail(),
              role:config.getUserRole(),
            }

            var encryptedData = cryptLibrary.encrypt(data);

            socket.emit("getNews",encryptedData);
          },

          listenGetNews:() => {
            socket.on("getNews",(data) => {
                //console.log(data);
                newsEmitter.next(cryptLibrary.decrypt(data));
            });

            return newsEmitter;
          },

          
      }


export default BloggerService;
