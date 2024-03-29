{status === false ? (
  <Grid container className="withoutScroll">
     <SkeletonComponent/>
  </Grid>
 ) : (



 )}


 SetItems(insertArray);
 setDistance(data.distance);
 SetStatus(true);

items
 distance
setDistance

statusCircle

 <Link key={item.id} className="deleteUrlClass"
     to={{
       pathname: "/detailtask",
       data: item // your data array of objects
     }}
     >
       <div  className="MainBlock withoutScroll">
         <div  className="firstLevel">
             <div className="firstLevelText">
                 {item.url} - {item.description}
               <br />distance less than {dist} miles
             </div>
         </div>
         <div className="secondLevel">
           <div className="secondLevelShare">
             <div className="secondLevelOne">
               <div className="shouldButton">
                   <div className="shouldButtonText">
                         limit: {item.peoplecount} infl.
                   </div>
               </div>
             </div>
             <div className="secondLevelTwo">
               <div className="shareButton">
                   <div className="shareButtonText">
                         share
                   </div>
               </div>
             </div>
           </div>
           <div className="secondLevelShareThree">
             <div className="secondLevelThree">
               <div className="shouldButtonThree">
                   <div className="shouldButtonText">
                         {item.date} - {item.time}
                   </div>
               </div>
             </div>
             <div className="secondLevelThreeTwo">
               <div className="shareButtonThree">
                   <div className="shareButtonText">
                         {Math.round(item.sum / item.peoplecount - 1)} $
                   </div>
               </div>
             </div>
           </div>
         </div>
       </div>
   </Link>


   -----------------

   <div className="Business-title">
     <h1 className="Business-title-text">
       What is Echohub.io?
     </h1>
   </div>

   <div className="Business-desc-one">
       <div className="Business-desc-text">
         Echohub.io is a new effective type of spreading information through a network of pooled bloggers. Echohub.io will make your business recognizable with the effect of spreading information in a short period of time.
       </div>
   </div>

   <div>

   </div>

   <div className="Business-title-two">
     <h2 className="Business-title-text-two">
       What do we offer business?
     </h2>
   </div>


   <div className="business-offer">
       <div className="business-offer-left">
         <GroupAddIcon className="business-icon-color"/>
       </div>
       <div className="business-offer-right">
         Pools of verified bloggers and their subscribers.
       </div>

   </div>
   <div className="business-offer">
     <div className="business-offer-left">
       <DynamicFeedIcon className="business-icon-color"/>
     </div>
     <div className="business-offer-right">
       Simultaneous work with the pool of bloggers and their total number of subscribers.
     </div>
   </div>
   <div className="business-offer">
     <div className="business-offer-left">
       <MultilineChartIcon className="business-icon-color"/>
     </div>
     <div className="business-offer-right">
       Instantaneous effect of spreading information similar to word of mouth.
     </div>
   </div>
   <div className="business-offer">
     <div className="business-offer-left">
       <PublicIcon className="business-icon-color"/>
     </div>
     <div className="business-offer-right">
       Large reach through a pool of bloggers helps make your product or service recognizable! You can promote simultaneously on several social platforms (Youtube, Instagram, Tiktok, Twitter, Facebook).
     </div>
   </div>
   <div className="business-offer">
     <div className="business-offer-left-money">
       <MonetizationOnIcon className="business-icon-color"/>
     </div>
     <div className="business-offer-right">
       Starting capital, from $ 200.
     </div>
   </div>





   <div className="Business-title-three">
     <h3 className="Business-title-text-three">
       You log in/specify information:
     </h3>
   </div>



   <div className="business-offer">
       <div className="business-offer-left">
         <DescriptionIcon className="business-icon-color"/>
       </div>
       <div className="business-offer-right">
         A detailed description of the business and what service you provide.
       </div>

   </div>
   <div className="business-offer">
     <div className="business-offer-left">
       <LocationOnIcon className="business-icon-color"/>
     </div>
     <div className="business-offer-right">
       Indicate the location of the business, budget.
     </div>
   </div>
   <div className="business-offer">
     <div className="business-offer-left">
       <LocationSearchingIcon className="business-icon-color"/>
     </div>
     <div className="business-offer-right">
       Local work on GPS or make the application available to all bloggers.
     </div>
   </div>
   <div className="business-offer">
     <div className="business-offer-left">
       <ComputerIcon className="business-icon-color"/>
     </div>
     <div className="business-offer-right">
       Internal algorithms and AI Echohub.io promptly moves your product and contributes to its recognition in your region!
     </div>
   </div>

   <div className="buttonDiv">
         <button  className="buttonStyle buttonCenter" onClick={goToLogin} >{LocalizeComponent.login_button}</button>
   </div>


   <div className="Business-titleTwo">
     <h3 className="Business-titleTwo-Text">
       Echohub for Creators
     </h3>
   </div>

   <div className="Business-title-four">
     <h3 className="Business-title-four-text">
       Do you have an active audience?
     </h3>
     <h3 className="Business-title-four-text">
       Then Echohub.io is for you!
     </h3>
   </div>

   <div className="business-offer">
       <div className="business-offer-left">
         <GroupAddIcon className="business-icon-color"/>
       </div>
       <div className="business-offer-right">
         If you have 500 or more subscribers.
       </div>
   </div>
   <div className="business-offer">
     <div className="business-offer-left">
       <MonetizationOnIcon className="business-icon-color"/>
     </div>
     <div className="business-offer-right">
       You have a great opportunity to join us and start making money right now.
     </div>


   </div>
   <div className="business-offer">
     <div className="business-offer-left">
       <FaceIcon className="business-icon-color"/>
     </div>
     <div className="business-offer-right">
       Our platform brings together bloggers and passionate people in pools of 6 or more people to work on one company campaign.
     </div>
   </div>
   <div className="business-offer">
     <div className="business-offer-left">
       <LocationSearchingIcon className="business-icon-color"/>
     </div>
     <div className="business-offer-right">
       Are you actively moving around the city and running into your favorite place for lunch?
     </div>
   </div>
   <div className="business-offer">
     <div className="business-offer-left">
       <AnnouncementIcon className="business-icon-color"/>
     </div>
     <div className="business-offer-right">
       Great news, you can easily contract with any company that suits you.
     </div>
   </div>
   <div className="business-offer">
     <div className="business-offer-left">
       <CenterFocusStrongIcon className="business-icon-color"/>
     </div>
     <div className="business-offer-right">
       And focus only on the quality of your content.
     </div>
   </div>
   <div className="business-offer">
     <div className="business-offer-left">
       <TrendingUpIcon className="business-icon-color"/>
     </div>
     <div className="business-offer-right">
       Our rating system will make you not only recognizable, but also a highly paid blogger.
     </div>
   </div>
   <div className="business-offer">
     <div className="business-offer-left">
       <MultilineChartIcon className="business-icon-color"/>
     </div>
     <div className="business-offer-right">
       Be part of a powerful community.
     </div>
   </div>
   <div className="business-offer">
     <div className="business-offer-left">
       <WorkIcon className="business-icon-color"/>
     </div>
     <div className="business-offer-right">
       Be your own boss and our partner!
     </div>
   </div>

   <div className="buttonDiv">
         <button  className="buttonStyle buttonCenter" onClick={goToLogin} >{LocalizeComponent.login_button}</button>
   </div>
