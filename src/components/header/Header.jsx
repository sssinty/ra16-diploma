import { NavLink, useNavigate} from "react-router-dom";
import { useSelector } from "react-redux";
import FromHeader from "../form/FormHeader";

const Header = () => {
	const {quantityPositions} = useSelector((cart) => cart.cart);
	const navigation = useNavigate();
	return (
		<header className="container">
		<div className="row">
			<div className="col">
				<nav className="navbar navbar-expand-sm navbar-light bg-light">
					<NavLink className="navbar-brand" to="/">
						<img src="src\assets\header-logo.png" alt="Bosa Noga"></img>
					</NavLink>
					<div className="collapse navbar-collapse" id="navbarMain">
						<ul className="navbar-nav mr-auto">
							<li className="nav-item">
								<NavLink className="nav-link" to="/">Главная</NavLink>
							</li>
							<li className="nav-item">
								<NavLink className="nav-link" to="/catalog.html">Каталог</NavLink>
							</li>
							<li className="nav-item">
								<NavLink className="nav-link" to="/about.html">О магазине</NavLink>
							</li>
							<li className="nav-item">
								<NavLink className="nav-link" to="/contacts.html">Контакты</NavLink>
							</li>
						</ul>
						<div>
							<div className="header-controls-pics">
								{<FromHeader />}
								<div className="header-controls-pic header-controls-cart" onClick={() => quantityPositions !== 0 ? navigation("/cart.html.") : ''}>
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