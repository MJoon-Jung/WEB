import React, { useCallback } from 'react';
const Login = () => {

    const clickLoginListener = useCallback(() => {
        window.location.replace('http://localhost:3065/api/auth/google');
    }, [])

    return (
        <div>
            <h1>Google Login</h1>
            <button onClick={ clickLoginListener }>google Login</button>
        </div>
    )
}

export default Login;