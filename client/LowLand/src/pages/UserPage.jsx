import { Helmet } from "react-helmet-async";
import { UserView } from "src/sections/user/view";

const UserPage = () => {
  return (
    <>
      <Helmet>
        <title>UserPage | LowLand</title>
      </Helmet>

      <UserView/>
    </>
  );
};

export default UserPage;
