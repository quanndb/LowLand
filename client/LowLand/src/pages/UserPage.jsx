import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";

// import { USERS } from "src/mock/users";
import { ORDERS } from "src/mock/orders";
import { UserView } from "src/sections/user/view";
import { user } from "src/redux/selectors/UserSelector";
import orderAPI from "src/services/API/orderAPI";

import { toast } from "react-toastify";
const UserPage = () => {
  const userInfo = useSelector(user);

  const [myOrders, setMyOrders] = useState(null);

  useEffect(() => {
    orderAPI
      .getMyOrders()
      .then((res) => {
        setMyOrders(res);
      })
      .catch((error) => toast.error(error))
      .finally();
  }, []);
  return (
    <>
      <Helmet>
        <title>UserPage | LowLand</title>
      </Helmet>

      <UserView user={userInfo} 
      orders={myOrders} 
      />
    </>
  );
};

export default UserPage;
