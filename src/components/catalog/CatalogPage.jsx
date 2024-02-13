import Banner from "../banner/Banner";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import Catalog from "./Catalog";

const CatalogPage = () => {
	return (
		<>
			{<Header />}
				<main className="container">
					{<Banner />}
					{<Catalog />}
				</main>
			{<Footer />}
		</>
	)
}

export default CatalogPage;