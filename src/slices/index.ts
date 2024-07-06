import { combineReducers } from '@reduxjs/toolkit';
import counterReducer from './todo';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';

const rootReducer = combineReducers({
  counter: counterReducer,
});

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()

export default rootReducer;