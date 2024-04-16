import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchAllGrades = createAsyncThunk(
  `grades/fetchAllGrades`,
  async (token, {rejectWithValue}) => {
    try {
      const config = {
        headers: {
          'Content-type': "application/x-www-form-urlencoded",
          'Authorization': `Bearer ${token}`,
        },
      };

      const {data} = await axios.get(
        'https://student.vstu.by/api/grade',
        config
      );

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchAverageGrade = createAsyncThunk(
  `grades/fetchAverageGrade`,
  async (token, {rejectWithValue}) => {
    try {
      const config = {
        headers: {
          'Content-type': "application/x-www-form-urlencoded",
          'Authorization': `Bearer ${token}`,
        },
      };

      const {data} = await axios.get(
        'https://student.vstu.by/api/grade/average',
        config
      );

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchAverageSemestrGrade = createAsyncThunk(
  `grades/fetchAverageSemestrGrade`,
  async (token, {rejectWithValue}) => {
    try {
      const config = {
        headers: {
          'Content-type': "application/x-www-form-urlencoded",
          'Authorization': `Bearer ${token}`,
        },
      };

      const {data} = await axios.get(
        'https://student.vstu.by/api/grade/average/semester',
        config
      );

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


const initialState = {
  grades: [],
  averageGrade: null,
  semestrAverageGrade: null,
  gradesStatus: null,
  averageGradeStatus: null,
  semestrAverageGradeStatus: null,
  gradesError: null,
  averageGradeError: null,
  semestrAverageGradeError: null,
};

const gradeSlice = createSlice({
  name: 'grades',
  initialState,
  reducers: {
    clearGrades(state) {
      state.grades = [];
      state.averageGrade = null;
      state.semestrAverageGrade = null;
      state.gradesStatus = null;
      state.averageGradeStatus = null;
      state.semestrAverageGradeStatus = null;
      state.gradesError = null;
      state.averageGradeError = null;
      state.semestrAverageGradeError = null;
    }
  },
  extraReducers: (builder => {
    builder
      .addCase(fetchAllGrades.pending, (state) => {
        state.gradesStatus = 'loading';
        state.gradesError = null;
      })
      .addCase(fetchAllGrades.fulfilled, (state, action) => {
        state.gradesStatus = 'resolved';
        state.grades = action.payload;
        state.gradesError = null;
      })
      .addCase(fetchAllGrades.rejected, (state, action) => {
        state.gradesStatus = 'rejected';
        state.gradesError = action.payload;
      })
      .addCase(fetchAverageGrade.pending, (state) => {
        state.averageGradeStatus = 'loading';
        state.averageGradeError = null;
      })
      .addCase(fetchAverageGrade.fulfilled, (state, action) => {
        state.averageGradeStatus = 'resolved';
        state.averageGrade = action.payload;
        state.averageGradeError = null;
      })
      .addCase(fetchAverageGrade.rejected, (state, action) => {
        state.averageGradeStatus = 'rejected';
        state.averageGradeError = action.payload;
      })
      .addCase(fetchAverageSemestrGrade.pending, (state) => {
        state.semestrAverageGradeStatus = 'loading';
        state.semestrAverageGradeError = null;
      })
      .addCase(fetchAverageSemestrGrade.fulfilled, (state, action) => {
        state.semestrAverageGradeStatus = 'resolved';
        state.semestrAverageGrade = action.payload;
        state.semestrAverageGradeError = null;
      })
      .addCase(fetchAverageSemestrGrade.rejected, (state, action) => {
        state.semestrAverageGradeStatus = 'rejected';
        state.semestrAverageGradeError = action.payload;
      })
  })
});

export const {clearGrades} = gradeSlice.actions;

export const gradesReducer = gradeSlice.reducer;