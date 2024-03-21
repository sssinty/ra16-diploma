import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios'

export const postOrder = createAsyncThunk(
	'post/Order',
	async (order) => {
		const response = await axios.post("http://localhost:7070/api/order", order);
		return response.data
	}
)

const initialState = {
	statusLoader: 'loading',
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
				state.cartProduct = [action.payload]
			} else {
				const isNotNewProduct = state.cartProduct.some((elem) => elem.title === action.payload.title && elem.sizes.size === action.payload.sizes.size)
					if(isNotNewProduct) {
						state.cartProduct = state.cartProduct.map((elem) => {
							if(elem.title === action.payload.title && elem.sizes.size === action.payload.sizes.size) {
								return { ...elem, pairsQuantity: elem.pairsQuantity + action.payload.pairsQuantity }
							} else {
								return elem
							}
						});
					} else {
						state.cartProduct = [...state.cartProduct, action.payload];
					}

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
			state.statusLoader = 'loading',
			window.localStorage.clear()
		},

		updateQuantityPositions(state, action) {
			state.quantityPositions = action.payload
		}, 
		
	}, extraReducers: (builder) => {
		builder
		.addCase(postOrder.pending, (state) => {
			state.statusLoader = 'loading',
			state.error = null
		})
		.addCase(postOrder.fulfilled, (state) => {
			state.statusLoader = 'loade'
		})
		.addCase(postOrder.rejected, (state, action) => {
			state.statusLoader = 'failed',
			state.error = action.payload
		})
	}
})

export  const {addProduct, removeProduct, clearCartState, updateQuantityPositions} = stateCart.actions;
export default stateCart.reducer