
import React, { Component } from 'react'
import Chart from 'react-google-charts'
import "./histogram.scss"
const HistogramData = [
  ['Quarks', 'Leptons', 'Gauge Bosons', 'Scalar Bosons'],
  [2 / 3, -1, 0, 0],
  [2 / 3, -1, 0, null],
  [2 / 3, -1, 0, null],
  [-1 / 3, 0, 1, null],
  [-1 / 3, 0, -1, null],
  [-1 / 3, 0, null, null],
  [-1 / 3, 0, null, null],
]
const chartOptions = {
  title: 'Charges of subatomic particles',
  legend: { position: 'right', maxLines: 2 },
  colors: ['#5C3292', '#1A8763', '#871B47', '#999999'],
  interpolateNulls: false,
}
class Histogram extends Component {
  render() {
    return (
      <div className="container-mt-5">
        <h2>React Histogram Chart Example</h2>
        <Chart
          width={'500px'}
          height={'320px'}
          chartType="Histogram"
          loader={<div>Loading Chart</div>}
          data={HistogramData}
          options={chartOptions}
          rootProps={{ 'data-testid': '5' }}
        />
      </div>
    )
  }
}
export default Histogram