import Home from "./Home";
import Auth from "./Auth";
import Register from "./Register";
import Product from "./Product";
import SearchPage from "./Home/SearchPage";
import ProfileUmkm from "./Home/ProfileUmkm";
import Umkm from "./Home/Umkm";
import InfoWisata from "./Home/InfoWisata";
import Dashboard from "./Dashboard/Home";
import Profile from "./Dashboard/Profile";
import ProfileHome from "./ProfileHome";
import ProductDashboard from "./Dashboard/Product";
import InfoWisataDetails from "./Home/InfoWisata/InfoWisataDetails/";
import Faq from "./Home/Faq";
import Chat from "./Chat";

export const routes = [
  { path: "/faq", component: Faq, exact: true },
  { path: "/info-wisata/:id", component: InfoWisataDetails, exact: true },
  { path: "/info-wisata", component: InfoWisata, exact: true },
  { path: "/umkm", component: Umkm, exact: true },
  { path: "/umkm/:id", component: ProfileUmkm, exact: true },
  { path: "/search", component: SearchPage, exact: true },
  { path: "/product/:id", component: Product, exact: true },
  { path: "/", component: Home, exact: true },
];

export const noAuthRoutes = [
  { path: "/register", component: Register, exact: true },
  { path: "/login", component: Auth },
];

export const protectedRoutes = [
  { path: "/chat", component: Chat, exact: true },
  { path: "/profile/:id", component: ProfileHome, exact: true },
  { path: "/dashboard/product", component: ProductDashboard, exact: true },
  { path: "/dashboard/profile", component: Profile, exact: true },
  { path: "/dashboard", component: Dashboard, exact: true },
];
