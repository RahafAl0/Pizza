import { useState } from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Order from "./Order";
import PizzaofTheDay from "./PizzaofTheDay";
import Header from "./Header";
import { CartContext } from "./contexts"

const App = () => {
  const cartHook = useState([]);
  return (
    <StrictMode>
      <CartContext.Provider value={cartHook}>
        <div>
          <Header />
          <Order />
          <PizzaofTheDay />
        </div>
      </CartContext.Provider>
    </StrictMode>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
