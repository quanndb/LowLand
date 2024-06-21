import axios from "axios";
import UserManagerSlice from "src/redux/slices/UserManagerSlice";
import { store } from "src/redux/store"; // Import the Redux store

const instance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor
instance.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.UserManager?.accessToken;

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
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
    if (error.response.data.code === 4002) {
      store.dispatch(UserManagerSlice.actions.removeUser());
    }
    throw error.response.data.message;
  }
);

export default instance;
