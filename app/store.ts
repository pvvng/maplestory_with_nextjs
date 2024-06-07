import { configureStore, createSlice } from "@reduxjs/toolkit";

const initial :boolean = false

// 오토플레이 여부 감시
const autoPlay = createSlice({
  name: 'autoPlay',
  initialState : initial,
  reducers: {
    setAutoPlayStatus(state, action){
      return action.payload
    }
  }
})

export let { setAutoPlayStatus } = autoPlay.actions

export const store = configureStore({
  reducer: {
    autoPlay : autoPlay.reducer
  },
});