import { jwtDecode } from "jwt-decode";
import { Navigate, Outlet } from "react-router-dom";

function IsAdmin() {
  const token: any = localStorage.getItem("token");
  let data: any;
  if (token) {
    data = jwtDecode(token);
  } else {
    data = "";
  }
  if (!data || data.roleId !== 2) {
   return <Navigate to="/"/>
  } else { return <Outlet />; }

}
export default IsAdmin ;