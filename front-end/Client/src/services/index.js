import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

import UserManagerSlice from "src/redux/slices/UserManagerSlice";
import { store } from "src/redux/store";

const instance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

function isTokenExpired(token) {
  if (!token) {
    return true;
  }

  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000);

    return decodedToken.exp < currentTime;
  } catch (error) {
    return true;
  }
}

// Add a request interceptor
instance.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.UserManager?.accessToken;
    if (token) {
      if (isTokenExpired(token)) {
        store.dispatch(UserManagerSlice.actions.removeUser());
        toast.error("Your session has expired. Please login again.");
      } else {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  (response) => {
    if (response && response.data && response.data.result) {
      return response.data.result;
    } else {
      return response;
    }
  },
  (error) => {
    if (error.code === "ERR_NETWORK") {
      toast.error("Network error. Please check your internet connection.");
    } else if (error.response && error.response.status === 404) {
      window.location.href = "/404";
    } else {
      toast.error(
        error.response?.data?.message ||
          error.response?.data?.result ||
          "An error occurred."
      );
    }
    throw error;
  }
);

export default instance;
