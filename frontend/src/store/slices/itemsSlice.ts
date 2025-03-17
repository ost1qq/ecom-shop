import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export interface IItem {
	id: number;
	imageUrl: string;
	name: string;
	count: number;
	size: {
		width: number;
		height: number;
	};
	weight: string;
	comments: number[];
}

interface IInitialState {
	items: IItem[];
	status: string;
}

export const fetchItems = createAsyncThunk(
	'items/fetchItems',
	async (_, { rejectWithValue }) => {
		try {
			const { data } = await axios.get('http://localhost:8888/products');
			return data;
		} catch (error: unknown) {
			if (axios.isAxiosError(error)) {
				console.error('Error fetching items:', error);
				return rejectWithValue(
					error.response?.data?.message || 'Failed to fetch items'
				);
			}
			console.error('Unexpected error:', error);
			return rejectWithValue('An unexpected error occurred');
		}
	}
);

const initialState: IInitialState = {
	items: [],
	status: '',
};

const itemsSlice = createSlice({
	name: 'items',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchItems.pending, (state) => {
				state.status = 'loading';
				state.items = [];
			})
			.addCase(fetchItems.fulfilled, (state, action) => {
				state.status = 'success';
				state.items = action.payload;
			})
			.addCase(fetchItems.rejected, (state, action) => {
				state.status = 'failed';
				state.items = [];
				console.error('Error fetching items:', action.payload);
			});
	},
});

export default itemsSlice.reducer;
