import { lazy } from "react";
import { retry } from "../../../utils/retry";

const Product = lazy(() =>
  retry(() => import(/* webpackChunkName: "Product" */ "./Product"))
);

export default Product;
