import { Container } from "@mui/material";

import DefaultLayout from "src/layouts/defaultLayout";
import HomeBanner from "../banner";
import HomeStory from "../story";
import HomeMagazine from "../magazine";
import HomeBlog from "../blogStory";
import FeaturedMugs from "../featuredMugs";
import ShowCase from "../showCase";
import MoreProducts from "../moreProducts";

const HomeView = () => {
  return (
    <>
      <HomeBanner />
      <HomeStory />

      <FeaturedMugs />

      <MoreProducts />

      <HomeMagazine />
      <ShowCase />
      <HomeBlog />
    </>
  );
};

export default HomeView;
