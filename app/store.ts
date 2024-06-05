import { configureStore, createSlice } from "@reduxjs/toolkit";

// export interface InitialType { album : string[] };
// const initial :InitialType|null = null

// const albumListSlice = createSlice({
//   name: 'albumList',
//   initialState : initial,
//   reducers: {
//     putAlbumList(state, action){
//       return {...action.payload}
//     }
//   }
// })

// export let { putAlbumList } = albumListSlice.actions

export const store = configureStore({
  reducer: {
    // albumList : albumListSlice.reducer
  },
});