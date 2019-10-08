import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Blog from './components/Blog'
import AddBlogForm from './components/AddBlogForm'
import Notification from './components/Notification'
import ErrorNoti from './components/ErrorNoti'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(null)
  const [blogVisible, setBlogVisible] = useState(false)

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

      setMessage(`logged in successfully`)
      setTimeout(()=> {setMessage(null)},5000)
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log('wrong username or password')
      setError('wrong username or password')
      setTimeout(()=> {setError(null)},5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    console.log('Logged out!')
    setMessage(`logged out successfully`)
    setTimeout(()=> {setMessage(null)},5000)
    setUser(null)
  }

  const handleAddBlog = async (event) => {
    event.preventDefault()
    try {
      await blogService.create({title, author, url})
      console.log('successfully added blog!')
      setMessage(`a new blog ${title} by ${author} added`)
      setTimeout(()=> {setMessage(null)},5000)
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

  const blogForm = () => {
    const hideWhenVisible = {display: blogVisible ? 'none' : ''}
    const showWhenVisible = {display: blogVisible ? '' : 'none'}

    return (
      <div>
          <h1>blogs</h1>
          {user.name} logged in<button onClick={() => handleLogout()}>logout</button><br/>
          <br/>
        <div style={showWhenVisible}>
          <AddBlogForm 
            handleAddBlog={handleAddBlog}
            handleTitleChange={({target}) => setTitle(target.value)}
            handleAuthorChange={({target}) => setAuthor(target.value)}
            handleUrlChange={({target}) => setUrl(target.value)}
            title={title}
            author={author}
            url={url}
          />
          <button onClick={() => setBlogVisible(false)}>cancel</button>
        </div>
        <div style={hideWhenVisible}>
          <button onClick={() => setBlogVisible(true)}>new blog</button>
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
      </div>
    )
  }
  
  return (
    <div>
      <Notification message={message} />
      <ErrorNoti message={error} />
      {user === null ?
        loginForm() :
        blogForm()}
    </div>
  )
}

export default App