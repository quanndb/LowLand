import { Container } from "@mui/material";
import DecoComp from "src/components/DecoComp";
import Image from "src/components/Image";
import Introduction from "../Introduction";
import AboutIntroductions from "../AboutIntroductions";
import AuthorsIntro from "../AuthorsIntro";
import ShowCase from "src/components/ShowCase";
import TimeLine from "../TimeLine";

const AboutView = () => {
  return (
    <>
      <DecoComp
        space={150}
        title={"About"}
        desciption={
          "At LowLand Coffee Shop, we believe in elevating your daily coffee experience. Nestled in the heart of the city, we offer more than just a cup of coffee – we offer a warm, inviting atmosphere where every sip is a journey of rich flavors and community connection. Come, savor the moment with us."
        }
      >
        <Container maxWidth="md">
          <Image
            imageURL={"/static/images/aboutBanner.jpg"}
            sx={{ width: "100%", height: "320px", mb: "100px" }}
            unShowOverlay={true}
          />
          <Introduction />
          <AboutIntroductions />
          <AuthorsIntro />
        </Container>
      </DecoComp>
      <ShowCase imageURL={"/static/images/showcase2.jpg"} />
      <TimeLine />
    </>
  );
};

export default AboutView;
