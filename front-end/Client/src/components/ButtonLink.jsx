import { Button } from "@mui/material";

import { useRouter } from "src/routes/hooks";

const ButtonLink = ({ href, sx, children, variant, color, callBack }) => {
  const router = useRouter();

  const handleRouter = (e) => {
    e.preventDefault();
    router.push(href);
  };

  return (
    <Button
      sx={{ ...sx }}
      variant={variant}
      color={color ? color : "primary"}
      href={href ? href : "#"}
      onClick={(e) => {
        handleRouter(e);
        if (callBack) callBack();
      }}
    >
      {children}
    </Button>
  );
};

export default ButtonLink;
