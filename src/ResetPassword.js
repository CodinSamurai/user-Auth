import {Link} from 'react-router-dom';
import { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

function ResetPassword() {

    const [email, setEmail] = useState('')
    const auth = getAuth();
  
    const triggerResetEmail = async () => {
        console.log(email);
      await sendPasswordResetEmail(auth, email);
      console.log("Password reset email sent")
    }
   
    return (
      <div className="resetPassword-main">
        <input type="email" name="" value={email} onChange={e => setEmail(e.target.value)}/>
        <button className="resetBtn" type="button" onClick={triggerResetEmail}>Reset password</button>
  
      </div>
    )
  }
  
  export default ResetPassword;