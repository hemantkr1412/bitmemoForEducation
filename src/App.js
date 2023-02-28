// pages
import Home from "./components/home/Home";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import View from "./components/view/View";
import Institution from "./components/institution/Institution";

import NoWalletPage from "./components/connection/NoWalletPage";
import Connect from "./components/connection/Connect";
import Contact from "./components/contact/Contact";
import Admin from "./components/admin/admin";

import Privacypolicy from "./components/privacyPolicy/privacypolicy";
// import Verify from "./components/verify/verify";

import Dashboard from "./components/dashboard/dashboard";
import InstitutesLandingPage from "./components/institution/instititeAdvanced/landingPage/landing";

// context
import UserState from "./context/userContext/userState";

// router
import { Route, Routes } from "react-router-dom";
import { HashRouter } from "react-router-dom";
function App() {
  return (
    <>
      <HashRouter>
        <UserState>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/view" element={<View />} />
            <Route path="/institution" element={<InstitutesLandingPage />} />
            <Route path="/wallet" element={<NoWalletPage />} />
            <Route path="/connect" element={<Connect />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/:page" element={<Home />} />
            <Route path="/privacypolicy" element={<Privacypolicy />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
          <Footer />
        </UserState>
      </HashRouter>
    </>
  );
}

export default App;
