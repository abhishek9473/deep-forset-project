// services/auth-service.ts
import { API_ENDPOINTS } from "../../../config/urls";
import { get, post } from "../http-service";
import { ApiResponse } from "../../types/apiResponse";

// Function to register a new user
export const registerUser = (userData: {
  name: string;
  email: string;
  password: string;
}): Promise<ApiResponse<any>> => {
  return post<ApiResponse<any>>(API_ENDPOINTS.AUTH.REGISTER, userData);
};

// Function to login a user
export const loginUser = (userData: {
  email: string;
  password: string;
}): Promise<ApiResponse<any>> => {
  return post<ApiResponse<any>>(API_ENDPOINTS.AUTH.LOGIN, userData);
};
