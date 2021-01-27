import React, { memo } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import './footer.css'

function BottomBar() {
  const { uid } = useSelector((state) => ({
    uid: state.user.uid,
  }))
  return (
    <div className="text-right">
      <Link
        to={'/'}
        onClick={() => window.open('https://scrumpanion.com/terms-and-conditions/')}
        className="ft-link"
      >
        Terms and Conditions
      </Link>
      <Link
        to={'/'}
        onClick={() => window.open('https://scrumpanion.com/privacy-policy/')}
        className="ft-link"
      >
        Privacy Policy
      </Link>
      <Link to={'/'} onClick={() => window.open('https://scrumpanion.com/')} className="ft-link">
        Scrum Guide
      </Link>
      {uid && (
        <Link
          to={'/'}
          onClick={() => {
            const params = {
              subject: 'Scrumpanion - Contact Support',
              body: `Please explain the issue you are having and we will get to it as soon as possible.`,
            }
            window.open(
              `mailto:support@scrumpanion.com?subject=${params.subject}&body=${params.body}`,
            )
          }}
          className="ft-link"
        >
          Contact Support
        </Link>
      )}
    </div>
  )
}
export default memo(BottomBar)
