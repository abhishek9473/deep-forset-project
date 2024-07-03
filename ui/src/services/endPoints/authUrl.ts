import { API_ENDPOINTS } from "../../../config/urls";
import { get, post } from "../http-service";

//  function to register a new user
export const registerUser = (userData: {
  name: string;
  email: string;
  password: string;
}) => {
  console.log("path", API_ENDPOINTS.AUTH.REGISTER, userData);
  return post(API_ENDPOINTS.AUTH.REGISTER, userData);
};

//  function to login a user
export const loginUser = (userData: { email: string; password: string }) => {
  return post(API_ENDPOINTS.AUTH.LOGIN, userData);
};

// //  function to login a user
// export const testApi = () => {
//   return get(API_ENDPOINTS.AUTH.TEST);
// };
