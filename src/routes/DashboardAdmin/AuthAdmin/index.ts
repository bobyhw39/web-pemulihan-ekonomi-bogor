import { lazy } from "react";
import { retry } from "../../../utils/retry";

const AuthAdmin = lazy(() =>
  retry(() => import(/* webpackChunkName: "auth" */ "./AuthAdmin"))
);

export default AuthAdmin;
