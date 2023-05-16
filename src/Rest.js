import {getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { passwordReset } from "./ee";

function Rest() {
    const [emailMessage, setEmailMessage] = useState(false)
    const [email, setEmail] = useState('')
    const auth = getAuth();
    const history = useNavigate()

    function home(){
      history('/')
    }

    const triggerResetEmail = async (e) => {
        e.preventDefault()
        console.log(email);
        try{
            //await sendPasswordResetEmail(auth, email);
            await passwordReset(email)
            setEmailMessage(true)
            console.log('yeee');
            // setTimeout(() => {
            //   console.log('working');
            //   history('/')
            // }, 5000);
        }catch(error){
            if (error.code === 'auth/user-not-found') {
                alert('User not found, try again!')
                setEmail('')
        }
      };
    }
   
    return (
        <div>
          {
            emailMessage ?
            <div>
              <h3>The Email has been sent; Check your Inbox!</h3>
              <button onClick={home}>Home</button>
              </div>
              : 
            <form onSubmit={triggerResetEmail}>
              <input 
                type="email" 
                name="email"
                value={email}
                placeholder="name@email.com"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <div>
                <button type='submit'>Reset Your Password</button>
              </div>
            </form>
          }
        </div>
      )
  }
  export default Rest;