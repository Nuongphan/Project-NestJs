import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ScrollSpy from "../../Pages/ProductDetail/Img";
import styles from "../../User.module.css";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import MoreInfor from "./MoreInfor";
import React from "react";
import { useDispatch } from "react-redux";
import { increaseCart } from "../../redux/Action/CartAction";
import BaseAxios from "../../api/axiosClient";
const ProductDetail = () => {
  const [value, setvalue] = useState<any>(1);
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState<any>();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/products/${id}`)
      .then((res) => {
        setProducts(res?.data?.[0])
      })
      .catch((err) => console.log(err))

  }, []);
  const userLoginJSON = localStorage.getItem("username");
  const userLogin: any | null = userLoginJSON
    ? JSON.parse(userLoginJSON)
    : null;
  const srcImg: any = products?.image?.map((img: any) => img.imgSrc)
  function handleAddToCart(id: any) {
    if (value > Number(products?.stock)) {
      alert("Số lượng bạn mua đã đạt giới hạn của sản phẩm");
      return;
    }
    if (products?.stock === 0) {
      alert("Sản phẩm đã hết hàng");
      return;
    }
    if (!userLogin) {
      navigate("/auth");
    }
    if (userLogin?.status == 3) {
      alert("Your account has been locked.");
      return
    }
    BaseAxios.post(`/carts/${userLogin?.id}`, { productId: id, quantity: value });
    dispatch(increaseCart());
  }
  return (
    <>
      <div className={styles.productDetailContainer}>
        <div className={styles.productDetailImg} style={{ display: "flex" }}>
          <div className={styles.stickyImg}>
            <ScrollSpy targetIds={srcImg} />
          </div>
          <div>
            <div className={styles.sectionImg} id={srcImg?.[0]}>
              <img src={srcImg?.[0]} alt="" />
            </div>
            <div className={styles.sectionImg} id={srcImg?.[1]}>
              <img src={srcImg?.[1]} alt="" />
            </div>
            <div className={styles.sectionImg} id={srcImg?.[2]}>
              <img src={srcImg?.[2]} alt="" />
            </div>
          </div>
        </div>
        <div className="productContent">
          <div className={styles.productItemTitle}>
            <p id="productName">{products?.name}</p>
            <p id="productPrice">{products?.price?.toFixed(0)} VND</p>
            <p style={{ display: "flex", gap: "9px" }}>
              <span style={{ display: "flex" }}>
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
                <AiOutlineStar />
                <AiOutlineStar />
              </span>
              <span
                style={{
                  textDecoration: "underline",
                  fontSize: "11px",
                  color: "rgb(148, 147, 147)",
                  cursor: "pointer",
                }}
              >
                20 review
              </span>
            </p>
            <input
              min="1"
              type="number"
              value={value}
              onChange={(e) => setvalue(e.target.value)}
            />{" "}
            <p>Buy 3+ Minimalist Candles, Get 15% off plus Free Shipping*</p>
            <br />
            <button onClick={() => handleAddToCart(products?.id)}>
              ADD TO CART
            </button>
          </div>
          <div className={styles.productItemContent}>
            <p className={styles.tinyyy}>
              {React.createElement("div", {
                dangerouslySetInnerHTML: {
                  __html: `<div className={styles.tinyyyy}}> ${products?.description}</div>`
                },
              })}
            </p>
          </div>
          <div>
            <MoreInfor />
          </div>
        </div>
      </div>
      <div><img src="https://cdn.shopify.com/s/files/1/0315/2749/files/Product-Page-Redesign-2021_02_2b33b918-f34a-4a62-ac9c-f4305f0deb84.jpg?v=1635168206" alt="" /></div>
      <div className={styles.productDetailsReviewImage}><img src="https://brooklyncandlestudio.world/cdn/shop/files/Brooklyn_Candle_Studio-17_1500x.jpg?v=1641934772" alt="" />
      <div   className={styles.containerProductDetailsReview}> <p className={styles.cotentProductDetails1}>SMELLS LIKE: SPRUCE TREES IN FRESH MOUNTAIN AIR.</p>
        <p  className={styles.cotentProductDetails2}>Inspired by the fresh evergreens that grow in the airy mountains of Montana, this scent is reminiscent of nature in a far-off place. A Brooklyn Candle Studio original blend of blue spruce, pine, and camphor essential oils and fragrance.</p></div>
    </div> </>
  );
};

export default ProductDetail;
