import { Subject } from 'rxjs';
import socket from '../../config/socket.js';
import config from '../../config/config.js';
import cryptLibrary from '../../helpers/CryptLibrary';
const axios = require('axios');
const fs = require('fs');

const observ_subject = new Subject();

const videoHashChecker = {

      keepRecord:(fileName,content) => {
        fs.writeFile('./services/VideoHashChecker/logs/' + fileName, JSON.stringify(content),{ flag: 'w+' }, err => {
          if (err) {
            console.error(err)
            return
          }
          //file written successfully
          })
      },

      readRecord:((fileName) => {
          const fs = require('fs')

            fs.readFile('./services/VideoHashChecker/logs/' + fileName, 'utf8' , (err, data) => {
              if (err) {
                console.error(err)
                return
              }

              let found = data.indexOf("ix6czkEiP36JfWnLFhMomQ");

              console.log(data.indexOf("ix6czkEiP36JfWnLFhMomQ"))
              //https://echohub.io/follow/ix6czkEiP36JfWnLFhMomQ

              if(found >= 0){
                console.log(found)
              }else{
                console.log("link not found")
              }


            })
        }),


        trackVideo:(url) => {

          return new Promise(resolve => {
              axios.get(url)
              .then(function (response) {

                if(response.status === 200){
                  videoHashChecker.keepRecord("track.json",{response:response.data});
                  videoHashChecker.readRecord("track.json");
                  resolve(true);
                }else{
                  resolve(false);
                }

              })
              .catch(function (error) {
                // handle error

              })
              .then(function () {
                // always executed
              });
          });

        },



      }


export default videoHashChecker;
