import React, { memo } from 'react'

function OrHorizontalBar() {
  return (
    <div style={styles.orContainer}>
      <hr></hr>
      <div style={styles.orTextContainer}>
        <span style={styles.orText}>OR</span>
      </div>
    </div>
  )
}
const styles = {
  orContainer: {
    paddingLeft: 20,
    paddingRight: 20,
    textAlign: 'center',
    marginTop: 30,
  },
  orTextContainer: {
    marginTop: -30,
  },
  orText: {
    backgroundColor: '#ffffff',
    paddingLeft: 10,
    paddingRight: 10,
  },
}
export default memo(OrHorizontalBar)
