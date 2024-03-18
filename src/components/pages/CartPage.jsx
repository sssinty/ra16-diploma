import {useSelector, useDispatch} from "react-redux";
import { NavLink, useNavigate} from "react-router-dom";
import Header from "../header/Header";
import Banner from "../banner/Banner";
import Footer from "../footer/Footer";
import { clearCartState, postOrder, removeProduct } from "../../redux/stateCart";
import { useEffect, useState } from "react";

const CartPage = () => {
	const {cartProduct, fullPrice, quantityPositions, statusLoader} = useSelector((cart) => cart.cart);
	const dispatch = useDispatch();
	const navigation = useNavigate();
	const [transportationRules, setRules] = useState(false);
	const [phoneNumber, setPhoneNumber] = useState();
	const [addressOrder, setAddress] = useState();
	const [savedCartData, setSavedCartData] = useState();

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

	function handlerSubmit( event ) {
		event.preventDefault();
	}

	function handlerClickRemove ( event ) {
		const target = event.target;
		dispatch(removeProduct({id: target.parentNode.parentNode.id}));
	} 
	
	function changeCheckbox() {
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
					price: savedCartData.price,
					count: savedCartData.positions
				}
			]
		}

		dispatch(postOrder(order));
	}

	useEffect(() => {
		const initialValue = JSON.parse(localStorage.getItem("saveCart"));
		setSavedCartData(initialValue);
		console.log(initialValue)
	}, [])

	useEffect(() => {
		if(statusLoader === 'loade') {
			const delayDebounceFn = setTimeout(() => {
				navigation("/");
				dispatch(clearCartState());
			}, 2000)
			return () => clearTimeout(delayDebounceFn);
		}
  }, [statusLoader]);

	useEffect(() => {
		const saveCart = {
			product : cartProduct,
			price : fullPrice,
			positions: quantityPositions,
		}
		localStorage.setItem("saveCart", JSON.stringify(saveCart));
	}, [cartProduct]);



	console.log(savedCartData)
	return(
		<>
			<Header />
			{statusLoader === 'loade'
			?	<div className="order-complete">
					<h2>Спасибо за заказ!</h2>
				</div>

			: <main className="container">
					<div className="row">
						<div className="col">
							<Banner />
							<section className="cart">
							<h2 className="text-center">Корзина</h2>
								<table className="table table-bordered">
									<thead >
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
										{savedCartData.product.map((product, id) => {
											return <>
												<tr key={id} id={product.id}>
													<td scope="row">{id+1}</td>
													<td><NavLink to={`/catalog/${product.id}`}>{product.title}</NavLink></td>
													<td>{product.sizes.size}</td>
													<td>{product.pairsQuantity}</td>
													<td>{product.price} руб.</td>
													<td>{product.price} руб.</td>
													<td><button className="btn btn-outline-danger btn-sm" onClick={handlerClickRemove}>Удалить</button></td>
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
									<form className="card-body"  onSubmit={handlerSubmit}>
										<div className="form-group">
											<label htmlFor="phone">Телефон</label>
											<input className="form-control" id="phone" placeholder="Ваш телефон" onChange={changePhoneOrder}></input>
										</div>
										<div className="form-group">
											<label htmlFor="address">Адрес доставки</label>
											<input className="form-control" id="address" placeholder="Адрес доставки" onChange={changeAddressOrder}></input>
										</div>
										<div className="form-group form-check">
											<input type="checkbox" className="form-check-input" id="agreement" onChange={changeCheckbox}></input>
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