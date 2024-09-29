import { Container } from "@mui/material";

import ButtonLink from "src/components/ButtonLink";
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

      <ButtonLink
        color={"secondary"}
        href={"/blogs/79a5f2f2-3632-4bf9-b104-f5f098a92e47"}
        sx={{ fontWeight: "600" }}
      >
        Read the full story
      </ButtonLink>
    </Container>
  );
};

export default HomeStory;
