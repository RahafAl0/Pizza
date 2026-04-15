import { useState, useEffect, useDebugValue } from "react";

export const usePizzaOfTheDay = () => {
  const [pizzaOfTheDay, setpizzaOfTheDay] = useState(null);
  useDebugValue(pizzaOfTheDay ? `${pizzaOfTheDay.name}` : "Loading...");
 
  useEffect(() => {
    async function fetchPizzaOfTheDAy() {
      const response = await fetch("/api/pizza-of-the-day");
      const data = await response.json();
      setpizzaOfTheDay(data);
    }

    fetchPizzaOfTheDAy();
  }, []);
  return pizzaOfTheDay;
};
