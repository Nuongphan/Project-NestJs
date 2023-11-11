import styles from "../../User.module.css"

export const ShippingInfor = (props: any) => {
    const address = props?.address?.address?.[0]
    const order = props.order
    
    return <div className={styles.orderDetails1}>
        <div className={styles.orderDetailsItem1}>
            <h3 style={{ fontWeight: "bold", fontSize: "19px", marginBottom: "10px" }}>Shipping Address: </h3>
            <><p><span>Customer Name:</span> {address?.name}</p><p><span>Address:</span> {address?.province}  {address?.district}  {address?.ward}  {address?.address}</p><p><span>Phone number:</span> {address?.phone}</p></>
        </div>
        <div className={styles.orderDetailsItem}><h3 style={{ fontWeight: "bold", fontSize: "19px", marginBottom: "10px" }}>Order Information:</h3>
           <><p><span>IdOrder: </span>{order?.id}</p><p><span>Shipping Fee:</span>  {order?.shippingFee} VND</p><p><span>Order Date: </span>{order?.orderDate?.toLocaleString('vi-VN')}</p><p><span>Payment Method: </span>Cash on delivery</p></>  </div>
    </div>
}