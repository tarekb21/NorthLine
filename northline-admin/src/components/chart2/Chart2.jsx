import "./chart2.scss";
import {
    AreaChart,
    Area,
    XAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
  } from "recharts";


const data = [
    { name: "January", Total: 500 },
    { name: "February", Total: 200 },
    { name: "March", Total: 0 },
    { name: "April", Total: 700 },

  ];

const Chart2 = ({ aspect, title }) => {
  return (
    <div className="chart">
    <div className="title">{title}</div>
    <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '50vh'}}>
    <ResponsiveContainer width="60%" aspect={aspect}>
      <AreaChart
        width={730}
        height={250}
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
            <stop offset="10%" stopColor="#ffc20D" stopOpacity={0.8} />
            <stop offset="90%" stopColor="black" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="name" stroke="black" />
        <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="Total"
          stroke="black"
          fillOpacity={1}
          fill="url(#total)"
        />
      </AreaChart>
    </ResponsiveContainer>
    </div>
  </div>
);
};

export default Chart2;