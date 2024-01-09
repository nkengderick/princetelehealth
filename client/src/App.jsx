import './App.css'

import React from 'react'
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

import { useAuthContext } from './hooks/useAuthContext'

import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import NotFound from './components/NotFound/NotFound'

import LandingPage from './pages/Landing/Landing'
import SignUp from './pages/Auth/SignUp'
import Login from './pages/Auth/Login'
import Dashboard from './pages/Dashboard/Dashboard'
import ListSpecialist from './components/listComponents/ListSpecialist'
import OnlineConsultation from './pages/Consultation/OnlineConsultation'
import { Helmet } from 'react-helmet'

const App = () => {

  const { user } = useAuthContext();

  return (
      <Router>
        <div className='App'>
          <div className='content'>

          <Helmet>
            <title>Prince TeleHealth</title>
          </Helmet>

            <Switch>
              
              <Route path='/dashboard'>
                <div>
                  <Helmet>
                    <title>Dashboard - Prince TeleHealth</title>
                  </Helmet>
                  <Header />
                  {user ? <Dashboard /> : <Redirect to='/log-in'></Redirect>}
                  <Footer />
                </div>
              </Route>

              <Route exact path='/'>
                {!user ? <LandingPage /> : <Redirect to='/dashboard' />}
              </Route>

              <Route path='/find-doctor'>
                <ListSpecialist />
              </Route>

              <Route path='/sign-up'>
                <Helmet>
                  <title>Sign Up - Prince TeleHealth</title>
                </Helmet>
                {!user ?
                  (
                    <div>
                      <Header />
                      <SignUp />
                    </div>
                  ) : <Redirect to='/dashboard' />}
              </Route>

              <Route path='/log-in'>
                <Helmet>
                  <title>Login - Prince TeleHealth</title>
                </Helmet>
                {!user ?
                  (
                    <div>
                      <Header />
                      <Login />
                    </div>
                  ) : <Redirect to='/dashboard' />}
              </Route>

              <Route path='/consult/:appointmentId'>
                <Helmet>
                  <title>Consult - Prince TeleHealth</title>
                </Helmet>
                {user ?
                  (
                    <div>
                      <Header />
                      <OnlineConsultation />
                    </div>
                  ) : <Redirect to='/log-in' />}
              </Route>

              <Route path='*'>
                  <Helmet>
                    <title>Not Found - Prince TeleHealth</title>
                  </Helmet>
                 <NotFound />
              </Route>

            </Switch>

          </div>

        </div>

      </Router>
  )
}

export default App
