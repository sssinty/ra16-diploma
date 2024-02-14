import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios'


export const getTopSales = createAsyncThunk(
	'get/topSales',
	async () => {
		const response = await axios.get('http://localhost:7070/api/top-sales');
		return response.data;
	}
)

const initialState = {statusLoade: 'loading', error: null, hitsCatalog: [], catalog: [], }
const stateCatalog = createSlice({
	name: 'catalog',
	initialState,
	reducers: {

	},
	extraReducers: (bulider) => {
		bulider
		.addCase(getTopSales.pending, (state) => {
			state.statusLoade = 'loading',
			state.error = null
		})
		.addCase(getTopSales.fulfilled, (state, action) => {
			state.statusLoade = 'loade',
			state.hitsCatalog = action.payload
		})
		.addCase(getTopSales.rejected, (state, action) => {
			state.statusLoade = 'failed',
			state.error = action.payload
		})
	}
})

// export  {} = stateCatalog.actions
export default stateCatalog.reducer