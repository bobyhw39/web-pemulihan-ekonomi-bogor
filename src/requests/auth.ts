import { endPoint } from "../utils/env";
import services from "./services";

export const login = (data: any) => {
  return services.extPost(`${endPoint.pemulihanEkonomiUrl.v1}login`, data);
};

export const logout = (data: any) => {
  return services.getLogout(`${endPoint.pemulihanEkonomiUrl.v1}logout`, data);
};

export const forgotPassword = (data: any) => {
  return services.extPost(`${endPoint.pemulihanEkonomiUrl.v1}resetPassword/sendOtp`, data);
};

export const resetPassword = (data: any, id :any) => {
  return services.post(`${endPoint.pemulihanEkonomiUrl.v1}user/resetPassword?user_id=${id}`, data);
};


export const loginAdmin = (data: any) => {
  return services.extPost(`${endPoint.pemulihanEkonomiUrl.v1}login-admin`, data);
};

export const logoutAdmin = (data: any) => {
  return services.getLogout(`${endPoint.pemulihanEkonomiUrl.v1}logout`, data);
};