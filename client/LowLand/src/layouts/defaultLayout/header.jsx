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
import { usePathname, useRouter } from "src/routes/hooks";
import { cart } from "src/redux/selectors/CartSelector";
import { Avatar } from "@mui/material";
import UserDrawer from "./common/UserDrawer";

const HeaderTab = ({ isMobile, showNav, setShowNav }) => {
  const router = useRouter();

  let location = usePathname();

  const handleChange = (event, newValue) => {
    setShowNav(false);
    router.replace(newValue);
  };

  return (
    <Tabs
      id="navBar"
      value={location.split("/")[1]}
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
        top: `${showNav ? "100%" : "-300%"}`,
        opacity: `${isMobile ? (showNav ? 1 : 0) : 1}`,
        padding: "10px",
        zIndex: 2,
        position: `${isMobile ? "absolute" : "static"}`,
        transition: "all 0.5s ease",
        boxShadow: `${
          isMobile ? "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;" : "none"
        }`,
      }}
      orientation={isMobile ? "vertical" : "horizontal"}
    >
      <Tab
        label="HOME"
        value={""}
        sx={{
          fontWeight: "bold",
          width: `${isMobile ? "100%" : "fit-content"}`,
        }}
      />
      <Tab
        label="OUR PRODUCTS"
        value={"products"}
        sx={{
          fontWeight: "bold",
          width: `${isMobile ? "100%" : "fit-content"}`,
        }}
      />
      <Tab
        label="BLOGS"
        value={"blogs"}
        sx={{
          fontWeight: "bold",
          width: `${isMobile ? "100%" : "fit-content"}`,
        }}
      />
      <Tab
        label="ABOUT"
        value={"about"}
        sx={{
          fontWeight: "bold",
          width: `${isMobile ? "100%" : "fit-content"}`,
        }}
      />
      <Tab
        label="CONTACT"
        value={"contact"}
        sx={{
          fontWeight: "bold",
          width: `${isMobile ? "100%" : "fit-content"}`,
        }}
      />
    </Tabs>
  );
};

const Header = () => {
  const isMobile = useResponsive("down", 900);

  const [showNav, setShowNav] = useState(false);

  const dispatch = useDispatch();

  const quantityInCart = useSelector(cart).length;

  const handleOpenCartDrawer = () => {
    dispatch(DrawerManagerSlice.actions.setOpenCartDrawer(true));
  };

  const handleOpenUserDrawer = () => {
    dispatch(DrawerManagerSlice.actions.setOpenUserDrawer(true));
  };

  return (
    <Container
      maxWidth="100%"
      sx={{
        position: "fixed",
        backgroundColor: "#fff",
        zIndex: 2,
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
        <HeaderTab
          isMobile={isMobile}
          showNav={showNav}
          setShowNav={setShowNav}
        />
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton onClick={handleOpenUserDrawer}>
            <Avatar></Avatar>
          </IconButton>
          <IconButton
            sx={{
              fontWeight: "bold",
            }}
            onClick={handleOpenCartDrawer}
          >
            <Badge badgeContent={quantityInCart} color="primary">
              <ShoppingCartOutlinedIcon />
            </Badge>
          </IconButton>

          {!isMobile ? (
            <></>
          ) : (
            <IconButton onClick={() => setShowNav(!showNav)}>
              <MenuIcon />
            </IconButton>
          )}
        </Box>
        <CartDrawer />
        <UserDrawer />
      </Container>
    </Container>
  );
};

export default Header;
