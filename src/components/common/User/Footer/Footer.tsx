import styles from "../../../../User.module.css";
import React from "react"
const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div  className="col-xl-3 col-md-6 col-sm-12">
        <ul className={styles.ulFooter}>
          <li>
            <h4 className={styles.footerContent}>Help</h4>
          </li>
          <li>Shipping & Returns</li>
          <li>Stockists</li>
          <li>Contact Us</li>
        </ul>
      </div>
      <div className="col-xl-3 col-md-6 col-sm-12">
        <ul className={styles.ulFooter}>
          <li>
            <h4 className={styles.footerContent}>Company</h4>
          </li>
          <li>About Us</li>
          <li>FAQ</li>
          <li>VIET NAM Site</li>
        </ul>
      </div>
      <div className="col-xl-3 col-md-6 col-sm-12">
        <ul className={styles.ulFooter}>
          <li>
            <h4 className={styles.footerContent}>Legal</h4>
          </li>
          <li>Terms Of Service</li>
          <li>Terms + Conditions</li>
        </ul>
      </div>
      <div className="col-xl-3 col-md-6 col-sm-12">
        <ul  className={styles.ulFooter}>
          <li>
            <h4 className={styles.footerContent}>Store Location</h4>
          </li>
          <li>Viet Nam</li>
          <li>France</li>
          <li>Hungary</li>
        </ul>
      </div>
    </footer>
  );
};
export default Footer;
