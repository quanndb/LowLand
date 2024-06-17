import { useState } from "react";
import { useDispatch } from "react-redux";

import {
  Button,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import GoogleIcon from "@mui/icons-material/Google";

import authAPI from "src/services/API/authAPI";
import LowLandLogo from "src/components/navigation/logo";
import { toast } from "react-toastify";
import { useRouter } from "src/routes/hooks";
import SideLayout from "src/layouts/sideLayout";
import UserManagerSlice from "src/redux/slices/UserManagerSlice";

const LoginView = () => {
  const router = useRouter();

  const dispatch = useDispatch();

  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const [showPass, setShowPass] = useState(false);

  const handleLogin = () => {
    authAPI
      .login({
        email: username,
        password: password,
      })
      .then((res) => {
        dispatch(UserManagerSlice.actions.setUser(res.userResponse));
        toast.success("Logged in successfully");
        router.replace("/");
      })
      .catch((error) => toast.error(error))
      .finally(() => console.log("Done!"));
  };

  return (
    <SideLayout title={"Login"}>
      <Paper sx={{ my: "100px" }}>
        <Grid
          container
          columns={{ xm: 1, md: 3 }}
          spacing={4}
          justifyContent={"space-evenly"}
          sx={{ p: "30px" }}
        >
          <Grid
            item
            md={2}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
              width: "100%",
            }}
          >
            <Paper
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                width: "100%",
                height: "100%",
                py: "20px",
                backgroundImage:
                  "linear-gradient(0deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(/static/images/shop2.jpg)",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <LowLandLogo />

              <Typography
                variant="h4"
                textAlign={"center"}
                fontWeight={900}
                color={"#fff"}
                sx={{
                  textShadow: "3px 3px 6px rgba(0, 0, 0, 0.5)",
                  //text border
                  WebkitTextStroke: "1px #eee",
                }}
              >
                Login to join our Chill'in
              </Typography>
            </Paper>
          </Grid>
          <Grid item sm={1} md={1}>
            <TextField
              label="Username"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              sx={{ width: "100%", marginBottom: "20px" }}
            />
            <TextField
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={showPass ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPass(!showPass)}>
                      {showPass ? <VisibilityIcon /> : <VisibilityOffIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ width: "100%", marginBottom: "20px" }}
            />
            <Button
              variant="contained"
              sx={{ width: "100%" }}
              onClick={handleLogin}
            >
              Login
            </Button>
            <Divider sx={{ mt: 2 }}>
              <Typography>Or login with</Typography>
            </Divider>
            <Button
              sx={{ mt: 2, width: "100%" }}
              variant="contained"
              startIcon={<GoogleIcon />}
            >
              Google
            </Button>
            <Typography sx={{ mt: 2 }}>
              Don't have an account?{" "}
              <Button
                color="secondary"
                variant="text"
                onClick={() => router.push("/signUp")}
                sx={{ textDecoration: "underline" }}
              >
                Sign Up
              </Button>
              now!
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </SideLayout>
  );
};

export default LoginView;
