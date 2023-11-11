import React from "react";
import { Outlet } from "react-router-dom";
import HeaderUser from "../../components/common/User/Header/HeaderUser";
import Footer from "../../components/common/User/Footer/Footer";

const Auth: React.FC = () => {
  return (
    <div>
      <HeaderUser/>
      <Outlet />
      <Footer/>
    </div>
  );
};

export default Auth;
