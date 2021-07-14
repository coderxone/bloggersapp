import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 0,
  IMAGE_DATA:{},
  BACKGROUND_IMAGE_DATA:{},

  bloggerDashboard:{
    blogger_autorization_menu:0,
    swithState:false,
    onlineStatusSwitcher:false,
    onlineStatus:0,
    approveStatus:0,
    emailStatus:0,
    role:1,
    authorization:false,
  }
 }

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment(state) {
      state.value++
    },
    decrement(state) {
      state.value--
    },
    incrementByAmount(state, action) {
      state.value += action.payload
    },
    saveImageData(state, action) {
      state.IMAGE_DATA = action.payload
    },
    saveBackgroundImageData(state, action) {
      state.BACKGROUND_IMAGE_DATA = action.payload
    },
    enableBloggerMenu(state) {
      state.bloggerDashboard.blogger_autorization_menu = 1;
    },
    disableBloggerMenu(state) {
      state.bloggerDashboard.blogger_autorization_menu = 0;
    },
    enableAuthorized_user(state) {
      state.authorized_user = 1;
    },
    disableAuthorized_user(state) {
      state.authorized_user = 0;
    },
    handleSwitch(state,action){
      let SwitcherValue = action.payload.target.checked;
      //var SwitcherValue = event.target.checked;
      console.log(SwitcherValue);
      let saveSwitcherValue = 2;
      if(SwitcherValue == true){
        saveSwitcherValue = 1;
      }
      localStorage.setItem("switcher",saveSwitcherValue);

      state.bloggerDashboard.swithState = SwitcherValue;
    },
    SetswithState(state,action){
      state.bloggerDashboard.swithState = action.payload;
    },
    SetonlineStatusSwitcher(state,action){
      state.bloggerDashboard.onlineStatusSwitcher = action.payload;
    },

    handleSwitchOnlineStatusSwitcher(state,action){
      var SwitcherValue = action.payload.target.checked;
      state.bloggerDashboard.onlineStatusSwitcher = SwitcherValue;
      counterSlice.caseReducers.GoOffline(state);
      //GoOffline();
    },
    SetonlineStatus(state,action){
      state.bloggerDashboard.onlineStatus = action.payload;
    },
    GoOffline(state){
      state.bloggerDashboard.onlineStatus = 0;
      localStorage.setItem("online",0);
      state.bloggerDashboard.onlineStatusSwitcher = true;
    },
    GoOnline(state){
        state.bloggerDashboard.onlineStatus = 1;
        localStorage.setItem("online",1);
        state.bloggerDashboard.onlineStatusSwitcher = false;
    },
    SetapproveStatus(state,action){
      state.bloggerDashboard.approveStatus = action.payload;
    },
    SetEmailStatus(state,action){
      state.bloggerDashboard.emailStatus = action.payload;
    },
    SetUserRole(state,action){
      state.bloggerDashboard.role = action.payload;
    },
    SetUserAuthorization(state,action){
      state.bloggerDashboard.authorization = action.payload;
    },
  },
})

export const { increment,
  decrement,
  incrementByAmount,
  saveImageData,
  saveBackgroundImageData,
  enableBloggerMenu,
  disableBloggerMenu,
  enableAuthorized_user,
  disableAuthorized_user,
  handleSwitch,
  handleSwitchOnlineStatusSwitcher,
  SetswithState,
  SetonlineStatusSwitcher,
  SetonlineStatus,
  GoOffline,
  GoOnline,
  SetapproveStatus,
  SetEmailStatus,
  SetUserRole,
  SetUserAuthorization,

 } = counterSlice.actions
export default counterSlice.reducer;
