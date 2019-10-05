import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Blog from './components/Blog'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService
      .getAll()
      .then(initialBlogs => {
        setBlogs(initialBlogs)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])


  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log('wrong credentials')
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
    console.log('Logged out!')
  }

  const loginForm = () => {
    return (
      <div>
        <h1>log in to application</h1>
        <form onSubmit={handleLogin}>
          <div>
              username 
                <input type='text' 
                value={username} 
                name="Username" 
                onChange={({target}) => setUsername(target.value)}
                />
            </div>
            <div>
              password 
                <input type='text'
                value={password}
                name='Password'
                onChange={({target}) => setPassword(target.value)}
                />
            </div>
            <button type='submit'>login</button>
        </form>
      </div>
    )
  }

  const blogForm = () => {
    return (
      <div>
        {user.name} logged in<button onClick={() => handleLogout()}>logout</button><br/>
        <br/>
        {blogs
          .filter(x => x.user.name===user.name)
          .map(x => {
            return (
              <div key={x.id}>
                <Blog blog={x} />
              </div>
            )
          })
        }
      </div>
    )
  }
  
  return (
    <div>
      {user === null ?
        loginForm() :
        blogForm()}
    </div>
  )
}

export default App