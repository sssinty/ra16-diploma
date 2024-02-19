import { useEffect, useState } from "react";
import CardProduct from "../CardProduct";
import { useDispatch, useSelector} from "react-redux";
import { getAllCategorys, getCatalogCategorys, getCategorysID, getMoreCatalog, searchCatalog, setID } from "../../redux/stateCatalog";

const Catalog = () => {
	const {catalog, categorys, categoryID, textSearch} = useSelector((state) => state.state);
	const [visionMore, setVision] = useState(false)
	const dispatch = useDispatch();

	useEffect(() =>{
		dispatch(getAllCategorys());
		dispatch(getCatalogCategorys());
	},[]);

	function handlerClikcCategorys(event) {
		const id = event.target.parentNode.id;
		dispatch(getCategorysID(id));
		dispatch(setID(Number(id)));
		setVision(false);
		if(textSearch) {
			dispatch(searchCatalog(textSearch))
		}
	}

	function handlerClikMore() {
		console.log(categoryID)
		dispatch(getMoreCatalog(categoryID));
		setVision(true);
	}

	return(
		<>
			<ul className="catalog-categories nav justify-content-center">
				<li className="nav-item" id='0'>
					<a className="nav-link active" onClick={handlerClikcCategorys}>Все</a>
				</li>
				{categorys.map((elem) => {
					return(
						<li className="nav-item" key={elem.id} id={elem.id}>
							<a className="nav-link" onClick={handlerClikcCategorys}>{elem.title}</a>
						</li>
					)
				})}
			</ul>
			<div className="row">
				{catalog.map((elem) => {
					return <CardProduct category={elem.category} id={elem.id} images={elem.images} price={elem.price} title={elem.title} key={elem.key} />
				})}
			</div>
			<div className="text-center">
				{!visionMore ? <button className="btn btn-outline-primary" onClick={handlerClikMore}>Загрузить ещё</button> : ''}
			</div>
		</>
	)
}

export default Catalog;