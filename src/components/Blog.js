import React, {useState} from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog }) => {
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

  return (
    <div style={blogStyle}>
      <div key={blog.id} onClick={() => toggleVisibility()}>
        {blog.title} by {blog.author}
      </div>
      <div style={showWhenVisible}>
        {blog.url} <br/>
        {likes} <button onClick={handleLikes}>like</button> <br/>
        added by {blog.user.name}
      </div>
    </div>
  )
}

export default Blog