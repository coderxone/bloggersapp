import CryptLibrary from '../config/config';
import CryptoJS from 'crypto-js';


const newmodule = {

      encrypt:function(data){
          //getCryptKey
          //var newdata = [data];
          // var data = [{id: 1}, {id: 2}];
          var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), CryptLibrary.getCryptKey()).toString();
          return ciphertext;
       },
       decrypt:function(data){

           var bytes = CryptoJS.AES.decrypt(data, CryptLibrary.getCryptKey());
           var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

           return decryptedData;

        },

}

export default newmodule;
