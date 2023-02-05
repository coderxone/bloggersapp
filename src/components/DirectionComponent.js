import config from '../config/config';
import React ,{useState,useMemo} from 'react';
import Observable from '../services/Observable';
import { GoogleMap, useJsApiLoader,DirectionsService,LoadScript,DirectionsRenderer } from '@react-google-maps/api';

//https://react-google-maps-api-docs.netlify.app/#directionsrenderer




const MyComponent = (props) => {

  //console.log(props)
  const [containerStyle,SetContainerStyle] = useState({width: '100%',height: '90vh'});

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: config.getGoogleMapKey()
  })

  const item = props.item;
  const status = props.status;
  const latitude = props.latitude;
  const longitude = props.longitude;

  const [map, setMap] = React.useState(null)
  const [travelMode] = useState('DRIVING');//DRIVING//BICYCLING//TRANSIT//WALKING
  const [origin,SetOrigin] = useState('');
//  const [origin,SetOrigin] = useState('mountain view,CA');
  const [destination,SetDestination] = useState('');
  const [response,SetResponse] = useState(null);



  const [center,SetCenter] = useState({
    lat: 37.408240,
    lng: -122.074659
  });



  const ChangeOriginRoute = (origin) => {
    if (origin !== '') {
      SetOrigin(origin);
    }
  }

  const ChangeDestinationRoute = (destination) => {
    if (destination !== '') {
      SetDestination(destination);
    }
  }

  useMemo(() => {

    if(item){
      //console.log(item);
      var destination = item.lat + ", " + item.lng;
      //console.log(destination);

      ChangeDestinationRoute(destination);
    }


  },[item])

  const CenterMap = (newLat,newLng) => {

    //console.log(newLat);
    const newValue = {...center};
    newValue.lat = newLat;
    newValue.lng = newLng;
    SetCenter(newValue);

    var origin = newLat + ", " + newLng;
    ChangeOriginRoute(origin);



  }

  useMemo(() => {
    CenterMap(latitude,longitude);
  },[latitude,longitude])

  useMemo(() => {
    if(status === false){
      const newContainerStyletwo = {...containerStyle};
      newContainerStyletwo.height = '95vh';
      SetContainerStyle(newContainerStyletwo);
    }else if(status === true){
      const newContainerStyleOne = {...containerStyle};
      var height = window.innerHeight;
      if((height >= 920) && (height < 1000)){
        newContainerStyleOne.height = '58vh';
      }else if((height >= 892) && (height < 920)){
        newContainerStyleOne.height = '58vh';
      }else if((height >= 850) && (height < 892)){
        newContainerStyleOne.height = '55vh';
      }else if((height >= 830) && (height < 850)){
        newContainerStyleOne.height = '55vh';
      }else if((height >= 800) && (height < 830)){
        newContainerStyleOne.height = '55vh';
      }else{
        newContainerStyleOne.height = '45vh';
      }
      //console.log(window.innerHeight);//892

      SetContainerStyle(newContainerStyleOne);
    }
  },[status])

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
    setTimeout(function(){
      if (response !== null) {
        if (response.status === 'OK') {


          var sendObj = {
            distance:response.routes[0].legs[0].distance.text,
            status:"ok"
          }
          SetResponse(response);
          Observable.sendRoute(sendObj);
        } else {
          //console.log('response: ', response)
        }
      }
    },1000);

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
            origin !== '' &&
            status !== false
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
           (
             response !== null &&
             status !== false
           ) && (
           <DirectionsRenderer

                  options={{
                    directions: response
                  }}

                  onLoad={directionsRenderer => {
                    //console.log('DirectionsRenderer onLoad directionsRenderer: ', directionsRenderer)
                    //directionsRenderer.directions.routes[0].legs[0].distance.text.
                  }}

                  onUnmount={directionsRenderer => {
                  //  console.log('DirectionsRenderer onUnmount directionsRenderer: ', directionsRenderer)
                  }}
                />
                )
         }
        <></>
      </GoogleMap>
  ) : <></>
}

export default React.memo(MyComponent)
