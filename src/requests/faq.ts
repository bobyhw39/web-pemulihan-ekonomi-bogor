import { endPoint } from "../utils/env";
import services from "./services";

export const getFaq = (data:any) => {
  return services.extGet(`${endPoint.pemulihanEkonomiUrl.v1}faq-all?per_page=${data.perPage}`);
};

export const postFaq = (data:any) => {
  return services.post(`${endPoint.pemulihanEkonomiUrl.v1}faq`,data);
};

export const putFaq = (data:any, id:any) => {
  return services.put(`${endPoint.pemulihanEkonomiUrl.v1}faq-update?klasifikasi_id=${id}`,data);
};

export const deleteFaq = (id:any) => {
  return services.delete(`${endPoint.pemulihanEkonomiUrl.v1}faq/${id}`);
};