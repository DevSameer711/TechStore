import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";
import Login from "./pages/Login.jsx";
import 'antd/dist/reset.css';
import './App.css';
import ProtectedRoute from "./pages/ProtectedRoute.jsx";
import PublicRoute from "./pages/PublicRoute.jsx";


function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<PublicRoute element={<Login/>} />} />
        <Route path="/" element={<ProtectedRoute element={<Dashboard/>} />} />
      </Routes>
    </>
  );
}

export default App;
