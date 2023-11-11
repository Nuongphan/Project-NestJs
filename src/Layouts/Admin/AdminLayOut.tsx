import Sidebar from "../../components/common/Admin/Sidebar";
import { Outlet } from "react-router-dom";
import React from "react"

const AdminLayOut = () => {
  return (
    <>
      <div className="admin-layout">
        <div
          style={{
            backgroundColor: "#F5F5F5",
            position: "fixed",
            overflowY: "auto",
            top: 0,
            bottom: 0,
            left: 0,
          }}
        >
          <Sidebar />
        </div>
        <div className="outlet">
          {" "}
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default AdminLayOut;
