import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Blog from './components/Blog'
import AddBlogForm from './components/AddBlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import ErrorNoti from './components/ErrorNoti'
import LoginForm from './components/LoginForm'

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
  const blogFormRef = React.createRef()

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

      setMessage('logged in successfully')
      setTimeout(() => {setMessage(null)},5000)
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log('wrong username or password')
      setError('wrong username or password')
      setTimeout(() => {setError(null)},5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    console.log('Logged out!')
    setMessage('logged out successfully')
    setTimeout(() => {setMessage(null)},5000)
    setUser(null)
  }

  const handleAddBlog = async (event) => {
    event.preventDefault()
    try {
      await blogService.create({ title, author, url })
      console.log('successfully added blog!')
      blogFormRef.current.toggleVisibility()
      setMessage(`a new blog ${title} by ${author} added`)
      setTimeout(() => {setMessage(null)},5000)
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch(exception) {
      console.log('error adding blog!')
    }
  }

  const blogForm = () => (
    <div>
      <h1>blogs</h1>
      {user.name} logged in<button onClick={() => handleLogout()}>logout</button><br/>
      <br/>
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <AddBlogForm
          handleAddBlog={handleAddBlog}
          handleTitleChange={({ target }) => setTitle(target.value)}
          handleAuthorChange={({ target }) => setAuthor(target.value)}
          handleUrlChange={({ target }) => setUrl(target.value)}
          title={title}
          author={author}
          url={url}
        />
      </Togglable>
      <br/>
      {blogs
        .sort((a,b) => b.likes - a.likes)
        .map(x => {
          return (
            <div key={x.id}>
              <Blog blog={x} loggedIn={user.name}/>
            </div>
          )
        })
      }
    </div>
  )

  return (
    <div>
      <Notification message={message} />
      <ErrorNoti message={error} />
      {user === null ?
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleLogin={handleLogin} /> :
        blogForm()}
    </div>
  )
}

export default App