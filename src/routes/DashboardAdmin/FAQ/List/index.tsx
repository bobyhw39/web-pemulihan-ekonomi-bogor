import { lazy } from "react";
import { retry } from "../../../../utils/retry";

const List = lazy(() =>
  retry(() => import(/* webpackChunkName: "List" */ "./List"))
);

export default List;
