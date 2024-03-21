import { NavLink, useNavigate} from "react-router-dom";
import { useSelector, useDispatch} from "react-redux";
import FromHeader from "../form/FormHeader";
import { useEffect } from "react";
import { updateQuantityPositions } from "../../redux/stateCart";

const Header = () => {
	const {quantityPositions} = useSelector((cart) => cart.cart);
	const navigation = useNavigate();
	const dispatch = useDispatch();
	
	useEffect(() => {
		const initiaValue = JSON.parse(window.localStorage.getItem('position'));
		const savedQuantityPositions = initiaValue !== null ? initiaValue : 0;
		quantityPositions === 0 && savedQuantityPositions !== 0 && dispatch(updateQuantityPositions(savedQuantityPositions));
	}, []);

	return (
		<header className="container">
		<div className="row">
			<div className="col">
				<nav className="navbar navbar-expand-sm navbar-light bg-light">
					<NavLink className="navbar-brand" to="/">
						<img src="..\src\assets\header-logo.png" alt="Bosa Noga"></img>
					</NavLink>
					<div className="collapse navbar-collapse" id="navbarMain">
						<ul className="navbar-nav mr-auto">
							<li className="nav-item">
								<NavLink className="nav-link" to="/">Главная</NavLink>
							</li>
							<li className="nav-item">
								<NavLink className="nav-link" to="/catalog">Каталог</NavLink>
							</li>
							<li className="nav-item">
								<NavLink className="nav-link" to="/about">О магазине</NavLink>
							</li>
							<li className="nav-item">
								<NavLink className="nav-link" to="/contacts">Контакты</NavLink>
							</li>
						</ul>
						<div>
							<div className="header-controls-pics">
								{<FromHeader />}
								<div className="header-controls-pic header-controls-cart" onClick={() => quantityPositions !== 0 ? navigation("/cart") : ''}>
									{quantityPositions !== 0 ? <div className="header-controls-cart-full">{quantityPositions}</div> : ''}
									<div className="header-controls-cart-menu"></div>
								</div>
							</div>
						</div>
					</div>
				</nav>
			</div>
		</div>
	</header>
	)
}

export default Header;