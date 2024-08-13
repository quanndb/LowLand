import { Helmet } from "react-helmet-async";

import { AboutView } from "src/sections/about/view";

const AboutPage = () => {
  return (
    <>
      <Helmet>
        <title>About | LowLand</title>
      </Helmet>

      <AboutView />
    </>
  );
};

export default AboutPage;
