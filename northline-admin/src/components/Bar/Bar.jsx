import React, {Component} from "react";
import { Chart } from "react-google-charts";
import "./Bar.scss"


const data = [
  ["Year", "Male", "Female"],
  ["2020", 700, 300],
  ["2021", 600, 400],
  ["2022", 575, 425],
  ["2023", 550, 450],
];

const options = {
  chart: {
    title: "Number of rides out of a 1,000",
    subtitle: "Male and Female riders: 2020-2023",
  },
};

class Bar extends Component {
    render() {
      return (
        <div className="Char1" style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '40vh'}}>
    <Chart 
      chartType="Bar"
      width="500px"
      height="300px"
      data={data}
      options={options}
    />
    </div>
  )
      }
    }
export default Bar;