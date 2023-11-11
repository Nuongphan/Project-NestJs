
import { useState } from "react";
import styles from "../../User.module.css";
interface Data {
  title: string;
  answer: string;
}
const data: Data[] = [
  {
    title: "PRODUCT DETAILS",
    answer:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit.Asperiores aut commodi vel culpa pariatur nam nobis aspernatur aliquam iste, hic earum dolore, autem ullam? Esse nobis labore laudantium repellendus debitis?",
  },
  {
    title: "CARE + SAFETY",
    answer:
      "Directions:Always trim wicks to 1/4 inch before lighting (we suggest using a wick trimmer). The first time you light your candle, let it burn for 3-4 hours to allow the melted wax to reach the edge of the container to prevent your candle from tunneling.Candle Safety:Follow the 2 foot rule - don't place a burning candle near clothing, books, curtains or anything flammable. Place candle holders on a stable, heat-resistant surface that is sturdy and large enough to catch any melted wax. Keep lit candles away from drafts, ceiling fans and any air currents. Never leave a burning candle unattended. Extinguish all candles when you leave a room or before going to sleep or if the flame gets too close to the candle holder or container. A candle should not be burned for more than four hours at a time. For a margin of safety, discontinue burning a candle when 1/4 inch of wax remains in the container.",
  },

  {
    title: "SHIPPING + EXCHANGES",
    answer:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit.Asperiores aut commodi vel culpa pariatur nam nobis aspernatur aliquam iste, hic earum dolore, autem ullam? Esse nobis labore laudantium repellendus debitis? Lorem ipsum dolor sit amet consectetur adipisicing elit.Asperiores aut commodi vel culpa pariatur nam nobis aspernatur aliquam iste, hic earum dolore, autem ullam? Esse nobis labore laudantium repellendus debitis?",
  },
  {
    title: "SCENT GLOSSARY",
    answer:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit.Asperiores aut commodi vel culpa pariatur nam nobis aspernatur aliquam iste, hic earum dolore, autem ullam? Esse nobis labore laudantium repellendus debitis?",
  },
];
function MoreInfor(): any {
  const [selected, setSelected] = useState(null);
  const toggle = (index: any) => {
    if (selected == index) {
      setSelected(null);
    } else {
      setSelected(index);
    }
  };
  return (
    <div className={styles.accordinContainer}>
      <div className={styles.accordionn}>
        {data.map((item, index) => (
          <div key={item.title} className={styles.itemAccordin}>
            <div className={styles.titleAccordin} onClick={() => toggle(index)}>
              <h2>{item.title}</h2>
              <h2>
                {" "}
                <span className={styles.titleAction}>
                  {selected == index ? "-" : "+"}
                </span>
              </h2>
            </div>
            <div
              className={
                selected == index
                  ? `${styles.content} ${styles.show}`
                  : `${styles.content}`
              }
            >
              {item.answer}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default MoreInfor;
