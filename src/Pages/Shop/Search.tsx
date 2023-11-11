import { useEffect, useState } from "react";
import styles from "../../User.module.css";
import { IProduct } from "../../redux/Type";
import axios from "axios";
import { useDispatch } from "react-redux";

const Search = () => {
  const dispatch = useDispatch();
  const [productList, setProductList] = useState<any>([]);
  const [searchInput, setSearchInput] = useState("");
  // const handleGetDataa = () => {
  //   axios.get("http://localhost:8000/products")
  //     .then((response) => {
  //       console.log(response.data.products);
  //       setProductList(response.data.products);
  //       dispatch({ type: "ADD", payload: response.data.products });
  //     })
  //     .catch(error => console.log(error));
  // };
  useEffect(() => {
    dispatch({ type: "SEARCH", payload: searchInput })
  }, [searchInput]);
  return (
    <div className={styles.searchProduct}>
      <input className={styles.inputSearchProduct}
        onChange={(e) => setSearchInput(e.target.value)}
        type="text"
        placeholder="Nhập tên sản phẩm cần tìm kiếm"
      />
    </div>
  );
};

export default Search;
