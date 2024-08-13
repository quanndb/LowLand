import { Helmet } from "react-helmet-async";

import { MaterialView } from "src/sections/material/view";

export default function MaterialPage() {
  return (
    <>
      <Helmet>
        <title> Material | Lowland </title>
      </Helmet>

      <MaterialView />
    </>
  );
}
