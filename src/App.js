import React, { lazy, Suspense } from 'react'
import { Provider } from 'react-redux'
import Router from './router'
import Loader from './containers/loader'
import { BrowserRouter } from 'react-router-dom'
import store from './store'

const Sidebar = lazy(() => import('./containers/sidebar'))
function App() {
  return (
    <Provider store={store}>
      <Suspense fallback={<Loader />}>
        <BrowserRouter>
          <Sidebar />
          <Router />
        </BrowserRouter>
      </Suspense>
    </Provider>
  )
}
export default App
