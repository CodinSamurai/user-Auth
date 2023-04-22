import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import { useState, useEffect } from 'react';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useAuthValue } from './createContext'
import { AuthProvider } from './createContext';
import Profile from './Profile'
import Register from './Register'
import ResetPassword from './TryRest';
import PasswordReset from './ConfirmRest';
import VerifyEmail from './VerifyEmail';
import Login from './Login'
import PrivateRoute from './PrivateRoute';

function App() {
    // function childOfAuthProvider(){
  //   const {currentUser} = useAuthValue()
  //   console.log(currentUser)
  // }
  const [currentUser, setCurrentUser] = useState(null)
  const [timeActive, setTimeActive] = useState(false)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
     })
  }, [])

  return (
    <Router>
      <AuthProvider value={{currentUser, timeActive, setTimeActive}}>
       <Switch>
        {/* <Route exact path="/" component={Profile} /> */}
        <PrivateRoute exact path="/" component={Profile} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path='/verify-email' component={VerifyEmail} /> 
        <Route exact path='./try-rest' component={ResetPassword} /> 
        <Route exact path='/confirm-rest' component={PasswordReset} /> 
       </Switch>
      </AuthProvider>
  </Router>
  );
}

export default App;
