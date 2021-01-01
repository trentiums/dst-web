import React, { memo } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Navigation, Pagination } from 'swiper'
import '../../node_modules/swiper/swiper-bundle.css'
SwiperCore.use([Navigation, Pagination])
function CustomSwiper({ swiperItems }) {
  return (
    <Swiper style={{ height: '70%' }} navigation pagination spaceBetween={50}>
      {swiperItems.map((swipImg, i) => (
        <SwiperSlide
          key={i}
          style={{
            display: 'flex',
            backgroundColor: '#ecf1f9',
            justifyContent: 'center',
          }}
        >
          <img src={swipImg} height="100%" alt="" />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
export default memo(CustomSwiper)
