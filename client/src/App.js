import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Container from '@material-ui/core/Container'
import ContactState from './contexts/contact/ContactState'
import AuthState from './contexts/auth/AuthState'

import Navbar from './components/Navbar'
import Homepage from './components/Homepage'
import About from './components/About'
import Register from './components/Register'
import Login from './components/Login'
import setAuthToken from './utils/setAuthToken'

// set global header, used for page reloads
setAuthToken(localStorage.token)

export default function App() {

  return (
    <AuthState>
      <ContactState>
        <Router>
          <React.Fragment>
            <Navbar />
            <Container>
              <Switch>
                <Route exact path='/' component={Homepage} />
                <Route path='/about' component={About} />
                <Route path='/register' component={Register} />
                <Route path='/login' component={Login} />
              </Switch>
            </Container>
          </React.Fragment>
        </Router>
      </ContactState>
    </AuthState>
  )
}
