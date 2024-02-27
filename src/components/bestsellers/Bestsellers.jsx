import { useEffect } from "react";
import { useDispatch, useSelector} from "react-redux";
import CardProduct from "../CardProduct";
import { getTopSales } from "../../redux/stateCatalog";
import Preloader from "../Preloader";


const Bestsellers = () => {
	const {hitsCatalog, statusLoadeBestsellers} = useSelector((state) => state.state);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getTopSales());
	},[]);

	return (
		<>
			{statusLoadeBestsellers !== 'loade' ?
				<Preloader /> :
				<section className="top-sales">
				<h2 className="text-center">Хиты продаж!</h2>
				<div className="row">
					{hitsCatalog.map((elem) => {
						return <CardProduct category={elem.category} id={elem.id} images={elem.images} price={elem.price} title={elem.title} key={elem.id} />
					})}
				</div>
			</section>
			}
		</>
	)
}

export default Bestsellers;