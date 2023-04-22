import { confirmPasswordReset,getAuth } from 'firebase/auth';

  const confirmThePasswordReset = async (
    oobCode, newPassword
  ) => {
    const auth = getAuth();
    if(!oobCode && !newPassword) return;
    
    return await confirmPasswordReset(auth, oobCode, newPassword)
  }

  export default confirmThePasswordReset