import { confirmPasswordReset,getAuth, sendPasswordResetEmail } from 'firebase/auth';
const auth = getAuth();
export const passwordReset = async (email) => {
  return await sendPasswordResetEmail(auth, email)
}
  export const confirmThePasswordReset = async (
    oobCode, newPassword
  ) => {
    const auth = getAuth();
    if(!oobCode && !newPassword) return;
    
    return await confirmPasswordReset(auth, oobCode, newPassword)
  }

//  export default confirmThePasswordReset