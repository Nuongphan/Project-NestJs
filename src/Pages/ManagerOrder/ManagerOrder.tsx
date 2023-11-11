import { formattedDate } from "../ManagerReport/ManagerReport";
import OrderList from "./OrderList";
import React from "react"
export default function ManagerOrder() {
  return (
    <>
      <div className="container">
        <div
          style={{
            padding: "13px 20px 13px 20px",
            backgroundColor: "#FFFFFF",
            borderRadius: "5px",
            fontWeight: "bolder",
            fontSize: "14px",
            borderLeft: "6px solid  #ffd43b",
            display: "flex",
            justifyContent: "space-between",
            width: "95%",
          }}
        >
          <p>Danh sách đơn hàng</p>
          <p>{formattedDate} </p>
        </div>
        <OrderList/>
      </div>
    </>
  );
}
