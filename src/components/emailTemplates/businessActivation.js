import React from 'react';


export default function BasicTable() {
  const businessOwner = "test Owner";
  const countofBloggers = 3021;
  return (

    <div style={{width:'100%'}}>
      <div style={{width:'100%',textAlign:'center',marginTop:'20px'}}><a href="https://echohub.io"> <img src="https://echohub.io/newimages/Logo_Echohub.png" alt="echohub.io" width="300" height="150" /></a></div>
      <table style={{width:'100%',color:'black',padding:'4px',lineHeight:'26px'}}>
        <thead>
         <tr style={{width:'100%',marginBottom:'15px'}}>
           <th colSpan="2"  style={{textAlign:'center',fontSize:'20px',paddingTop:'5px'}}>Hello business owner of {businessOwner} !😊 In your business category we currently have {countofBloggers} creators. </th>
         </tr>
        </thead>
        <tbody style={{fontSize:'18px'}}>
          <tr>
            <td  colSpan="2" style={{textAlign:'center',marginTop:'20px'}}><a href="https://echohub.io"> <img src="https://echohub.io/newimages/businessPoster.png" width="400" height="250" alt="Join echohub.io"  /></a></td>
          </tr>
          <tr>
            <td colSpan="2" style={{paddingTop:'15px'}}>1. Get matched with more then 6 creators(bloggers, influencers) in your area today from our big databases!</td>
          </tr>
          <tr>
            <td colSpan="2" style={{paddingTop:'15px'}}>2. Submit a campaign request in a few clicks</td>
          </tr>
          <tr>
            <td colSpan="2" style={{paddingTop:'15px'}}>3. See how your creators and their content and their performing </td>
          </tr>
          <tr>
            <td colSpan="2" style={{paddingTop:'15px'}}>4. Chat with your creators directly to suggest changes to the post </td>
          </tr>
          <tr>
            <td colSpan="2" style={{paddingTop:'15px'}}>5. Real-time GPS connects you with the closest influencers in that area </td>
          </tr>
          <tr>
            <td colSpan="2" style={{textAlign:'center',paddingTop:'25px',paddingBottom:'25px'}}><a href="https://echohub.io/login"> <img src="https://echohub.io/newimages/join.png" alt="Join echohub.io" width="100" height="35" /></a></td>
          </tr>
          </tbody>
        </table>

        

        <a href="https://apps.apple.com/us/app/echohub-io/id1563339758" target="_blank"  style={{width:'100%',height:"30px",paddingTop:'15px',paddingBottom:'15px',textAlign:'center',fontSize:'30px'}}><div style={{fontSize:'18px',color:'black'}}>Download our mobile app for IOS</div></a>
        <div style={{width:'100%',textAlign:'center',paddingTop:'20px',paddingBottom:'20px'}}><a target="_blank"  href="https://apps.apple.com/us/app/echohub-io/id1563339758"> <img src="https://echohub.io/newimages/iphone.png" alt="echohub.io" width="300" height="600" /></a></div>

      <a href="https://play.google.com/store/apps/details?id=io.echohub.www&hl=en_US&gl=US" target="_blank"  style={{width:'100%',height:"30px",paddingTop:'15px',paddingBottom:'15px',textAlign:'center',fontSize:'30px'}}><div style={{fontSize:'18px',color:'black'}}>Download our mobile app for ANDROID</div></a>
        <div style={{width:'100%',textAlign:'center',paddingTop:'20px',paddingBottom:'20px'}}><a target="_blank" href="https://play.google.com/store/apps/details?id=io.echohub.www&hl=en_US&gl=US"> <img src="https://echohub.io/newimages/android.png" alt="echohub.io" width="300" height="600" /></a></div>

  </div>
  );
}
