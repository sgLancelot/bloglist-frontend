import React from 'react'

const SimpleBlog = ({ blog, onClick }) => (
  <div>
    <div>
      {blog.title} {blog.author}
    </div>
    <div>
      blog has {blog.likes} likes
      <button onClick={onClick}>like</button>
    </div>
  </div>
)

export default SimpleBlog

/*
Write tests for the Blog component of your application
that verify that only the name and author of the blog
post are shown by default. Also verify that when the
blog post is clicked, the other information of the blog
post becomes visible.
*/