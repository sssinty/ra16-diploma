import {Routes, Route} from "react-router-dom"
import Contacts from "./components/static-pages/Contacts"
import NotFound from "./components/static-pages/NotFound"
import AboutStore from "./components/static-pages/AboutStore"
import MainPage from "./components/pages/MainPage"
import CatalogPage from "./components/catalog/CatalogPage"

function App() {

  return (
    <Routes>
      <Route path="/"  Component={MainPage}/>
      <Route path="/catalog.html"  Component={CatalogPage}/>
      <Route path="/about.html"  Component={AboutStore}/>
      <Route path="/contacts.html"  Component={Contacts}/>
      <Route path="*"  element={NotFound}/>
    </Routes>
  )
}

export default App
