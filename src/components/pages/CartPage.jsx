import {useSelector, useDispatch} from "react-redux";
import { NavLink, useNavigate} from "react-router-dom";
import Header from "../header/Header";
import Banner from "../banner/Banner";
import Footer from "../footer/Footer";
import { clearCartState, postOrder, removeProduct } from "../../redux/stateCart";
import { useEffect, useState } from "react";

const CartPage = () => {
	const {cartProduct, fullPrice, quantityPositions, statusLoade} = useSelector((cart) => cart.cart);
	const dispatch = useDispatch();
	const navigation = useNavigate();
	const [transportationRules, setRules] = useState(false);
	const [phoneNumber, setPhoneNumber] = useState();
	const [addressOrder, setAddress] = useState();

	function getRandomNumb() {
		const range = 1000;
		const count = 10;

		let interval = {};
		let result = [];

		for (let i = 0; i < count; ++i) {
			let randomNumber = Math.floor(Math.random() * (range - i));
				result.push((randomNumber in interval ? interval[randomNumber] : randomNumber) + 1);
			let l = range - i - 1;
			interval[randomNumber] = l in interval ? interval[l] : l;
		}
		return result[0];
	}

	function hendlerSubmit( event ) {
		event.preventDefault();
	}

	function hendlerClickRemove ( event ) {
		const target = event.target;
		dispatch(removeProduct({id: target.parentNode.parentNode.id}));
	} 
	
	function chengeCheckbox() {
		setRules(!transportationRules);
	}

	function changePhoneOrder( event ) {
		const target = event.target;
		setPhoneNumber(target.value);
	}

	function changeAddressOrder( event ) {
		const target = event.target;
		setAddress(target.value);
	}

	function designOrder() {
		const order = {
			owner: {
				phone: phoneNumber,
				address: addressOrder
			},
			items: [
				{
					id : getRandomNumb(),
					price: fullPrice,
					count: quantityPositions
				}
			]
		}

		dispatch(postOrder(order));
	}


	useEffect(() => {
		if(statusLoade === 'loade') {
			const delayDebounceFn = setTimeout(() => {
				navigation("/");
				dispatch(clearCartState());
			}, 1000)
			return () => clearTimeout(delayDebounceFn);
		}
  }, [statusLoade]);

	return(
		<>
			<Header />
			<Banner />
			{statusLoade === 'loade' ?
				<div className="order-complite">
					<h2>Спасибо за заказ!</h2>
				</div>
			:
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
													<td scope="row">{id+1}</td>
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
									<form className="card-body"  onSubmit={hendlerSubmit}>
										<div className="form-group">
											<label htmlFor="phone">Телефон</label>
											<input className="form-control" id="phone" placeholder="Ваш телефон" onChange={changePhoneOrder}></input>
										</div>
										<div className="form-group">
											<label htmlFor="address">Адрес доставки</label>
											<input className="form-control" id="address" placeholder="Адрес доставки" onChange={changeAddressOrder}></input>
										</div>
										<div className="form-group form-check">
											<input type="checkbox" className="form-check-input" id="agreement" onChange={chengeCheckbox}></input>
											<label className="form-check-label" htmlFor="agreement">Согласен с правилами доставки</label>
										</div>
										<button disabled={!transportationRules? true : false} type="submit" className="btn btn-outline-secondary" onClick={designOrder}>Оформить</button>
									</form>
								</div>
							</section>
						</div>
					</div>
				</main>
			}
			<Footer />
		</>
	)
}

export default CartPage;