import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios'

export const postOrder = createAsyncThunk(
	'post/Order',
	async (order) => {
		console.log(order)
		const response = await axios.post("http://localhost:7070/api/order", order);
		console.log(response.data)
		return response.data
	}
)

const initialState = {
	statusLoade: 'loading',
	error: null,
	cartProduct: [],
	fullPrice: 0,
	quantityPositions: 0
}

const stateCart = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addProduct(state, action) {
			if(Object.keys(state.cartProduct).length === 0) {
				state.cartProduct.push(action.payload);
			} else {
				state.cartProduct.map((product) => {
				product.title === action.payload.title && product.sizes.size === action.payload.sizes.size ? 
					state.cartProduct = state.cartProduct.map((product) => ({ ...product, pairsQuantity: product.pairsQuantity + action.payload.pairsQuantity }))
				: 
					state.cartProduct.push(action.payload);
				});
			}

			state.fullPrice = state.cartProduct.reduce((accumulator, current) => accumulator = accumulator + (current.price * current.pairsQuantity), 0);
			state.quantityPositions = state.cartProduct.length;
		},

		removeProduct(state, action) {
			state.cartProduct.map((product) => {
				if(product.id === Number(action.payload.id)) {
					state.fullPrice = state.fullPrice - (product.price * product.pairsQuantity);
				}
			})

			state.cartProduct = state.cartProduct.filter(product => product.id !== Number(action.payload.id));
			state.quantityPositions = state.cartProduct.length;
		},

		clearCartState(state) {
			state.cartProduct = [],
			state.fullPrice = 0,
			state.quantityPositions = 0,
			state.statusLoade = 'loading'
		}
		
	}, extraReducers: (bulider) => {
		bulider
		.addCase(postOrder.pending, (state) => {
			state.statusLoade = 'loading',
			state.error = null
		})
		.addCase(postOrder.fulfilled, (state) => {
			state.statusLoade = 'loade'
		})
		.addCase(postOrder.rejected, (state, action) => {
			state.statusLoade = 'failed',
			state.error = action.payload
		})
	}
})

export  const {addProduct, removeProduct, clearCartState} = stateCart.actions;
export default stateCart.reducer