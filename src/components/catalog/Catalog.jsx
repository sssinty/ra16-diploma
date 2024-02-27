import { useEffect, useState } from "react";
import CardProduct from "../CardProduct";
import { useDispatch, useSelector} from "react-redux";
import { getAllCategorys, getCatalogCategorys, getCategorysID, getMoreCatalog, searchCatalog, setID } from "../../redux/stateCatalog";
import { Link } from "react-router-dom";
import Preloader from "../Preloader";

const Catalog = () => {
	const {catalog, categorys, categoryID, textSearch, statusLoadeCatalog} = useSelector((state) => state.state);
	const [visionMore, setVision] = useState(false);
	const dispatch = useDispatch();

	useEffect(() =>{
		dispatch(getAllCategorys());
		dispatch(getCatalogCategorys());
	},[]);

	function handlerClikcCategorys( event ) {
		const id = event.target.parentNode.id;
		
		dispatch(getCategorysID(id));
		dispatch(setID(Number(id)));

		setVision(false);
		if(textSearch) {
			dispatch(searchCatalog(textSearch));
		}
	}

	function handlerClikMore() {
		dispatch(getMoreCatalog(categoryID));
		setVision(true);
	}

	return(
		<>
			<ul className="catalog-categories nav justify-content-center">
				<li className="nav-item" id='0'>
					<Link className="nav-link active" onClick={handlerClikcCategorys}>Все</Link>
				</li>
				{categorys.map((elem) => {
					return(
						<li className="nav-item" key={elem.id} id={elem.id}>
							<Link className="nav-link" onClick={handlerClikcCategorys}>{elem.title}</Link>
						</li>
					)
				})}
			</ul>

			{statusLoadeCatalog !== 'loade' ? 
				<Preloader /> 
			:
				<div className="row">
					{catalog.map((elem, keyID) => {
						return <CardProduct id={elem.id} images={elem.images} price={elem.price} title={elem.title} key={keyID} />
					})}
				</div>
			}

			<div className="text-center">
				{!visionMore ? <button className="btn btn-outline-primary" onClick={handlerClikMore}>Загрузить ещё</button> : ''}
			</div>
		</>
	)
}

export default Catalog;