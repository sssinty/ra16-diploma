import { configureStore } from '@reduxjs/toolkit'
import stateCatalog from './stateCatalog';
import stateProduct from './stateProduct';

const store = configureStore({
	devTools: true,
	reducer: {
		state: stateCatalog,
		goods: stateProduct,
	}
})

export default store;