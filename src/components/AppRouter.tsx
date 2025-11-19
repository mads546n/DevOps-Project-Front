import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";

// Pages
import App from "./../App";
import Auktioner from "./../Auktioner";
// import OmOs from "./../OmOs";
//import Search from "./../Search";
import Login from "../pages/Login";

export default function AppRouter() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<App />} />
        <Route path="/auktioner" element={<Auktioner />} />
        {/* <Route path="/om-os" element={<OmOs />} />
        <Route path="/search" element={<Search />} /> */
        <Route path="/login" element={<Login />} />}
      </Route>
    </Routes>
  );
}
