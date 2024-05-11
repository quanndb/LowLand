import { Container } from "@mui/material";

import HomeBanner from "../banner";
import HomeStory from "../story";
import HomeMagazine from "../magazine";
import HomeBlog from "../blogStory";
import FeaturedMugs from "../featuredMugs";
import MoreProducts from "../moreProducts";
import ShowCase from "src/components/ShowCase";

const HomeView = () => {
  return (
    <>
      <HomeBanner />
      <HomeStory />

      <FeaturedMugs />

      <MoreProducts />

      <HomeMagazine />

      <ShowCase url={"static/images/showCase.jpg"} />
      <HomeBlog />
    </>
  );
};

export default HomeView;
