import Axios from "axios";
import { toast } from "react-toastify";
import logger from "./logService";

Axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    logger.log(error);
    toast.error("An unexpected error occurred.");
  }
  console.log("INTERCEPTOR CALLED");

  return Promise.reject(error);
});

function setJwt(jwt) {
  Axios.defaults.headers.common["x-auth-token"] = jwt;
}

// eslint-disable-next-line
export default {
  get: Axios.get,
  post: Axios.post,
  put: Axios.put,
  delete: Axios.delete,
  setJwt,
};
