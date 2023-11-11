import { jwtDecode } from "jwt-decode";
import { Navigate, Outlet } from "react-router-dom";



function IsCustomer() {
  const token: any = localStorage.getItem("token");
  let data: any;
  if (token) {
    data = jwtDecode(token);
  } else {
    data = "";
  }

  if (!data) {
   return <Navigate to="/"/>
  } else { return <Outlet />; }

}

export default IsCustomer;
