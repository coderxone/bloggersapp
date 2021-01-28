import { interval, Subject } from 'rxjs';

const observ_subject = new Subject();

const observ_f = {

      sendData_subject: data => {
        return observ_subject.next(data);
      },

      getData_subject:() => {
        return observ_subject;
      },

      subscribeByTimer_10_second:() => {

        const timer10second = interval(10000);

        return timer10second;
      },

      subscribeByTimer_2_second:() => {

        const timer2000second = interval(2000);

        return timer2000second;
      },

      subscribeByTimer_4_second:() => {

        const timer4000second = interval(4000);

        return timer4000second;
      },

      test:(test => {
        return "test";
      }),

      async_function: async function(){ //a function that returns a promise

          return new Promise(function(resolve,reject){
            resolve("async");
          })


        },

      without_async: function(){ //a function that returns a promise

          return new Promise(function(resolve,reject){
            resolve("async");
          })


        },

      }

export default observ_f;
