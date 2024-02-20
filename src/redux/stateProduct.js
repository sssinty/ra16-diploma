import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios'

export const getPorduct = createAsyncThunk(
	'get/Product',
	async (id) => {
		const response = await axios.get(`http://localhost:7070/api/items/${id}`);
		return response.data;
	}
)

const initialState = {
	statusLoade: 'loading',
	error: null,
	product: {}
}

const stateProduct = createSlice({
	name: 'catalog',
	initialState,
	reducers: {

	}, extraReducers: (bulider) => {
		bulider
		.addCase(getPorduct.pending, (state) => {
			state.statusLoade = 'loading',
			state.error = null
		})
		.addCase(getPorduct.fulfilled, (state, action) => {
			console.log(action.payload)
			state.statusLoade = 'loade',
			state.product = action.payload
		})
		.addCase(getPorduct.rejected, (state, action) => {
			state.statusLoade = 'failed',
			state.error = action.payload
		})
	}
})

export default stateProduct .reducer