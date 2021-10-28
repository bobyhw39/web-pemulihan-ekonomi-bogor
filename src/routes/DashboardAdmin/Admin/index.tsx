import { lazy } from "react";
import { retry } from "../../../utils/retry";

const Admin = lazy(() =>
  retry(() => import(/* webpackChunkName: "Admin" */ "./Admin"))
);

export default Admin;
