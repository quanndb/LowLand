import { Button } from "@mui/material";

const LowLandLogo = () => {
  return (
    <Button
      sx={{
        height: "60px",
        width: "60px",
        borderRadius: "50%",
        backgroundImage: "url(/static/images/logo.jpg)",
        backgroundSize: "contain",
        margin: "0px 5px",
        boxShadow:
          "rgba(0, 0, 0, 0.16) 0px 1px 4px, rgb(51, 51, 51) 0px 0px 0px 3px;",
      }}
      href="/dashboard"
    />
  );
};

export default LowLandLogo;
