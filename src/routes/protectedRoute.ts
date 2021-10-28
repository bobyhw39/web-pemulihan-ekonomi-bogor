import { AuthUser } from "../models/AuthUser";
import { getDataAdminSession, getDataSession } from "../utils/utils";
import {
  noAuthRoutes,
  protectedRoutes,
  routes,
  noAuthAdminRoutes,
} from "./routes";
import { adminRoutes } from "./routesAdmin";

export const ProtectedRoute = () => {
  const data: AuthUser | any = getDataSession();
  const dataAdmin: AuthUser | any = getDataAdminSession();
  if (dataAdmin === undefined && data === undefined) {
    return {
      routes: [...noAuthAdminRoutes, ...noAuthRoutes, ...routes],
      data,
      dataAdmin,
      wsChat: false
    };
  }
  if (dataAdmin === undefined && data !== undefined) {
    return {
      routes: [...protectedRoutes, ...noAuthAdminRoutes, ...routes],
      data,
      dataAdmin,
      wsChat: true
    };
  }
  if (dataAdmin !== undefined && data === undefined) {
    return {
      routes: [...adminRoutes, ...noAuthRoutes, ...routes],
      data,
      dataAdmin,
      wsChat: false
    };
  }
  return {
    routes: [...protectedRoutes, ...adminRoutes, ...routes],
    data,
    dataAdmin,
    wsChat: true
  };
};
