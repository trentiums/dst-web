import React, { memo } from 'react'
import images from '../../assets/images'
import CustomSwiper from '../../components/customSwiper'
import './home.css'
function Home() {
  return (
    <div className="page_container">
      <CustomSwiper swiperItems={images.swiper} />
    </div>
  )
}
export default memo(Home)
