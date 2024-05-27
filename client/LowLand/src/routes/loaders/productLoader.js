import { redirect } from "react-router-dom";
import { PRODUCTS } from "src/mock/itemProduct";

export async function fetchProductById({ params }) {
  // const response = await fetch(`/api/users/${params.userId}`);
  // if (!response.ok) {
  //   throw new Error('Failed to fetch user');
  // }
  // const user = await response.json();
  const product = PRODUCTS.filter((item) => item.id == params.productID);
  if (product.length === 0) {
    throw redirect("/404");
  } else {
    return { product };
  }
}
