import { Helmet } from "react-helmet-async";
import { UserView } from "src/sections/user/view";
import { USERS } from "src/mock/users";
import { ORDERS } from "src/mock/orders";
const UserPage = () => {
  return (
    <>
      <Helmet>
        <title>UserPage | LowLand</title>
      </Helmet>

      <UserView  user={USERS[0]} orders= {ORDERS} />
    </>
  );
};

export default UserPage;
