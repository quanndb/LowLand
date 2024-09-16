import { Box, Grid, Typography } from "@mui/material";

import Image from "src/components/Image";
import SectionTitle from "src/components/SectionTitle";

const Author = ({ name, position, imageURL }) => {
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Image
        imageURL={imageURL}
        sx={{ height: "200px", width: "100%", mb: "30px" }}
        unShowOverlay={true}
      />
      <Typography sx={{ fontWeight: "600", fontSize: "22px", mb: "15px" }}>
        {name}
      </Typography>
      <Typography sx={{ opacity: "0.6" }}>{position}</Typography>
    </Box>
  );
};

const AuthorsIntro = () => {
  return (
    <Box>
      <SectionTitle>authors introduction</SectionTitle>
      <Grid container justifyContent={"center"} spacing={5}>
        {[...Array(5)].map((_, index) => (
          <Grid item xm={12} sm={4} sx={{ width: "100%" }} key={index}>
            <Author
              name={"Vu Minh Quan"}
              position={"BRAND OWNER"}
              imageURL={"/static/images/logo.jpg"}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AuthorsIntro;
