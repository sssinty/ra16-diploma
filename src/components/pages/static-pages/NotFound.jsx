import Banner from "../../banner/Banner";
import Footer from "../../footer/Footer";
import Header from "../../header/Header";


const NotFound = () => {
	return (
		<>
			{<Header />}
			<main className="container">
				<div className="row">
					<div className="col">
						{<Banner />}
						<section className="top-sales">
							<h2 className="text-center">Страница не найдена</h2>
							<p>
								Извините, такая страница не найдена!
							</p>
						</section>
					</div>
				</div>
			</main>
			{<Footer />}
		</>
	)
}

export default NotFound