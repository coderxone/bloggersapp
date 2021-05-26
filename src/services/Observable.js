import { interval, Subject } from 'rxjs';

const observ_subject = new Subject();
const observ_subjectM = new Subject();
const observ_subjectD = new Subject();
const observ_subjectEdit = new Subject();
const observ_subjectRoute = new Subject();
const observ_subjectAny = new Subject();
const observ_Reject = new Subject();
const observ_RejectMob = new Subject();
const observ_RejectTimOut = new Subject();
const observ_Lang = new Subject();


const observ_f = {

      sendData_subject: data => {
        return observ_subject.next(data);
      },

      getData_subject:() => {
        return observ_subject;
      },
      sendData_subjectMob: data => {
        return observ_RejectMob.next(data);
      },

      getData_subjectLang:() => {
        return observ_Lang;
      },
      sendData_subjectLang: data => {
        return observ_Lang.next(data);
      },

      getData_subjectMob:() => {
        return observ_RejectMob;
      },

      reject_subject: data => {
        return observ_Reject.next(data);
      },

      getReject_subject:() => {
        return observ_Reject;
      },

      sendData_subjectDilog: data => {
        return observ_subjectD.next(data);
      },

      getData_subjectDialog:() => {
        return observ_subjectD;
      },
      sendRoute: data => {
        return observ_subjectRoute.next(data);
      },

      getRoute:() => {
        return observ_subjectRoute;
      },
      sendAny: data => {
        return observ_subjectAny.next(data);
      },

      getAny:() => {
        return observ_subjectAny;
      },


      sendData_subject_M: data => {
        return observ_subjectM.next(data);
      },

      getData_subject_M:() => {
        return observ_subjectM;
      },
      sendData_subject_Edit: data => {
        return observ_subjectEdit.next(data);
      },

      getData_subject_Edit:() => {
        return observ_subjectEdit;
      },

      subscribeByTimer_10_second:() => {

        const timer10second = interval(10000);

        return timer10second;
      },
      subscribeByTimer_15_second:() => {

        const timer15second = interval(15000);

        return timer15second;
      },
      subscribeByTimer_30_second:() => {

        const timer30second = interval(30000);

        return timer30second;
      },

      subscribeByTimer_1_second:() => {

        const timer1000second = interval(1000);

        return timer1000second;
      },

      subscribeByTimer_2_second:() => {

        const timer2000second = interval(2000);

        return timer2000second;
      },

      subscribeByTimer_4_second:() => {

        const timer4000second = interval(4000);

        return timer4000second;
      },
      subscribeByTimer_5_second:() => {

        const timer5000second = interval(5000);

        return timer5000second;
      },
      subscribeByTimer_5_min:() => {

        const timer5000min = interval(300000);

        return timer5000min;
      },

      // listenerByTimeOut_sec:() => {
      //
      //   Observable.of(true).pipe(
      //       delay(3000),
      //       tap(() => {
      //           observ_RejectTimOut.next("3s");
      //       }),
      //       // delay(6000),
      //       // tap(() => {
      //       //     observ_RejectTimOut.next("6s");
      //       // })
      //   );
      //
      //   return observ_RejectTimOut;
      // },




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
