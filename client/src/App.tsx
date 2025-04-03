import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./components/navbar.css";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      <div className="fixed-navbar">
        <Navbar />
      </div>
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
