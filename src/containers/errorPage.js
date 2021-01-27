import React, { memo, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { NotificationManager } from 'react-notifications'

function ErrorPage() {
  const location = useLocation()

  useEffect(() => {
    if (location?.state?.errorMsg) {
      NotificationManager.error(location.state.errorMsg)
    }
  })
  return (
    <div className="page_container mt-5">
      <div className="col-md-10">
        <h1 className="py-4">404 page not found!</h1>
        <div className="col-md-12 text-center">
          <h5 className="mb-4">
            Sorry, the page you are looking for is Unavailable. We would suggest you to visit our
            home page and start from there.
          </h5>
          <h5 className="mt-5 mb-4">In the meantime, keep exploring our website.</h5>
          <a href="/" className=" text-center px-5 m-0">
            {' '}
            Return Home
          </a>
        </div>
      </div>
    </div>
  )
}

export default memo(ErrorPage)
