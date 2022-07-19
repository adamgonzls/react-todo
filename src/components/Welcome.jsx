import { useState, useEffect } from 'react'
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
} from 'firebase/auth'
import { auth } from '../firebase'
import { useNavigate } from 'react-router-dom'

export default function Welcome() {
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  })
  const [registrationData, setRegistrationData] = useState({
    email: '',
    confirmEmail: '',
    password: '',
    confirmPassword: '',
  })

  const [isRegistering, setIsRegistering] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        navigate('/homepage')
      }
    })
  }, [])

  console.log(registrationData)

  function handleInputChange(e) {
    const { name, value } = e.target
    if (!isRegistering) {
      setUserData((prevData) => {
        return {
          ...prevData,
          [name]: value,
        }
      })
    } else {
      setRegistrationData((prevData) => {
        return {
          ...prevData,
          [name]: value,
        }
      })
    }
  }

  function handleSignIn() {
    signInWithEmailAndPassword(auth, userData.email, userData.password)
      .then(() => navigate('/homepage'))
      .catch((err) => alert(err.message))
  }

  function handleRegister() {
    createUserWithEmailAndPassword(
      auth,
      userData.email,
      userData.password
    ).then(() => {
      navigate('/homepage')
    })
  }

  return (
    <div className='welcome'>
      <div className='login-register-container'>
        {isRegistering ? (
          <>
            <input
              name='email'
              type='email'
              value={registrationData.email}
              placeholder='Email'
              onChange={handleInputChange}
            />
            <input
              name='confirmEmail'
              type='email'
              value={registrationData.confirmEmail}
              placeholder='Confirm Email'
              onChange={handleInputChange}
            />
            <input
              name='password'
              type='password'
              value={registrationData.password}
              placeholder='Password'
              onChange={handleInputChange}
            />
            <input
              name='confirmPassword'
              type='password'
              value={registrationData.confirmPassword}
              placeholder='Confirm Password'
              onChange={handleInputChange}
            />
            <button onClick={handleRegister}>Register</button>
            <button onClick={() => setIsRegistering(false)}>Go Back</button>
          </>
        ) : (
          <>
            <input
              name='email'
              type='email'
              value={userData.email}
              placeholder='email'
              onChange={handleInputChange}
            />
            <input
              name='password'
              type='password'
              value={userData.password}
              placeholder='password'
              onChange={handleInputChange}
            />
            <button onClick={handleSignIn}>Sign in</button>
            <button onClick={() => setIsRegistering(true)}>
              Create an account
            </button>
          </>
        )}
      </div>
    </div>
  )
}
