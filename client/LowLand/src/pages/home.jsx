import { Helmet } from "react-helmet-async";
import { HomeView } from "src/sections/home/view";

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>Home | LowLand</title>
      </Helmet>

      <HomeView />
    </>
  );
};

export default HomePage;
