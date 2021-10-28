import { endPoint } from "../utils/env";
import services from "./services";

export const getBanner = () => {
  return services.extGet(`${endPoint.pemulihanEkonomiUrl.v1}banner-iklan-landing`);
};

export const postBanner = (data:any) => {
  return services.post(`${endPoint.pemulihanEkonomiUrl.v1}banner-iklan`,data);
};

export const putBanner = (data:any, id:any) => {
  return services.post(`${endPoint.pemulihanEkonomiUrl.v1}banner-iklans/${id}?_method=PUT`,data);
};

export const deleteBanner = (id:any) => {
  return services.delete(`${endPoint.pemulihanEkonomiUrl.v1}banner/${id}`);
};
