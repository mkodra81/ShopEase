import { Routes, Route, BrowserRouter } from "react-router-dom"
import { Home } from "./pages/Home.jsx";
import Favourites from "./pages/Favourites.jsx";
import SelectedProduct from "./pages/SelectedProduct.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/favourites" element={<Favourites/>}/>
        <Route path="/product" element={<SelectedProduct/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
