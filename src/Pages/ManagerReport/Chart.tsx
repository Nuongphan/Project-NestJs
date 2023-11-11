import React from "react";
import { Chart } from "react-google-charts";

export const data = [
  ["Month", "Sales", "Expenses", "Profit"],
  ["Tháng 5", 1000, 400, 200],
  [" Tháng 6", 1170, 460, 250],
  [" Tháng 7", 660, 1120, 300],
  [" Tháng 8", 1030, 540, 350],
];

export const options = {
  chart: {
    title: "Thống kê doanh số 4 tháng gần nhất",
    subtitle: "Sales, Expenses, and Profit: Tháng 5 - Tháng 6",
  },
};

export function ChartBar() {
  return (
    <section
      style={{
        backgroundColor: "#FFFFFF",
        margin: "0 35px 10px 7px",
        borderRadius: "5px",
        boxShadow: "0 2px #E2E2E2",
        color: "#000",
      }}
    >
      <div style={{ padding: "10px 30px 10px 20px" }}>
        <Chart
          chartType="Bar"
          width="97%"
          height="400px"
          data={data}
          options={options}
        />
      </div>
    </section>
  );
}
