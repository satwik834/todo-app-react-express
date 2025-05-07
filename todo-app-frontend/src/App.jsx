import TodoBox from "./TodoBox";
import NavBar from "./NavBar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import {Route , Routes} from 'react-router-dom';
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";


function App(){
  const {isLoggedIn} = useAuth();
    return(
      <>
      <NavBar />
      <Routes>
          <Route 
              path="/" 
              element={isLoggedIn ? <TodoBox /> : <Navigate to="/login" />} 
          />
          <Route 
              path="/login" 
              element={!isLoggedIn ? <Login /> : <Navigate to="/" />} 
          />
          <Route 
              path="/register" 
              element={!isLoggedIn ? <Register /> : <Navigate to="/" />} 
          />
      </Routes>
  </>

    );
}

export default App; 
