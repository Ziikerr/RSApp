import { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import MainNavbar from "./components/MainNavbar";
import PageText from "./components/PageText";
import LoginModal from "./components/LoginModal";
import ProfilePage from "./pages/ProfilePage";
import ServicesPage from "./pages/ServicesPage";
import RegPage from "./pages/RegistrationPage";
import { Button } from "react-bootstrap";
import Footer from "./components/Footer";
import RSPPage from "./pages/RSPPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { getCookie } from "typescript-cookie";
import RequestsPage from "./pages/RequestsPage";
import RequestPage from "./pages/RequestPage";

const homeText =
  "This application is designed to simplify the process of finding a reliable repair service.";

function App() {
  const [isLogin, setLogin] = useState(false);
  const [isAuth, setAuth] = useState(getCookie("auth-cookie") ? true : false);

  return (
    <BrowserRouter>
      {/* Always on top of the page */}
      <MainNavbar auth={isAuth} btnAction={() => setLogin(true)} />
      {isLogin && (
        <LoginModal
          onLogin={() => setAuth(true)}
          title="Login"
          btnAction={() => {
            setLogin(false);
          }}
        />
      )}
      {/* Displays content based on the route */}
      <Routes>
        <Route
          path="/"
          element={
            <>
              <PageText title="Welcome!" text={homeText} align="text-center" />
              <Button href="/services" size="lg">
                Start
              </Button>
            </>
          }
        ></Route>
        <Route
          path="/profile"
          element={
            <>
              {/*Prevents display of profile page if not authenticated*/}
              {isAuth ? <ProfilePage /> : <div>Log in to edit profile</div>}
            </>
          }
        ></Route>
        <Route
          path="/services"
          element={
            <>
              <ServicesPage />
            </>
          }
        ></Route>
        <Route
          path="/RSP/:id"
          element={
            <>
              <RSPPage />
            </>
          }
        ></Route>
        <Route
          path="/register"
          element={
            <>
              <RegPage isRSP={false} />
            </>
          }
        ></Route>
        <Route path="/registerRSP" element={<RegPage isRSP={true} />}></Route>
        {getCookie("RSP-cookie") ? (
          <Route path="/requestsRSP/" element={<RequestsPage />}></Route>
        ) : (
          "No access"
        )}
        <Route path="/requests/:id" element={<RequestPage />}></Route>
      </Routes>
      {!isAuth && <Footer />}
    </BrowserRouter>
  );
}

export default App;
