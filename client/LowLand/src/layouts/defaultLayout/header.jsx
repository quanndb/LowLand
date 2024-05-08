import { useState } from "react";
import { useDispatch } from "react-redux";

import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

import CartDrawer from "./common/CartDrawer";
import DrawerManagerSlice from "src/redux/slices/DrawerManagerSlice";
import { useResponsive } from "src/hooks/use-responsive";
import { Padding } from "@mui/icons-material";
import { Box } from "@mui/material";

const HeaderTab = ({ isMobile, showNav }) => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Tabs
      id="navBar"
      value={value}
      onChange={handleChange}
      variant="scrollable"
      scrollButtons="auto"
      aria-label="scrollable auto tabs example"
      sx={{
        backgroundColor: "var(--background-color)",
        display: "flex",
        justifyContent: "center",
        width: "100%",
        height: "fit-content",
        left: "0",
        top: `${showNav ? "101%" : "-300%"}`,
        opacity: `${isMobile ? (showNav ? 1 : 0) : 1}`,
        padding: "10px",
        zIndex: 10,
        position: `${isMobile ? "absolute" : "static"}`,
        transition: "all 0.5s ease",
      }}
      orientation={isMobile ? "vertical" : "horizontal"}
    >
      <Tab label="HOME" sx={{ fontWeight: "bold" }} />
      <Tab label="OUR PRODUCTS" sx={{ fontWeight: "bold" }} />
      <Tab label="BLOG" sx={{ fontWeight: "bold" }} />
      <Tab label="ABOUT" sx={{ fontWeight: "bold" }} />
      <Tab label="CONTACT" sx={{ fontWeight: "bold" }} />
    </Tabs>
  );
};

const Header = () => {
  const isMobile = useResponsive("down", 767);

  const [showNav, setShowNav] = useState(false);

  const dispatch = useDispatch();

  const handleOpenCartDrawer = () => {
    dispatch(DrawerManagerSlice.actions.setOpenCartDrawer(true));
  };

  return (
    <Container
      maxWidth="100%"
      sx={{
        position: "relative",

        boxShadow:
          "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px",
      }}
    >
      <Container
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "start",
          padding: "10px 0px",
        }}
      >
        <Button
          sx={{
            height: "60px",
            width: "60px",
            borderRadius: "50%",
            backgroundImage: "url(static/images/logo.jpg)",
            backgroundSize: "contain",
            margin: "0px 5px",
            boxShadow:
              "rgba(0, 0, 0, 0.16) 0px 1px 4px, rgb(51, 51, 51) 0px 0px 0px 3px;",
          }}
          href="/"
        />
        <HeaderTab isMobile={isMobile} showNav={showNav} />
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Button
            sx={{
              fontWeight: "bold",
              padding: "20px 20px",
              marginLeft: "10px",
            }}
            onClick={handleOpenCartDrawer}
          >
            Cart
            <Badge badgeContent={4} color="primary" sx={{ marginLeft: "8px" }}>
              <ShoppingCartOutlinedIcon />
            </Badge>
          </Button>

          {!isMobile ? (
            <></>
          ) : (
            <IconButton onClick={() => setShowNav(!showNav)}>
              <MenuIcon />
            </IconButton>
          )}
        </Box>

        <CartDrawer />
      </Container>
    </Container>
  );
};

export default Header;
