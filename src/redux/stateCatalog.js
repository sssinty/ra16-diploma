import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getTopSales = createAsyncThunk(
	'get/topSales',
	async () => {
		const response = await axios.get('http://localhost:7070/api/top-sales');
		return response.data;
	}
);

export const getAllCategories = createAsyncThunk(
	'get/AllCategories',
	async () => {
		const response = await axios.get('http://localhost:7070/api/categories');
		return response.data;
	}
);

export const getCatalog = createAsyncThunk(
	'get/Catalog',
	async () => {
		const response = await axios.get('http://localhost:7070/api/items');
		return response.data;
	}
);

export const getCategoriesID = createAsyncThunk(
	'get/CategoriesID',
	async (id) => {
		const response = await axios.get(`http://localhost:7070/api/items?categoryId=${id}`);
		return response.data;
	}
);

export const getMoreCatalog = createAsyncThunk(
	'get/MoreCatalog',
	async (id, text) => {
		if(id === 0) {
			const response = await axios.get('http://localhost:7070/api/items?offset=6');
			return response.data;
		// }else if(text && id) {
		// 	const response = await axios.get(`http://localhost:7070/api/items?categoryId=${id}&offset=6?`)
		// 	return response.data;
		}else {
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
	statusLoaderCatalog: 'loading',
	statusLoaderBestsellers: 'loading',
	statusLoaderCategories: 'loading',
	statusLoaderMore: 'loading',
	statusLoaderSearch: 'loading',
	error: null,
	hitsCatalog: [],
	categories: [], 
	catalog: [] ,
	categoriesID: 0,
	textSearch: "",
}

const stateCatalog = createSlice({
	name: 'catalog',
	initialState,
	reducers: {
		setID(state, action) {
			state.categoriesID = action.payload;
		},

		setTextFormCatalog(state, action) {
			state.textSearch = action.payload;
		}

	},
	extraReducers: (builder) => {
		builder
		.addCase(getTopSales.pending, (state) => {
			state.statusLoaderBestsellers = 'loading',
			state.errorBestsellers = null
		})
		.addCase(getTopSales.fulfilled, (state, action) => {
			state.statusLoaderBestsellers = 'loade',
			state.hitsCatalog = action.payload
		})
		.addCase(getTopSales.rejected, (state, action) => {
			state.statusLoaderBestsellers = 'failed',
			state.errorBestsellers = action.payload
		})

		// Categories catalog

		.addCase(getCatalog.pending, (state) => {
			state.statusLoaderCatalog = 'loading',
			state.error = null
		})
		.addCase(getCatalog.fulfilled, (state, action) => {
			state.statusLoaderCatalog = 'loade',
			state.catalog = action.payload
		})
		.addCase(getCatalog.rejected, (state, action) => {
			state.statusLoaderCatalog = 'failed',
			state.error = action.payload
		})

		// Categories All 

		.addCase(getAllCategories.pending, (state) => {
			state.statusLoaderCategories = 'loading',
			state.error = null
		})
		.addCase(getAllCategories.fulfilled, (state, action) => {
			state.statusLoaderCategories = 'loade',
			state.categories = action.payload
		})
		.addCase(getAllCategories.rejected, (state, action) => {
			state.statusLoaderCategories = 'failed',
			state.error = action.payload
		})

		// Categories get by id 

		.addCase(getCategoriesID.pending, (state) => {
			state.statusLoaderCatalog = 'loading',
			state.error = null
		})
		.addCase(getCategoriesID.fulfilled, (state, action) => {
			state.statusLoaderCatalog = 'loade',
			state.catalog = action.payload
		})
		.addCase(getCategoriesID.rejected, (state, action) => {
			state.statusLoaderCatalog = 'failed',
			state.error = action.payload
		})

		// More catalogs get 

		.addCase(getMoreCatalog.pending, (state) => {
			state.statusLoaderMore = 'loading',
			state.error = null
		})
		.addCase(getMoreCatalog.fulfilled, (state, action) => {
			state.statusLoaderMore = 'loade',
			action.payload.map((elem) => {
				const textLowerCase = state.textSearch.toLowerCase();
				if(state.textSearch !== "") {
					elem.title.toLowerCase().includes(textLowerCase) && state.catalog.push(elem);
				} else {
					state.catalog.push(elem);
				}
			})
		})
		.addCase(getMoreCatalog.rejected, (state, action) => {
			state.statusLoaderMore = 'failed',
			state.error = action.payload
		})

		// search catalog

		.addCase(searchCatalog.pending, (state) => {
			state.statusLoaderCatalog = 'loading',
			state.error = null
		})
		.addCase(searchCatalog.fulfilled, (state, action) => {
			state.statusLoaderCatalog = 'loade',
			state.categoriesID === 0 ? state.catalog = action.payload : state.catalog = action.payload.filter((elem) => state.categoriesID === elem.category)
		})
		.addCase(searchCatalog.rejected, (state, action) => {
			state.statusLoaderCatalog = 'failed',
			state.error = action.payload
		})
	}
})

export  const {setID, setTextFormCatalog} = stateCatalog.actions;
export default stateCatalog.reducer;