export default async function getPastOrders(page) {
  const response = await fetch(`/api/past-orders?page=${page}`);

  if (!response.ok) {
    throw new Error(`Failed to load past orders: ${response.status}`);
  }

  const data = await response.json();
  return data;
}
