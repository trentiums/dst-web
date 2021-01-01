import React, { lazy } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
import './style.css'

const Home = lazy(() => import('./containers/home/'))
const Register = lazy(() => import('./containers/register/'))
const Login = lazy(() => import('./containers/login/'))
const ForgotPassword = lazy(() => import('./containers/forgotPassword/'))

function Router() {
  const { navOption, uid } = useSelector((state) => ({
    navOption: state.sidebar.navOption,
    uid: state.user.uid,
  }))
  return (
    <div className={`main_container ${navOption ? 'active' : ''} ${uid ? '' : 'user_not_found'}`}>
      <Switch>
        <Redirect from="//*" to="/*" />
        <Route exact path="/" component={Home} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/forgotPass" component={ForgotPassword} />
      </Switch>
    </div>
  )
}
export default Router
