import { Container } from "@mui/material";

import AboutIntroductions from "../AboutIntroductions";
import AuthorsIntro from "../AuthorsIntro";
import Introduction from "../Introduction";
import TimeLine from "../TimeLine";

import DecoComp from "src/components/DecoComp";
import Image from "src/components/Image";
import ShowCase from "src/components/ShowCase";
import FloatInOnScroll from "src/components/FloatIn";

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

          <FloatInOnScroll>
            <Introduction />
          </FloatInOnScroll>

          <FloatInOnScroll>
            <AboutIntroductions />
          </FloatInOnScroll>

          <FloatInOnScroll>
            <AuthorsIntro />
          </FloatInOnScroll>
        </Container>
      </DecoComp>

      <ShowCase imageURL={"/static/images/showcase2.jpg"} />

      <FloatInOnScroll>
        <TimeLine />
      </FloatInOnScroll>
    </>
  );
};

export default AboutView;
