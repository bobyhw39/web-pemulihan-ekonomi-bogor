import { endPoint } from "../utils/env";
import services from "./services";

export const getCategories = (data: any) => {
  return services.get(`${endPoint.pemulihanEkonomiUrl.v1}klasifikasi-all?per_page=${data.perPage}&page=${data.page}`);
};

export const postCategory = (data:any) => {
  return services.post(`${endPoint.pemulihanEkonomiUrl.v1}klasifikasi`,data);
};

export const putCategory = (data:any, id:any) => {
  return services.put(`${endPoint.pemulihanEkonomiUrl.v1}klasifikasi-update?klasifikasi_id=${id}`,data);
};

export const deleteCategory = (id:any) => {
  return services.delete(`${endPoint.pemulihanEkonomiUrl.v1}klasifikasi/${id}`);
};
