import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Banner from "../banner/Banner";
import Bestsellers from "../bestsellers/Bestsellers";
import Catalog from "../catalog/Catalog";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import { getCatalog } from "../../redux/stateCatalog";

const MainPage = () => {
	const dispatch = useDispatch();
	useEffect(() => {dispatch(getCatalog())}, []);
	
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