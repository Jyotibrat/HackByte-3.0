import { Outlet } from "react-router-dom";
import Navbar from "./NavBar";
import Footer from "./Footer";

function MarketingLayout() {
  return (
    <div className="flex flex-col min-h-screen text-white">
      <Navbar variant="marketing" />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default MarketingLayout;
