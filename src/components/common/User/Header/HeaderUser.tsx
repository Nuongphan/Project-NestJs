import { AiOutlineUser } from "react-icons/ai";
import styles from "../../../../User.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import React from "react"
import { BiSearch, BiShoppingBag, BiUser } from "react-icons/bi";
import { HiOutlineLogout } from "react-icons/hi";
import { useSelector } from "react-redux";
import {MdOutlineFavoriteBorder} from "react-icons/md"

const HeaderUser = () => {
  const cartCount = useSelector((state: any) => state.cart.count);
  const navigate = useNavigate();
  const userLoginJSON = localStorage.getItem("username");
  const userLogin:any = userLoginJSON
    ? JSON.parse(userLoginJSON)
    : null;
  const newName = userLogin?.firstName.replace(/["\\]/g, '');
  const newLastName = userLogin?.lastName.replace(/["\\]/g, '');

    
  function handleLogout(): void {
    localStorage.clear()
    navigate("/");
  }

  return (
    <>
      <header>
        <div className={styles.headerUser}>
          <div>
            <Link to="/shop">
              <span>SHOP</span>
            </Link>
            <Link to="/about">
              <span>ABOUT</span>
            </Link>
            <Link to="/contact">
              <span>CONTACT</span>
            </Link>
          </div>
          <div>
            <span> Normandy Candles</span>
            <span>Studio</span>
          </div>
          <div style={{ display: "flex", gap: "15px", fontSize: "17px" }}>
            {!userLogin ? (
              <>
                <Link to="/auth">
                  <AiOutlineUser />
                </Link>

                {/* <Link to="/cart">
                  <BiShoppingBag />
                </Link> */}
              </>
            ) : (
              <>
                <span>
                  {newName||null} {newLastName|| null}
                </span>
                <span  style={{ paddingTop: "3px" }}><Link to="/favorites"><MdOutlineFavoriteBorder/></Link></span>
                <span style={{ paddingTop: "3px" }}>
                  <Link to="/auth/account">
                    <BiUser />
                  </Link>
                </span>

                <span style={{ paddingTop: "3px" }}>
                  <Link to="/cart">
                    <BiShoppingBag className="cart-icon" />
                    {cartCount > 0 && (
                      <span className="cart-badge">{cartCount}</span>
                    )}
                  </Link>
                </span>
                <span style={{ paddingTop: "3px" }} onClick={handleLogout}>
                  <HiOutlineLogout />
                </span>
              </>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default HeaderUser;
