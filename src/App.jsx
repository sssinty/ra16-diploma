import Footer from "./components/footer/Footer"
import Header from "./components/header/Header"
import {Routes, Route} from "react-router-dom"
import Contacts from "./components/static-pages/Contacts"
import Banner from "./components/banner/Banner"
import NotFound from "./components/static-pages/NotFound"
import AboutStore from "./components/static-pages/AboutStore"

function App() {
  function MainPage() {
    return (
      <>
        <Header />
          <Banner />
        <Footer />
      </>
    )
  }

  return (
    <Routes>
      <Route path="/"  Component={MainPage}/>
      {/* <Route path="/catalog.html"  element={}/> */}
      <Route path="/about.html"  Component={AboutStore}/>
      <Route path="/contacts.html"  Component={Contacts}/>
      <Route path="*"  element={NotFound}/>
    </Routes>
  )
}

export default App
