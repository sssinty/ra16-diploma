import { useEffect, useState } from "react";
import { useDispatch, useSelector} from "react-redux";
import CardProduct from "../CardProduct";
import { getTopSales } from "../../redux/stateCatalog";
import Preloader from "../Preloader";


const Bestsellers = () => {
	const {hitsCatalog, statusLoadeBestsellers} = useSelector((state) => state.state);
	const dispatch = useDispatch();
	const [unloade, setLoade] = useState(false);
	
	useEffect(() => {
		dispatch(getTopSales());
	},[]);

	useEffect(() => {
		const delayDebounceFn = setTimeout(() => {
			statusLoadeBestsellers !== 'loade' && setLoade(true)
		}, 11000)
		return () => clearTimeout(delayDebounceFn);
	},[statusLoadeBestsellers]);

	function hendlerClickReboot() {
		dispatch(getTopSales());
		setLoade(false)
	}

	return (
		<>
			{statusLoadeBestsellers !== 'loade'
			? !unloade 
				?	<Preloader />  
				: <div className="text-center">
						<h3>Что-то пошло не так</h3>
						<button className="btn btn-outline-primary" onClick={hendlerClickReboot}>Перезагрузить</button>
					</div>

			:	<section className="top-sales">
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