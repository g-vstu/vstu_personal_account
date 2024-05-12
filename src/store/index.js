import {configureStore} from '@reduxjs/toolkit';
import {persistReducer, persistStore} from 'redux-persist';
import {combineReducers} from 'redux';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';

import {scheduleReducer} from './scheduleSlice';
import {weekDataReducer} from './weekDataSlice';
import {selectsDataReducer} from './selectsData';
import {authReducer} from './authSlice';
import {studentReducer} from './studentSlice';
import {gradesReducer} from './gradeSlice';
import {absencesReducer} from './absencesSlice';
import {attendanceReducer} from './attendanceSlice';
import {extraReducer} from "./extraSlice";

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  auth: authReducer,
  student: studentReducer,
  schedule: scheduleReducer,
  weekData: weekDataReducer,
  selectsData: selectsDataReducer,
  grades: gradesReducer,
  absences: absencesReducer,
  attendances: attendanceReducer,
  extra: extraReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      thunk: true
    }).concat(thunk),
});

export const persistor = persistStore(store);