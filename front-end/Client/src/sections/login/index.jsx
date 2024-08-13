import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useGoogleLogin } from "@react-oauth/google";

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

import UserManagerSlice from "src/redux/slices/UserManagerSlice";
import LoadingManagerSlice from "src/redux/slices/LoadingManagerSlice";
import { loading } from "src/redux/selectors/LoadingSelector";

import SideLayout from "src/layouts/sideLayout";
import LowLandLogo from "src/components/navigation/logo";
import LoadingComp from "src/components/LoadingComp";
import { useRouter } from "src/routes/hooks";

import authAPI from "src/services/API/authAPI";
import { user } from "src/redux/selectors/UserSelector";

const LoginView = () => {
  const router = useRouter();

  const dispatch = useDispatch();

  const isLoading = useSelector(loading);

  const userData = useSelector(user);

  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [attemp, setAttempt] = useState(false);

  const [showPass, setShowPass] = useState(false);

  const handleLogin = () => {
    if (!username || !password) {
      setAttempt(true);
      toast.error("Username and password cannot be empty");
      return;
    }
    dispatch(LoadingManagerSlice.actions.setLoading(true));
    authAPI
      .login({
        email: username,
        password: password,
      })
      .then((res) => {
        if (res && res.userResponse) {
          dispatch(UserManagerSlice.actions.setUser(res));
          toast.success("Logged in successfully");
          router.replace("/");
          dispatch(LoadingManagerSlice.actions.setLoading(false));
        } else {
          toast.error("Invalid login response");
        }
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  const handleLoginWithGoogle = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        // Send the authorization code to your backend server
        authAPI
          .loginWithGoogle(response.code)
          .then((res) => {
            if (res && res.userResponse) {
              dispatch(UserManagerSlice.actions.setUser(res));
              toast.success("Logged in successfully");
              router.replace("/");
            } else {
              toast.error("Invalid login response");
            }
          })
          .catch((error) => {
            toast.error(error);
          });
      } catch (error) {
        toast.error(error);
      }
    },
    onError: (error) => {
      toast.error(error);
    },
    flow: "auth-code",
  });

  useEffect(() => {
    if (userData) {
      router.replace("/");
    }
  }, []);

  return (
    <SideLayout title={"Login"}>
      <Paper sx={{ my: "100px" }}>
        {isLoading ? (
          <LoadingComp />
        ) : (
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
                error={username === "" && attemp}
                helperText={
                  username === "" && attemp ? "Please enter your username" : ""
                }
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
                error={password === "" && attemp}
                helperText={
                  password === "" && attemp ? "Please enter your password" : ""
                }
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
                onClick={handleLoginWithGoogle}
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
        )}
      </Paper>
    </SideLayout>
  );
};

export default LoginView;
