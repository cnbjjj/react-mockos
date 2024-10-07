import React, { useContext } from 'react';
import { AuthContext } from '../../App';
import { Navigate, useLocation } from 'react-router-dom';

function withAuth(WrappedComponent, redirectTo = '/lock') {
    return function (props) {
        const { isLoggedIn } = useContext(AuthContext);
        const location = useLocation();

        if (!isLoggedIn) {
            return <Navigate to={redirectTo} state={{ from: location }} />;
        }
        return <WrappedComponent {...props} />;
    };
}
function useAuth() {
    const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
    return [isLoggedIn, setIsLoggedIn];
}
export { withAuth, useAuth };