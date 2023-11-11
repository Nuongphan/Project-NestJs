import React, { useEffect, useState } from "react";
import { Button, Dialog, DialogHeader, DialogBody, DialogFooter } from "@material-tailwind/react";
import styles from "../../User.module.css"
import BaseAxios from "../../api/axiosClient";

export function DialogCustomAnimation(props: any) {
  const id = props?.idOrder
  const address = props?.address
  const orderInfor = props?.order.find((item: any) => item.id == id)

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [orderList, setOrderList] = useState<any[]>([]);
  useEffect(() => {

    BaseAxios.get(`/orders/orderDetails/${id}`)
      .then((res) => {
        setOrderList(res.data)
      })
  }, [])

  return (
    <>
      <button style={{ height: "100%", width: "100%", borderRadius: "5px" }} onClick={handleOpen}>
        Detail
      </button>
      {open && (
        <div className={styles.overlay} onClick={handleClose}></div>
      )}
      <Dialog
        className={styles.customDialog}
        open={open}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogHeader className={styles.orderDetails}>Its order details.</DialogHeader>
        <DialogBody>
          <div className={styles.orderDetails1}>
            <div className={styles.orderDetailsItem1}>
              <h3 style={{ fontWeight: "bold", fontSize: "19px", marginBottom: "10px" }}>Shipping Address: </h3>
              <p><span>Customer Name:</span> {address?.name}</p>
              <p><span>Address:</span> {address?.province}  {address?.district}  {address?.ward}  {address?.address}</p>
              <p><span>Phone number:</span> {address?.phone}</p>

              <p></p>
            </div>
            <div className={styles.orderDetailsItem}><h3 style={{ fontWeight: "bold", fontSize: "19px", marginBottom: "10px" }}>Order Information:</h3>
              <p><span>IdOrder: </span>{orderInfor?.id}</p>
              <p><span>Shipping Fee:</span>  {orderInfor?.shippingFee} VND</p>
              <p><span>Order Date: </span>{orderInfor?.orderDate?.toLocaleString('vi-VN')}</p>
              <p><span>Payment Method: </span>Cash on delivery</p> </div>
          </div>
          <section  >
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400  ">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-5 py-3">
                    #
                  </th>
                  <th scope="col" className="px-2 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-3 py-3">
                    Image
                  </th>
                  <th scope="col" className="px-3 py-3">
                    Quantity
                  </th>
                  <th scope="col" className="px-1 py-3">
                    Price
                  </th>
                </tr>
              </thead>
              <tbody>
                {orderList?.map((item: any, index) =>
                  <tr className={styles.orderDetailsItem} key={item?.id}>
                    <td scope="col" className="px-5 py-3">
                      {index + 1}
                    </td>
                    <td scope="col" className="px-2 py-3">
                      {item?.productName?.toLowerCase()}
                    </td>
                    <td className={styles.imageOrderDetails} scope="col" >
                      <img src={item?.thumnail} alt="" />
                    </td>
                    <td scope="col" className="px-3 py-3">
                      {item?.quantity}
                    </td>
                    <td scope="col" className="px-1 py-3">
                      {item?.price}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </section>
        </DialogBody>
        <DialogFooter>
          <Button className={styles.btnOrderDetails} onClick={handleClose}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}