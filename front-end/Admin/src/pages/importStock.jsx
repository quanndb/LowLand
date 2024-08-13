import { Helmet } from "react-helmet-async";

import { ImportStockView } from "src/sections/importStock/view";

// ----------------------------------------------------------------------

export default function ImportStockPage() {
  return (
    <>
      <Helmet>
        <title> Import Stock | Lowland </title>
      </Helmet>

      <ImportStockView />
    </>
  );
}
