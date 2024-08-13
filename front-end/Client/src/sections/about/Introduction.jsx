import { Box } from "@mui/material";

import IntroText from "src/components/IntroText";
import SectionTitle from "src/components/SectionTitle";

const Introduction = () => {
  return (
    <Box sx={{ mb: "100px" }}>
      <SectionTitle>INTRODUCTIONS</SectionTitle>
      <IntroText
        variant={"h2"}
        title={"Overlaid the jeepers uselessly much excluding everyday life."}
        desciption={`It is a paradisematic country, in which roasted parts of sentences fly into your mouth. Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar.`}
      />
    </Box>
  );
};

export default Introduction;
