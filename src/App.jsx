
import { useEffect, useState } from 'react'
import axios from 'axios'
import UsersForm from './components/UsersForm'
import UsersList from './components/UsersList'

import './App.css'

function App() {

  const baseAURL = 'https://users-crud.academlo.tech'

  const [apiResponse, setApiResponse] = useState([])
  const [editingUser, setEditingUser] = useState(null)
  const [showPop, setShowPop] = useState(false)
  const [showForm, setShowForm] = useState(false)

  const apiRequest = (request = {}) => {
    /* "request" object must be structured as:
      request = {
        type: (Str): get, post, delete, put
        id: (Num): user id*
        body: (Obj): users body
    }*/
    switch (request.type) {
      case 'post':
        axios.post(`${baseAURL}/users/`, request.body)
          .then(() => {
            apiRequest()
          })
          .catch(error => console.error(error.response))
        break;
      case 'delete':
        axios.delete(`${baseAURL}/users/${request.id}`)
          .then(() => {
            apiRequest()
          })
        break;
      case 'put':
        axios.put(`${baseAURL}/users/${request.id}/`, request.body)
          .then(() => {
            apiRequest()
            setTimeout(() => {
              setEditingUser(null)
            }, 1000);
            
          })
          .catch(error => console.error(error.response))
        break;
      default:
        axios.get(`${baseAURL}/users/`)
          .then(res => setApiResponse(res.data))
        break;
    }
  }

  const editUser = (user) => {
    setEditingUser(user)
  }

  const showPopUp = () => {
    setShowPop(true)
    setTimeout(() => {
      setShowPop(false)
    }, 1000);
    
  }

  useEffect(() => {
    apiRequest()
  }, [])

  return (
    <div className="App">
      {/*<h1>Users Manager</h1>*/}
      <UsersForm editingUser={editingUser} apiRequest={apiRequest} showForm={showForm} disForm={setShowForm} setEditingUser={setEditingUser} showPopUp={showPopUp} />
      <UsersList usersData={apiResponse} userToEdit={editUser} apiRequest={apiRequest} disForm={setShowForm} />
      <div className={`popup-container ${showPop ? 'show':''}`}>
        <div className="popup-card">
          <span>
            <i className={`bx bx-${editingUser ? 'edit-alt' : 'check'} bx-md`}></i>
          </span>
          <h2>
            {editingUser ? 'User updated' : 'User created'}
          </h2>
        </div>
      </div>
    </div>
  )
}

export default App
