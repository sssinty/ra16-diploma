import Banner from "../banner/Banner";
import Footer from "../footer/Footer";
import FormCatalog from "../form/FormCatalog";
import Header from "../header/Header";
import Catalog from "./Catalog";

const CatalogPage = () => {
	return (
		<>
			{<Header />}
				<main className="container">
					<div className="row">
						<div className="col">
							{<Banner />}
							<section className="catalog">
								<h2 className="text-center">Каталог</h2>
								{<FormCatalog />}
								{<Catalog />}
							</section>
						</div>
					</div>
				</main>
			{<Footer />}
		</>
	)
}

export default CatalogPage;