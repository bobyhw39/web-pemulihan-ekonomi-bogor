import { Router } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Routes from "./routes";
import history from "./utils/history";
import { endPoint } from "./utils/env";
import axios from "axios";

function App() {
  const getVisitCount = () => {
    const visit = sessionStorage.getItem("visit_");
    axios.get("https://geolocation-db.com/json/").then(async (res) => {
      if (visit !== res?.data?.IPv4) {
        await axios.get(`${endPoint.pemulihanEkonomiUrl.v1}index`);
        sessionStorage.setItem("visit_", res.data.IPv4);
      }
    });
  };
  getVisitCount();
  return (
    <Router history={history}>
      <HelmetProvider>
        <Routes />
      </HelmetProvider>
    </Router>
  );
}

export default App;
