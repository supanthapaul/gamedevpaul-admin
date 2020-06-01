import React, {useCallback, useContext} from 'react';
import {withRouter, Redirect} from 'react-router-dom'
import {auth} from '../Firebase'
import {AuthContext } from '../Auth'

const Login = ({history}) => {
    const handleLogin = useCallback(
        event => {
            event.preventDefault();
            const {email, password} = event.target.elements;
            auth.signInWithEmailAndPassword(email.value, password.value)
                .then(res => {
                    history.push("/");
                })
                .catch(err => alert(err));
        },
        [history]
    );

    const {currentUser}= useContext(AuthContext);
    if(currentUser) {
        return <Redirect to="/" />
    }

    return (
        <div className="col-md-6 mx-auto mt-5 mb-5">
            <div className="card container pt-3 pb-3">
                <h1>Login</h1>
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label htmlFor="email">Email address</label>
                        <input name="email" type="email" className="form-control" id="email"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input name="password" type="password" className="form-control" id="password"/>
                    </div>
                    <button type="submit" className="btn btn-primary">Login</button>
                </form>
            </div>
        </div>
    )
}

export default Login;