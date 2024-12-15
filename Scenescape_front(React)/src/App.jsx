import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import LoginForm from "./components/LoginForm";
import FindPasswordForm from "./components/FindPasswordForm";
import SignUp from "./pages/SignUp";
import MyPage from "./pages/MyPage";
import Plan from "./pages/Plan";
import Board from "./pages/Board";
import NotFound from "./pages/NotFound";

const Layout = ({ header, main, footer }) => {
  return (
    <div className="flex flex-col min-w-[80rem] h-screen mx-auto">
      <header>{header}</header>
      <main className="flex-1">{main}</main>
      <footer>{footer}</footer>
    </div>
  );
};

const App = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout
            header={<Header />}
            main={<Home />}
            footer={<Footer />}
          />
        }
      />
      <Route
        path="/login"
        element={
          <Layout
            header={<Header />}
            main={<Login />}
            footer={<Footer />}
          />
        }
      >
        <Route
          index
          element={<LoginForm />}
        />
        <Route
          path="find-password"
          element={<FindPasswordForm />}
        />
      </Route>
      <Route
        path="/signup"
        element={
          <Layout
            header={<Header />}
            main={<SignUp />}
            footer={<Footer />}
          />
        }
      />
      <Route
        path="/mypage"
        element={
          <Layout
            header={<Header />}
            main={<MyPage />}
            footer={<Footer />}
          />
        }
      />
      <Route
        path="/plan"
        element={
          <Layout
            header={<Header />}
            main={<Plan />}
          />
        }
      />
      <Route
        path="/board"
        element={
          <Layout
            header={<Header />}
            main={<Board />}
            footer={<Footer />}
          />
        }
      />
      <Route
        path="*"
        element={<NotFound />}
      />
    </Routes>
  );
};

export default App;
