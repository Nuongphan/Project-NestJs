
'use client';
import styles from "../../User.module.css"
import { Carousel, CarouselProps } from 'flowbite-react';
import BaseAxios from '../../api/axiosClient';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { GrFavorite } from "react-icons/gr";
import { MdFavorite } from "react-icons/md";

function ComponentNewArrival() {
    const [newarrival, setnewarrival] = useState<any>()
    const array1=newarrival?.slice(0,4)
    const array2=newarrival?.slice(5,9)
    const array3=newarrival?.slice(10,12)
    useEffect(() => {
        BaseAxios.get("/orders/orderitem/bestsellers")
            .then((res) => setnewarrival(res.data))
    }, [])

    return (

        <div className={styles.bestsellersCarosel} >
            <Carousel >
                <div className={styles.productListt}>
                    {array1?.map((item: any) => {
                        return <div key={item?.[0]?.[0]?.key} className={styles.candleItem}>
                            {/* <span className={styles.tagCandleItem}>BESTSELLER</span> */}
                            <div className={styles.addToCartGroup}>
                            <span className={styles.favoriteIcon}><MdFavorite/></span>
                                <img className={styles.img1} src={item?.[0]?.image?.[0]?.imgSrc} />
                                <img className={styles.img2} src={item?.[0]?.image?.[2]?.imgSrc} />
                                <NavLink to={`/product/`}>
                                    <button className={styles.btnAddToCart}>LEARN MORE</button>
                                </NavLink>
                            </div>
                            <div className={styles.titleCandle}>
                                <p>SCENT FAMILY: {item?.[0]?.category?.category}</p>
                                <p>{item?.[0]?.name}</p>
                                <p> {item?.[0]?.price} $</p>
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
                                        20 reviews
                                    </span>
                                </p>
                            </div>
                        </div>
                    })}

                </div>
                <div className={styles.productListt}>
                    {array2?.map((item: any) => {
                        return <div key={item?.[0]?.[0]?.key} className={styles.candleItem}>
                            {/* <span className={styles.tagCandleItem}>BESTSELLER</span> */}
                            <div className={styles.addToCartGroup}>
                            <span className={styles.favoriteIcon}><MdFavorite/></span>
                                <img className={styles.img1} src={item?.[0]?.image?.[0]?.imgSrc} />
                                <img className={styles.img2} src={item?.[0]?.image?.[2]?.imgSrc} />
                                <NavLink to={`/product/`}>
                                    <button className={styles.btnAddToCart}>LEARN MORE</button>
                                </NavLink>
                            </div>
                            <div className={styles.titleCandle}>
                                <p>SCENT FAMILY: {item?.[0]?.category?.category}</p>
                                <p>{item?.[0]?.name}</p>
                                <p> {item?.[0]?.price} $</p>
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
                                        20 reviews
                                    </span>
                                </p>
                            </div>
                        </div>
                    })}

                </div>
                <div className={styles.productListt}>
                    {array3?.map((item: any) => {
                        return <div key={item?.[0]?.[0]?.key} className={styles.candleItem}>
                            {/* <span className={styles.tagCandleItem}>BESTSELLER</span> */}
                            <div className={styles.addToCartGroup}>
                            <span className={styles.favoriteIcon}><MdFavorite/></span>
                                <img className={styles.img1} src={item?.[0]?.image?.[0]?.imgSrc} />
                                <img className={styles.img2} src={item?.[0]?.image?.[2]?.imgSrc} />
                                <NavLink to={`/product/`}>
                                    <button className={styles.btnAddToCart}>LEARN MORE</button>
                                </NavLink>
                            </div>
                            <div className={styles.titleCandle}>
                                <p>SCENT FAMILY: {item?.[0]?.category?.category}</p>
                                <p>{item?.[0]?.name}</p>
                                <p> {item?.[0]?.price} $</p>
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
                                        20 reviews
                                    </span>
                                </p>
                            </div>
                        </div>
                    })}

                </div>
            </Carousel>
        </div>
        
    );
}
export default ComponentNewArrival