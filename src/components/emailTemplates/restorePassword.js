import React from 'react';

export default function BasicTable(props){
  const currentUser = props.email;
  const currentPassword = props.password;

  return (
    <div style={{width:'100%'}}>
        <div style={{width:'100%',textAlign:'center',marginTop:'20px'}}><a href="https://echohub.io"> <img src="https://echohub.io/newimages/Logo_Echohub.png" alt="echohub.io" width="300" height="150" /></a></div>
        <table style={{width:'100%',color:'black',padding:'4px',lineHeight:'26px'}}>
          <thead>
           <tr style={{width:'100%',marginBottom:'15px'}}>
             <th colSpan="2"  style={{textAlign:'center',fontSize:'20px',paddingTop:'5px'}}>Hi {currentUser} !😊  Your current password is "{currentPassword}" </th>
           </tr>
          </thead>

          </table>


          <a href="https://apps.apple.com/us/app/echohub-io/id1563339758" target="_blank"  style={{width:'100%',height:"30px",paddingTop:'15px',paddingBottom:'15px',textAlign:'center',fontSize:'30px'}}><div style={{fontSize:'18px',color:'black'}}>Download our mobile app for IOS</div></a>
          <div style={{width:'100%',textAlign:'center',paddingTop:'20px',paddingBottom:'20px'}}><a target="_blank"  href="https://apps.apple.com/us/app/echohub-io/id1563339758"> <img src="https://echohub.io/newimages/iphone.png" alt="echohub.io" width="300" height="600" /></a></div>

        <a href="https://play.google.com/store/apps/details?id=io.echohub.www&hl=en_US&gl=US" target="_blank"  style={{width:'100%',height:"30px",paddingTop:'15px',paddingBottom:'15px',textAlign:'center',fontSize:'30px'}}><div style={{fontSize:'18px',color:'black'}}>Download our mobile app for ANDROID</div></a>
          <div style={{width:'100%',textAlign:'center',paddingTop:'20px',paddingBottom:'20px'}}><a target="_blank" href="https://play.google.com/store/apps/details?id=io.echohub.www&hl=en_US&gl=US"> <img src="https://echohub.io/newimages/android.png" alt="echohub.io" width="300" height="600" /></a></div>

    </div>
  );
}
