import { Helmet } from "react-helmet-async";

import SignUpPageView from "src/sections/SignUp/signUp.jsx";

const SignUpPage = () => {
  return (
    <>
      <Helmet>
        <title>SignUp | LowLand</title>
      </Helmet>

      <SignUpPageView />
    </>
  );
};

export default SignUpPage;
