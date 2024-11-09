import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Authentication.css'
import { useUser } from '../context/useUser'

export const AuthenticationMode = Object.freeze({
    Login : 'Login',
    Register: 'Register'
})
export default function Authentication({authenticationMode}) {
    const{user,setUser,signUp,signIn} = useUser()
    const navigate = useNavigate()

    const handleSubmit = async(e) => {
        e.preventDefault()
        try{
            if(authenticationMode === AuthenticationMode.Register){
                await signUp()
                navigate('/signin')
            }else {
                await signIn()
                navigate("/")
            }
        }catch(error){
            const message = error.response && error.response.data ? error.response.data.error : error
            alert(message)
        }
    }
  return (
    <div className="container mt-5">
        <h3 className="mb-4">{authenticationMode === AuthenticationMode.Login ? 'Sign in': 'Sign up'}</h3>
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label className="form-label">Email</label>
                <input  className="form-control"  type='email' value={user.email} onChange={e => setUser({...user,email: e.target.value})}/>
            </div>
            <div className='mb-3'>
                <label className="form-label">Password</label>
                <input className="form-control" type='password' value={user.password} onChange={e => setUser({...user,password: e.target.value})}/>
            </div>

            <div>
                <button className="btn btn-success">{authenticationMode === AuthenticationMode.Login ? 'Login' : 'Submit'}</button>
            </div>

            <div>
                <Link to={authenticationMode === AuthenticationMode.Login ? '/signup' : '/signin'}>
                    {authenticationMode === AuthenticationMode.Login ? 'No account? Sign up' : 'Already signed up? Sign in'}
                </Link>
            </div>
        </form>
    </div>
  )
}