import { Navigate, useSearchParams } from "react-router-dom";

  function AuthAction({ children }) {
    const [searchParams] = useSearchParams()

    let mode = searchParams.get('mode')
    let oobCode = searchParams.get('oobCode')

    if (mode === 'resetPassword') {
      const resetPasswordPath = `/res?oobCode=${oobCode}`;

      return <Navigate to={resetPasswordPath} replace />
    } else if (mode === 'verifyEmail') {
      const confirmEmailPath = `/email-verified?oobCode=${oobCode}`;

      return <Navigate to={confirmEmailPath} replace />
    }

    return children;
  }
  export default AuthAction
  