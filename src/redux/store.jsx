import { configureStore } from '@reduxjs/toolkit'
import stateCatalog from './stateCatalog';

const store = configureStore({
	devTools: true,
	reducer: {
		state: stateCatalog
	}
})

export default store;