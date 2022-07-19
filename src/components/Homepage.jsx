import { useEffect, useState } from 'react'
import { signOut, onAuthStateChanged } from 'firebase/auth'
import { auth, db } from '../firebase'
import { set, ref, onValue } from 'firebase/database'
import { useNavigate } from 'react-router-dom'
import { uid } from 'uid'

export default function Homepage() {
  const navigate = useNavigate()
  const [todo, setTodo] = useState({
    todoText: '',
  })
  const [todos, setTodos] = useState([])

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        onValue(ref(db, `/${auth.currentUser.uid}`), (snapshot) => {
          setTodos([])
          const data = snapshot.val()
          // console.log(data)
          if (data !== null) {
            Object.values(data).map((todo) => {
              console.log(todo)
              setTodos((oldData) => [...oldData, todo])
            })
          }
        })
      } else if (!user) {
        navigate('/')
      }
    })
  }, [])

  console.log(todos)

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate('/')
      })
      .catch((err) => {
        alert(err.message)
      })
  }

  function handleInputChange(e) {
    const { name, value } = e.target
    setTodo((prevData) => {
      return {
        ...prevData,
        [name]: value,
      }
    })
  }

  // read

  // add
  const writeToDatabase = () => {
    const uid2 = uid()
    set(ref(db, `/${auth.currentUser.uid}/${uid2}`), {
      uid2: uid2,
      todoText: todo.todoText,
    })
    // I'm not too sure about this
    setTodo((prevTodo) => {
      return {
        ...prevTodo,
        todoText: '',
      }
    })
  }

  // update
  // delete

  return (
    <div>
      <input
        type='text'
        name='todoText'
        placeholder='Add todo'
        value={todo.todoText}
        onChange={handleInputChange}
      />

      {todos.map((todo) => {
        return <h2>{todo.todoText ? todo.todoText : todo.todo}</h2>
      })}
      <button onClick={writeToDatabase}>Add</button>
      <button onClick={handleSignOut}>Sign out</button>
    </div>
  )
}
