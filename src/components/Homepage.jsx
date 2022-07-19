import { useEffect } from 'react'
import { signOut, onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase'
import { useNavigate } from 'react-router-dom'

export default function Homepage() {
  const navigate = useNavigate()

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate('/')
      }
    })
  }, [])

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate('/')
      })
      .catch((err) => {
        alert(err.message)
      })
  }

  return (
    <div>
      <h1>Test</h1>
      <button onClick={handleSignOut}>Sign out</button>
    </div>
  )
}
