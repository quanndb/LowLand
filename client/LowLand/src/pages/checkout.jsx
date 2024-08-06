import { Helmet } from "react-helmet-async";

import CheckoutView from "src/sections/checkout/view/CheckoutView";

const CheckoutPage = () => {
  return (
    <>
      <Helmet>
        <title>Checkout | LowLand</title>
      </Helmet>

      <CheckoutView />
    </>
  );
};

export default CheckoutPage;
