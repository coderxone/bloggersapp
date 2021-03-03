import config from '../config/config';
import React ,{useState} from 'react';

import { GoogleMap, useJsApiLoader,DirectionsService,LoadScript,DirectionsRenderer } from '@react-google-maps/api';

//https://react-google-maps-api-docs.netlify.app/#directionsrenderer
const containerStyle = {
  width: '100%',
  height: '90vh'
};



function MyComponent() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: config.getGoogleMapKey()
  })

  const [map, setMap] = React.useState(null)
  const [travelMode] = useState('DRIVING');//DRIVING//BICYCLING//TRANSIT//WALKING
  const [origin,SetOrigin] = useState('mountain view,CA');
  const [destination,SetDestination] = useState('37.419444, -122.035045');
  const [response,SetResponse] = useState(null);



  const [center,SetCenter] = useState({
    lat: 37.408240,
    lng: -122.074659
  });

  const ChangeRoute = (origin,destination) => {
    if (origin !== '' && destination !== '') {
      SetOrigin(origin);
      SetDestination(destination);
    }
  }

  const CenterMap = (newLat,newLng) => {
    const newValue = {...center};
    newValue.lat = newLat;
    newValue.lng = newLng;
    SetCenter(newValue);
  }




  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  const directionsCallback = (response) => {

    //console.log(response);
    if (response !== null) {
      if (response.status === 'OK') {
        SetResponse(response);
      } else {
        //console.log('response: ', response)
      }
    }
  }

  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={2}
        onLoad={onLoad}
        onUnmount={onUnmount}
        
      >
        {
          (
            destination !== '' &&
            origin !== ''
          ) && (
            <DirectionsService
                options={{
                  destination: destination,
                  origin: origin,
                  travelMode: travelMode
                }}

                callback={directionsCallback}

                onLoad={directionsService => {
                //  console.log('DirectionsService onLoad directionsService: ', directionsService)
                }}

                onUnmount={directionsService => {
                //  console.log('DirectionsService onUnmount directionsService: ', directionsService)
                }}
            />
        )
         }

         {

           response !== null && (
           <DirectionsRenderer

                  options={{
                    directions: response
                  }}

                  onLoad={directionsRenderer => {
                    console.log('DirectionsRenderer onLoad directionsRenderer: ', directionsRenderer)
                  }}

                  onUnmount={directionsRenderer => {
                    console.log('DirectionsRenderer onUnmount directionsRenderer: ', directionsRenderer)
                  }}
                />
                )
         }
        <></>
      </GoogleMap>
  ) : <></>
}

export default React.memo(MyComponent)
