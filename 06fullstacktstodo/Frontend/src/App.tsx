import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import {Toaster} from "react-hot-toast";
import ProtectedRoute from "./components/ProtectedRoute";



function App() {

  return (
    <div>
      <Routes>
        <Route path="/" 
        element={<ProtectedRoute>
          <Home />
          </ProtectedRoute>} 
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>

      <Toaster />
    </div>
  );
}

export default App
