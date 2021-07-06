import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import AuthContext from '../contexts/auth/AuthContext'

const PrivateRoute = ({ component: Component, ...rest }) => {
    const context = useContext(AuthContext)
    const { isAuthenticated, loading} = context

    const toRender = (renderProps) => {
        if (!isAuthenticated && !loading) {
            return <Redirect to='/login' />
        } else {
            return <Component {...renderProps} />
        }
    }
    
    return (
        <Route {...rest} render={props => toRender(props)} />
    )
}

export default PrivateRoute
