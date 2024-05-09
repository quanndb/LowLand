import { Helmet } from "react-helmet-async";

import LoginView from "src/sections/login";

const LoginPage = () => {
  return (
    <>
      <Helmet>
        <title>Login | LowLand</title>
      </Helmet>

      <LoginView />
    </>
  );
};

export default LoginPage;
