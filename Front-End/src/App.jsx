import './App.scss';
import { Routes, Route } from "react-router-dom";
import NavBar from './components/Navbar/NavBar.jsx';
import LoginAndRegister from './components/loginAndRegister/LoginAndRegister.jsx';
import UserProfile from './components/userProfile/UserProfile.jsx';

function App() {
  return (
    <>
      {/* <NavBar /> */}

      <main className="h-screen flex items-center justify-center">
        <Routes>
          <Route index element={<LoginAndRegister />} />
          <Route path="/profile/:token" element={<UserProfile />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
