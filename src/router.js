import React, { lazy } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
import './app.css'

const Home = lazy(() => import('./containers/home'))
const Register = lazy(() => import('./containers/register'))
const Login = lazy(() => import('./containers/login'))

function Router() {
  const { navOption } = useSelector(state => ({
    navOption: state.navOption,
  }))
  return (
    <div className={navOption ? 'main_container active' : 'main_container'}>
      <Switch>
        <Redirect from="//*" to="/*" />
        <Route exact path="/" component={Home} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
      </Switch>
    </div>
  )
}
export default Router
