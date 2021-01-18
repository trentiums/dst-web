import React, { lazy, Suspense, useEffect } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { NotificationContainer } from 'react-notifications'
import { PersistGate } from 'redux-persist/integration/react'
import Router from './router'
import Loader from './components/loader'
import store, { persistor } from './services/store'
import '../node_modules/react-notifications/lib/notifications.css'
import { createCorrelationInterceptor } from './services/api'
const Navbar = lazy(() => import('./containers/navbar'))
function App() {
  useEffect(() => {
    createCorrelationInterceptor()
  }, [])
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <Suspense fallback={<Loader />}>
          <BrowserRouter>
            <NotificationContainer />
            <Navbar />
            <Router />
          </BrowserRouter>
        </Suspense>
      </PersistGate>
    </Provider>
  )
}
export default App
