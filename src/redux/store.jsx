import { configureStore } from '@reduxjs/toolkit'
import stateCatalog from './stateCatalog';
import stateProduct from './stateProduct';
import stateCart from './stateCart';

const store = configureStore({
	devTools: true,
	reducer: {
		state: stateCatalog,
		goods: stateProduct,
		cart: stateCart
	}
})

export default store;