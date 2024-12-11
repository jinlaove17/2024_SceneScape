import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import MyPage from "./pages/MyPage";
import Plan from "./pages/Plan";
import Board from "./pages/Board";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div className="flex flex-col max-w-[120rem] min-h-screen mx-auto">
      <header>
        <Header />
      </header>

      <main className="flex-1">
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />
          <Route
            path="/login"
            element={<Login />}
          />
          <Route
            path="/signup"
            element={<SignUp />}
          />
          <Route
            path="/mypage"
            element={<MyPage />}
          />
          <Route
            path="/plan"
            element={<Plan />}
          />
          <Route
            path="/board"
            element={<Board />}
          />
        </Routes>
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default App;
