import {
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { Todo } from "../pages/Todo/Todo";
import { Home } from "../pages/Home/Home";
import { Login } from "../pages/Login/Login";
import { useAppSelector } from "../hooks/hooks";
import { selectAuth } from "../redux/auth/auth.slice";

export const AppRouter = () => {
  const { userInfo } = useAppSelector(selectAuth);
  return (
    <Routes>
      <Route
        path="/login"
        element={!userInfo?.token ? <Login /> : <Navigate to="/home" />}
      />
      <Route
        path="/home"
        element={userInfo?.token ? <Home /> : <Navigate to="/login" />}
      />
      <Route
        path="/todo"
        element={userInfo?.token ? <Todo /> : <Navigate to="/login" />}
      />
      <Route
        path="/"
        element={userInfo?.token ? <Home /> : <Navigate to="/login" />}
      />
    </Routes>
  );
};
