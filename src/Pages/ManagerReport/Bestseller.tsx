import { useEffect, useState } from "react";
import { IProduct } from "../../redux/Type";
import BaseAxios from "../../api/axiosClient";

export const Bestseller = () => {
  const [bestsellerList, setBestsellerList] = useState<any>()
    useEffect(() => {
        BaseAxios.get("/orders/orderitem/bestsellers")
            .then((res) => setBestsellerList(res.data))
    }, [])
 const checkStock=(stock:number) => {
if(stock==0) {
  return "Out of stock"
}
if(stock >= 50) {
  return "In stock"
}
if(stock < 50) {
  return "almost out of stock"
  }}
  return (
    <>
      <div
        className="relative overflow-x-auto "
        style={{
          margin: "10px 33px 20px 7px",
          borderRadius: "4px",
          boxShadow: "0px 2px #ccc",
          backgroundColor: "#FFFFFF",
        }}
      >
        <p
          style={{
            margin: "15px 0 20px 20px ",
            letterSpacing: "1px",
            fontWeight: "bolder",
            borderBottom: "3px solid #ffd43b",
            paddingBottom: "5px",
            fontSize: "large",
          }}
        >
          {" "}
          SẢN PHẨM BÁN CHẠY
        </p>
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Type
              </th>
              <th scope="col" className="px-6 py-3">
              Name
              </th>
              <th scope="col" className="px-6 py-3">
           Price
              </th>
              <th scope="col" className="px-6 py-3">
               Status
              </th>
            </tr>
          </thead>
          <tbody>
            {bestsellerList?.map((product: any, index:number) => (
              <tr
              key={product?.[0]?.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                {product?.[0]?.category?.category}
                </th>
                <td className="px-6 py-4">  {product?.[0]?.name}</td>
                <td className="px-6 py-4"> {product?.[0]?.price}</td>
                <td className="px-6 py-4">
                {checkStock(product?.[0]?.stock)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
