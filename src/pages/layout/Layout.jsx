import { useEffect } from "react";
import { useAuth } from "../components/Auth"
import { useLocation, useNavigate } from "react-router-dom";
import { RxExit } from "react-icons/rx";

function Layout({ title, children }) {
    const [isLoggedIn] = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        if (!isLoggedIn)
            navigate('/lock', { state: { from: location.pathname } });
    }, [isLoggedIn]);

    const back = () => {
        navigate(location.state?.from ?? '/', { state: { from: location.pathname } });
    };
    return (
        <div className="page flex flex-col">
            <div className="page-content min-h-0 h-full flex flex-col justify-start">
                <div className='content-head pt-20 pb-8'>
                    <div className='text-center text-white'>
                        <h2 className=' text-4xl font-thin '>{title ?? location.pathname.slice(1).toUpperCase()}</h2>
                        <div className='text-2xl m-8'><button onClick={back} className='font-thin'> <RxExit className=" -rotate-[-180deg]" /> </button></div>
                    </div>
                </div>
                <div className='content-body flex-grow overflow-y-auto no-scrollbar'>
                    {children || <span className="text-white font-thin text-xl">Under Construction</span>}
                </div>
            </div>
        </div >
    )
}
export default Layout