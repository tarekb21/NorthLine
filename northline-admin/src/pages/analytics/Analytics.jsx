
import React from 'react';
import "./analytics.scss"
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import Widget2 from '../../components/Widget2/Widget2';
import Chart2 from '../../components/chart2/Chart2';
import Featured from '../../components/featured/Featured';
import Histogram from '../../components/Histogram/Histogram';
import Bar from '../../components/Bar/Bar';
import LabelBars from '../../components/LabelBars/LabelBars';
import LineChart from '../../components/LineChart/LineChart';
import RadarChartA from '../../components/RadarChartA/RadarChartA';







const Analytics = () => {
  
  
  return (
      <div className='Analytics'>
        <Sidebar/>
        <div className='AnalyticsContainer'>
        <Navbar />
          <div className="widgets">
          <Widget2 type="Sales" />
          <Widget2 type="Users" />
          <Widget2 type="Bookings" />
          <Widget2 type="balance" />
        </div> 
        
        <div className='HB'>
          
          <Bar/>
          <div className='Label'>
          <LabelBars/>
          </div>
          
          <LineChart/>
          
      </div>
      <div className="charts">
          <Chart2 title="Last 3 Months (users)" aspect={2/1}/>
        </div>  
      </div>
       </div>
  )
}

export default Analytics;