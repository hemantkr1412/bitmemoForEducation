// pages
import Home from "./components/home/Home";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Individual from "./components/individual/Individual";
import View from "./components/view/View";
import Institution from "./components/institution/Institution";
import Souvenir from "./components/souvenir/Souvenir";
import NoWalletPage from "./components/connection/NoWalletPage";
import Connect from "./components/connection/Connect";
import Contact from "./components/contact/Contact";
import Admin from "./components/admin/admin";
import Individualinfo from "./components/learnmore/Individualinfo";
import InstituteInfo from "./components/learnmore/InstituteInfo";
import DestinationInfo from "./components/learnmore/DestinationInfo";
import Privacypolicy from "./components/privacyPolicy/privacypolicy";
// import { KYCform } from "./components/souvenir/KYCform";

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
            <Route path="/individual" element={<Individual />} />
            <Route path="/view" element={<View />} />
            <Route path="/institution" element={<Institution />} />
            <Route path="/souvenir" element={<Souvenir />} />
            {/* <Route path="kycform" element={<KYCform />} /> */}
            <Route path="/wallet" element={<NoWalletPage />} />
            <Route path="/connect" element={<Connect />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/home/individualinfo" element={<Individualinfo />} />
            <Route path="/home/instituteinfo" element={<InstituteInfo />} />
            <Route path="/home/destinationinfo" element={<DestinationInfo />} />
            <Route path="/individualinfo" element={<Individualinfo />} />
            <Route path="/instituteinfo" element={<InstituteInfo />} />
            <Route path="/destinationinfo" element={<DestinationInfo />} />
            <Route path="/:page" element={<Home />} />
            <Route path="/privacypolicy" element={<Privacypolicy />} />
          </Routes>
          <Footer />
        </UserState>
      </HashRouter>
    </>
  );
}

export default App;
