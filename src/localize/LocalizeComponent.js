import LocalizedStrings from 'react-localization';

let strings = new LocalizedStrings({
 en:{
   login:"Login/Registration",
   login_button:"Join",
   password_length:"Password is too short - should be 6 chars minimum.",
   restore_password:"Forgot password",
   restore_button:"Restore",
   user_not_found:"User with this email not found please try another email or may be you are not registered",

 },
 it: {
   login:"Come vuoi il tuo uovo oggi?",
   login_button:"Join",
   password_length:"Password is too short - should be 6 chars minimum.",
   restore_password:"Forgot password",
   restore_button:"Restore",
   user_not_found:"User with this email not found please try another email or may be you are not registered",

 }
});

export default strings;
