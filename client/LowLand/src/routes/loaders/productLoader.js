import { redirect } from "react-router-dom";
import { toast } from "react-toastify";
import productAPI from "src/services/API/productAPI";

export async function fetchProductById({ params }) {
  try {
    const res = await productAPI.getProductDetails(params.productID);
    console.log(res);
    return res;
  } catch (error) {
    toast.error(error.message || "Failed to fetch product");
    return redirect("/404");
  }
}
