import { useState } from "react";
import styles from "../../User.module.css";
import Address from "./Address";
import HistoryOrder from "./HistoryOrder";
import React from "react"
const AccountHome = () => {
  const tab = ["Address", "History Order"];
  const [type, setType] = useState<string>("Address");

  return (
      <div className={styles.mainAccount}>
      <div style={{ width: "25%" }} className={styles.sidebarAccount}>
        <ul>
          {tab.map((item) => (
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
      <div className= {styles.infor}>
        {type == "Address" ? <Address /> : 
        <HistoryOrder />
        }
      </div>
    </div>
  );
};

export default AccountHome;
