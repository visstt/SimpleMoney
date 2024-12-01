import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import HomePage from "./Pages/Home/HomePage";
import Login from "./Pages/Auth/Login";
import Registr from "./Pages/Auth/Registr";
import Plan from "./Pages/Plan/Plan";
import Cookies from "js-cookie";
import BudgetPage from "./Pages/Budget/BudgetPage";
import CategoryPage from "./Pages/CategoryPage/CategoryPage";
import AccountPage from "./Pages/AccountPage/AccountPage";

function App() {
  const ProtectedRoute = ({ children }) => {
    const token = Cookies.get("token"); // Проверяем наличие токена

    if (!token) {
      return <Navigate to="/login" replace />; // Перенаправляем на логин, если токена нет
    }

    return children; // Если токен есть, возвращаем дочерний компонент
  };

  return (
    <Router>
      <Routes>
        {/* Доступные для всех страницы */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reg" element={<Registr />} />

        {/* Защищённые маршруты */}
        <Route
          path="/plan"
          element={
            <ProtectedRoute>
              <Plan />
            </ProtectedRoute>
          }
        />
        <Route
          path="/budget"
          element={
            <ProtectedRoute>
              <BudgetPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/category"
          element={
            <ProtectedRoute>
              <CategoryPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/account"
          element={
            <ProtectedRoute>
              <AccountPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
