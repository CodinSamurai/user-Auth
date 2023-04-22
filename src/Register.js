import {useState} from 'react'
import { Link, useHistory } from 'react-router-dom'
import { auth } from './firebase'
import { useAuthValue } from './createContext'
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth'
// import { Auth } from 'firebase/auth'
import './forms.css'

function Register() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const {setTimeActive} = useAuthValue()

  const history = useHistory()
  const validatePassword = () => {
    let isValid = true
    if (password !== '' && confirmPassword !== ''){
      if (password !== confirmPassword) {
        isValid = false
        setError('Passwords does not match')
      }
    }
    return isValid
  }

  const register = e => {
    e.preventDefault()
    setError('')
    if(validatePassword()) {
      // Create a new user with email and password using firebase
        createUserWithEmailAndPassword(auth, email, password)
        // .then((res) => {
        //     console.log(res.user)
        //   })
        // .catch(err => setError(err.message))
        .then(() => {
          sendEmailVerification(auth.currentUser)
          .then(() => {
            setTimeActive(true)
            history.push('/verify-email')
          }).catch((err) => alert(err.message))
        })
    }
    setEmail('')
    setPassword('')
    setConfirmPassword('')
  }
  

  return (
    <div className='center'>
      <div className='auth'>
        <h1>Register</h1>
        {error && <div className='auth__error'>{error}</div>}
        <form onSubmit={register} name='registration_form'>
          <input 
            type='email' 
            value={email}
            placeholder="Enter your email"
            required
            onChange={e => setEmail(e.target.value)}/>

          <input 
            type='password'
            value={password} 
            required
            placeholder='Enter your password'
            onChange={e => setPassword(e.target.value)}/>

            <input 
            type='password'
            value={confirmPassword} 
            required
            placeholder='Confirm password'
            onChange={e => setConfirmPassword(e.target.value)}/>

          <button type='submit'>Register</button>
        </form>
        <span>
          Already have an account?  
          <Link to='/login'>login</Link>
        </span>
      </div>
    </div>
  )
}

export default Register