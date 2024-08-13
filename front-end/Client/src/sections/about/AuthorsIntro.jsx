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
      <Grid
        container
        justifyContent={"center"}
        columnSpacing={{ md: 4, sm: 0 }}
        rowSpacing={6}
        columns={{ sm: 1, md: 3 }}
      >
        <Grid item md={1} sm>
          <Author
            name={"Vu Minh Quan"}
            position={"BRAND OWNER"}
            imageURL={"/static/images/logo.jpg"}
          />
        </Grid>
        <Grid item md={1} sm>
          <Author
            name={"Vu Minh Quan"}
            position={"BRAND OWNER"}
            imageURL={"/static/images/logo.jpg"}
          />
        </Grid>
        <Grid item md={1} sm>
          {" "}
          <Author
            name={"Vu Minh Quan"}
            position={"BRAND OWNER"}
            imageURL={"/static/images/logo.jpg"}
          />
        </Grid>
        <Grid item md={1} sm>
          {" "}
          <Author
            name={"Vu Minh Quan"}
            position={"BRAND OWNER"}
            imageURL={"/static/images/logo.jpg"}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default AuthorsIntro;
