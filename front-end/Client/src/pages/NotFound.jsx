import { Helmet } from "react-helmet-async";

import NotFoundView from "src/sections/not-found/NotFound";

const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>404 not found | LowLand</title>
      </Helmet>

      <NotFoundView />
    </>
  );
};

export default NotFound;
