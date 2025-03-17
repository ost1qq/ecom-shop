import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	modalStatus: 0,
};

const modalSlice = createSlice({
	name: 'modal',
	initialState,
	reducers: {
		setModalStatus(state, action) {
			state.modalStatus = action.payload;
		},
	},
});

export const { setModalStatus } = modalSlice.actions;

export default modalSlice.reducer;
