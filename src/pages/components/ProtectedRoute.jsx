import { Route, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../App';

function ProtectedRoute({ path, element: Element, ...props }) {
    const { isLoggedIn } = useContext(AuthContext);
    const navigate = useNavigate();
    if (!isLoggedIn) {
        navigate('/');
        return null;
    }
    return <Route path={path} element={<Element {...props} />} />;
}
export default ProtectedRoute;