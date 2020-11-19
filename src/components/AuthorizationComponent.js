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

      	<div className="logo-position">
	      	<div className="MainLogo">
	      	  		<div className="b_letter">
	      	  			B
	      	  		</div>

	      	  		<div className="hub_letter">
	      	  			hub
	      	  		</div>
	      	  </div>

	      	  <div className="MainLogo_shadow">
	      	  		<div className="b_letter_shadow">
	      	  			
	      	  		</div>

	      	  		<div className="hub_letter_shadow">
	      	  			
	      	  		</div>
	      	  </div>
      	</div>
      	  


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
