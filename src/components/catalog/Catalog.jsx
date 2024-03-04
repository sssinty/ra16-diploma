import { useEffect, useState } from "react";
import CardProduct from "../CardProduct";
import { useDispatch, useSelector} from "react-redux";
import { getAllCategorys, getCatalogCategorys, getCategorysID, getMoreCatalog, searchCatalog, setID } from "../../redux/stateCatalog";
import Preloader from "../Preloader";
import { Link } from "react-router-dom";

const Catalog = () => {
	const {
		catalog,
		categorys,
		categoryID, 
		textSearch, 
		statusLoadeCatalog,
		statusLoadeCategorys,
		statusLoadeMore
	} = useSelector((state) => state.state);

	const [isActive, setActive] = useState(0)
	const [visionMore, setVision] = useState(false);
	const [unloade, setLoade] = useState(false);
	const dispatch = useDispatch();

	useEffect(() =>{
		dispatch(getAllCategorys());
		dispatch(getCatalogCategorys());
	},[]);

	useEffect(() => {
		if(catalog.length === 0 && statusLoadeCatalog === 'loade') {
			setVision(true);
		}
	}, [catalog]);

	useEffect(() => {
		const delayDebounceFn = setTimeout(() => {
			statusLoadeCatalog !== 'loade' && setLoade(true)
		}, 11000)
		return () => clearTimeout(delayDebounceFn);
	},[statusLoadeCatalog]);

	function handlerClikcCategorys( event ) {
		const id = event.target.parentNode.id;
		
		dispatch(getCategorysID(id));
		dispatch(setID(Number(id)));

		setActive(id);
		setVision(false);
		if(textSearch) {
			dispatch(searchCatalog(textSearch));
		}
	}

	function handlerClikMore() {
		dispatch(getMoreCatalog(categoryID));
		setVision(true);
	}
	
	function hendlerClickReboot () {
		dispatch(getCatalogCategorys());
		setLoade(false)
	}

	return(
		<>
			{statusLoadeCategorys !== 'loade' 
			? ''
			: <ul className="catalog-categories nav justify-content-center">
					<li className="nav-item" id='0'>
						<Link className={Number(isActive) === 0 ? "nav-link active" : "nav-link"} onClick={handlerClikcCategorys}>Все</Link>
					</li>
					{categorys.map((elem, id) => {
						return(
							<li className="nav-item" key={id} id={elem.id}>
								<Link className={Number(isActive) === elem.id ? "nav-link active" : "nav-link"}  onClick={handlerClikcCategorys}>{elem.title}</Link>
							</li>
						)
					})}
				</ul>
			}

			{statusLoadeCatalog !== 'loade'
			? !unloade 
				?	<Preloader />  
				: <div className="text-center">
						<h3>Что-то пошло не так</h3>
						<button className="btn btn-outline-primary" onClick={hendlerClickReboot}>Перезагрузить</button>
					</div>
			: (
					catalog.length === 0 
					? <div className="not-found-catalog">
							<h3>Ничего не найдено</h3> 
						</div>
					: <>
							<div className="row">
								{catalog.map((elem, keyID) => {
									return <CardProduct id={elem.id} images={elem.images} price={elem.price} title={elem.title} key={keyID} />
								})}
							</div>
							<div className="text-center">
								{visionMore && statusLoadeMore !== 'loade' && <Preloader /> }
								{!visionMore && <button className="btn btn-outline-primary" onClick={handlerClikMore}>Загрузить ещё</button>}
							</div>
						</>
				)
			}
		</>
	)
}

export default Catalog;