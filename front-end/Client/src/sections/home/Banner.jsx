import { Box, Button, Container, Typography } from "@mui/material";

import ButtonLink from "src/components/ButtonLink";
import IntroText from "src/components/IntroText";

const HomeBanner = () => {
  return (
    <Container disableGutters sx={{ marginBottom: "100px" }}>
      <Container
        sx={{
          backgroundImage: `linear-gradient(180deg, rgba(5, 8, 39, 0.4), rgba(5, 8, 39, 0.4)), url("/static/images/banner.jpg")`,
          height: "530px",
          backgroundPosition: "center bottom",
          backgroundRepeat: "no-repeat,",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: "#fff",
          textAlign: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            maxWidth: "800px",
          }}
        >
          <Typography
            sx={{ marginBottom: "20px", fontWeight: "600", opacity: "0.8" }}
          >
            BEST PLACE FOR CHILL'IN
          </Typography>
          <IntroText
            title={"LowLand Coffee"}
            desciption={`Step into a world where each sip of coffee is a delightful journey,
            where flavors dance on your palate and every cup holds the promise
            of a new adventure, only at our coffee haven.`}
          />
          <ButtonLink
            href={"/products"}
            sx={{
              backgroundColor: "#fff",
              padding: "15px 20px",
              fontWeight: "700",
              "&:hover": {
                backgroundColor: "#ccc",
              },
            }}
          >
            EXPLORE OUR PRODUCTS
          </ButtonLink>
        </Box>
      </Container>
    </Container>
  );
};

export default HomeBanner;
