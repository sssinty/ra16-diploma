import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getProduct = createAsyncThunk(
	'get/Product',
	async (id) => {
		const response = await axios.get(`http://localhost:7070/api/items/${id}`);
		return response.data;
	}
)

const initialState = {
	statusLoader: 'loading',
	error: null,
	product: {}
}

const stateProduct = createSlice({
	name: 'catalog',
	initialState,
	reducers: {

	}, extraReducers: (builder) => {
		builder
		.addCase(getProduct.pending, (state) => {
			state.statusLoader = 'loading',
			state.error = null
		})
		.addCase(getProduct.fulfilled, (state, action) => {
			state.statusLoader = 'loade',
			state.product = action.payload
		})
		.addCase(getProduct.rejected, (state, action) => {
			state.statusLoader = 'failed',
			state.error = action.payload
		})
	}
})

export default stateProduct.reducer;