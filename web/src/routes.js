import React,{useContext} from 'react'
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import NavBar from "./components/Navbar";
import Login from "./pages/Login";
import LoginContext from './contexts/LoginContext'
import SidebarProvider from './contexts/NavbarContext'
// @ts-ignore
const PrivateRoute = ({ children, redirectTo }) => {

  const { token,setToken } = useContext(LoginContext)


  const isAuthenticated = token;
  console.log("isAuth: ", token);
  return isAuthenticated ? children : <Navigate to={redirectTo} />;
};

function App() {
  return (
    <SidebarProvider>
    <BrowserRouter>
      <Routes>
        <Route
          path="/dashboard"
          element={
            <PrivateRoute redirectTo="/">
              <NavBar />
            </PrivateRoute>
          }
        />
        <Route path="/" element={<Login />} />
      </Routes>
      </BrowserRouter>
      </SidebarProvider>
  );
}

export default App;