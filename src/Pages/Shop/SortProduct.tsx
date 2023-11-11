import { AiFillCaretDown } from "react-icons/ai";
import styles from "../../User.module.css"
const SortProduct = () => {
  return (
    <div
      style={{
        color: "rgb(107, 107, 107)",
        display: "flex",
        gap: "6px",
        alignItems: "center",
        borderBottom: "1px solid #ccc",
      }}
    >
      <span
        style={{
          borderLeft: "1px solid #ccc",
          marginLeft: "auto",
          fontSize: "smaller",
          letterSpacing: "2px",
          paddingTop: "15px",
          paddingBottom: "15px",
          paddingLeft: "15px",
        }}
      >
        SORT
      </span>{" "}
      <span
        style={{
          paddingTop: "15px",
          paddingBottom: "15px",
          height: "100%",
          marginRight: "30px",
          fontSize: "11px",
          marginTop: "2px",
        }}
      >
        <AiFillCaretDown />
      </span>
    </div>
  );
};

export default SortProduct;
