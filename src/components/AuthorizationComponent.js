import React, {useState,useEffect} from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonItem, IonLabel, IonList, IonItemDivider } from '@ionic/react';
import '../css/mainStyles.css';
import LocalizeComponent from '../localize/LocalizeComponent';


const AuthorizationComponent = () => {

  const [address,setAddress] = useState("");

  const handleChange = ((address) => {
    
  });

  const handleSelect = ((address) => {
      
  });

  useEffect(() => {
	  			
	  		
		
	  });



  return (
  	
   	<IonPage >
      <IonContent>
      	  <div className="mainCentralDiv">
      	  		{LocalizeComponent.login}
      	  </div>	

          <IonItem  className="main-input-padding">
            <IonInput inputmode="email"  placeholder="Email" ></IonInput>
          </IonItem>
          <IonItem>
            <IonInput inputmode="password"  placeholder="Password" ></IonInput>
          </IonItem>
          <div className="buttonDiv">
          		<div className="buttonStyle">
          			<div className="buttonText">
          				{LocalizeComponent.login_button}
          			</div>
          		</div>
          </div>
      </IonContent>
    </IonPage>
    
  );
};

export default AuthorizationComponent;
