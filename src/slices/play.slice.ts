import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IPlayState, IPlay } from '../utils/types';

const initialState: IPlayState = {
  play: null,
};

export const playSlice = createSlice({
  name: 'playState',
  initialState,
  reducers: {
    loadPlay: (state, action: PayloadAction<IPlay>) => {
      state.play = action.payload;
    },

    clearPlay: (state) => {
      state.play = null;
    },
  },
});

export const { loadPlay, clearPlay } = playSlice.actions;
export default playSlice.reducer;
