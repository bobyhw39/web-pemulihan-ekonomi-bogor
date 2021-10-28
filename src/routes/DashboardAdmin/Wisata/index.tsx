import { lazy } from "react";
import { retry } from "../../../utils/retry";

const Wisata = lazy(() =>
  retry(() => import(/* webpackChunkName: "Wisata" */ "./Wisata"))
);

export default Wisata;
