import { lazy } from "react";
import { retry } from "../../../utils/retry";

const Category = lazy(() =>
  retry(() => import(/* webpackChunkName: "Category" */ "./Category"))
);

export default Category;
