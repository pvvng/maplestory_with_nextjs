import { configureStore, createSlice } from "@reduxjs/toolkit";
import { WithId, Document } from "mongodb";

const initialAutoPlay :boolean = false

// 오토플레이 여부 감시
const autoPlay = createSlice({
  name: 'autoPlay',
  initialState : initialAutoPlay,
  reducers: {
    setAutoPlayStatus(state, action){
      return action.payload
    }
  }
})

export let { setAutoPlayStatus } = autoPlay.actions

const initialTopTrack : WithId<Document>[] = []

// 오토플레이 여부 감시
const topTrack = createSlice({
  name: 'topTrack ',
  initialState : initialTopTrack,
  reducers: {
    setTopTrackState (state, action){
      return action.payload
    }
  }
})

export let { setTopTrackState } = topTrack.actions

export const store = configureStore({
  reducer: {
    autoPlay : autoPlay.reducer,
    topTrack : topTrack .reducer
  },
});