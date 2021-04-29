import React from 'react';
import BusinessPoster from '../../images/businessPoster.png';
import Join from '../../images/main/newImages/join.png';





export default function BasicTable() {
  const businessOwner = "test Owner";
  const countofBloggers = 3025;
  return (
    <table style={{width:'100%',color:'black',padding:'4px',lineHeight:'26px'}}>
    <thead>
     <tr>
       <th colSpan="2">Hello business owner of {businessOwner} !😊 In your business category we currently have {countofBloggers} creators. </th>
     </tr>
    </thead>
    <tbody>
      <tr>
        <td colSpan="2"><video width="100%" src="https://echohub.io/videos/EchohubForbusiness.mp4" controls poster={BusinessPoster} type="video/mp4"/></td>
      </tr>
      <tr>
        <td colSpan="2">1.Get matched with 6 creators in your area today from our big databases!</td>
      </tr>
      <tr>
        <td colSpan="2">2.Submit a campaign request in a few clicks</td>
      </tr>
      <tr>
        <td colSpan="2">3.See how your creators and their content and their performing </td>
      </tr>
      <tr>
        <td colSpan="2">4.Chat with your creators directly to suggest changes to the post </td>
      </tr>
      <tr>
        <td colSpan="2">5.Real-time GPS connects you with the closest influencers in that area </td>
      </tr>
      <tr>
        <td colSpan="2"><a href="https://echohub.io/login"> <img src={Join} alt="Join echohub.io" width="100" height="35" /></a></td>
      </tr>
      </tbody>
    </table>
  );
}
