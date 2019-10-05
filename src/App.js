import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Blog from './components/Blog'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
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
      blogService.setToken(user.token)
    }
  }, [])


  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))

      blogService.setToken(user.token)
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

  const handleAddBlog = async (event) => {
    event.preventDefault()
    try {
      await blogService.create({title, author, url})
      console.log('successfully added blog!')
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch(exception) {
      console.log('error adding blog!')
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

  const addBlogForm = () => {
    return (
      <div>
        <h1>create new</h1>
        <form onSubmit={handleAddBlog}>
          <div>
            title:
              <input type='text' 
              value={title} 
              name='Title'
              onChange={({target}) => setTitle(target.value)}
              />
          </div>
          <div>
            author:
              <input type='text' 
              value={author} 
              name='Title'
              onChange={({target}) => setAuthor(target.value)}
              />
          </div>
          <div>
            url:
              <input type='text' 
              value={url} 
              name='Title'
              onChange={({target}) => setUrl(target.value)}
              />
          </div>
          <button type='submit'>create</button>
        </form>
      </div>
    )
  }

  const blogForm = () => {
    return (
      <div>
        <h1>blogs</h1>
        {user.name} logged in<button onClick={() => handleLogout()}>logout</button><br/>
        <br/>
        {addBlogForm()}
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