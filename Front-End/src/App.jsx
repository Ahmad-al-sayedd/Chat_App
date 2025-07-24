import "./App.scss";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/Navbar/NavBar.jsx";
import LoginAndRegister from "./components/loginAndRegister/LoginAndRegister.jsx";
import UserProfile from "./components/userProfile/UserProfile.jsx";
import OneToOneChat from "./components/oneToOneChat/OneToOneChat.jsx";

function App() {
  return (
    <>
      {/* <NavBar /> */}

      <main className="h-screen flex ">
        <Routes>
          <Route index element={<LoginAndRegister />} />

          <Route element={<NavBar />}>
            <Route path="/profile/:token" element={<UserProfile />} />
            <Route path="/userChat/:chatId" element={<OneToOneChat />} />


          </Route>
        </Routes>
      </main>
    </>
  );
}

export default App;
