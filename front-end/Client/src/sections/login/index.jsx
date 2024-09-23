import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useGoogleLogin } from "@react-oauth/google";

import {
  Button,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import GoogleIcon from "@mui/icons-material/Google";

import UserManagerSlice from "src/redux/slices/UserManagerSlice";

import SideLayout from "src/layouts/sideLayout";
import LowLandLogo from "src/components/navigation/logo";
import { useRouter } from "src/routes/hooks";

import authAPI from "src/services/API/authAPI";
import { user } from "src/redux/selectors/UserSelector";
import LoadingComp from "src/components/LoadingComp";
import FloatInOnScroll from "src/components/FloatIn";

const LoginView = () => {
  const router = useRouter();

  const dispatch = useDispatch();

  const userData = useSelector(user);

  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [attemp, setAttempt] = useState(false);

  const [showPass, setShowPass] = useState(false);

  const { isPending: isPendingWhileLogin, mutate: loginByUsernameAndPassword } =
    useMutation({
      mutationKey: ["login", { username: username }],
      mutationFn: (data) => authAPI.login(data),
    });

  const { isPending: isPendingWhileLoginWithGoogle, mutate: loginWithGoogle } =
    useMutation({
      mutationKey: ["Login with google auth-code"],
      mutationFn: (code) => authAPI.loginWithGoogle(code),
    });

  const handleLogin = (e) => {
    e.preventDefault();
    if (!username || !password) {
      setAttempt(true);
      toast.error("Please enter your username and password");
      return;
    }
    loginByUsernameAndPassword(
      { email: username, password: password },
      {
        onSuccess: (data) => {
          dispatch(UserManagerSlice.actions.setUser(data));
          toast.success("Logged in successfully");
          router.replace("/");
        },
      }
    );
  };

  const handleLoginWithGoogle = useGoogleLogin({
    onSuccess: (response) => {
      loginWithGoogle(response.code, {
        onSuccess: (res) => {
          dispatch(UserManagerSlice.actions.setUser(res));
          toast.success("Logged in successfully");
          router.replace("/");
        },
      });
    },
    onError: (error) => {
      toast.error(error);
    },
    flow: "auth-code",
  });

  useEffect(() => {
    if (userData) {
      router.back();
    }
  }, []);

  return (
    <SideLayout title={"Login"}>
      <FloatInOnScroll>
        <Paper sx={{ my: "100px", width: "100%" }}>
          <LoadingComp
            isLoading={isPendingWhileLogin || isPendingWhileLoginWithGoogle}
          >
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
              <Grid item sm={1} md={1} sx={{ width: "100%" }}>
                <Stack component={"form"} onSubmit={handleLogin}>
                  <TextField
                    label="Username"
                    value={username}
                    onChange={(e) => setUserName(e.target.value)}
                    sx={{ width: "100%", marginBottom: "20px" }}
                    error={username === "" && attemp}
                    helperText={
                      username === "" && attemp
                        ? "Please enter your username"
                        : ""
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
                            {showPass ? (
                              <VisibilityIcon />
                            ) : (
                              <VisibilityOffIcon />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    error={password === "" && attemp}
                    helperText={
                      password === "" && attemp
                        ? "Please enter your password"
                        : ""
                    }
                    sx={{ width: "100%", marginBottom: "20px" }}
                  />
                  <Button
                    variant="contained"
                    type="submit"
                    sx={{ width: "100%" }}
                    onClick={handleLogin}
                  >
                    Login
                  </Button>
                </Stack>
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
          </LoadingComp>
        </Paper>
      </FloatInOnScroll>
    </SideLayout>
  );
};

export default LoginView;
