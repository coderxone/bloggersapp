import { createSlice } from '@reduxjs/toolkit'

// const counterSlice = createSlice({
//   name: 'counter',
//   initialState,
//   reducers: {
//     increment(state) {
//       state.value++
//     },
//     decrement(state) {
//       state.value--
//     },
//     incrementByAmount(state, action) {
//       state.value += action.payload
//     },
//   },
// })




let initialState = {
  count: 0,
  email:"",
  password:"",
  array:[],
  video_component:{

  },
  IMAGE_DATA:{}

};
//props.dispatch(multiSave(storageData));


const reduceexport = function reducer(state = initialState, action) {

  // const [reactState,setReactState] = useState(state);
  //console.log('reducer', state, action);

  switch(action.type) {


    case 'INCREMENT':
    //  console.log("INCREMENT");
      return {
        count: state.count + 1
      };

    case 'DECREMENT':
    //console.log("DECREMENT");
      return {
        count: state.count - 1
      };

    case 'SAVE_EMAIL':

      //  console.log(action);
        localStorage.setItem("email",action.email);
        localStorage.setItem("password",action.password);
        //console.log(action.email);
      return {
        count: 0,
        email:action.email,
        password:action.password
      };

    case 'SAVE_COORD':

    localStorage.setItem("coord",JSON.stringify(action.coord));
    return action.coord;

    case 'SAVE_COUNTRY':
    var country = '';
    for(var i = 0;i < action.country.fullData.length;i++){
      if(action.country.fullData[i].types[0] == "country"){
        country = action.country.fullData[i].short_name;
      }
    }

    localStorage.setItem("country",country);
    return country;

    case 'SAVE_CATEGORY':

    localStorage.setItem("category",JSON.stringify(action.category));
    return action.category;

    case 'SAVE_BUSINESS_CATEGORY':

    localStorage.setItem("businessCategory",JSON.stringify(action.category));

    return action.category;

    case 'SAVE_MULTI_DATA':
    //console.log(action);
    localStorage.setItem(action._object,action.name); //_object:name,name:value
    return {
      _object:action._object,
      name:action.name
    };

    case 'MULTI_SAVE':
    console.log(action);
    localStorage.setItem(action.name,action.value); //action:name,name:value
    return {
      name:action.name,
      value:action.value
    };

    case 'IMAGE_DATA':
    console.log(action)
    state.IMAGE_DATA = action.data;

    return state;

    default:
      return state;
  }

  return state;
}

 export default reduceexport;

 // export const { increment, decrement, incrementByAmount } = counterSlice.actions
 // export default counterSlice.reducer;
// export default connect(mapStateToProps)(reduceexport);
