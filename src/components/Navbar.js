import React, {useContext} from 'react';

import {auth} from '../Firebase'
import {AuthContext } from '../Auth'

const Navbar = () => {
    const {currentUser} = useContext(AuthContext);
    return (
        <nav className="navbar navbar-dark bg-dark">
            <div className="container">
                <a className="navbar-brand" href="/">GameDevPaul Admin</a>
            {currentUser && (
                <div className="" id="navbarSupportedContent">
                    <span className="text-white mr-5">login uid: {currentUser.uid}</span>
                    <button 
                        onClick={e => auth.signOut()}
                        className="btn btn-outline-danger my-2 my-sm-0" type="submit">Logout</button>
                </div>
            )}
            </div>
        </nav>
  );
}

export default Navbar;
