import React, { useState } from 'react'
import { API } from '../global'
import { Link, useNavigate } from 'react-router-dom'

function Login() {
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [message, setMessage] = useState("")
    const navigate = useNavigate()

    //handlelogin coding
    const handlelogin = async () => {
        const payload = {
            userName,
            password
        }
        const res = await fetch(`${API}/user/login`, {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
                "content-type": "application/json",
            },
        })
        const data = await res.json();
        if (data.error) {
            setError(data.error)
        }
        if (data.message) {
            setMessage(data.message)
            setError('')
            navigate('/gallery')
        }
        if (data.token) {
            setError("");
            localStorage.setItem("token", data.token)
        }
    }
    return (
        <div className='container m-5 p-4'>
            <div className='container-login mx-auto'>
                <h3>Sign In</h3>
                <label htmlFor="username" className="form-label">Your Name</label>
                <input type="text"
                    className="form-control"
                    id="username"
                    placeholder="First and last name"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                />
                <div className='d-flex justify-content-between'><label htmlFor="password" className="col-form-label">Password</label><Link to={'/forget-password'}>Forget your password?</Link></div>
                <input type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" className="btn btn-outline-primary mt-3" onClick={handlelogin}>Sign In</button>
                <p className='text-center mt-2'>New to Photo Gallery?</p>
               <div className='text-center'><button type="submit" className="btn btn-light" onClick={() => navigate('/signup')}>Create your account</button></div> 
                {error ? <p className='text-danger m-4'>{error}❗️</p> : ""}
                {message ? <p className='text-success text-center m-4'>{message} ✅</p> : ""}
            </div>
        </div>
    )
}
export default Login