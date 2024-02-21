import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios'

export const getOrder = createAsyncThunk(
	'get/Order',
	async () => {
		const response = await axios.post("http://localhost:7070/api/order");
		return response.data;
	}
)

const initialState = {
	statusLoade: 'loading',
	error: null,
	cartProduct: [],
	order: {},
	fullPrice: 0
}

const stateCart = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addProduct(state, action) {
			if(Object.keys(state.cartProduct).length === 0) {
				state.cartProduct.push(action.payload);
				state.fullPrice = action.payload.price;
			} else {
				state.cartProduct.map((product) => {
					product.title === action.payload.title && product.size === action.payload.sizes.size ? 
					{...product, pairsQuantity: action.pairsQuantity} : 
					state.cartProduct.push(action.payload);

					state.fullPrice = state.fullPrice + action.payload.price;
				})
			}
		},

		removeProduct(state, action) {
			state.cartProduct.map((product) => {
				if(product.id === Number(action.payload.id)) {
					state.fullPrice = state.fullPrice - product.price;
				}
			})
			state.cartProduct = state.cartProduct.filter((product) => product.id === action.payload.id);
		}
	}, extraReducers: (bulider) => {
		bulider
		// .addCase(getPorduct.pending, (state) => {
		// 	state.statusLoade = 'loading',
		// 	state.error = null
		// })
		// .addCase(getPorduct.fulfilled, (state, action) => {
		// 	console.log(action.payload)
		// 	state.statusLoade = 'loade',
		// 	state.product = action.payload
		// })
		// .addCase(getPorduct.rejected, (state, action) => {
		// 	state.statusLoade = 'failed',
		// 	state.error = action.payload
		// })
	}
})

export  const {addProduct, removeProduct} = stateCart.actions;
export default stateCart.reducer