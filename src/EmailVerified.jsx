import { useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { applyActionCode } from 'firebase/auth';
import { auth } from "./firebase";

const mailConfirmed = async (oobCode) =>{
  if (!oobCode) return;

    try {
      await applyActionCode(auth, oobCode)
      .then(() => alert('Your email has been verified!'))
    } catch (error) {
      alert(error.code)
    }
    
    return;
}


function EmailVerified () {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [confirmEmailSuccess, setConfirmEmailSucess] = useState(false)

  let oobCode = searchParams.get('oobCode')
  
  // The hook is running twice when <React.StrictMode> is activated
  // causing the oobCode to be reused.
  useEffect(() => {
    if (oobCode) {
      try {
        mailConfirmed(oobCode)
        setConfirmEmailSucess(true)
      } catch (error) {
        alert(error)
      }
    }
  
  // cleanup function.
  return () => {
    oobCode = null
  }
  }, [])
  
  return (
    <div>
      { confirmEmailSuccess && oobCode ?
        <div>
          <h3>Thankyou!</h3>
          <button onClick={() => navigate('/')}>Back to Home Page</button>
        </div>
        :
        <div>
          <h3>There was a problem confirming your email.</h3>
          <button onClick={() => navigate('/')}>Back to Home Page</button>
        </div>
      }
    </div>
  )
}
export default EmailVerified;
