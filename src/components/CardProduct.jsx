import { NavLink } from "react-router-dom";

const CardProduct = ({id, category, title, price, images}) => {
	return (
		<div className="col-4" key={id}>
		<div className="card">
			<img src={images[0]} className="card-img-top img-fluid" alt="Босоножки 'MYER'"></img>
			<div className="card-body">
				<p className="card-text">{title}</p>
				<p className="card-text">{price}</p>
				<NavLink to={`/products/${id}`}><button className="btn btn-outline-primary">Заказать</button></NavLink>
				{/* <a href="/products/1.html" className="btn btn-outline-primary">Заказать</a> */}
			</div>
		</div>
	</div>
	)
}

export default CardProduct;