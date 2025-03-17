import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
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
	currentProductId: number;
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

export const deleteItem = createAsyncThunk(
	'items/deleteItem',
	async (id: number, { rejectWithValue }) => {
		try {
			await axios.delete(`http://localhost:8888/products/${id}`);
			return id;
		} catch (error: unknown) {
			if (axios.isAxiosError(error)) {
				console.error('Error deleting item:', error);
				return rejectWithValue(
					error.response?.data?.message || 'Failed to delete item'
				);
			}
			console.error('Unexpected error:', error);
			return rejectWithValue('An unexpected error occurred');
		}
	}
);

const initialState: IInitialState = {
	items: [],
	currentProductId: 0,
	status: '',
};

const itemsSlice = createSlice({
	name: 'items',
	initialState,
	reducers: {
		setSort(
			state,
			action: PayloadAction<{ field: keyof IItem; order: 'asc' | 'desc' }>
		) {
			const { field, order } = action.payload;
			state.items.sort((a, b) => {
				if (a[field] < b[field]) return order === 'asc' ? -1 : 1;
				if (a[field] > b[field]) return order === 'asc' ? 1 : -1;
				return 0;
			});
		},
		setCurrentProductId(state, action: PayloadAction<number>) {
			state.currentProductId = action.payload;
			console.log('currentProductId:', state.currentProductId);
		},
	},
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
			})
			.addCase(deleteItem.fulfilled, (state, action) => {
				state.items = state.items.filter((item) => item.id !== action.payload);
				state.currentProductId = 0;
			});
	},
});

export const { setSort, setCurrentProductId } = itemsSlice.actions;
export default itemsSlice.reducer;
