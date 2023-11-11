import { useEffect, useState } from "react"
import BaseAxios from "../../api/axiosClient"
import { NavLink } from "react-router-dom";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import styles from "../../User.module.css"
import { GrFavorite } from "react-icons/gr";
export const Favorites = () => {
    const [favorites, setFavorites] = useState<any[]>()
    const [isDeleteFavorite, setIsDeleteFavorite] = useState<boolean>(false)
    const userLoginJSON = localStorage.getItem("username");
    const userLogin: any = userLoginJSON
        ? JSON.parse(userLoginJSON)
        : null;
    console.log(favorites);
    useEffect(() => {
        BaseAxios.get(`/favorites/${userLogin.id}`)
            .then(res => {
             setFavorites(res.data) })
            .catch(err => console.log(err))
    }, [isDeleteFavorite])
    const handleRemoveFavorite = (id: number) => {
        BaseAxios.delete(`/favorites/favorites/${id}`)
            .then(res => console.log(res))
            .catch(err => console.log(err))
            setIsDeleteFavorite(!isDeleteFavorite)
    }
    return (
        <>
            <div className={styles.productListFavorite}>
                {favorites?.map((product: any) => (
                    <div key={product?.product?.id} className={styles.candleItem}>
                        {/* {product?.bestsellers > 20 && (
                <span className={styles.tagCandleItem}>BESTSELLER</span>
              )} */}
                        <div className={styles.addToCartGroup}>
                            <span onClick={() => handleRemoveFavorite(product?.id)} className={styles.favoriteIcon}><GrFavorite /></span>
                            <img className={styles.img1} src={product?.product?.image?.[0]?.imgSrc} />
                            <img className={styles.img2} src={product?.product?.image?.[1]?.imgSrc} />
                            <NavLink to={`/product/${product?.product?.id}`}>
                                <button className={styles.btnAddToCart}>LEARN MORE</button>
                            </NavLink>
                        </div>
                        <div className={styles.titleCandle}>
                            <p>SCENT FAMILY: {product?.product?.category?.title}</p>
                            <p>{product?.product?.name}</p>
                            <p>{product?.product?.price} $</p>
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
                ))}
            </div>
        </>)
}