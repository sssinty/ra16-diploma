import { useEffect, useState } from "react";
import { useDispatch, useSelector} from "react-redux";
import CardProduct from "../CardProduct";
import { getTopSales } from "../../redux/stateCatalog";
import Preloader from "../Preloader";


const Bestsellers = () => {
	const {hitsCatalog, statusLoaderBestsellers} = useSelector((state) => state.state);
	const dispatch = useDispatch();
	const [unload, setLoader] = useState(false);
	
	useEffect(() => {
		dispatch(getTopSales());
	},[]);

	useEffect(() => {
		statusLoaderBestsellers === 'failed' && setLoader(true)
	},[statusLoaderBestsellers]);

	function handlerClickReboot() {
		dispatch(getTopSales());
		setLoader(false)
	}

	return (
		<>
			{statusLoaderBestsellers !== 'loade'
			? !unload 
				?	<Preloader />  
				: <div className="text-center">
						<h3>Что-то пошло не так</h3>
						<button className="btn btn-outline-primary" onClick={handlerClickReboot}>Перезагрузить</button>
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