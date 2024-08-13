import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { UserView } from "src/sections/user/view";
import orderAPI from "src/services/API/orderAPI";

import LoadingManagerSlice from "src/redux/slices/LoadingManagerSlice";
import { user } from "src/redux/selectors/UserSelector";

const UserPage = () => {
  const userInfo = useSelector(user);

  const dispatch = useDispatch();

  const [myOrders, setMyOrders] = useState(null);

  useEffect(() => {
    dispatch(LoadingManagerSlice.actions.setLoading(true));
    orderAPI
      .getMyOrders()
      .then((res) => {
        setMyOrders(res);
      })
      .catch((error) => toast.error(error))
      .finally(() => dispatch(LoadingManagerSlice.actions.setLoading(false)));
  }, []);
  return (
    <>
      <Helmet>
        <title>UserPage | LowLand</title>
      </Helmet>

      <UserView user={userInfo} orders={myOrders} />
    </>
  );
};

export default UserPage;
