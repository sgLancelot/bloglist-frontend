import React, {useState} from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, loggedIn }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)
  const showWhenVisible = {display: visible ? '' : 'none'}
  const toggleVisibility = () => {
    setVisible(!visible)
  }
  const showRemoveWhenLoggedIn = {display: blog.user.name===loggedIn ? '' : 'none'}

  const handleLikes = () => {
    setLikes(likes+1)
    const updatedObject = {
      user: blog.user.id,
      likes: likes+1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }
    blogService.addLike(updatedObject, blog.id)
  }

  const handleDelete = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      blogService.del(blog.id)
    }
  }

  return (
    <div style={blogStyle}>
      <div key={blog.id} onClick={() => toggleVisibility()}>
        {blog.title} by {blog.author}
      </div>
      <div style={showWhenVisible}>
        {blog.url} <br/>
        {likes} <button onClick={handleLikes}>like</button> <br/>
        added by {blog.user.name} <br/>
        <div style={showRemoveWhenLoggedIn}>
          <button onClick={handleDelete}>remove</button>
        </div>
      </div>
    </div>
  )
}

export default Blog