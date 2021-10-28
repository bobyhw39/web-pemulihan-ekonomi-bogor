import { endPoint } from "../utils/env";
import services from "./services";

export const postProduct = (data: any) => {
  return services.post(`${endPoint.pemulihanEkonomiUrl.v1}produk-umkm`, data);
};
export const getProductCount = (perPage: any) => {
  return services.get(
    `${endPoint.pemulihanEkonomiUrl.v1}produk-umkm-landings/visit?perPage=${perPage}`
  );
};

export const getProductId = (id: any) => {
  return services.get(
    `${endPoint.pemulihanEkonomiUrl.v1}produk-umkm-landing/${id}`
  );
};

export const getProduct = (data: any) => {
  return services.get(
    `${endPoint.pemulihanEkonomiUrl.v1}produk-umkm-landing?id_klasifikasi=${data.category_id}&perPage=${data.perPage}&sort=${data.sort}&nama=${data.name}&id_umkm=${data.umkm_id}&page=${data.page}`
  );
};

export const putProduct = (data: any, id: any) => {
  return services.put(
    `${endPoint.pemulihanEkonomiUrl.v1}produk-umkm/${id}`,
    data
  );
};

export const deleteProduct = (id: any) => {
  return services.delete(`${endPoint.pemulihanEkonomiUrl.v1}produk/${id}`);
};
