const blogs = [
  {
    id: '5d9039552af5eb1b544e5038',
    title: 'testtitle1',
    author: 'testauthor1',
    name: 'testname1',
    user: {
      _id: '5a437a9e514ab7f168ddf138',
      name: 'testname1',
      username: 'testuser1',
      password: 'testpassword1'
    }
  },
  {
    id: '5d9039552af5eb1b544e5039',
    title: 'testtitle2',
    author: 'testauthor2',
    name: 'testname2',
    user: {
      _id: '5a437a9e514ab7f168ddf139',
      name: 'testname1',
      username: 'testuser1',
      password: 'testpassword1'
    }
  }
]

const getAll = () => {
  return Promise.resolve(blogs)
}

const setToken = newToken => {
  console.log('placeholder to remove error', newToken)
}

export default { getAll, setToken }