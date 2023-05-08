import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useAuthValue } from './createContext'
import { AuthProvider } from './createContext';
import Profile from './Profile'
import Register from './Register'
import ResetPassword from './ResetPassword';
import Rest from './Rest';
import PasswordReset from './ConfirmRest';
import VerifyEmail from './VerifyEmail';
import Login from './Login'
import PrivateRoute from './PrivateRoute';

function App() {
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
        <Routes>
          <Route exact path='/' element={
            <PrivateRoute>
              <Profile/>
            </PrivateRoute>
          }/>
          <Route path="/login" element={
            !currentUser?.emailVerified 
            ? <Login/>
            : <Navigate to='/' replace/>
          } />
          <Route path="/register" element={
            !currentUser?.emailVerified 
            ? <Register/>
            : <Navigate to='/' replace/>
          } />
          <Route path="/resetpasword" element={<ResetPassword/>
          } />
          <Route path='/verify-email' element={<VerifyEmail/>} /> 
          <Route path='/rest' element={<Rest/>} /> 
          <Route path='/res' element={<PasswordReset/>} /> 
        </Routes>  
      </AuthProvider>
  </Router>
  );
}

export default App;
