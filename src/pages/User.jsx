import React from 'react'
import { useAuth, withAuth } from '../components/Auth'

function User() {
    const [isLoggedIn, setIsLoggedIn] = useAuth();
    return (
        isLoggedIn ? <div>User</div> : <span>Members only</span>
    )
}
export default withAuth(User);