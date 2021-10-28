import { endPoint } from "../utils/env";
import services from "./services";

export const getAllUserChat = () => {
  return services.getCM(`${endPoint.messagingUrl.v1}conversation`);
};
export const getHistoryChat=(data:any)=>{
    return services.postCM(`${endPoint.messagingUrl.v1}history_message`,data);
}
export const sendMessage =(data:any)=>{
    return services.postCM(`${endPoint.messagingUrl.v1}send`,data);

}
export const getAllUsersChat = () => {
  return services.getCM(`${endPoint.messagingUrl.v1}get_all_users`);
}