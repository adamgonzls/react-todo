import { useEffect, useState } from 'react'
import { signOut, onAuthStateChanged } from 'firebase/auth'
import { auth, db } from '../firebase'
import { set, ref, onValue, remove, update } from 'firebase/database'
import { useNavigate } from 'react-router-dom'
import { uid } from 'uid'
import './homepage.css'

export default function Homepage() {
  const navigate = useNavigate()
  const [todo, setTodo] = useState({
    todoText: '',
    complete: false,
  })
  const [todos, setTodos] = useState([])
  const [isEdit, setIsEdit] = useState(false)
  const [tempUid2, setTempUid2] = useState('')

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        onValue(ref(db, `/${auth.currentUser.uid}`), (snapshot) => {
          setTodos([])
          const data = snapshot.val()
          // console.log(data)
          if (data !== null) {
            Object.values(data).map((todo) => {
              // console.log(todo)
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
      complete: todo.complete,
    })
    // this resets the field to blank
    setTodo((prevData) => {
      return {
        ...prevData,
        todoText: '',
      }
    })
  }

  // update
  function handleUpdate(todo) {
    setIsEdit(true)
    setTodo((prevTodo) => {
      return {
        ...prevTodo,
        todoText: todo.todoText,
      }
    })
    setTempUid2(todo.uid2)
  }

  function handleComplete(todo) {
    console.log(todo)
    update(ref(db, `/${auth.currentUser.uid}/${todo.uid2}`), {
      todoText: todo.todoText,
      uid2: todo.uid2,
      complete: !todo.complete,
    })
  }

  function handleEditConfirm(todo) {
    update(ref(db, `/${auth.currentUser.uid}/${tempUid2}`), {
      todoText: todo.todoText,
      uid2: tempUid2,
    })

    setTodo((prevTodo) => {
      return {
        ...prevTodo,
        todoText: '',
      }
    })
    setIsEdit(false)
  }

  // delete
  function handleDelete(uid2) {
    remove(ref(db, `/${auth.currentUser.uid}/${uid2}`))
  }

  return (
    <div>
      <h2>Add new todo:</h2>
      <div className='todo__entry'>
        <input
          type='text'
          name='todoText'
          placeholder='Add todo'
          value={todo.todoText}
          onChange={handleInputChange}
        />
        {isEdit ? (
          <button onClick={() => handleEditConfirm(todo)}>
            Confirm Update
          </button>
        ) : (
          <button onClick={writeToDatabase}>Add</button>
        )}
      </div>

      {todos.map((todo) => {
        return (
          <div className='todos'>
            {!todo.complete ? (
              <section>
                <h2>Open todos:</h2>
                <div className='todo__item'>
                  <button onClick={() => handleComplete(todo)}>Complete</button>
                  <p className={todo.complete ? 'todo--complete' : ''}>
                    {todo.todoText}
                  </p>
                  <button onClick={() => handleUpdate(todo)}>update</button>
                  <button onClick={() => handleDelete(todo.uid2)}>
                    delete
                  </button>
                </div>
              </section>
            ) : (
              <section>
                <h2>Closed todos:</h2>
                <div className='todo__item'>
                  <button onClick={() => handleComplete(todo)}>Complete</button>
                  <p className={todo.complete ? 'todo--complete' : ''}>
                    {todo.todoText}
                  </p>
                  <button onClick={() => handleUpdate(todo)}>update</button>
                  <button onClick={() => handleDelete(todo.uid2)}>
                    delete
                  </button>
                </div>
              </section>
            )}
          </div>
        )
      })}

      <button onClick={handleSignOut}>Sign out</button>
    </div>
  )
}
