import React from 'react'

const AddBlogForm = ({
        handleAddBlog,
        handleTitleChange,
        handleAuthorChange,
        handleUrlChange,
        title,
        author,
        url
    }) => {
    return (
        <div>
            <h1>create new</h1>
            <form onSubmit={handleAddBlog}>
                <div>
                    title:
                    <input type='text' 
                    value={title} 
                    name='Title'
                    onChange={handleTitleChange}
                    />
                </div>
                <div>
                    author:
                    <input type='text' 
                    value={author} 
                    name='Author'
                    onChange={handleAuthorChange}
                    />
                </div>
                <div>
                    url:
                    <input type='text' 
                    value={url} 
                    name='Url'
                    onChange={handleUrlChange}
                    />
                </div>
                <button type='submit'>create</button>
            </form>
        </div>
    )
}

export default AddBlogForm