import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import SimpleBlog from './SimpleBlog'

test('renders content', () => {
  const blog = {
    title: 'testblog1',
    author: 'testauthor1',
    likes: 13
  }

  const component = render(
    <SimpleBlog blog={blog} />
  )
  const button = component.container.querySelector('button')
  console.log(prettyDOM(button))

  expect(component.container).toHaveTextContent('testauthor1')
  expect(component.container).toHaveTextContent('testblog1')
  expect(component.container).toHaveTextContent(13)
})

test('clicking button', () => {
  const blog = {
    title: 'testblog1',
    author: 'testauthor1',
    likes: 13
  }

  const mockHandler = jest.fn()

  const { getByText } = render(
    <SimpleBlog blog={blog} onClick={mockHandler} />
  )

  const button = getByText('like')
  console.log(prettyDOM(button))
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls.length).toBe(2)
})