import React from 'react';
import UseAuth from '../Hooks/UseAuth';
import { Navigate, useLocation } from 'react-router';

const PrivateRoutes = ({children}) => {
    const {user, loading} = UseAuth();
    const location = useLocation()

    if(loading){
        return <span className="loading loading-spinner loading-xl"></span>
    }
    if (!user) {
        <Navigate to={'/login'} state={location}></Navigate> 
    }
    return children;
};

export default PrivateRoutes;