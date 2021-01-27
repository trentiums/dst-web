import React, { lazy, Suspense, useEffect } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { NotificationContainer } from 'react-notifications'
// import { PersistGate } from 'redux-persist/integration/react'
import RootContainer from './containers/rootContainer'
import Loader from './components/loader'
import store from './services/store'
// import store, { persistor } from './services/store'
import '../node_modules/react-notifications/lib/notifications.css'
import { createCorrelationInterceptor } from './services/api'
import { v4 as uuidv4 } from 'uuid'

const Navbar = lazy(() => import('./containers/navbar'))
const Footer = lazy(() => import('./containers/footer'))
function App() {
  useEffect(() => {
    createCorrelationInterceptor()
    if (!sessionStorage.getItem('deviceId')) {
      sessionStorage.setItem('deviceId', uuidv4())
    }
  })
  return (
    <Provider store={store}>
      {/* <PersistGate persistor={persistor} loading={null}> */}
      <Suspense fallback={<Loader />}>
        <BrowserRouter>
          <NotificationContainer />
          <Navbar />
          <RootContainer />
          <Footer />
        </BrowserRouter>
      </Suspense>
      {/* </PersistGate> */}
    </Provider>
  )
}
export default App
