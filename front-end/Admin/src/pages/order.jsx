import { Helmet } from "react-helmet-async";

import { OrderView } from "src/sections/order/view";

// ----------------------------------------------------------------------

export default function ProfilePage() {
  return (
    <>
      <Helmet>
        <title> Profile | Lowland </title>
      </Helmet>

      <OrderView />
    </>
  );
}
