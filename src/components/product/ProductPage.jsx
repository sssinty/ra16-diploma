import { useState } from "react";
import {useSelector} from "react-redux";
import Preloader from "../Preloader";


const ProductPage = () => {
	const {product, statusLoade} = useSelector((goods) => goods.goods);
	const [quantity, setQuantity] = useState(1);
	const [selected, setSelected] = useState();

	function selectedSize(event) {
		const target = event.target
		console.log(target.id)
		setSelected(target.id)
	}
	return statusLoade != 'loade' ?
		<Preloader /> 
		:
		<section className="catalog-item">
			<h2 className="text-center">{product.title}</h2>
			<div className="row">
				<div className="col-5">
				<img src={product.images[0]} className="img-fluid" alt=""></img>
				</div>
				<div className="col-7">
						<table className="table table-bordered">
								<tbody>
										<tr>
												<td>Артикул</td>
												<td>{product.sku}</td>
										</tr>
										<tr>
												<td>Производитель</td>
												<td>{product.manufacturer}</td>
										</tr>
										<tr>
												<td>Цвет</td>
												<td>{product.color}</td>
										</tr>
										<tr>
												<td>Материалы</td>
												<td>{product.material}</td>
										</tr>
										<tr>
												<td>Сезон</td>
												<td>{product.season}</td>
										</tr>
										<tr>
												<td>Повод</td>
												<td>{product.reason}</td>
										</tr>
								</tbody>
						</table>
						
							{product.sizes ? 
								<>
									<div className="text-center">
										<p>Размеры в наличии: {product.sizes.map((size, id) => {
											if(size.available === true) {
												return <a 
													className={selected === id ? "catalog-item-size selected" : "catalog-item-size"}
													key={id}
													id={id}
													onClick={() => id === selected ? setSelected(-1) : setSelected(id)}
												>{size.size}</a>
											}
										})}</p>
										<p>Количество: <span className="btn-group btn-group-sm pl-2">
														<button className="btn btn-secondary" onClick={() => setQuantity(quantity !== 1 ? quantity - 1 : 1)}>-</button>
														<span className="btn btn-outline-primary">{quantity}</span>
														<button className="btn btn-secondary"onClick={() => setQuantity(quantity < 10 ? quantity + 1 : 10)}>+</button>
												</span>
										</p>
									</div>
									<button className="btn btn-danger btn-block btn-lg">В корзину</button>
								</>
							: ''
							} 
				</div>
			</div>
		</section>
	
}
{/* <span className="catalog-item-size selected">18 US</span>  */}
export default ProductPage;