import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 0,
  IMAGE_DATA:{},
  BACKGROUND_IMAGE_DATA:{}
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
  },
})

export const { increment, decrement, incrementByAmount,saveImageData,saveBackgroundImageData } = counterSlice.actions
export default counterSlice.reducer;
