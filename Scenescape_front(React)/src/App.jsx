import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import LoginForm from "./components/user/LoginForm";
import FindPasswordForm from "./components/user/FindPasswordForm";
import SignUp from "./pages/SignUp";
import MyPage from "./pages/MyPage";
import Plan from "./pages/Plan";
import PlanList from "./components/plan/PlanList";
import PlanForm from "./components/plan/PlanForm";
import Board from "./pages/Board";
import BoardList from "./components/board/BoardList";
import BoardForm from "./components/board/BoardForm";
import NotFound from "./pages/NotFound";
import BoardDetail from "./components/board/BoardDetail";

const queryClient = new QueryClient();

const Layout = ({ header = <Header />, main, footer = <Footer /> }) => {
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
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Layout main={<Home />} />}
          />
          <Route
            path="/login"
            element={<Layout main={<Login />} />}
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
            element={<Layout main={<SignUp />} />}
          />
          <Route
            path="/mypage"
            element={<Layout main={<MyPage />} />}
          />
          <Route
            path="/plan"
            element={
              <Layout
                main={<Plan />}
                footer={null}
              />
            }
          >
            <Route
              index
              element={<PlanList />}
            />
            <Route
              path="new"
              element={<PlanForm />}
            />
            <Route
              path=":id"
              element={<PlanForm />}
            />
          </Route>
          <Route
            path="/board"
            element={<Layout main={<Board />} />}
          >
            <Route
              index
              element={<BoardList />}
            />
            <Route
              path=":id"
              element={<BoardDetail />}
            />
            <Route
              path="new"
              element={<BoardForm />}
            />
          </Route>
          <Route
            path="*"
            element={<NotFound />}
          />
        </Routes>{" "}
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
