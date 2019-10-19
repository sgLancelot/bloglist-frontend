import React from 'react'
import { render, waitForElement } from '@testing-library/react'
jest.mock('./services/blogs')
import App from './App'

describe('<App />', () => {
  test('if no user logged, blogs are not rendered', async () => {
    const component = render(<App />)

    await waitForElement(() => component.getByText('login'))

    expect(component.container).not.toHaveTextContent('testtitle1')
    expect(component.container).not.toHaveTextContent('testtitle2')
  })

  test('if user logged in, blogs are rendered', async () => {
    const user = {
      username: 'testuser1',
      password:'testpassword1',
      name:'testname1',
      token: '288178hds'
    }

    localStorage.setItem('loggedInUser', JSON.stringify(user))
    const component = render(<App />)
    await waitForElement(() => component.getByText('logout'))

    expect(component.container).toHaveTextContent('testtitle1')
    expect(component.container).toHaveTextContent('testtitle2')
  })
})