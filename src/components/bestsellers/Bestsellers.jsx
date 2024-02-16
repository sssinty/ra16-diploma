import { useEffect } from "react";
import { useDispatch, useSelector} from "react-redux";
import CardProduct from "../CardProduct";
import { getTopSales } from "../../redux/stateCatalog";


const Bestsellers = () => {
	const ArrayHits = useSelector((state) => state.state.hitsCatalog)
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getTopSales())
		
	},[])
	console.log(ArrayHits)
	return (
		<>
			<section className="top-sales">
				<h2 className="text-center">Хиты продаж!</h2>
				<div className="row">
					{ArrayHits.map((elem) => {
						return <CardProduct category={elem.category} id={elem.id} images={elem.images} price={elem.price} title={elem.title} key={elem.id} />
					})}
				</div>
			</section>
		</>
	)
}
export default Bestsellers;