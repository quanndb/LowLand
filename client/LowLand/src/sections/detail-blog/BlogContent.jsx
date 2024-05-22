import parse from "html-react-parser";

import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import Image from "src/components/Image";
import SectionTitle from "src/components/SectionTitle";
import Motto from "src/components/Motto";
import {
  BlogBoldHeader,
  BlogHeader,
  BlogImage,
  BlogItalicHeader,
} from "./BlogComponent";

const BLogContent = ({ data }) => {
  return (
    <Paper sx={{ padding: "20px 20px 100px 20px", mb: "100px" }}>
      <Grid
        container
        sx={{ justifyContent: "space-between", flexWrap: "wrap-reverse" }}
      >
        <Grid item lg={3} sx={{ width: "100%" }}>
          <Paper sx={{ p: "40px" }} elevation={4}>
            <Typography>WRITTEN BY</Typography>
            <Image
              imageURL={"/static/images/logo.jpg"}
              sx={{ height: "140px", width: "100%", my: "20px" }}
              unShowOverlay={true}
            />
            <Typography sx={{ mb: "15px", fontWeight: "bold" }}>
              {data.author.name}
            </Typography>
            <Typography sx={{ mb: "15px" }} variant="subtitle1">
              {data.author.description}
            </Typography>
            <Button variant="contained">All author's blogs</Button>
          </Paper>
        </Grid>
        <Grid item lg={9} sx={{ px: "40px", width: "100%" }}>
          <SectionTitle>{data.blog.date}</SectionTitle>
          {parse(data.blog.content, {
            htmlparser2: {
              lowerCaseTags: false,
            },
          })}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default BLogContent;
