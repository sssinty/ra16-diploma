import CardProduct from "../CardProduct";

const Bestsellers = () => {
	const temporaryArrayHits = [{id:65,category:15,title:"Босоножки 'Keira'",price:7600,images:["https://raw.githubusercontent.com/netology-code/ra16-diploma/master/html/img/products/sandals_keira.jpg","https://raw.githubusercontent.com/netology-code/ra16-diploma/master/html/img/products/sandals_keira_2.jpg"]},{"id":66,"category":13,"title":"Босоножки 'Myer' с завязкой на щиколотке","price":34000,"images":["https://raw.githubusercontent.com/netology-code/ra16-diploma/master/html/img/products/sandals_myer.jpg","https://raw.githubusercontent.com/netology-code/ra16-diploma/master/html/img/products/sandals_myer_2.jpg"]},{"id":73,"category":15,"title":"Супергеройские кеды","price":1400,"images":["https://raw.githubusercontent.com/netology-code/ra16-diploma/master/html/img/products/superhero_sneakers.jpg"]}]
	return (
		<>
			<section className="top-sales">
				<h2 className="text-center">Хиты продаж!</h2>
				<div className="row">
					{temporaryArrayHits.map((elem) => {
						return <CardProduct category={elem.category} id={elem.id} images={elem.images} price={elem.price} title={elem.title} key={elem.id} />
					})}
				</div>
			</section>
		</>
	)
}
export default Bestsellers;