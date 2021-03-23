import React,{ useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Geocode from "react-geocode";
import { save_country } from '../actions/actions';
import { connect } from 'react-redux';
import LocalizeComponent from '../localize/LocalizeComponent';
import config from '../config/config';

const mapDispatchToProps = dispatch => ({
  save_country
});

const ComboCountry = function ComboBox(props) {

  Geocode.setApiKey(config.getGoogleMapKey());
  Geocode.setLanguage("en");
  Geocode.enableDebug();
  const erroratr = props.erroratr;
  const ShowLists = [
    // { title: 'The Shawshank Redemption', year: 1994 },
  ];

  const [findAddresses,setFindAddresses] = useState(ShowLists);

  const [address, SetAddress] = useState({});

  const searchAddress = ((searchString) => {

    if(searchString.length > 3){

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
            if(newValue){
              SetAddress(newValue);
              props.dispatch(save_country(newValue));
            }

          }}
          required
          options={findAddresses}
          className="TextFieldStyle"
          getOptionLabel={(option) => option.title}
          style={{ width: '100%',border:'#0083ff',borderColor:'red',fontFamily:'AppFont' }}

          renderInput={(params) => {
            return <TextField {...params}  label="example 123 street "  />;
          }}
        />

  );
}

export default connect(mapDispatchToProps)(ComboCountry);
// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
