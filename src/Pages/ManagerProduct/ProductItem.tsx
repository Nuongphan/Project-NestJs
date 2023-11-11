import React from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { IProduct } from "../../redux/Type";
import { useDispatch } from "react-redux";
import { editProduct } from "../../redux/Action/ProductAction";
import { Link } from "react-router-dom";
import BaseAxios from "../../api/axiosClient";
interface IProductProps {
  product: any;
  productList: any[];
  setProductList: any;
}
const ProductItem: React.FC<IProductProps> = (props: IProductProps) => {
  const { product, productList, setProductList } = props;
  const dispatch = useDispatch();
  function handleDelete(id: number) {
    const updateData = productList?.filter((item) => item?.id !== id);
    setProductList([...updateData]);
    BaseAxios.delete(`/products/${id}`)
    BaseAxios.delete(`/images/product/${id}`)
  }
  function handleEdit(id: string) {
    if (product?.id == id) {
      dispatch(editProduct(product));
    }
  }
  return (
    <>
      {" "}
      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
        <td
          scope="row"
          className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
          {product?.id}
        </td>
        <td className="px-2 py-3">{product?.name.toLowerCase()}</td>
        <td className="px-2 py-3">
          <img className="img-product" src={product?.image?.[0]?.imgSrc} alt="" />
        </td>
        <td className="px-3 py-3">{product?.stock}</td>
        <td className="px-3 py-3">
          {product?.category?.category}
        </td>
        <td className="px-3 py-3">{product?.price} VND</td>
        <td
          style={{
            display: "flex",
            paddingTop: "53px",
            paddingLeft: "20px",
          }}
        >
          <AiFillDelete
            onClick={() => handleDelete(product?.id)}
            style={{
              color: "red",
              marginRight: "6px",
            }}
          />{" "}
          <Link to="/admin/managerproduct/add">
            {" "}
            <AiFillEdit
              onClick={() => handleEdit(product?.id)}
              name="Edit"
              style={{
                color: "green",
              }}
            />
          </Link>
        </td>
      </tr>
    </>
  );
};

export default ProductItem;
