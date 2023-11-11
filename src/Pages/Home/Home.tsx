import ImageHoverZoom from "../../css"
import styles from "../../User.module.css"
import React from "react"
import Component from "./Bestseller"
import ComponentNewArrival from "./NewArrival"
const Home = () => {
  return (
    <>   
      <div className={styles.mainThumnail} >
        <img
          src={ 
            // "https://firebasestorage.googleapis.com/v0/b/fir-upload-2724e.appspot.com/o/Labor-Day-2023-Hero.webp?alt=media&token=813373bc-da6b-4e62-a5b5-7a227d864bc9"
            "https://brooklyncandlestudio.world/cdn/shop/files/Holiday_Edit_Collection_Banner2022_2_1600x.jpg?v=1670863021"
          }   />
      </div>
      <div className={styles.aboutIntro}>
        <h1>OUR STORY</h1>
        <p>
          We are Normandy Candles Studio. We create otherworldly botanical
          fragrances inspired by the beauty of nature and the wonder of travel.
          Our in-house artisans make our candles, diffusers, and room mists in
          our Normandy workshop using soy wax and phthalate-free perfume oils
          infused with essential oils. We pride ourselves on our use of
          sustainable materials, ethical production, and meticulous
          craftsmanship.
        </p>
        <span>LEARN MORE</span>
      </div>
      <div className={styles.thumnailToShopItem}>
        <div>
          <ImageHoverZoom
            src={
              "https://firebasestorage.googleapis.com/v0/b/fir-upload-2724e.appspot.com/o/thumnailcandle.jpg?alt=media&token=976bf55c-82f4-444e-856c-536204974a92"
            }
            alt={""}
          />
          <button className={styles.btnThumnailToShop}>SHOP CANDLES</button>
        </div>
        <div>
          {" "}
          <ImageHoverZoom
            src={
              "https://firebasestorage.googleapis.com/v0/b/fir-upload-2724e.appspot.com/o/344807075_563740232296705_1710250749985046973_n.jpg?alt=media&token=c948b65e-b4a1-4a51-bbbb-30234832dbe3"
            }
            alt={""}
          />
          <button className={styles.btnThumnailToShop}>SHOP DIFFUSERS</button>
        </div>
        <div>
          {" "}
          <ImageHoverZoom
            src={
              "https://firebasestorage.googleapis.com/v0/b/fir-upload-2724e.appspot.com/o/346037868_590747579701828_1767628993595630241_n.jpg?alt=media&token=f917ddff-352e-4651-b41b-b699cf236f0f"
            }
            alt={""}
          />
          <button className={styles.btnThumnailToShop}>SHOP ROOM MISTS</button>
        </div>
      </div>
      <div className={styles.inforMaterials}></div>
      <div><p className={styles.bestsellersTitle}>BESTSELLERS</p></div>
      <div><Component/></div>
      {/* <div><p className={styles.bestsellersTitle}>NEW ARRIVAL</p></div>
      <div><ComponentNewArrival/></div> */}
      <div className={styles.previewCandles}>
        <div className={styles.previewCandlesContentt}>
          <p>ESCAPE TO THE ISLAND'S TEMPLE</p>
          <p>BALI ESCAPIST</p>
          <p>
            On a balmy day in Bali, the soothing aroma of frangipani incense
            escapes from a local temple while fragrant champaca petals rain from
            the sky, a heavenly blend of smoke and light warm floralcy. Top
            notes of orange and sweet saffron sing above a heart of magnolia
            champaca and peppery elemi while notes of smoky incense and
            patchouli hum quietly at the base.
          </p>
          <span>SHOP THIS CANDLE</span>
        </div>
        <div className={styles.previewCandlesImg}>
          <img src="https://brooklyncandlestudio.com/cdn/shop/files/WEB-BCS-Escapist-Bali_900x.jpg?v=1693489322" />
        </div>{" "}
        <div  className={styles.previewCandlesImg}>
          <img src="https://brooklyncandlestudio.com/cdn/shop/files/WEB-BCS-FFF-Ghost_Pumpkin-Portrait_900x.jpg?v=1693489001" />
        </div>
        <div className={styles.previewCandlesContentt}>
          <p>SEPTEMBER'S FIRST FRIDAY FLAME</p>
          <p>GHOST PUMPKIN</p>
          <p>
            Named for the snowy white variant of the pumpkin, Ghost Pumpkin is
            spicy and sweet with notes of bergamot, fresh cardamom, whipped
            pumpkin, and vanilla bean, but features a subtle floral edge with
            notes of sweet lavender.
          </p>
          <span>SHOP THIS CANDLE</span>
        </div>
      </div>
    </>
  );
};

export default Home;

