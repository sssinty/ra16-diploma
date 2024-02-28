import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getTopSales = createAsyncThunk(
	'get/topSales',
	async () => {
		const response = await axios.get('http://localhost:7070/api/top-sales');
		return response.data;
	}
);

export const getCatalogCategorys = createAsyncThunk(
	'get/Categorys',
	async () => {
		const response = await axios.get('http://localhost:7070/api/categories');
		return response.data;
	}
);

export const getAllCategorys = createAsyncThunk(
	'get/AllCategorys',
	async () => {
		const response = await axios.get('http://localhost:7070/api/items');
		return response.data;
	}
);

export const getCategorysID = createAsyncThunk(
	'get/CategorysID',
	async (id) => {
		const response = await axios.get(`http://localhost:7070/api/items?categoryId=${id}`);
		return response.data;
	}
);

export const getMoreCatalog = createAsyncThunk(
	'get/MoreCatalog',
	async (id) => {
		if(id === 0) {
			const response = await axios.get('http://localhost:7070/api/items?offset=6');
			return response.data;
		} else {
			const response = await axios.get(`http://localhost:7070/api/items?categoryId=${id}&offset=6`);
			return response.data;
		}
	}
);

export const searchCatalog = createAsyncThunk(
	'searchCatalog',
	async (text) => {
		const response = await axios.get(`http://localhost:7070/api/items?q=${text}`)
		return response.data;
	}
)

const initialState = {
	statusLoadeCatalog: 'loading',
	statusLoadeBestsellers: 'loading',
	statusLoade: 'loading',
	statusLoadeCategorys: 'loading',
	error: null,
	hitsCatalog: [],
	categorys: [], 
	catalog: [] ,
	categoryID: 0,
	textSearch: "",
}

const stateCatalog = createSlice({
	name: 'catalog',
	initialState,
	reducers: {
		setID(state, action) {
			state.categoryID = action.payload;
		},

		setTextFormCatalog(state, action) {
			state.textSearch = action.payload;
		}

	},
	extraReducers: (bulider) => {
		bulider
		.addCase(getTopSales.pending, (state) => {
			state.statusLoadeBestsellers = 'loading',
			state.errorBestsellers = null
		})
		.addCase(getTopSales.fulfilled, (state, action) => {
			state.statusLoadeBestsellers = 'loade',
			state.hitsCatalog = action.payload
		})
		.addCase(getTopSales.rejected, (state, action) => {
			state.statusLoadeBestsellers = 'failed',
			state.errorBestsellers = action.payload
		})

		// Categories catalog

		.addCase(getCatalogCategorys.pending, (state) => {
			state.statusLoadeCategorys = 'loading',
			state.error = null
		})
		.addCase(getCatalogCategorys.fulfilled, (state, action) => {
			state.statusLoadeCategorys = 'loade',
			state.categorys = action.payload
		})
		.addCase(getCatalogCategorys.rejected, (state, action) => {
			state.statusLoadeCategorys = 'failed',
			state.error = action.payload
		})

		// Categorys All 

		.addCase(getAllCategorys.pending, (state) => {
			state.statusLoadeCatalog = 'loading',
			state.error = null
		})
		.addCase(getAllCategorys.fulfilled, (state, action) => {
			state.statusLoadeCatalog = 'loade',
			state.catalog = action.payload
		})
		.addCase(getAllCategorys.rejected, (state, action) => {
			state.statusLoadeCatalog = 'failed',
			state.error = action.payload
		})

		// Catigories get by id 

		.addCase(getCategorysID.pending, (state) => {
			state.statusLoadeCatalog = 'loading',
			state.error = null
		})
		.addCase(getCategorysID.fulfilled, (state, action) => {
			state.statusLoadeCatalog = 'loade',
			state.catalog = action.payload
		})
		.addCase(getCategorysID.rejected, (state, action) => {
			state.statusLoadeCatalog = 'failed',
			state.error = action.payload
		})

		// More catalogs get 

		.addCase(getMoreCatalog.pending, (state) => {
			state.statusLoadeCatalog = 'loading',
			state.error = null
		})
		.addCase(getMoreCatalog.fulfilled, (state, action) => {
			state.statusLoadeCatalog = 'loade',
			action.payload.map((elem) => {
				state.catalog.push(elem)
			})
		})
		.addCase(getMoreCatalog.rejected, (state, action) => {
			state.statusLoadeCatalog = 'failed',
			state.error = action.payload
		})

		// search catalog

		.addCase(searchCatalog.pending, (state) => {
			state.statusLoade = 'loading',
			state.error = null
		})
		.addCase(searchCatalog.fulfilled, (state, action) => {
			state.statusLoade = 'loade',
			state.categoryID === 0 ? state.catalog = action.payload : state.catalog = action.payload.filter((elem) => elem.category === state.categoryID)
		})
		.addCase(searchCatalog.rejected, (state, action) => {
			state.statusLoade = 'failed',
			state.error = action.payload
		})
	}
})

export  const {setID, setTextFormCatalog} = stateCatalog.actions;
export default stateCatalog.reducer;