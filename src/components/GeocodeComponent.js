import React,{ useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Geocode from "react-geocode";
import { save_coord } from '../actions/actions';
import { connect } from 'react-redux';
import LocalizeComponent from '../localize/LocalizeComponent';

const mapDispatchToProps = dispatch => ({
  save_coord
});

const Combo = function ComboBox(props) {

  Geocode.setApiKey("AIzaSyAZSEPAxXmoxpPVFbiTsFoqCvMQYPuR8Uk");
  Geocode.setLanguage("en");
  Geocode.enableDebug();

  const top100Films = [
    // { title: 'The Shawshank Redemption', year: 1994 },
  ];

  const [findAddresses,setFindAddresses] = useState(top100Films);

  const [address, SetAddress] = useState({});

  const searchAddress = ((searchString) => {

    if(searchString.length > 4){

        // address.filter(function (el) {
        //   return el != null;
        // });
      //list.filter(item => item.name !== name)
      const newArray = [];
      setFindAddresses(newArray);
      //SetAddress(address);

      Geocode.fromAddress(searchString).then(
          response => {
            //console.log(response);
            response.results.map((string) => {

              var newObj = {
                title:string.formatted_address,
                geometry:string.geometry.location,
                name:string.formatted_address,
                fullData:string.address_components
              }

              localStorage.setItem("saved_title",string.formatted_address);

              //console.log(findAddresses);
              const newArray = findAddresses.concat(newObj);
              setFindAddresses(newArray);
            })


          },
          error => {
            //console.error(error);
          }
      );
    }



  });



  return (
    <Autocomplete
      id="combo-box-demo"
      onInputChange={(event, newInputValue) => {
          searchAddress(newInputValue);
        }}

      onChange={(event, newValue) => {
        //console.log(newValue);
        SetAddress(newValue);
        props.dispatch(save_coord(newValue));
      }}
      required

      options={findAddresses}

      getOptionLabel={(option) => option.title}
      style={{ width: '100%',border:'#0083ff',borderColor:'#0083ff' }}

      renderInput={(params) => {
        return <TextField {...params} label={LocalizeComponent.location_name} variant="outlined" />;
      }}
    />
  );
}

export default connect(mapDispatchToProps)(Combo);
// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
