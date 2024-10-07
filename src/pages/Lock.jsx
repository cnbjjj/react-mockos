import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useAuth } from './components/Auth'
import Password from './components/Password'

function Lock() {
    const [isLoggedIn, setIsLoggedIn] = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
        if (isLoggedIn && location.pathname !== (location.state?.from ?? '/'))
            navigate(location.state?.from ?? '/', { state: { from: '/' } });
    }, [isLoggedIn]);

    const onPasswordCorrect = () => {
        setIsLoggedIn(true);
    };
    return (
        <div className='page'>
            <Password testPwd='1234' onPasswordCorrect={onPasswordCorrect} />
        </div>
    )
}
export default Lock