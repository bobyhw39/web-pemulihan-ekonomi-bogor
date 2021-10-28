import { endPoint } from "../utils/env";
import services from "./services";

export const getCategoryFaq = (data: any) => {
  return services.extGet(
    `${endPoint.pemulihanEkonomiUrl.v1}kategoriFaq-all?per_page=${data.perPage}&page==${data.page}`
  );
};

export const postCategoryFaq = (data: any) => {
  return services.post(`${endPoint.pemulihanEkonomiUrl.v1}kategoriFaq`, data);
};

export const putCategoryFaq = (data: any, id: any) => {
  return services.put(
    `${endPoint.pemulihanEkonomiUrl.v1}kategoriFaq-update?klasifikasi_id=${id}`,
    data
  );
};

export const deleteCategoryFaq = (id: any) => {
  return services.delete(`${endPoint.pemulihanEkonomiUrl.v1}kategoriFaq/${id}`);
};
