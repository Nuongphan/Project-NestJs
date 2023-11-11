import { BiSolidTagX, BiSolidUserRectangle } from "react-icons/bi";
import { AiFillTag } from "react-icons/ai";
import { BsFillCartCheckFill } from "react-icons/bs";
import { RiForbidFill } from "react-icons/ri";
import { TbReportOff } from "react-icons/tb";
import { ChartBar } from "./Chart";
import { Bestseller } from "./Bestseller";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useEffect, useState } from "react";
import BaseAxios from "../../api/axiosClient";

const time = new Date();
export const formattedDate = time.toDateString();
const ManagerReport = () => {
  const [countProducts, setCountProduct] = useState()
  const [products, setProduct] = useState<any[]>()
  const [countUsers, setCountUsers] = useState()
  const [users, setUsers] = useState<any[]>()
  const [orders, setOrders] = useState<any[]>()
  const [countOrders, setCountOrders] = useState()

  useEffect(() => {
    BaseAxios
      .get(`http://localhost:8000/products`)
      .then((response) => {
        setProduct(response.data)
        setCountProduct(response?.data?.length)
      }),  BaseAxios
      .get(`http://localhost:8000/users`)
      .then((response) => {
        setUsers(response?.data)
        setCountUsers(response?.data?.length)
      }),  BaseAxios
      .get(`http://localhost:8000/orders`)
      .then((response) => {
        setOrders(response?.data)
        setCountOrders(response?.data?.length)
      })} , 
  [])
  const checkStock= products?.filter((product:any) => product?.stock==0)
  const checkUsers= users?.filter((user:any) => user?.status==3)
  const checkOrders= orders?.filter((order:any) => order?.status?.toLowerCase()=="cancelled")



  return (
    <>
      <div className="containerr">
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
          <p>Bảng điều khiển</p>
          <p>{formattedDate} </p>
        </div>
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            marginRight: "30px",
          }}
        >
          <div className="report-item">
            <BiSolidUserRectangle
              style={{
                color: "green",
                fontSize: "60px",
                margin: "7px",
                backgroundColor: "#BCF0DA",
                height: "85%",
                borderRadius: "4px",
              }}
            />
            <div
              style={{
                fontWeight: "bolder",
                fontSize: "15px",
                margin: "15px 15px 15px 10px",
              }}
            >
              <p style={{ color: "#C81E1E" }}>TỔNG KHÁCH HÀNG</p>{" "}
              <p>{countUsers} khách hàng</p>
            </div>
          </div>
          <div className="report-item">
            <AiFillTag
              style={{
                color: "#76A9FA",
                fontSize: "60px",
                margin: "7px",
                height: "85%",
                backgroundColor: "#E1EFFE",
                borderRadius: "4px",
              }}
            />
            <div
              style={{
                fontWeight: "bolder",
                fontSize: "15px",
                margin: "15px 20px 15px 10px",
              }}
            >
              <p style={{ color: "#C81E1E" }}>TỔNG SẢN PHẨM</p>{" "}
              <p> {countProducts} sản phẩm </p>
            </div>
          </div>
          <div className="report-item">
            <BsFillCartCheckFill
              style={{
                color: "#FACA15",
                fontSize: "60px",
                margin: "7px",
                backgroundColor: "#FDF6B2",
                borderRadius: "4px",
                height: "85%",
              }}
            />
            <div
              style={{
                fontWeight: "bolder",
                fontSize: "15px",
                margin: "15px 20px 15px 0",
              }}
            >
              <p style={{ color: "#C81E1E" }}>TỔNG ĐƠN HÀNG</p>{" "}
              <p>{countOrders} đơn hàng</p>
            </div>
          </div>
          <div className="report-item">
            <BiSolidTagX
              style={{
                color: "#F98080",
                fontSize: "60px",
                margin: "7px",
                backgroundColor: "#FBD5D5",
                borderRadius: "4px",
                height: "85%",
              }}
            />
            <div
              style={{
                fontWeight: "bolder",
                fontSize: "15px",
                margin: "15px 20px 15px 10px",
              }}
            >
              <p style={{ color: "#C81E1E" }}>SẢN PHẨM HẾT HÀNG</p>{" "}
              <p>{checkStock?.length} sản phẩm</p>
            </div>
          </div>
          <div className="report-item">
            <RiForbidFill
              style={{
                color: "#F98080",
                fontSize: "60px",
                margin: "7px",
                backgroundColor: "#FBD5D5",
                borderRadius: "4px",
                height: "85%",
              }}
            />
            <div
              style={{
                fontWeight: "bolder",
                fontSize: "15px",
                margin: "15px 50px 0px 0",
              }}
            >
              <p style={{ color: "#C81E1E" }}>BỊ CẤM</p> <p>{checkUsers?.length} khách hàng</p>
            </div>
          </div>
          <div className="report-item">
            <TbReportOff
              style={{
                color: "F98080",
                fontSize: "60px",
                margin: "7px",
                backgroundColor: "#FBD5D5",
                borderRadius: "4px",
                height: "85%",
              }}
            />
            <div
              style={{
                fontWeight: "bolder",
                fontSize: "15px",
                margin: "15px 20px 15px 10px",
              }}
            >
              <p style={{ color: "#C81E1E" }}>ĐƠN HÀNG BỊ HỦY</p>{" "}
              <p>{checkOrders?.length} đơn hàng</p>
            </div>
          </div>
        </section>
        <section>
          <ChartBar />
        </section>
        <section>
          <Bestseller />
        </section>
      </div>
    </>
  );
};

export default ManagerReport;
