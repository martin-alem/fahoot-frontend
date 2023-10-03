import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IQuestion, IQuiz, IQuizState } from '../utils/types';

const initialState: IQuizState = {
  baseQuiz: null,
  modifiedQuiz: null,
  currentQuestion: null,
};

export const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    loadQuiz: (state, action: PayloadAction<IQuiz>) => {
      state.baseQuiz = action.payload;
      state.modifiedQuiz = action.payload;
    },

    saveQuiz: (state, action: PayloadAction<IQuiz>) => {
      state.modifiedQuiz = action.payload;
    },

    updateCurrentQuestion: (state, action: PayloadAction<IQuestion>) => {
      state.currentQuestion = action.payload;
    },

    clearQuiz: (state) => {
      state.baseQuiz = null;
      state.modifiedQuiz = null;
      state.currentQuestion = null;
    },
  },
});

export const { saveQuiz, clearQuiz, loadQuiz, updateCurrentQuestion } = quizSlice.actions;
export default quizSlice.reducer;
