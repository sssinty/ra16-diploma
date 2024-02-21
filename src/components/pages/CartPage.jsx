import {useSelector, useDispatch} from "react-redux";
import { NavLink } from "react-router-dom";
import Header from "../header/Header";
import Banner from "../banner/Banner";
import Footer from "../footer/Footer";
import { removeProduct } from "../../redux/stateCart";

const CartPage = () => {
	const {cartProduct, fullPrice} = useSelector((cart) => cart.cart);
	const dispatch = useDispatch();
	console.log(cartProduct, fullPrice)

	function hendlerClickRemove ( event ) {
		const target = event.target;
		dispatch(removeProduct({id: target.parentNode.parentNode.id}));
	} 
	
	return(
		<>
		<Header />
		<Banner />
		<main className="container">
			<div className="row">
				<div className="col">
					<section className="cart">
					<h2 className="text-center">Корзина</h2>
						<table className="table table-bordered">
							<thead>
								<tr>
									<th scope="col">#</th>
									<th scope="col">Название</th>
									<th scope="col">Размер</th>
									<th scope="col">Кол-во</th>
									<th scope="col">Стоимость</th>
									<th scope="col">Итого</th>
									<th scope="col">Действия</th>
								</tr>
							</thead>
							<tbody>
								{cartProduct.map((product, id) => {
									return <>
										<tr key={id} id={product.id}>
											<td scope="row">1</td>
											<td><NavLink to={`/catalog/${product.id}.html`}>{product.title}</NavLink></td>
											<td>{product.sizes.size}</td>
											<td>{product.pairsQuantity}</td>
											<td>{product.price} руб.</td>
											<td>{product.price} руб.</td>
											<td><button className="btn btn-outline-danger btn-sm" onClick={hendlerClickRemove}>Удалить</button></td>
										</tr>
									</>
								})}

								<tr>
									<td colSpan="5" className="text-right">Общая стоимость</td>
									<td>{fullPrice} руб.</td>
								</tr>
							</tbody>
						</table>
					</section>
					<section className="order">
						<h2 className="text-center">Оформить заказ</h2>
						<div className="card" style={{"maxWidth": "30rem",  "margin": "0 auto"}}>
							<form className="card-body">
								<div className="form-group">
									<label htmlFor="phone">Телефон</label>
									<input className="form-control" id="phone" placeholder="Ваш телефон"></input>
								</div>
								<div className="form-group">
									<label htmlFor="address">Адрес доставки</label>
									<input className="form-control" id="address" placeholder="Адрес доставки"></input>
								</div>
								<div className="form-group form-check">
									<input type="checkbox" className="form-check-input" id="agreement"></input>
									<label className="form-check-label" htmlFor="agreement">Согласен с правилами доставки</label>
								</div>
								<button type="submit" className="btn btn-outline-secondary">Оформить</button>
							</form>
						</div>
					</section>
				</div>
			</div>
		</main>
		<Footer />
		</>
	)
}

export default CartPage;