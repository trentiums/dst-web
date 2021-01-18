import React, { memo, useState } from 'react'

function HorizontalCardList() {
  const [selectedLayoutIndex, setSelectedLayoutIndex] = useState(5)
  return (
    <div className="layout-container mb-3">
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((card, index) => (
        <div
          className={`res-num-container ${
            selectedLayoutIndex === index ? 'is-num-selected' : 'is-num-non-selected'
          }`}
          onClick={() => setSelectedLayoutIndex(index)}
        >
          {card}
        </div>
      ))}
    </div>
  )
}
export default memo(HorizontalCardList)
