import { lazy } from "react";
import { retry } from "../../../utils/retry";

const ResetPassword = lazy(() =>
  retry(() => import(/* webpackChunkName: "ResetPassword" */ "./ResetPassword"))
);

export default ResetPassword;
