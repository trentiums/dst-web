import React, { lazy } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
import './style.css'

const Home = lazy(() => import('./containers/home'))
const Register = lazy(() => import('./containers/register'))
const Login = lazy(() => import('./containers/login'))
const ForgotPassword = lazy(() => import('./containers/forgotPassword'))
const Profile = lazy(() => import('./containers/profile'))
const IssueScreen = lazy(() => import('./containers/issueScreen'))
const LayoutScreen = lazy(() => import('./containers/layoutScreen'))
const EstimationScreen = lazy(() => import('./containers/estimationScreen'))
const ResultScreen = lazy(() => import('./containers/resultScreen'))
const ErrorPage = lazy(() => import('./containers/errorPage'))

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
        {!uid && <Route exact path="/register" component={Register} />}
        {!uid && <Route exact path="/login" component={Login} />}
        {!uid && <Route exact path="/forgotPass" component={ForgotPassword} />}
        {uid && <Route exact path="/profile" component={Profile} />}
        {uid && <Route exact path="/issueScreen" component={IssueScreen} />}
        {uid && <Route exact path="/layoutScreen" component={LayoutScreen} />}
        {uid && <Route exact path="/estimationScreen" component={EstimationScreen} />}
        {uid && <Route exact path="/resultScreen" component={ResultScreen} />}
        <Route component={ErrorPage} />
      </Switch>
    </div>
  )
}
export default Router
