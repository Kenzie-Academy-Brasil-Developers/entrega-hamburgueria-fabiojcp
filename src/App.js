import "./Assets/CSS/reset.css";
import "./Assets/CSS/style.css";
import { useEffect, useState } from "react";
import Cart from "./Components/Cart/Cart";
import Header from "./Components/Header/Header";
import ProductsList from "./Components/ProductsList/ProductsList";

export default function App() {
  const axios = require("axios").default;
  const BASE = "https://hamburgueria-kenzie-json-serve.herokuapp.com/products";
  const [Products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [InputValue, setInputValue] = useState("");
  const [currentSale, setCurrentSale] = useState([]);
  const cartTotal = currentSale.reduce((acumulador, product) => acumulador + product.price, 0)
  const Food = () => filteredProducts.filter((product) => product.category === "Sanduíches")
  const Drink = () => filteredProducts.filter((product) => product.category === "Bebidas")

  function filtered() {
    return InputValue.split("").length < 1
      ? setFilteredProducts(Products)
      : setFilteredProducts(
          Products.filter((product) =>
            product.name.toLowerCase().includes(InputValue.toLowerCase())
          )
        );
  }
  
  function addCart (product) {
    currentSale.length === 0 
    ? setCurrentSale([product])
    : (!(currentSale.filter((item) => item.id === product.id).length > 0) && (setCurrentSale([...currentSale, product])))
  }

  function removeCart (product) {
    setCurrentSale(currentSale.filter((item) => item.id !== product.id))
  }

  useEffect(() => {
    axios.get(BASE).then((response) => setFilteredProducts(response.data));
    axios.get(BASE).then((response) => setProducts(response.data));
  }, [InputValue, axios]);

  return (
    <div className="boxMain">
      <Header
        InputValue={InputValue}
        setInputValue={setInputValue}
        filtered={filtered}
      />
      <ProductsList
        Food={Food}
        Drink={Drink}
        addCart={addCart}
      />
      <Cart currentSale={currentSale} cartTotal={cartTotal} setCurrentSale={setCurrentSale} removeCart={removeCart} />
    </div>
  );
}
