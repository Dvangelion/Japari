import React from 'react'
import LoginPage from './LoginPage'
import RegisterPage from './RegisterPage'
import WelcomPage from './WelcomePage'
import { Route, Switch, Link } from 'react-router-dom'
import { Router } from 'react-router-dom'
//import { Router } from 'react-router-dom'
import history from '../utils/history'

const App = () => (
    <div>
        <Router history={history}>
        <Switch>
            <Route exact path='/' component={LoginPage}/>
            <Route exact path='/register' component={RegisterPage}/>
            <Route exact path='/welcome' component={WelcomPage}/>
        </Switch>
        </Router>
    </div>
    
)

export default App