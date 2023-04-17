import React, {Component} from "react";
import { Chart } from "react-google-charts";
import './LineChart.scss'

const data = [
    ["x", "Number of canceled orders"],
    [0, 0],
    [1, 10],
    [2, 23],
    [3, 17],
    [4, 18],
    [5, 9],
    [6, 11],
    [7, 27],
  ];

 const options = {
    hAxis: {
      title: "Number of canceled orders",
    },
    vAxis: {
      title: "Total number of orders",
    },
    series: {
      1: { curveType: "function" },
    },
  };

class LineChart extends Component {
    render() {
      return (
        <div className="Line">
        <Chart
      chartType="LineChart"
      width="100%"
      height="400px"
      data={data}
      options={options}
    />
    </div>
  )
      }
    }
export default LineChart;