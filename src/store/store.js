const initialState = {
  count: 0,
  email:"",
  password:"",
  array:[]
};



const reduceexport = function reducer(state = initialState, action) {

  // const [reactState,setReactState] = useState(state);
  console.log('reducer', state, action);

  switch(action.type) {
    case 'INCREMENT':
      console.log("INCREMENT");
      return {
        count: state.count + 1
      };

    case 'DECREMENT':
    console.log("DECREMENT");
      return {
        count: state.count - 1
      };

    case 'SAVE_EMAIL':

        console.log(action);
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

    default:
      return state;
  }

  return state;
}

 export default reduceexport;
// export default connect(mapStateToProps)(reduceexport);
