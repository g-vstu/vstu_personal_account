import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {getCurrentMonth} from "../assets/utils/functions";

export const fetchAbsences = createAsyncThunk(
  `absences/fetchAbsences`,
  async (token, {rejectWithValue}) => {
    try {
      const config = {
        headers: {
          'Content-type': "application/x-www-form-urlencoded",
          'Authorization': `Bearer ${token}`,
        },
      };

      const {data} = await axios.get(
        'https://student.vstu.by/api/absences',
        config
      );

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


const initialState = {
  absences: [],
  absencesStatus: null,
  absencesError: null,
  month: null,
  year: null,
};

const absencesSlice = createSlice({
  name: 'absences',
  initialState,
  reducers: {
    setMonth(state, action) {
      state.month = action.payload;
    },
    setYear(state, action) {
      state.year = action.payload;
    },
    clearAbsences(state) {
      state.absences = [];
      state.absencesStatus = null;
      state.absencesError = null;
    }
  },
  extraReducers: (builder => {
    builder
      .addCase(fetchAbsences.pending, (state) => {
        state.absencesStatus = 'loading';
        state.absencesError = null;
      })
      .addCase(fetchAbsences.fulfilled, (state, action) => {
        state.absencesStatus = 'resolved';
        state.absences = action.payload;
        state.absencesError = null;
      })
      .addCase(fetchAbsences.rejected, (state, action) => {
        state.absencesStatus = 'rejected';
        state.absencesError = action.payload;
      })
  })
});

export const {setMonth, setYear, clearAbsences} = absencesSlice.actions;

export const absencesReducer = absencesSlice.reducer;