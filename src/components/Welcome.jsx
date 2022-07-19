import { useState, useEffect } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'

export default function Welcome() {
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  })

  console.log(userData)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleInputChange(e) {
    const { name, value } = e.target
    setUserData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      }
    })
  }

  return (
    <div className='welcome'>
      <div className='loginContainer'>
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
        <button>Sign in</button>
        <a href=''>Create an account</a>
      </div>
    </div>
  )
}
