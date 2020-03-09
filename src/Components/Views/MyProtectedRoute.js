import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom'
import AxiosCalls from '../Classes/AxiosCalls'

class ProtectedRoute extends Component {
    axiosCall = new AxiosCalls()

    constructor(props) {
        super(props);
        this.state = {
            isAuthenticated: false,
            responseObtained: false
        }
    }

    componentDidMount() {
        this.axiosCall.checkAuths()
            .then(response => {
                this.setState({
                    isAuthenticated: response.result,
                    responseObtained: true
                })
            })

    }

    render() {
        const { component: Component, ...rest } = this.props
        const { isAuthenticated, responseObtained } = this.state
        console.log('protected route')

        if (!isAuthenticated && responseObtained) {
            return <Redirect to="/login" />
        } else if (isAuthenticated && responseObtained) {
            return <Route {...rest} render={() => (<Component {...this.props} />)} />
        } else {
            return (<div>please wait... Loading</div>)
        }
    }
}

export default ProtectedRoute;