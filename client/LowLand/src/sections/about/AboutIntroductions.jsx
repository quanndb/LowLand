import { Box, Divider, Grid } from "@mui/material";
import Image from "src/components/Image";
import IntroText from "src/components/IntroText";

const IntroComponent = ({ title, desciption, imageURL }) => {
  return (
    <Grid container wrap="wrap-reverse" spacing={4} sx={{ mb: "70px" }}>
      <Grid item md={6} sx={{ display: "flex", alignItems: "center" }}>
        <IntroText
          title={title}
          desciption={desciption}
          variant={"h3"}
          sx={{ textAlign: "left" }}
        >
          <Divider sx={{ mb: "25px" }} />
        </IntroText>
      </Grid>
      <Grid item md={6} xs={12}>
        <Image imageURL={imageURL} sx={{ height: "320px", width: "100%" }} />
      </Grid>
    </Grid>
  );
};

const AboutIntroductions = () => {
  return (
    <Box sx={{ mb: "100px" }}>
      <IntroComponent
        title={`Overlaid the jeepers uselessly much excluding everyday life.`}
        desciption={`It is a paradisematic country, in which roasted parts of sentences fly into your mouth. Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar.`}
        imageURL={"/static/images/intro1.jpg"}
      />
      <IntroComponent
        title={`Overlaid the jeepers uselessly much excluding everyday life.`}
        desciption={`It is a paradisematic country, in which roasted parts of sentences fly into your mouth. Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar.`}
        imageURL={"/static/images/intro2.jpg"}
      />
      <IntroComponent
        title={`Overlaid the jeepers uselessly much excluding everyday life.`}
        desciption={`It is a paradisematic country, in which roasted parts of sentences fly into your mouth. Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar.`}
        imageURL={"/static/images/intro1.jpg"}
      />
    </Box>
  );
};

export default AboutIntroductions;
