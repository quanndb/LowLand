import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Box from "@mui/material/Box";

import CartDrawer from "./common/CartDrawer";
import DrawerManagerSlice from "src/redux/slices/DrawerManagerSlice";
import { useResponsive } from "src/hooks/use-responsive";
import LowLandLogo from "src/components/navigation/logo";
import { pageSelector } from "src/redux/selectors/PageSelector";
import PagesSlice from "src/redux/slices/PagesSlice";

const HeaderTab = ({ isMobile, showNav }) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const currentPage = useSelector(pageSelector);

  const handleChange = (event, newValue) => {
    let nextPage = "";
    switch (newValue) {
      case 0: {
        nextPage = "/";
        break;
      }
      case 1: {
        nextPage = "/products";
        break;
      }
      case 2: {
        nextPage = "/blogs";
        break;
      }
      case 3: {
        nextPage = "/about";
        break;
      }
      case 4: {
        nextPage = "/contact";
        break;
      }
      default: {
      }
    }
    dispatch(PagesSlice.actions.setPage(newValue));
    navigate(nextPage);
  };

  return (
    <Tabs
      id="navBar"
      value={currentPage}
      onChange={handleChange}
      variant="scrollable"
      scrollButtons="auto"
      aria-label="scrollable auto tabs example"
      sx={{
        backgroundColor: "#fff",
        display: "flex",
        justifyContent: "center",
        width: "100%",
        height: "fit-content",
        left: "0",
        top: `${showNav ? "101%" : "-300%"}`,
        opacity: `${isMobile ? (showNav ? 1 : 0) : 1}`,
        padding: "10px",
        zIndex: 1,
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
  const isMobile = useResponsive("down", 900);

  const [showNav, setShowNav] = useState(false);

  const dispatch = useDispatch();

  const handleOpenCartDrawer = () => {
    dispatch(DrawerManagerSlice.actions.setOpenCartDrawer(true));
  };

  return (
    <Container
      maxWidth="100%"
      sx={{
        position: "fixed",
        backgroundColor: "#fff",
        zIndex: 1,
        boxShadow:
          "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px",
      }}
    >
      <Container
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 0px",
        }}
      >
        <LowLandLogo />
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
