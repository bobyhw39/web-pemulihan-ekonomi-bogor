import { lazy } from "react";
import { retry } from "../../../utils/retry";

const Banner = lazy(() =>
  retry(() => import(/* webpackChunkName: "Banner" */ "./Banner"))
);

export default Banner;
