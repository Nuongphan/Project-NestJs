import styles from "../../User.module.css";
import SortProduct from "./SortProduct";
import { useEffect, useState } from "react";
import ListProduct from "./ListProduct";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Paginationn from "../../components/common/User/Footer/Pagination";


const Shop = () => {
  const tab = [
    "Shop All",
    "Candles",
    "Diffusers",
    "Room Mist",
    "Bath Bars",
    "Gift Sets",
  ];
  const [productss, setProductss]= useState<any>([])
  const [type, setType] = useState<string>("Shop All");
  const [productList, setProductList] = useState<any>([]);
  const [totalPage, setTotalPage]= useState()
  const page= useSelector((state: any)=> state.pagination)
  const dispatch = useDispatch()
  useEffect(() => {
    axios
      .get(`http://localhost:8000/products`)
      .then((response) => {
        setProductList(response.data)
      })
  }, [])
  useEffect(() => {
    axios
      .get(`http://localhost:8000/products?page=${page}`)
      .then((response) => {
        setTotalPage(response.data.totalPage)
        setProductss(response.data.result)
      })
  }, [page])
  useEffect(() => {
    if (type === "Shop All") {
      dispatch({ type: "CHANGE", payload: "Shop All" })
    }
    if (type === "Candles") {
      dispatch({ type: "CHANGE", payload: "Candles" })
    }
    if (type === "Diffusers") {
      dispatch({ type: "CHANGE", payload: "Diffusers" })

    }
    if (type === "Room Mist") {
      dispatch({ type: "CHANGE", payload: "Room Mist" })
    }
    if (type === "Bath Bars") {
      dispatch({ type: "CHANGE", payload: "Bath Bars" })
    }
    if (type === "Gift Sets") {
      dispatch({ type: "CHANGE", payload: "Gift Sets" })
    }
  }, [type])
  return (
    <div className={styles.conatinerShop}>
      <div>
        <img
          src="https://brooklyncandlestudio.com/cdn/shop/files/FALL-SCENTS_2023_collection_1600x.png?v=1693887277"
          alt=""
        />
      </div>
      <SortProduct />
      <div className={styles.mainShop}>
        <div style={{ width: "25%" }} className={styles.sidebarShop}>
          <ul>
            {tab?.map((item) => (
              <li
                style={
                  type === item
                    ? { fontWeight: "bold", color: "#000", fontSize: "17px" }
                    : {}
                }
                onClick={() => setType(item)}
                key={item}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.productAndSearch}>
          <ListProduct productListt={productList} productAll= { productss}  /> 
          <div className={styles.paginationShop}> {type === "Shop All" &&<Paginationn totalPage={totalPage}/>}</div>
        </div>
       
      </div>
    </div>
  );
};

export default Shop;
