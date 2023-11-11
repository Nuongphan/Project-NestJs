interface Order {
    id: number;
    userId: number;
    addressId: number;
    paymentId: number;
    status: number;
    totalAmount: number;
    shippingFee: number;
    orderDate: Date
}
export default Order