import React, {Component} from "react";
import { Chart } from "react-google-charts";
import "./LabelBars.scss"

const data = [
  ["Ride Distance", "Number of Rides"],
  ["<= 10 Km", 100],
  ["<= 15 Km", 375],
  ["<= 20 Km", 225],
  ["<= 30 Km", 100],
  [">= 40 Km", 100],
  ["> 40 Km", 100]
  
];

  const options = {
    title: "Distance of Ride",
    chartArea: { width: "50%" },
    hAxis: {
      title: "Number of rides out of a 1,000",
      minValue: 0,
    },
    vAxis: {
      title: "Distance",
    },
  };

class LabelBars extends Component {
    render() {
      return (
        <Chart className="Char"
      chartType="BarChart"
      width="100%"
      height="400px"
      data={data}
      options={options}
    />
  )
      }
    }
export default LabelBars;