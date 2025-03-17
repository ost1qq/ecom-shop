import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import itemsSlice from './slices/itemsSlice';
import modalSlice from './slices/modalSlice';

export const store = configureStore({
	reducer: {
		items: itemsSlice,
		modal: modalSlice,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
