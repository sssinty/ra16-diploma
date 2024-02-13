import Banner from "../banner/Banner";
import Bestsellers from "../bestsellers/Bestsellers";
import Catalog from "../catalog/Catalog";
import Footer from "../footer/Footer";
import Header from "../header/Header";

const MainPage = () => {
	return (
		<>
			<Header />
				<main className="container">
					<Banner />
					<Bestsellers />
					<Catalog />
				</main>
			<Footer />
		</>
	)
}

export default MainPage;