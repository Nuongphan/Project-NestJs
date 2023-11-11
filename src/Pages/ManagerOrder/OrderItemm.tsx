import React, { useEffect, useState } from "react";
import { Button, Dialog, DialogHeader, DialogBody, DialogFooter } from "@material-tailwind/react";
import styles from "../../User.module.css"
import BaseAxios from "../../api/axiosClient";
import { ShippingInfor } from "./ShippingInfor";
export function DialogCustomAnimationn(idOrder: any) {
  const id = idOrder?.idOrder
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [order, setOrder] = useState<any>()
  const [address, setAddress] = useState<any>()

  const [orderList, setOrderList] = useState<any[]>([]);
  useEffect(() => {
    BaseAxios.get(`/orders/orderDetails/${id}`)
      .then((res) => setOrderList(res.data)),
      BaseAxios.get(`/orders/orderId/orderdetail/${id}`)
        .then((res) => { setOrder(res.data) })
        .catch((err) => {
          console.log(err);
        })
    const getUser = () => {
      if (order) {
        try {
          BaseAxios.get(`/users/${order?.userId}/address`)
            .then((res) => setAddress(res.data))
            .catch((err) => {
              console.log(err);
            })
        }
        catch (err) {
          console.log(err);
        }
      }
    }
    getUser()
  }, [open])

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
          <ShippingInfor order={order} address={address} />
          <section className="table-product">
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