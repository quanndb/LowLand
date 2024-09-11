import {
  Box,
  Button,
  Container,
  Grid,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";

import Introduction from "../Introduction";

import DecoComp from "src/components/DecoComp";
import SectionTitle from "src/components/SectionTitle";
import Image from "src/components/Image";
import IntroText from "src/components/IntroText";
import FloatInOnScroll from "src/components/FloatIn";

const FormWrap = () => {
  return (
    <>
      <Container
        maxWidth="lg"
        sx={{
          textAlign: {
            md: "left",
            xs: "center",
          },
          mb: "100px",
        }}
      >
        <Grid
          container
          sx={{
            border: "1px solid rgba(209, 209, 209, 0.98)",
            padding: {
              md: "60px !important",
              xs: "30px !important",
            },
            textAlign: {
              md: "left",
              xs: "center",
            },
          }}
        >
          <Grid item md={8} xs={12}>
            <Typography>CONTACT FORM</Typography>
            <Typography sx={{ marginBottom: "30px" }}>
              Drop us your message and I'll get back to you as soon as possible.
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: {
                  md: "73%",
                  xs: "100%",
                },
              }}
            >
              <TextField
                id="outlined-basic"
                label="NAME"
                variant="outlined"
                sx={{
                  marginBottom: "20px",
                }}
              />
              <TextField
                id="outlined-basic"
                label="EMAIL ADDRESS"
                variant="outlined"
                sx={{
                  marginBottom: "20px",
                }}
              />
              <TextareaAutosize
                placeholder="YOUR MESSAGE"
                style={{
                  padding: "15px",
                  maxWidth: { md: "500px", xs: "100%" },
                  marginBottom: "20px",
                  fontSize: "19px",
                }}
              ></TextareaAutosize>
              <Button
                sx={{
                  color: "white",
                  backgroundColor: "black",
                  padding: "15px",
                  marginBottom: "20px",
                  "&:hover": {
                    backgroundColor: "var(--primary-color)",
                    opacity: ".7",
                  },
                }}
              >
                SEND MESSAGE
              </Button>
            </Box>
          </Grid>

          <Grid
            item
            md={4}
            xs={12}
            textAlign={{
              md: "left",
              xs: "center",
            }}
          >
            <Typography>CONTACT FORM</Typography>

            <Typography fontWeight={"Bold"} sx={{ marginBottom: "30px" }}>
              Lowland Coffee. Inc
            </Typography>
            <Typography>Minh Khai</Typography>
            <Typography>Cau Dien</Typography>
            <Typography sx={{ marginBottom: "30px" }}>Ha Noi</Typography>
            <Typography>CALL US</Typography>
            <Typography sx={{ marginBottom: "30px" }}>
              +84 (415) 555-1212
            </Typography>
            <Typography>EMAIL US</Typography>
            <Typography>site@lowlandCoffee.io</Typography>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

const IntroductionBehindForm = () => {
  return (
    <Container maxWidth="sm" sx={{ mb: "100px" }}>
      <Grid
        container
        sx={{
          textAlign: {
            xs: "center",
          },
        }}
      >
        <SectionTitle>DIRECTORY</SectionTitle>
        <IntroText variant={"h2"} />

        <Grid
          item
          sx={{
            opacity: ".7",
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            flexDirection: {
              md: "row",
              xs: "column",
            },
          }}
        >
          <Typography sx={{ marginTop: "20px" }}>OWNER</Typography>
          <Typography sx={{ marginTop: "20px" }}>Vu Minh Quan</Typography>
          <Box sx={{ textAlign: "center", marginBottom: "20px" }}>
            <Typography sx={{ marginTop: "20px" }}>086-374-4962</Typography>
            <Typography>quanvm@lowlandCoffee.com</Typography>
          </Box>
        </Grid>
        <Grid
          item
          sx={{
            opacity: ".7",
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            flexDirection: {
              md: "row",
              xs: "column",
            },
          }}
        >
          <Typography sx={{ marginTop: "20px" }}>OWNER</Typography>
          <Typography sx={{ marginTop: "20px" }}>Nguyen Anh Quan</Typography>
          <Box sx={{ textAlign: "center", marginBottom: "20px" }}>
            <Typography sx={{ marginTop: "20px" }}>086-374-42242</Typography>
            <Typography>quanna@lowlandCoffee.com</Typography>
          </Box>
        </Grid>
        <Grid
          item
          sx={{
            opacity: ".7",
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            flexDirection: {
              md: "row",
              xs: "column",
            },
          }}
        >
          <Typography sx={{ marginTop: "20px" }}>OWNER</Typography>
          <Typography sx={{ marginTop: "20px" }}>Le Minh Khoi</Typography>
          <Box sx={{ textAlign: "center", marginBottom: "20px" }}>
            <Typography sx={{ marginTop: "20px" }}>0923-421-4962</Typography>
            <Typography>khoilm@lowlandCoffee.com</Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

const ContactView = () => {
  return (
    <>
      <DecoComp
        space={200}
        title={"Let's Connect"}
        desciption={
          "At LowLand Coffee Shop, we believe in elevating your daily coffee experience. Nestled in the heart of the city, we offer more than just a cup of coffee – we offer a warm, inviting atmosphere where every sip is a journey of rich flavors and community connection. Come, savor the moment with us."
        }
      >
        <FloatInOnScroll>
          <Introduction />
          <Container maxWidth="lg">
            <Grid
              container
              sx={{ width: "100%", justifyContent: "center" }}
              spacing={{ sx: 0, md: 4 }}
            >
              <Grid item md={6} xs={12} sx={{ textAlign: "center" }}>
                <Image
                  imageURL={"static/images/aboutBanner.jpg"}
                  sx={{ height: "190px", mb: "50px" }}
                  unShowOverlay={true}
                />
                <Typography variant="" sx={{ opacity: ".6" }}>
                  CAU GIAY
                </Typography>
                <Typography sx={{ fontWeight: "bold" }}>
                  Cau Giay, Ha Noi
                </Typography>
                <Typography sx={{ opacity: ".6" }}>Num 41, Cau Giay</Typography>
                <Typography sx={{ opacity: ".6" }}>Ha Noi</Typography>
                <Typography sx={{ opacity: ".6", marginBottom: "30px" }}>
                  Viet Nam
                </Typography>
                <Typography sx={{ opacity: ".6" }}>OPENING TIMES</Typography>
                <Typography sx={{ opacity: ".6" }}>
                  Mon - Fri 08:00 to 22:00
                </Typography>
                <Typography sx={{ opacity: ".6" }}>
                  Sat - 09:00 to 20:00
                </Typography>
                <Typography sx={{ opacity: ".6", marginBottom: "20px" }}>
                  Sun - 12:00 to 18:00
                </Typography>
              </Grid>
              <Grid item md={6} xs={12} sx={{ textAlign: "center" }}>
                <Image
                  imageURL={"static/images/aboutBanner.jpg"}
                  sx={{ height: "190px", mb: "50px" }}
                  unShowOverlay={true}
                />
                <Typography variant="" sx={{ opacity: ".6" }}>
                  MINH KHAI
                </Typography>
                <Typography sx={{ fontWeight: "bold" }}>
                  Nguyen Xa, Cau Dien, Ha Noi
                </Typography>
                <Typography sx={{ opacity: ".6" }}>
                  Num 316, Street 30
                </Typography>
                <Typography sx={{ opacity: ".6" }}>Nguyen Xa</Typography>
                <Typography sx={{ opacity: ".6", marginBottom: "30px" }}>
                  Cau Dien
                </Typography>
                <Typography sx={{ opacity: ".6" }}>OPENING TIMES</Typography>
                <Typography sx={{ opacity: ".6" }}>
                  Mon - Fri 08:00 to 22:00
                </Typography>
                <Typography sx={{ opacity: ".6" }}>
                  Sat - 09:00 to 20:00
                </Typography>
                <Typography sx={{ opacity: ".6", marginBottom: "20px" }}>
                  Sun - 12:00 to 18:00
                </Typography>
              </Grid>
            </Grid>
          </Container>
        </FloatInOnScroll>
      </DecoComp>

      <FloatInOnScroll>
        <FormWrap />
      </FloatInOnScroll>

      <FloatInOnScroll>
        <Container
          maxWidth={"100%"}
          sx={{ marginBottom: "30px" }}
          disableGutters
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d516.8840432587057!2d105.73992301942843!3d21.0507561891785!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313455002d060de1%3A0xe32d1e8b23ea3477!2sLowLand%20Coffee!5e0!3m2!1svi!2s!4v1716020772756!5m2!1svi!2s"
            width="100%"
            height="450"
            style={{ border: 0 }}
            // allowFullScreen="true"
            loading="lazy"
            allow="geolocation"
            referrerPolicy="no-referrer-when-downgrade"
            title="map"
          ></iframe>
        </Container>
      </FloatInOnScroll>

      <FloatInOnScroll>
        <IntroductionBehindForm />
      </FloatInOnScroll>
    </>
  );
};

export default ContactView;
