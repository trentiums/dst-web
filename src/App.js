import React, { lazy, Suspense } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { NotificationContainer } from 'react-notifications'
import Router from './router'
import Loader from './containers/loader'
import store from './services/store'
import '../node_modules/react-notifications/lib/notifications.css'

const Sidebar = lazy(() => import('./containers/sidebar'))
function App() {
  return (
    <Provider store={store}>
      <Suspense fallback={<Loader />}>
        <BrowserRouter>
          <NotificationContainer />
          <Sidebar />
          <Router />
        </BrowserRouter>
      </Suspense>
    </Provider>
  )
}
export default App
