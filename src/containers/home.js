import React, { memo } from 'react'
import images from '../assets/images'
import CustomSwiper from '../components/customSwiper'
function Home() {
  return (
    <div className="home_container">
      <CustomSwiper swiperItems={images.swiper} />
    </div>
  )
}
export default memo(Home)
