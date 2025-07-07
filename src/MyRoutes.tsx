import { Route, Routes } from "react-router-dom";
import ShowWeather from "./pages/ShowWeather";
import App from "./App";

const MyRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/:city" element={<ShowWeather />} />
    </Routes>
  );
};

export default MyRoutes;
