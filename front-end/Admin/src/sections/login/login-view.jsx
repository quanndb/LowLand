import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { alpha, useTheme } from "@mui/material/styles";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import Iconify from "src/components/iconify";
import { useRouter } from "src/routes/hooks";
import { bgGradient } from "src/theme/css";
import { Navigate, useNavigate } from "react-router-dom";
import Logo from "src/components/logo";
import authAPI from "src/services/API/authAPI";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import UserManagerSlice from "src/redux/slices/UserManagerSlice";
import { accessToken } from "src/redux/selectors/UserSelector";

// ----------------------------------------------------------------------

export default function LoginView() {
  const theme = useTheme();

  const router = useRouter();

  const token = useSelector(accessToken);

  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [userName, setUserName] = useState("");

  const [passWord, setPassWord] = useState("");

  const handleClick = () => {
    authAPI
      .login({
        email: userName,
        password: passWord,
      })
      .then((res) => {
        const accessToken = res.accessToken;
        if (jwtDecode(accessToken).scope !== "ADMIN") {
          toast.error("You are not able to login with this account");
          return;
        }
        dispatch(UserManagerSlice.actions.setUser(res));
        router.replace("/dashboard");
        toast.success("Login success!");
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  if (token && jwtDecode(token).scope === "ADMIN") {
    return <Navigate to={"/dashboard"} replace={true} />;
  }

  const renderForm = (
    <>
      <Stack spacing={3}>
        <TextField
          name="email"
          label="User Name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />

        <TextField
          name="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          value={passWord}
          onChange={(e) => setPassWord(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  <Iconify
                    icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        onClick={handleClick}
        sx={{ mt: 3 }}
      >
        Login
      </LoadingButton>
    </>
  );

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: "/assets/background/overlay_4.jpg",
        }),
        height: 1,
      }}
    >
      <Box sx={{ p: 5, position: "fixed" }}>
        <Logo />
      </Box>

      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
          <Typography variant="h4">Sign in to Lowland Admin</Typography>

          <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
            Lowland administrator for our shop
          </Typography>

          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Signin
            </Typography>
          </Divider>

          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
}
