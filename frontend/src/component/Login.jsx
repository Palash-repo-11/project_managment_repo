import axios from 'axios'
import React from 'react'

function Login() {
    const handleLogin=async()=>{
        // const response=axios.get('http://localhost:4500/auth/google')
        window.location.href = 'http://localhost:4500/auth/google';
    }
    return (
        <button onClick={handleLogin}>Google+</button>
    )
}

export default Login
