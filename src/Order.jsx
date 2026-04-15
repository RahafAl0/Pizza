import { useContext, useEffect, useState } from "react";
import Pizza from "./Pizza";
import Cart from "./Cart";
import { CartContext } from "./contexts";

const intl = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const Order = () => {
  const [pizzaType, setPizzaType] = useState("");
  const [pizzaSize, setPizzaSize] = useState("M");
  const [pizzaTypes, setPizzaTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useContext(CartContext);

  async function checkout() {
    setLoading(true);

    await fetch("/api/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cart,
      }),
    });

    setCart([]);
    setLoading(false);
  }

  useEffect(() => {
    fetchPizzaTypes();
  }, []);

  async function fetchPizzaTypes() {
    const pizzasRes = await fetch("/api/pizzas");
    const pizzasJson = await pizzasRes.json();
    setPizzaTypes(pizzasJson);
    setPizzaType(pizzasJson[0]?.id ?? "");
    setLoading(false);
  }

  const selectedPizza = pizzaTypes.find((pizza) => pizza.id === pizzaType);
  const price =
    !loading && selectedPizza?.sizes?.[pizzaSize]
      ? intl.format(selectedPizza.sizes[pizzaSize])
      : "";

  return (
    <div className="order">
      <h2>Create Order</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setCart([...cart, { pizza: selectedPizza, size: pizzaSize }]);
        }}
      >
        <div>
          <div>
            <label htmlFor="pizza-type">Pizza Type</label>
            <select
              id="pizza-type"
              onChange={(e) => setPizzaType(e.target.value)}
              name="pizza-type"
              value={pizzaType}
              disabled={loading}
            >
              {loading ? (
                <option>Loading...</option>
              ) : (
                pizzaTypes.map((pizza) => (
                  <option key={pizza.id} value={pizza.id}>
                    {pizza.name}
                  </option>
                ))
              )}
            </select>
          </div>

          <div>
            <label htmlFor="pizza-size">Pizza Size</label>
            <div>
              <span>
                <input
                  checked={pizzaSize === "S"}
                  onChange={(e) => setPizzaSize(e.target.value)}
                  type="radio"
                  name="pizza-size"
                  value="S"
                  id="pizza-s"
                />
                <label htmlFor="pizza-s">Small</label>
              </span>
              <span>
                <input
                  checked={pizzaSize === "M"}
                  onChange={(e) => setPizzaSize(e.target.value)}
                  type="radio"
                  name="pizza-size"
                  value="M"
                  id="pizza-m"
                />
                <label htmlFor="pizza-m">Medium</label>
              </span>
              <span>
                <input
                  checked={pizzaSize === "L"}
                  onChange={(e) => setPizzaSize(e.target.value)}
                  type="radio"
                  name="pizza-size"
                  value="L"
                  id="pizza-l"
                />
                <label htmlFor="pizza-l">Large</label>
              </span>
            </div>
          </div>

          <button type="submit">Add to Cart</button>
        </div>

        {selectedPizza ? (
          <>
            <div className="order-pizza">
              <Pizza
                name={selectedPizza.name}
                description={selectedPizza.description}
                image={selectedPizza.image}
              />
              <p>{price}</p>
            </div>
          </>
        ) : null}
      </form>
      {loading ? <h2>LOADING …</h2> : <Cart checkout={checkout} cart={cart} />}
    </div>
  );
};

export default Order;
