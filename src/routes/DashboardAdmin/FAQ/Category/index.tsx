import { lazy } from "react";
import { retry } from "../../../../utils/retry";

const CategoryFaq = lazy(() =>
  retry(() => import(/* webpackChunkName: "CategoryFaq" */ "./CategoryFaq"))
);

export default CategoryFaq;
