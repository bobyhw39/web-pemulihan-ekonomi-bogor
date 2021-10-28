import { all } from "redux-saga/effects";
import register from "./register";
import auth from "./auth";
import categories from "./categories";
import product from "./product";
import banner from "./banner";
import user from "./user";
import chat from "./chat";
import infoWisata from "./infoWIsata";
import faq from "./faq";
import dashboard from './dashboard'
import admin from './admin'
import categoryFaq from './categoryFaq'

export default function* rootSaga() {
  yield all([
    categoryFaq,
    admin,
    dashboard,
    faq,
    infoWisata,
    chat,
    user,
    banner,
    product,
    categories,
    auth,
    register,
  ]);
}
