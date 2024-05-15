import HomeBanner from "../banner";
import HomeStory from "../story";
import HomeMagazine from "../magazine";
import HomeBlog from "../blogStory";
import ShowCase from "src/components/ShowCase";
import SectionTitle from "src/components/SectionTitle";

const HomeView = () => {
  return (
    <>
      <HomeBanner />
      <HomeStory />

      <SectionTitle>FEATURED MUGS</SectionTitle>

      <SectionTitle>MORE PRODUCTS</SectionTitle>

      <HomeMagazine />

      <ShowCase imageURL={"static/images/showCase.jpg"} />
      <HomeBlog />
    </>
  );
};

export default HomeView;
