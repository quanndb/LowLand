import { motion } from "framer-motion";

import { Box, Button, Container } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";

import { useRouter } from "src/routes/hooks";

const NotFoundView = () => {
  const router = useRouter();

  return (
    <Container
      maxWidth="100%"
      sx={{
        backgroundColor: "var(--background-color)",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <motion.div
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
        }}
        drag
        dragConstraints={{
          top: -50,
          left: -200,
          right: 200,
          bottom: 50,
        }}
      >
        <Box
          sx={{
            backgroundImage: "url(static/images/404.jpg)",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            border: "solid 20px var(--secondary-color)",
            boxShadow:
              "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;",
          }}
        />
      </motion.div>
      <Button
        startIcon={<HomeIcon />}
        sx={{ marginTop: "30px" }}
        color="primary"
        variant="contained"
        onClick={() => router.replace("/")}
      >
        Go to homepage
      </Button>
    </Container>
  );
};

export default NotFoundView;
