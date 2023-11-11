import React, { useEffect, useState } from "react";
import styles from "../../User.module.css";
interface ScrollSpyProps {
  targetIds: string[] | undefined; // IDs of the sections you want to spy on
}

const ScrollSpy: React.FC<ScrollSpyProps> = ({ targetIds }) => {
  const [activeTarget, setActiveTarget] = useState<string | null>(null);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.7, // Adjust this threshold as needed
    };

    const handleIntersect: IntersectionObserverCallback = (
      entries: IntersectionObserverEntry[]
    ) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveTarget(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    // Observe the target elements
    targetIds?.forEach((id) => {
      const targetElement = document.getElementById(id);
      if (targetElement) {
        observer.observe(targetElement);
      }
    });

    // Clean up the observer when the component unmounts
    return () => {
      observer.disconnect();
    };
  }, [targetIds]);

  return (
    <ul style={{ position: "sticky", top: "50px" }}>
      {targetIds?.map((id) => (
        <li style={{ marginBottom: "15px" }} key={id}>
          <a
            style={{
              display: "block",
              width: "90px",
              height: "120px",
            }}
            href={`#${id}`}
            className={id === activeTarget ? `${styles.activeImg}` : ""}
          >
            <img src={id} alt="" />
          </a>
        </li>
      ))}
    </ul>
  );
};

export default ScrollSpy;
