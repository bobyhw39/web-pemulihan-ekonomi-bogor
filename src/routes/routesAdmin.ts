import Admin from "./DashboardAdmin/Admin";
import Banner from "./DashboardAdmin/Banner";
import Category from "./DashboardAdmin/Category";
import CategoryFaq from "./DashboardAdmin/FAQ/Category";
import List from "./DashboardAdmin/FAQ/List";
import DashboardAdmin from "./DashboardAdmin/Home";
import Product from "./DashboardAdmin/Product";
import User from "./DashboardAdmin/User";
import Wisata from "./DashboardAdmin/Wisata";

export const adminRoutes = [
  { path: "/dashboard-admin/admin", component: Admin, exact: true },
  { path: "/dashboard-admin/user", component: User, exact: true },
  { path: "/dashboard-admin/category", component: Category, exact: true },
  { path: "/dashboard-admin/product", component: Product, exact: true },
  { path: "/dashboard-admin/banner", component: Banner, exact: true },
  { path: "/dashboard-admin/info-wisata", component: Wisata, exact: true },
  { path: "/dashboard-admin/faq/list", component: List, exact: true },
  {
    path: "/dashboard-admin/faq/category",
    component: CategoryFaq,
    exact: true,
  },
  { path: "/dashboard-admin", component: DashboardAdmin, exact: true },
];
