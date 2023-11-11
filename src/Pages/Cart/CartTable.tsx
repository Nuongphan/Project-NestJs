import { useEffect, useState } from "react";
import styles from "../../User.module.css";
import { decreaseCart } from "../../redux/Action/CartAction";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import BaseAxios from "../../api/axiosClient";
import Paypal from "../../components/common/PaypalButton";

const CartTable = () => {
  const [productList, setProductList] = useState<any>();
  const navigate = useNavigate();
  const cartCount = useSelector((state: any) => state.cart.count);
  const dispatch = useDispatch();
  const [address, setAddress] = useState<any>()
  const userLoginJSON = localStorage.getItem("username");
  const userLogin: any | null = userLoginJSON ? JSON.parse(userLoginJSON) : null;

  useEffect(() => {
    BaseAxios
      .get(`/carts/cartByUser/${userLogin?.id}`)
      .then((res) => setProductList(res.data))
  }, []);

  useEffect(() => {
    BaseAxios
      .get(`/users/${userLogin?.id}/address`)
      .then((res) => {
        console.log(3333333, res.data);

        setAddress(res.data?.address?.[0])
      })
  }, [productList])

  const handleChangQuantity = async (id: number, quantity: any) => {
    await BaseAxios.put(`/carts/${id}`, { quantity: quantity })
    // tạo một bản sao của productList để rerender lại 
    const updatedProductList = productList?.map((item: any) =>
      item?.id === id ? { ...item, quantity: quantity } : item
    );
    setProductList(updatedProductList);
  }

  // Total
  let totalResult: number = 0;
  totalResult = productList?.reduce(
    (total: number, item: any) => {
      return Number(total + Number(item?.quantity) * Number(item?.product?.price))
    }, 0)

  let totalResultPaypal = totalResult / 23000
  console.log("totalresultpaypal", totalResultPaypal,totalResult);
  
  // Paymet
  const handleCheckOut = async () => {

    if (userLogin.roleId == 2) {
      alert("You do not have the authority to place an order.")
      return
    }

    if (productList?.length == 0) {
      alert("Vui lòng thêm sản phẩm vào giỏ hàng.");
     navigate("/shop"); 
     return
    }
    if (!address) {
      navigate("/auth/account")
      return
    }
    await BaseAxios.post(`/orders/${userLogin?.id}`)
      .then(res => console.log(res))
      .catch(err => console.log(err))
    navigate("/");
  };

  if (productList?.length == 0) {
    dispatch(decreaseCart())
  }

  // Xoá sản phẩm trong cart
  async function handleDelete(id: any) {
    const newCart = productList?.filter((item: any) => item?.id !== id);
    await BaseAxios.delete(`/carts/${id}`)
    setProductList(newCart);
  }

  return (
    <div className={styles.cartTable}>
      <table className={styles.cartTableContainer}>
        <thead>
          <tr className={styles.cartTableThead}>
            <th>PRODUCT</th>
            <th>QUANTITY</th>
            <th>TOTAL</th>
          </tr>
        </thead>
        <tbody>
          {productList?.map((item: any, index: number) => {
            return (
              <tr key={item?.id} className={styles.cartTableTbody}>
                <td className={styles.cartTableTbodyItem1}>
                  <span>
                    <img
                      className={styles.imgProductTable}
                      src={item?.product?.image?.[0]?.imgSrc}
                      alt=""
                    />
                  </span>
                  <p>
                    <Link to={`/product/${item?.id}`}>
                      <span>{item?.product?.name}</span>
                    </Link>
                    <span>{item?.product?.price} VND</span>
                  </p>
                </td>
                <td className={styles.cartTableTbodyItem2}>
                  <input
                    onChange={(event) =>
                      handleChangQuantity(item?.id, event.target.value)
                    }
                    type="number"
                    min="1"
                    value={item?.quantity}
                  />
                  <p onClick={() => handleDelete(item?.id)}>REMOVE</p>
                </td>
                <td className={styles.cartTableTbodyItem3}>
                  <span
                  >
                    {Number(item?.quantity * item?.product?.price).toLocaleString()} VND
                  </span>

                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className={styles.discount}>
        <div className={styles.discountItem1}>
          {/* <p>Add Order Note or Gift Note:</p>
          <textarea
            name="discount"
            id="discount"
            placeholder="Leave a gift note here"
          ></textarea> */}
          <p className={styles.addressShipping}>Address:</p>
          <p>{address?.province} {address?.district} {address?.ward} {address?.address}</p>
          <p className={styles.addressShipping}>Phone:</p>
          <p>{address?.phone}</p>
          <Link to={"/auth/account"}><button className={styles.buttonEditAdress}>EDIT</button></Link>
        </div>
        <div className={styles.discountItem2}>
          <p><span>PAYMENT METHOD: Cash on delivery</span></p>
          {productList?.length > 0 && <p><span style={{ marginRight: "38px" }}>SHIPPING FEE:</span> 25.000</p>}
          <p>
            <span style={{ marginRight: "90px" }}>TOTAL:</span>
            {Number(totalResult)?.toLocaleString()}
            VND
          </p>
          <button style={{
            marginBottom:20
          }} onClick={handleCheckOut}>CHECKOUT</button>
          <Paypal amount={String(totalResultPaypal)} />
        </div>
      </div>
    </div>
  );
};
export default CartTable;
