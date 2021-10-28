import { endPoint } from "../utils/env";
import services from "./services";

export const getAdmin = (data: any) => {
  return services.get(
    `${endPoint.pemulihanEkonomiUrl.v1}admins?per_page=${data.pageSize}&page=${data.current}`
  );
};

export const postAdmin = (data: any) => {
  return services.post(
    `${endPoint.pemulihanEkonomiUrl.v1}register-admin`,
    data
  );
};

export const putAdmin = (data: any, id: any) => {
  return services.put(
    `${endPoint.pemulihanEkonomiUrl.v1}admin-update/${id}`,
    data
  );
};

export const deleteAdmin = (id: any) => {
  return services.delete(`${endPoint.pemulihanEkonomiUrl.v1}admin/${id}`);
};
