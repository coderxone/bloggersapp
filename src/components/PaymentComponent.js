import React, {useState,useEffect} from 'react';
import { PayPalButton } from "react-paypal-button-v2";
// import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonItem, IonLabel, IonList, IonItemDivider } from '@ionic/react';
import '../css/mainStyles.css';
import LocalizeComponent from '../localize/LocalizeComponent';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import {
  makeStyles,
} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { connect } from 'react-redux';
import PaymentService from '../services/PaymentService';
import { increment, decrement,save_email } from '../actions/actions';
import {
  Redirect
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

  const classes = useStyles();
  const { register, handleSubmit, errors,setError } = useForm({
    resolver: yupResolver(schema)
  });
  var obj = {
    count: 0,
    email:"",
    password:""
  };

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
            SetRoute("/business");
            Setredirect(true);
          }
        });

        const subscribeByTimer_10_second = PaymentService.subscribeByTimer_10_second().subscribe(data => {
          console.log(data);
          var checkid = localStorage.getItem("insertId");

          var checkobj = {
            "checkid":checkid
          }
          PaymentService.checkPayment(checkobj);
        });

        const listenCheckPayment = PaymentService.listenCheckPayment().subscribe(data => {
          console.log(data);

          if(data.status == "false"){

          }else if(data.status == "ok"){
            SetRoute("/business");
            Setredirect(true);
          }

          // SetRoute("/business");
          // Setredirect(true);
          // if(data.data[0].dateVerified == true){
          //   console.log("date verified");
          // }
        });

        //unsibscribe
        return () => {
            PaymentServiceSubscribe.unsubscribe();
            subscribeByTimer_10_second.unsubscribe();
            listenCheckPayment.unsubscribe();
        }
        //unsibscribe

    },[]);


  return (

   	<div className={classes.root}>
        <Grid container >


          <Grid item xs={12} >
            <Paper  className={classes.paper}>

              <Box mt={10} className="mainCentralDiv">
                  {LocalizeComponent.choose_payment}
              </Box>

            </Paper>
          </Grid>

          <Grid item xs={12} >
            <Paper  className={classes.paper}>

              <Box mt={1} className="mainCentralDiv">
              <PayPalButton
                    amount="0.01"
                    // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
                    onSuccess={(details, data) => {

                       console.log(details);
                      // console.log("-----------");
                       console.log(data);
                      // console.log("-----------");
                      // console.log("Transaction completed by " + details.payer.name.given_name);

                      var insertId = localStorage.getItem("insertId");
                      var transactionId = details.id;
                      var orderId = data.orderID;
                      var payerID = data.payerID;
                      var payerEmail = details.payer.email_address;
                      var given_name = details.payer.name.given_name;
                      var surname = details.payer.name.surname;
                      var amount = details.purchase_units[0].amount.value;
                      var create_time = details.create_time;

                      //console.log(amount);

                      var sendObject = {
                        "insertId":insertId,
                        "transactionId":transactionId,
                        "orderId":orderId,
                        "payerID":payerID,
                        "payerEmail":payerEmail,
                        "given_name":given_name,
                        "surname":surname,
                        "amount":amount,
                        "create_time":create_time
                      }

                      PaymentService.sendPayment(sendObject);


                      // OPTIONAL: Call your server to save the transaction
                      // return fetch("/paypal-transaction-complete", {
                      //   method: "post",
                      //   body: JSON.stringify({
                      //     orderID: data.orderID
                      //   })
                      // });
                    }}

                    options={{
                      clientId: "AWNN2lrrAjKYkq0AsXM656L_AoQuQuJFSFeuEXAOyHdyqCmlkaajVIpyKrInFxHfNrGzmzb9l8vnN_GN",
                      currency:"USD",

                    }}

                    style={{
                      shape: 'rect',
                      color: 'white',
                      layout: 'horizontal',
                      label: 'paypal',
                    }}
                  />
              </Box>

            </Paper>
          </Grid>

          {redirect === false ? (
            <Box>

            </Box>
           ) : (
             <Redirect to={route} />
           )}

          </Grid>
      </div>


  );
};


 export default connect(mapStateToProps,mapDispatchToProps)(PaymentComponent);
