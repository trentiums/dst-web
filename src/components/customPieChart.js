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
        radius={PieChart.defaultProps.radius - 6}
        segmentsStyle={{ cursor: 'pointer' }}
        segmentsShift={(index) => 0.2}
        label={({ dataEntry }) => dataEntry.title}
        labelPosition={65}
        labelStyle={{
          fontSize: '5px',
          fontWeight: '600',
          cursor: 'pointer',
        }}
        onClick={onClick}
      />
    </div>
  )
}
export default memo(customPieChart)
