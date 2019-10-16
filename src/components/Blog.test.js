import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let component

  beforeEach(() => {
    const blog = {
      title: 'testblog5',
      author: 'testauthor5',
      user: {
        name: 'testname5',
        id: 555555,
      },
      likes: 55,
      url: 'testurl5',
      id: 666666,
    }

    component = render(
      <Blog blog={blog} />
    )
  })


  test('only name and author rendered by default', () => {
    expect(component.container).toHaveTextContent('testblog5')
    expect(component.container).toHaveTextContent('testauthor5')
    const div = component.container.querySelector('.hiddenByDefault')
    expect(div).toHaveStyle('display: none')
  })

  test('when blog post clicked, other info is visible', () => {
    const expand = component.container.querySelector('.toExpand')
    fireEvent.click(expand)
    const div = component.container.querySelector('.hiddenByDefault')
    expect(div).not.toHaveStyle('display: none')
  })
})
