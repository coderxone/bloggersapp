import { configureStore } from '@reduxjs/toolkit'

import counterReducer from './counter-slice';
import reduxStorage from '../store/store';


const store = configureStore({
  reducer: {
    counter:counterReducer,
    store:reduxStorage
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }),

})

export default store;
// The store now has redux-thunk added and the Redux DevTools Extension is turned on
