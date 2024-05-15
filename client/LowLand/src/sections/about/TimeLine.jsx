import { Box, Container, Divider, Typography } from "@mui/material";
import IntroText from "src/components/IntroText";
import SectionTitle from "src/components/SectionTitle";
import LowLandLogo from "src/components/navigation/logo";

const TimeLineItem = ({ num, date, title, description }) => {
  return (
    <Box sx={{ mb: "30px" }}>
      <Typography sx={{ fontSize: "50px", fontWeight: "900", mb: "20px" }}>
        {num}
      </Typography>
      <Typography
        sx={{
          textTransform: "uppercase",
          mb: "10px",
          opacity: "0.3",
          fontWeight: "600",
        }}
      >
        {date}
      </Typography>
      <Typography sx={{ mb: "10px", fontSize: "25px", fontWeight: "600" }}>
        {title}
      </Typography>
      <Typography sx={{ opacity: "0.6", mb: "30px" }}>{description}</Typography>

      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Divider sx={{ width: "200px" }} />
        <Divider orientation="vertical" sx={{ height: "80px" }} />
      </Box>
    </Box>
  );
};

const TimeLine = () => {
  return (
    <Container maxWidth="sm" sx={{ textAlign: "center", mb: "50px" }}>
      <SectionTitle>HISTORY TIMELINE</SectionTitle>
      <LowLandLogo />
      <TimeLineItem
        num={"04"}
        date={"MAY 2024"}
        title={"One day however a small line"}
        description={
          "It is a paradisematic country, in which roasted parts of sentences fly into your mouth. Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum."
        }
      />
      <TimeLineItem
        num={"03"}
        date={"JANUARY 2024"}
        title={"Overlaid the jeepers uselessly"}
        description={
          "It is a paradisematic country, in which roasted parts of sentences fly into your mouth. Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum."
        }
      />
      <TimeLineItem
        num={"02"}
        date={"AUGUST 2023"}
        title={"Pointing has no control about"}
        description={
          "It is a paradisematic country, in which roasted parts of sentences fly into your mouth. Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum."
        }
      />
      <TimeLineItem
        num={"01"}
        date={"JUNE 2023"}
        title={"We've started CoffeeStyle."}
        description={"We were start with the zero."}
      />
      ☕
    </Container>
  );
};

export default TimeLine;
