import { useEffect, useState } from "react";
import CardProduct from "../CardProduct";
import { useDispatch, useSelector} from "react-redux";
import { getAllCategories, getCatalog, getCategoriesID, getMoreCatalog, searchCatalog, setID} from "../../redux/stateCatalog";
import Preloader from "../Preloader";
import { Link } from "react-router-dom";

const Catalog = () => {
	const {
		catalog,
		categories,
		categoriesID, 
		textSearch, 
		statusLoaderCatalog,
		statusLoaderCategories,
		statusLoaderMore,
		statusLoaderSearch
	} = useSelector((state) => state.state);

	const [isActiveID, setActiveID] = useState(0);
	const [visionMore, setVision] = useState(false);
	const dispatch = useDispatch();

	useEffect(() =>{
		dispatch(getAllCategories());
		textSearch === "" && dispatch(getCatalog());
	},[]);

	useEffect(() => {
		if(catalog.length === 0 && statusLoaderCatalog === 'loade') {
			setVision(true);
		}
	}, [catalog]);

	useEffect(() => {
		statusLoaderCategories === 'failed' && dispatch(getAllCategories());
	}, [statusLoaderCategories]);

	useEffect(() => {
		statusLoaderMore === 'failed' && dispatch(getMoreCatalog([categoriesID]));
	}, [statusLoaderMore]);

	useEffect(() => {
		statusLoaderSearch === 'failed' && dispatch(searchCatalog([textSearch, categoriesID]));
	}, [statusLoaderSearch]);

	function handlerClickCategories( event ) {
		const id = event.target.parentNode.id;
		if(textSearch !== "") {
			dispatch(searchCatalog([textSearch, id]));
			dispatch(setID(Number(id)));
			
			setActiveID(id);
			setVision(false);
		} else {
			dispatch(getCategoriesID(id));
			dispatch(setID(Number(id)));
			
			setActiveID(id);
			setVision(false);
		}
	}

	function handlerClickMore() {
		textSearch !== '' ? dispatch(getMoreCatalog([categoriesID, textSearch])) : dispatch(getMoreCatalog([categoriesID]))
		setVision(true);
	}
	
	function handlerClickReboot () {
		if(textSearch !== "") {
			dispatch(searchCatalog([textSearch, categoriesID]));
		} else {
			isActiveID !== 0 ? dispatch(getCategoriesID(isActiveID)) : dispatch(getCatalog());
		}
		
	}

	return(
		<>
			{statusLoaderCategories !== 'loade' && categories.length === 0
			? ''
			: <ul className="catalog-categories nav justify-content-center">
					<li className="nav-item" id='0'>
						<Link className={Number(isActiveID) === 0 ? "nav-link active" : "nav-link"} onClick={handlerClickCategories}>Все</Link>
					</li>
					{categories.map((elem, id) => {
						return(
							<li className="nav-item" key={id} id={elem.id}>
								<Link className={Number(isActiveID) === elem.id ? "nav-link active" : "nav-link"}  onClick={handlerClickCategories}>{elem.title}</Link>
							</li>
						)
					})}
				</ul>
			}

			{statusLoaderCatalog !== 'loade'
			? statusLoaderCatalog === 'failed'
				?	<div className="text-center">
						<h3>Что-то пошло не так</h3>
						<button className="btn btn-outline-primary" onClick={handlerClickReboot}>Перезагрузить</button>
					</div>
				: <Preloader /> 
			: (
				catalog.length !== 0 && statusLoaderCatalog === 'loade'
					? <>
							<div className="row">
								{catalog.map((elem, keyID) => {
									return <CardProduct id={elem.id} images={elem.images} price={elem.price} title={elem.title} key={keyID} />
								})}
							</div>
							<div className="text-center">
								{visionMore && statusLoaderMore !== 'loade' && <Preloader /> }
								{!visionMore && <button className="btn btn-outline-primary" onClick={handlerClickMore}>Загрузить ещё</button>}
							</div>
						</>	
					: <div className="not-found-catalog">
							<h3>Ничего не найдено</h3> 
						</div>
				)
			}
		</>
	)
}

export default Catalog;