import CardProduct from "../CardProduct";

const Catalog = () => {
	const arr = [{id:20,category:13,title:"Кроссовки как у Pharrell Williams",price:12000,images:["https://raw.githubusercontent.com/netology-code/ra16-diploma/master/html/img/products/pharrell_williams_sneakers.jpg","https://raw.githubusercontent.com/netology-code/ra16-diploma/master/html/img/products/pharrell_williams_sneakers_2.jpg"]},{"id":21,"category":13,"title":"Туфли принцессы","price":3000,"images":["https://raw.githubusercontent.com/netology-code/ra16-diploma/master/html/img/products/princess_shoes.jpg","https://raw.githubusercontent.com/netology-code/ra16-diploma/master/html/img/products/princess_shoes_2.jpg"]},{"id":22,"category":13,"title":"Туфли с окошечками","price":4000,"images":["https://raw.githubusercontent.com/netology-code/ra16-diploma/master/html/img/products/shoes_with_windows.jpg"]},{"id":23,"category":13,"title":"Кеды с насекомым","price":3500,"images":["https://raw.githubusercontent.com/netology-code/ra16-diploma/master/html/img/products/insect_sneakers.jpg","https://raw.githubusercontent.com/netology-code/ra16-diploma/master/html/img/products/insect_sneakers_2.jpg"]},{"id":24,"category":13,"title":"Туфли на выход","price":2500,"images":["https://raw.githubusercontent.com/netology-code/ra16-diploma/master/html/img/products/outgoing_shoes.jpg","https://raw.githubusercontent.com/netology-code/ra16-diploma/master/html/img/products/outgoing_shoes_2.jpg"]},{"id":25,"category":13,"title":"Туфли императрицы","price":15000,"images":["https://raw.githubusercontent.com/netology-code/ra16-diploma/master/html/img/products/empress's_slippers.jpg","https://raw.githubusercontent.com/netology-code/ra16-diploma/master/html/img/products/empress's_slippers_2.jpg"]}]
	return(
		<>
			<section className="catalog">
				<h2 className="text-center">Каталог</h2>
				<ul className="catalog-categories nav justify-content-center">
					<li className="nav-item">
						<a className="nav-link active" href="#">Все</a>
					</li>
					<li className="nav-item">
						<a className="nav-link" href="#">Женская обувь</a>
					</li>
					<li className="nav-item">
						<a className="nav-link" href="#">Мужская обувь</a>
					</li>
					<li className="nav-item">
						<a className="nav-link" href="#">Обувь унисекс</a>
					</li>
					<li className="nav-item">
						<a className="nav-link" href="#">Детская обувь</a>
					</li>
				</ul>
				<div className="row">
					{arr.map((elem) => {
						return <CardProduct category={elem.category} id={elem.id} images={elem.images} price={elem.price} title={elem.title} key={elem.key} />
					})}
				</div>
				<div className="text-center">
					<button className="btn btn-outline-primary">Загрузить ещё</button>
				</div>
			</section>
		</>
	)
}

export default Catalog;