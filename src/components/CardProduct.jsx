import { useDispatch} from "react-redux";
import { useNavigate } from "react-router-dom";
import { getPorduct } from "../redux/stateProduct";

const CardProduct = ({id, title, price, images, keyID}) => {
	const dispatch = useDispatch();
	const navigation = useNavigate();

	function hendlerClick( idProduct ){
		dispatch(getPorduct(idProduct));
		navigation(`/catalog/${id}.html.`);
	}

	return (
		<div className="col-4" key={keyID}>
		<div className="card">
			<img src={images[0]} className="card-img-top img-fluid" alt="Босоножки 'MYER'"></img>
			<div className="card-body-product">
				<p className="card-text">{title}</p>
				<p className="card-text">{price} {`\u{20BD}`}</p>
				<button className="btn btn-outline-primary" onClick={() => hendlerClick(id)}>Заказать</button>
			</div>
		</div>
	</div>
	)
}

export default CardProduct;