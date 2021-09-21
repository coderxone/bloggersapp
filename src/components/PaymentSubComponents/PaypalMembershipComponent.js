import React, {useState,useEffect,useMemo,useRef} from 'react';
import { PayPalButton } from "react-paypal-button-v2";
// import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonItem, IonLabel, IonList, IonItemDivider } from '@ionic/react';
import '../../css/mainStyles.scss';
import LocalizeComponent from '../../localize/LocalizeComponent';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import config from '../../config/config';
import * as yup from "yup";
import {
  makeStyles,
} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { connect } from 'react-redux';
import PaymentService from '../../services/PaymentService';
import { increment, decrement,save_email } from '../../actions/actions';
import {
  Redirect,
  useHistory
} from "react-router-dom";


function mapStateToProps(state,ownProps) {
  return {
    count: state.count,
    email:state.email,
    password:state.password
  }
}

//const {regionsList: { data: list = [] } } = props;

const mapDispatchToProps = dispatch => ({
  increment,
  decrement,
  dispatch,
  save_email
});

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor:'#161730',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    backgroundColor:'#161730',
  },
}));



const schema = yup.object().shape({
  email: yup.string().required("Required").email(),
  password: yup.string().required('No password provided.')
  .min(6, LocalizeComponent.password_length)
  .matches(/^[A-Za-z0-9_]{6,}$/, 'Password should contain only letters and numbers.'),
});





const PaymentComponent = (props) => {

  const [redirect,Setredirect] = useState(false);
  const [route,SetRoute] = useState("");
  const paypalB = useRef(null);
  const history = useHistory();

  const ProductionClientId = "AW3Q8YTzK6AblOoFcJ9kCI5aXq51N_1KeJh-SgbQ3a28knHp8TmFE4JPy6lnzTv9pLZaYiaBDrWJMQ1-";
  //const DevelopmentClientId = "AWNN2lrrAjKYkq0AsXM656L_AoQuQuJFSFeuEXAOyHdyqCmlkaajVIpyKrInFxHfNrGzmzb9l8vnN_GN";
  const DevelopmentClientId = "AQBizLLv9gVfG0uMcTMIDHqXhbviVFaAAi-bhlPDJbOaSsaudsPjSf88-ac-czpp9AR-FsqFaZUoUuEw";

  const classes = useStyles();
  const { register, handleSubmit, errors,setError } = useForm({
    resolver: yupResolver(schema)
  });
  var obj = {
    count: 0,
    email:"",
    password:""
  };

  const amountSum = useMemo(() => {
      var amount = localStorage.getItem("amount");
      if(amount){
        return parseInt(amount);
      }else{
        return 300;
      }
  });

  const [count,setCount] = useState(0);
  const [storageData,setStorageData] = useState(obj);

  //props.dispatch(save_email(storageData));

  const onSubmit = ((data) => {
    //console.log(data);

  });



  useEffect(() => {

        const PaymentServiceSubscribe = PaymentService.listenSendPayment().subscribe(data => {
          console.log(data);
          if(data.status == "ok"){

            history.goBack();

          }
        });

        const subscribeByTimer_10_second = PaymentService.subscribeByTimer_10_second().subscribe(data => {
          //console.log(data);
          var checkid = localStorage.getItem("insertId");

          var checkobj = {
            "checkid":checkid,
            "type":"subscription"
          }
          PaymentService.checkPayment(checkobj);
        });

        const listenCheckPayment = PaymentService.listenCheckPayment().subscribe(data => {
          //console.log(data);

          if(data.status == "false"){

          }else if(data.status == "ok"){

            history.goBack();
            // var promotion = localStorage.getItem("promotion");
            // if(promotion){
            //   SetRoute("/chooseway");
            //   Setredirect(true);
            // }else{
            //   SetRoute("/business");
            //   Setredirect(true);
            // }
          }

          // SetRoute("/business");
          // Setredirect(true);
          // if(data.data[0].dateVerified == true){
          //   console.log("date verified");
          // }
        });
        // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
        //unsibscribe
        return () => {
            PaymentServiceSubscribe.unsubscribe();
            subscribeByTimer_10_second.unsubscribe();
            listenCheckPayment.unsubscribe();
        }
        //unsibscribe

    },[]);


    const paypalSubscribe = (data, actions) => {

          return actions.subscription.create({
            /* Creates the subscription */
            plan_id: 'P-41442501Y1533215YME6FZJY',
          });
      };


  return (

    <Grid container >


      <div className="payTitle">
        <div className="payText">
            {LocalizeComponent.choose_payment}
        </div>
      </div>


        <div className="payPalDiv projectMarginTopDescription">
                <PayPalButton
                  amount={amountSum}
                  vault={true}
                  createSubscription={paypalSubscribe}
                  onApprove={(details, data) => {


                        let email = config.getUserItemName("email");



                      if(data.paymentID == null){
                        data.paymentID = 999;
                      }

                      var insertId = localStorage.getItem("insertId");
                      var billingToken = details.billingToken;
                      var facilitatorAccessToken = details.facilitatorAccessToken;
                      var orderID = details.orderID;
                      var paymentID = data.paymentID;
                      var subscriptionID = details.subscriptionID;
                      var amount = 100;

                      var sendObject = {
                        "insertId":insertId,
                        "billingToken":billingToken,
                        "facilitatorAccessToken":facilitatorAccessToken,
                        "orderID":orderID,
                        "paymentID":paymentID,
                        "subscriptionID":subscriptionID,
                        "email":email,
                        "amount":amount,
                        "type":"subscription"
                      }

                      PaymentService.sendPayment(sendObject);

                    }}


                  options={{
                      clientId: DevelopmentClientId,
                      currency:"USD",
                      vault:true,
                      intent:"subscription"

                    }}

                  style={{
                    shape: 'rect',
                    color: 'blue',
                    layout: 'vertical',
                    label: 'subscribe'
                  }}
                  />
          </div>



      {redirect === false ? (
        <Box>

        </Box>
       ) : (
         <Redirect to={route} />
       )}

      </Grid>




  );
};


 export default connect(mapStateToProps,mapDispatchToProps)(PaymentComponent);
