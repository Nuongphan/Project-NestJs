import CartTable from "./CartTable";
import styles from "../../User.module.css"
const Cart = () => {
  return (
    <div className={styles.cartContainer}>
      <h1>CART</h1>
      <CartTable />
    </div>
  );
};

export default Cart;
