import {Routes, Route} from "react-router-dom";
import Contacts from "./components/pages/static-pages/Contacts";
import NotFound from "./components/pages/static-pages/NotFound";
import AboutStore from "./components/pages/static-pages/AboutStore";
import MainPage from "./components/pages/MainPage";
import CatalogPage from "./components/pages/CatalogPage";
import ProductPage from "./components/product/ProductPage";
import CartPage from "./components/pages/CartPage";

function App() {

  return (
    <Routes>
      <Route path="/"  Component={MainPage}/>
      <Route path="/catalog.html"  Component={CatalogPage}/>
      <Route path="/about.html"  Component={AboutStore}/>
      <Route path="/contacts.html"  Component={Contacts}/>
      <Route path="/catalog/:id.html." Component={ProductPage} />
      <Route path="/cart.html." Component={CartPage} />
      <Route path="*"  Component={NotFound}/>
    </Routes>
  )
}

export default App
