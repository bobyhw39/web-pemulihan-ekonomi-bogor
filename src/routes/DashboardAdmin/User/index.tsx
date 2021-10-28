import { lazy } from "react";
import { retry } from "../../../utils/retry";

const User = lazy(() =>
  retry(() => import(/* webpackChunkName: "User" */ "./User"))
);

export default User;
