import { useState } from "react";
import { useEffect } from "react";
import styles from "../../User.module.css";
import BaseAxios from "../../api/axiosClient";
import {DialogCustomAnimation } from "./OrderItem";
const HistoryOrder = () => {
  const [isUpdateOrderStatus, setUpdateOrderStatus]= useState<boolean>(false)
  const [address, setAddress] = useState<any>()
  const userLoginJSON = localStorage.getItem("username");
  const userLogin: any | null = userLoginJSON
    ? JSON.parse(userLoginJSON)
    : null;
  const [orderList, setOrderList] = useState<any>();
  useEffect(() => {
    BaseAxios
      .get(`/orders/${userLogin?.id}`)
      .then((res) => {
        console.log("orrderLisstttt", res.data);
        
      setOrderList( res?.data);
     }),
     BaseAxios
     .get(`/users/${userLogin?.id}/address`)
     .then((res) => {
       console.log(3333333, res.data);
       setAddress(res?.data?.address?.[0])
     })
  }, [isUpdateOrderStatus]);
  const updateOrderStatus = (idOrder: string) => {
    const updatedOrders = orderList?.map((order: any) => {
      if (order.id === idOrder) {
        return { ...order, status: "Order Canceled" };
      }
      return order;
    });
    setOrderList(updatedOrders);
  };
 
  async function handleCancel(idOrder: string) {
    const userConfirmed = window.confirm(
      "Bạn có chắc chắn muốn hủy đơn hàng này?"
    );
    if (userConfirmed) {
      try {
        await BaseAxios.put(`/orders/cancelorder/${idOrder}`);
        setUpdateOrderStatus(true)
        updateOrderStatus(idOrder);
      } catch (error) {
        console.error("Lỗi khi hủy đơn hàng", error);
      }
    }
  }
  // Hàm kiểm tra xem nút "Cancel" có active hay không
  const canCancel = (idOrder: string) => {
    const order = orderList?.find((order: any) => order?.id === idOrder);
    return order?.status?.toLowerCase() == "pending";
  };
  return (
    <div className={styles.orderTable}>
      <table className="  w-full text-sm text-left text-gray-500 dark:text-gray-400  ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-5 py-3">
              ID ORDER
            </th>
            <th scope="col" className="px-5 py-3">
              DATE
            </th>
            <th scope="col" className="px-5 py-3">
              TOTAL
            </th>
            <th scope="col" className="px-5 py-3">
              STATUS
            </th>
            <th scope="col" className="px-5 py-3">
              ACTION
            </th>
            <th scope="col" className="px-5 py-3">
              DETAIL{" "}
            </th>
          </tr>
        </thead>
        <tbody>
          {orderList?.map((item: any) => (
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td
                scope="row"
                className="px-5 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {item?.id}
              </td>
              <td className="px-5 py-3">{item?.orderDate}</td>
              <td className="px-5 py-3">
                {Number(item?.totalAmount?.toFixed(0)).toLocaleString()}
              </td>
              <td className="px-5 py-3">  {item?.status}</td>
              <td className="px-5 py-3">
                <button
                  onClick={() => handleCancel(item?.id)}
                  className={styles.buttonOrderTable}
                  disabled={!canCancel(item?.id)}
                  style={{backgroundColor: item?.status=="Cancelled" ? "red": ""}}
                >
                Cancel
                </button>
              </td>
              <td className="px-5 py-3">
                <button  className={styles.buttonOrderTable1}><DialogCustomAnimation address={address} order={orderList} idOrder= {item?.id}/></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HistoryOrder;
