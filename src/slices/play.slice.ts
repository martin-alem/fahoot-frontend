import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IPlayState, IPlay, IPlayer } from '../utils/types';

const initialState: IPlayState = {
  play: null,
  player: null,
  players: null,
};

export const playSlice = createSlice({
  name: 'playState',
  initialState,
  reducers: {
    loadPlay: (state, action: PayloadAction<IPlay>) => {
      state.play = action.payload;
    },

    loadPlayer: (state, action: PayloadAction<IPlayer>) => {
      state.player = action.payload;
    },

    loadPlayers: (state, action: PayloadAction<IPlayer[]>) => {
      state.players = action.payload;
    },

    addPlayer: (state, action: PayloadAction<IPlayer>) => {
      if (state.players) {
        state.players.push(action.payload);
      } else {
        state.players = [action.payload];
      }
    },

    removePlayer: (state, action: PayloadAction<IPlayer>) => {
      const newPlayers = state.players?.filter((player) => player._id !== action.payload._id) ?? null;
      state.players = newPlayers;
    },
    clearPlay: (state) => {
      state.play = null;
      state.player = null;
      state.players = null;
    },
  },
});

export const { loadPlay, loadPlayers, addPlayer, clearPlay, removePlayer, loadPlayer } = playSlice.actions;
export default playSlice.reducer;
