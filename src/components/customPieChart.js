import React, { memo } from 'react'
import { PieChart } from 'react-minimal-pie-chart'
function customPieChart({ data, onClick }) {
  if (!data || data.length <= 0) return
  return (
    <div className="mb-3">
      <PieChart
        data={data}
        startAngle={270}
        lineWidth={99}
        style={{ color: '#ffffff' }}
        radius={PieChart.defaultProps.radius - 6}
        segmentsStyle={{ cursor: 'pointer', transition: 'stroke .3s' }}
        segmentsShift={(index) => 0.2}
        label={({ dataEntry }) => dataEntry.title}
        labelPosition={65}
        labelStyle={{
          fontSize: '5px',
          color: '#ffffff',
          fontWeight: '600',
          cursor: 'pointer',
        }}
        onClick={onClick}
      />
    </div>
  )
}
export default memo(customPieChart)
