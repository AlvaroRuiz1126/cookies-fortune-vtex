import React from 'react'
import { render } from '@vtex/test-tools/react'

import ClientCookieForutne from '../ClientCookiesFortune'

test('greets Fred', () => {
  const { queryByText } = render(<ClientCookieForutne />)

  expect(queryByText('Hey, Fred')).toBeInTheDocument()
})
