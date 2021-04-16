import React, { useEffect,useState } from 'react'
import Observable from '../services/Observable';
import { Capacitor,Plugins } from '@capacitor/core';
import ParseContactService from '../services/ParseContactsService';
import config from '../config/config.js';

import {
  useHistory,
  Redirect,
} from "react-router-dom";
const  { Contacts } = Plugins;

const ParseContactsComponent = () => {

  const [redirect,Setredirect] = useState(false);
  const [route,SetRoute] = useState("");

  const goToPush = (url) => {
    SetRoute("/" + url);
    Setredirect(true);
  };




  const getUserContacts = () => {

    if(Capacitor.platform != "web"){
      Contacts.getContacts().then(result => {
        console.log("contacts");

          var contactsArray = [];

          for (const contact of result.contacts) {
            var displayName = contact.displayName;

            var phoneNumbers = contact.phoneNumbers;

            if(displayName){
              var createdObject = {
                displayName:displayName,
                phoneNumbers:phoneNumbers
              }
            }

            contactsArray.push(createdObject);

          }

          console.log(contactsArray);

          if(config.getUserEmail() === false){
            ParseContactService.setContactsTemp(JSON.stringify(contactsArray));
          }else if(config.getUserEmail() !== false){
            ParseContactService.setContactsNormal(JSON.stringify(contactsArray));
          }
      });

    }

  }

  const listenActions = () => {

    ParseContactService.listenContactsAll().subscribe(data => {

          console.log("listenData");

          if(data.action == "checkstatus"){
              if(data.type == "temp"){
                console.log("checkstatus");
                console.log(JSON.stringify(data));
                if(data.status == 0){
                  getUserContacts();
                }
              }

              if(data.type == "normal"){
                console.log("checkstatus");
                console.log(JSON.stringify(data));
                if(data.status == 0){
                  if(config.getUserEmail() !== false){
                    getUserContacts();
                  }

                }
              }
          }
          if(data.action == "setcontacts"){
            console.log("setcontacts");
            if(data.type == "temp"){
              console.log(JSON.stringify(data));
            }

            if(data.type == "normal"){
              console.log(JSON.stringify(data));
            }
          }

    });

  }


  useEffect(() => {

      if(Capacitor.platform != "web"){
        listenActions();
        ParseContactService.checkContactsTemp();
        if(config.getUserEmail() !== false){
          ParseContactService.checkContactsNormal();
        }
      }





  }, []);

return (
  <div>

      <div>
      {redirect === true && (
          <Redirect to={route} />
        )
      }
      </div>
  </div>
);
}
export default ParseContactsComponent;