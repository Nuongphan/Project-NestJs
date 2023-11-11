import { formattedDate } from "../ManagerReport/ManagerReport";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductItem from "./ProductItem";
import { IProduct } from "../../redux/Type";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../redux/Action/ProductAction";
import BaseAxios from "../../api/axiosClient";
import Paginationn from "../../components/common/User/Footer/Pagination";

export default function ManagerProduct() {
  const dispatch = useDispatch();
  const [productList, setProductList] = useState<any[]>([]);
  const [searchInput, setSearchInput] = useState("");
  const [totalPage, setTotalPage]= useState()
  const page= useSelector((state: any)=> state.pagination)
  const handleGetDataa = () => {
    BaseAxios.get(`/products?page=${page}`).then((data) => {
      setTotalPage(data.data.totalPage)
      setProductList(data.data.result);  
    }
    ).then(err => console.log(err)).catch((err)=> console.log(err))
  };
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchInput(e.target.value);
  }
  const handleOnClick = () => {
    dispatch(addProduct(productList[0]));
  };
  useEffect(() => {
    const searchResult = productList?.filter((item) => {
      return item?.name.toLowerCase().includes(searchInput.toLowerCase());
    });
    if (searchInput.length === 0) {
      handleGetDataa();
    } else {
      setProductList(searchResult);
    }
  }, [searchInput, page]);

  return (
    <div className="container">
      <div
        style={{
          padding: "13px 20px 13px 20px",
          backgroundColor: "#FFFFFF",
          borderRadius: "5px",
          fontWeight: "bolder",
          fontSize: "14px",
          borderLeft: "6px solid  #ffd43b",
          display: "flex",
          justifyContent: "space-between",
          width: "95%",
        }}
      >
        <p>Danh sách sản phẩm</p>
        <p>{formattedDate} </p>
      </div>
      <div className="pb-4 bg-white dark:bg-gray-900 search ">
        <label htmlFor="table-search" className="sr-only ">
          Search
        </label>
        <div
          style={{ display: "flex", gap: "20px" }}
          className="relative mt-1 ml-30px"
        >
          <div className="absolute inset-y-0  left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            value={searchInput}
            onChange={handleChange}
            type="text"
            id="table-search"
            className="block p-2 pl-10 text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search "
          />
          <button
            name="Add"
            onClick={handleOnClick}
            type="button"
            className="addProducttt"
          >
            <Link to="/admin/managerproduct/add">Add</Link>
          </button>
        </div>
      </div>
      <section className="table-product">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400  ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-2 py-3">
                ID
              </th>
              <th scope="col" className="px-2 py-3">
                Name
              </th>
              <th scope="col" className="px-3 py-3">
                Image
              </th>
              <th scope="col" className="px-3 py-3">
                Stock
              </th>
              <th scope="col" className="px-3 py-3">
                Type
              </th>
              <th scope="col" className="px-3 py-3">
                Price
              </th>
              <th scope="col" className="px-3 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {productList?.map((product) => (
              <ProductItem
                key={product?.id}
                product={product}
                productList={productList}
                setProductList={setProductList}
              />
            ))}
          </tbody>
        </table>
      </section>
      <div style={{ marginTop: "8%" }}> <Paginationn   totalPage={totalPage}/></div>
    </div>
  );
}
