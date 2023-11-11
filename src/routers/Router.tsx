import { Route, Routes } from "react-router-dom";
import NotFound from "../Pages/NotFound/NotFound";
import Auth from "../Layouts/Auth/Auth";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Home from "../Pages/Home/Home";
import Cart from "../Pages/Cart/Cart";
import ProductDetail from "../Pages/ProductDetail/ProductDetail";
import UserLayOut from "../Layouts/User/UserLayOut";
import AdminLayOut from "../Layouts/Admin/AdminLayOut";
import ManagerOrder from "../Pages/ManagerOrder/ManagerOrder";
import ManagerProduct from "../Pages/ManagerProduct/ManagerProduct";
import ManagerReport from "../Pages/ManagerReport/ManagerReport";
import ManagerUsers from "../Pages/ManagerUser/ManagerUser";
import { AddProduct } from "../Pages/ManagerProduct/AddProduct";
import Shop from "../Pages/Shop/Shop";
import AccountHome from "../Pages/Account/AccountHome";
import ForgotPassword from "../Pages/Forgotpassword/Forgotpassword";
import ResetPassword from "../Pages/ResetPassword/ResetPassword";
import Order from "../Pages/Order/Order";
import LoginSuccsess from "../Pages/Login/LoginSuccsess";
import IsCustomer from "../utils/isCustomer";
import IsAdmin from "../utils/isAdmin";
import { Favorites } from "../Pages/Favorite/Favorite";

const RootRouter = () => {
  return (
    <>
      <Routes>
        {/* //Auth */}
        <Route path="/auth" element={<Auth />}>
          <Route index element={<Login />} />
          <Route path="forgotpassword" element={<ForgotPassword />} />
          <Route path="resetpassword" element={< ResetPassword />} />
          <Route path="register" element={<Register />} />
          <Route path="logingoogle/:token/:userId/:status/:firstName/:lastName" element={<LoginSuccsess />} />
          <Route element={<IsCustomer />}>
            <Route path="account" element={<AccountHome />} /> </Route>
        </Route>
        {/* //USER */}

        <Route path="/" element={<UserLayOut />}>
          <Route index element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route element={<IsCustomer />}>
            <Route path="cart" element={<Cart />} />
            <Route path="favorites" element={<Favorites/>} />
            <Route path="order" element={<Order />} />
          </Route>
          <Route path="product/:id" element={<ProductDetail />} />
        </Route>
        {/* //ADMIN */}
        <Route element={<IsAdmin/>}>
        <Route path="/admin" element={<AdminLayOut />}>
          <Route index element={<ManagerReport />} />
          <Route path="/admin/manageruser" element={<ManagerUsers />} />
          <Route path="/admin/managerorder" element={<ManagerOrder />} />
          <Route path="/admin/managerproduct" element={<ManagerProduct />} />
          <Route path="/admin/managerproduct/add" element={<AddProduct />} />
          </Route></Route>
        //NOT FOUND
        <Route path="*" element={<NotFound />} />;
      </Routes>
    </>
  );
};
export default RootRouter;
