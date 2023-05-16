import {useState} from 'react'
import { Link } from 'react-router-dom'
import {signInWithEmailAndPassword, sendEmailVerification} from 'firebase/auth'
import {auth} from './firebase'
import {useNavigate} from 'react-router-dom'
import {useAuthValue} from './createContext'
import ResetPassword from './ResetPassword'
import './forms.css'

function Login(){

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('') 
  const [error, setError] = useState('')
  const {setTimeActive} = useAuthValue()
  const history = useNavigate()

  const login = e => {
    e.preventDefault()
    signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      if(!auth.currentUser.emailVerified) {
        sendEmailVerification(auth.currentUser)
        .then(() => {
          setTimeActive(true)
          history('/verify-email')
        })
      .catch(err => alert(err.message))
    }else{
      history('/')
    }
    })
    .catch(err => setError(err.message))
  }

  return(
    <div className='center'>
      <div className='auth'>
        <h1>Log in</h1>
        {error && <div className='auth__error'>{error}</div>}
        <form onSubmit={login} name='login_form'>
          <input 
            type='email' 
            value={email}
            required
            placeholder="Enter your email"
            onChange={e => setEmail(e.target.value)}/>

          <input 
            type='password'
            value={password}
            required
            placeholder='Enter your password'
            onChange={e => setPassword(e.target.value)}/>

          <button type='submit'>Login</button>
        </form>
        <ResetPassword />
        <div className="forgot">
          <Link to='/res'>Forgot password</Link>
        </div>
        <p>
          Don't have and account? 
          <Link to='/register'>Create one here</Link>
        </p>
        <p>
          wanna reset password? 
          <Link to='/resetpasword'>Reset</Link>
          <Link to='/rest'>Rest</Link>
          <Link to='/res'>confirm reset</Link>
        </p>
      </div>
    </div>
  )
}

export default Login