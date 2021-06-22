import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Container from '@material-ui/core/Container'

import Navbar from './components/Navbar'
import Homepage from './components/Homepage'
import About from './components/About'

export default function App() {

  return (
    <Router>
      <React.Fragment>
        <Navbar />
        <Container>
          <Switch>
            <Route exact path='/' component={Homepage} />
            <Route path='/about' component={About} />
          </Switch>
        </Container>
      </React.Fragment>
    </Router>
  )
}
