import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IQuestion, IQuiz, IQuizState } from '../utils/types';

const initialState: IQuizState = {
  quiz: null,
  currentQuestion: null,
};

export const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    saveQuiz: (state, action: PayloadAction<IQuiz>) => {
      state.quiz = action.payload;
    },

    updateCurrentQuestion: (state, action: PayloadAction<IQuestion>) => {
      state.currentQuestion = action.payload;
    },

    deleteQuiz: () => initialState,
  },
});

export const { saveQuiz, deleteQuiz, updateCurrentQuestion } = quizSlice.actions;
export default quizSlice.reducer;