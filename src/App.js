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


  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log('wrong credentials')
    }
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
        <h2>{user.name} logged in</h2>
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
        blogForm()
      }
    </div>
  )
}

export default App