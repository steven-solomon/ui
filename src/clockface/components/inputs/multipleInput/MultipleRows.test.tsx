// Libraries
import React from 'react'
import {screen} from '@testing-library/react'

// Components
import MultipleRows from './MultipleRows'

import {renderWithReduxAndRouter} from 'src/mockState'

const setup = (override = {}) => {
  const props = {
    confirmText: '',
    onDeleteTag: jest.fn(),
    fieldName: '',
    tags: [],
    onSetConfigArrayValue: jest.fn(),
    telegrafPluginName: 'cpu',
    ...override,
  }

  renderWithReduxAndRouter(<MultipleRows {...props} />)
}

describe('Clockface.Components.MultipleRows', () => {
  it('renders', async () => {
    const fieldName = 'yo'
    setup({fieldName})
    const elm = await screen.findByTestId('multiple-rows')
    expect(elm).toBeVisible()
  })
})
