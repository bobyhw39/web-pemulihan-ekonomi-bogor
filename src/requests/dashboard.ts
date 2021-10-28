import { endPoint } from "../utils/env";
import services from "./services";

export const getVisitCount = (data: any) => {
  return services.extGet(`${endPoint.pemulihanEkonomiUrl.v1}visitCount`, data);
};
