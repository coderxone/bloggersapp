import { createSlice } from '@reduxjs/toolkit'
import LocalizeComponent from '../localize/LocalizeComponent';

const initialState = {
  value: 0,
  IMAGE_DATA:{},
  BACKGROUND_IMAGE_DATA:{},
  businessDashboard:{
    menuState:0,
  },
  bloggerDashboard:{
    blogger_autorization_menu:0,
    swithState:false,
    onlineStatusSwitcher:false,
    onlineStatus:0,
    approveStatus:0,
    emailStatus:0,
    role:1,
    authorization:false,
  },
  ConfirmReduxUniversalComponent:{
    confirm:LocalizeComponent.confirm_small,
    cancel:LocalizeComponent.cancel_small,
    status:false,
    text:LocalizeComponent.dialogDefaultText,
    command:{
      creatorsFromCheckbox:false,
      redirect:false,
    },
  },
  bloggersAnswers:{
    steps:['1', '2', '3','4','5','6','7','8','9','10','11','12'],
    multisaveArray:['location', 'category', 'age','firstName','lastName','accountage','nickName','sociallink','subscribers_count','paypal','ssn','identity'],
    checkssn:true,
    socialcheck:true,
    questions:[LocalizeComponent.bl1,LocalizeComponent.bl2,LocalizeComponent.bl3,LocalizeComponent.bl4,LocalizeComponent.bl5,LocalizeComponent.socialNetworkAge,LocalizeComponent.bl6,LocalizeComponent.bl7,LocalizeComponent.bl8,LocalizeComponent.bl9,LocalizeComponent.bl10,LocalizeComponent.bl11]
  },
  mobileDialogStatus:false,
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
    SetMobileDialogStatus(state,action){
      state.mobileDialogStatus = action.payload;
    },
    SetChangeStep(state,action){
      state.bloggersAnswers.steps = action.payload;
    },
    CancelSSNCheck(state){
      state.bloggersAnswers.steps = ['1', '2', '3','4','5','6','7','8','9','10'];
      state.bloggersAnswers.checkssn = false;
      state.bloggersAnswers.questions = [LocalizeComponent.bl1,LocalizeComponent.bl2,LocalizeComponent.bl3,LocalizeComponent.bl4,LocalizeComponent.bl5,LocalizeComponent.bl6,LocalizeComponent.bl7,LocalizeComponent.bl8,LocalizeComponent.socialNetworkAge,LocalizeComponent.bl9];
      state.bloggersAnswers.multisaveArray = ['location', 'category', 'age','firstName','lastName','nickName','sociallink','subscribers_count','accountage','paypal'];
    },
    CancelSubscribersCheck(state){

      state.bloggersAnswers.socialcheck = false;
      if(state.bloggersAnswers.checkssn == false){
        state.bloggersAnswers.steps = ['1', '2', '3','4','5','6','7'];
        state.bloggersAnswers.questions = [LocalizeComponent.bl1,LocalizeComponent.bl2,LocalizeComponent.bl3,LocalizeComponent.bl4,LocalizeComponent.bl5,LocalizeComponent.socialNetworkAge,LocalizeComponent.bl9];
        state.bloggersAnswers.multisaveArray = ['location', 'category', 'age','firstName','lastName','accountage','paypal'];
      }else{
        state.bloggersAnswers.steps = ['1', '2', '3','4','5','6','7','8','9'];
        state.bloggersAnswers.questions = [LocalizeComponent.bl1,LocalizeComponent.bl2,LocalizeComponent.bl3,LocalizeComponent.bl4,LocalizeComponent.bl5,LocalizeComponent.socialNetworkAge,LocalizeComponent.bl9,LocalizeComponent.bl10,LocalizeComponent.bl11];
        state.bloggersAnswers.multisaveArray = ['location', 'category', 'age','firstName','lastName','accountage','paypal','ssn','identity'];
      }


    },
    activateBusinessMenu(state){
      state.businessDashboard.menuState = 1;
    },
    multiSave(state,action){
      console.log(action.payload);
      localStorage.setItem(action.payload.name,action.payload.value);
    },

    openSystemDialog(state,action){
      if(action.payload == 1){
        state.ConfirmReduxUniversalComponent.status = true;
      }

      if(action.payload == 0){
        state.ConfirmReduxUniversalComponent.status = false;
      }
    },

    turnOnCreatorsFormCheckbox(state){
        state.ConfirmReduxUniversalComponent.command.creatorsFromCheckbox = true;
    },
    turnOffCreatorsFormCheckbox(state){
        state.ConfirmReduxUniversalComponent.command.creatorsFromCheckbox = false;
    },
    redirectToPayment(state){
        state.ConfirmReduxUniversalComponent.command.redirect = true;

        // setTimeout(function(){
        //   state.ConfirmReduxUniversalComponent.command.redirect = false;
        // },2000);
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
  SetMobileDialogStatus,
  SetChangeStep,
  CancelSSNCheck,
  CancelSubscribersCheck,
  activateBusinessMenu,
  multiSave,
  openSystemDialog,
  turnOnCreatorsFormCheckbox,
  turnOffCreatorsFormCheckbox,
  redirectToPayment,

 } = counterSlice.actions
export default counterSlice.reducer;
