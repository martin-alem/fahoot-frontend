import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IQuiz, IQuizState } from '../utils/types';

const initialState: IQuizState = {
  quiz: null,
};

export const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    saveQuiz: (state, action: PayloadAction<IQuiz>) => {
      state.quiz = action.payload;
    },

    deleteQuiz: () => initialState,
  },
});

export const { saveQuiz, deleteQuiz } = quizSlice.actions;
export default quizSlice.reducer;
