import React, { lazy } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
import './style.css'

const Home = lazy(() => import('./containers/home/'))
const Register = lazy(() => import('./containers/register/'))
const Login = lazy(() => import('./containers/login/'))
const ForgotPassword = lazy(() => import('./containers/forgotPassword/'))
const Profile = lazy(() => import('./containers/profile/'))
const IssueScreen = lazy(() => import('./containers/issueScreen'))
const LayoutScreen = lazy(() => import('./containers/layoutScreen'))
const EstimationScreen = lazy(() => import('./containers/estimationScreen'))
const ResultScreen = lazy(() => import('./containers/resultScreen'))

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
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/issueScreen" component={IssueScreen} />
        <Route exact path="/layoutScreen" component={LayoutScreen} />
        <Route exact path="/estimationScreen" component={EstimationScreen} />
        <Route exact path="/resultScreen" component={ResultScreen} />
      </Switch>
    </div>
  )
}
export default Router
