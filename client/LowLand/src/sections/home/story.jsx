import { Button, Container, Divider, Typography } from "@mui/material";
import IntroText from "src/components/IntroText";
import { useRouter } from "src/routes/hooks";

const HomeStory = () => {
  const router = useRouter();
  return (
    <Container
      maxWidth={"md"}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        marginBottom: "100px",
      }}
    >
      <IntroText
        variant={"h2"}
        title={"Exquisite Coffee, Beautiful Space, Endless Experience."}
        desciption={`Join us on a journey of exploration and delight, where the boundaries of
        taste are pushed with every expertly brewed blend, and where the simple
        pleasure of a cup of coffee becomes a moment of true connection and joy
        shared with every sip.`}
      />

      <Button
        sx={{ fontWeight: "600", color: "var(--secondary-color)" }}
        onClick={() => router.replace("/blogs/1")}
      >
        Read the full story
      </Button>
    </Container>
  );
};

export default HomeStory;
