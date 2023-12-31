import './App.css'

import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

import { useAuthContext } from './hooks/useAuthContext'

import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'

import LandingPage from './pages/Landing/Landing'
import SignUp from './pages/Auth/SignUp'
import Login from './pages/Auth/Login'
import Dashboard from './pages/Dashboard/Dashboard'
import ListSpecialist from './components/listComponents/ListSpecialist'
import OnlineConsultation from './pages/Consultation/OnlineConsultation'


const App = () => {

  const { user } = useAuthContext();

  return (
      <Router>
        <div className='App'>
          <div className='content'>
            <Switch>
              
              <Route path='/dashboard'>
                <div>
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
                {!user ?
                  (
                    <div>
                      <Header />
                      <SignUp />
                    </div>
                  ) : <Redirect to='/dashboard' />}
              </Route>

              <Route path='/log-in'>
                {!user ?
                  (
                    <div>
                      <Header />
                      <Login />
                    </div>
                  ) : <Redirect to='/dashboard' />}
              </Route>

              <Route path='/consult/:appointmentId'>
                {user ?
                  (
                    <div>
                      <Header />
                      <OnlineConsultation />
                    </div>
                  ) : <Redirect to='/log-in' />}
              </Route>

            </Switch>

          </div>

        </div>

      </Router>
  )
}

export default App