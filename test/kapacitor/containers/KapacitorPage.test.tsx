import React from 'react'
import {KapacitorPage} from 'src/kapacitor/containers/KapacitorPage'
import KapacitorForm from 'src/kapacitor/components/KapacitorForm'
import {shallow} from 'enzyme'
import * as apis from 'src/shared/apis'

import {source, kapacitor} from 'test/resources'
apis.getKapacitor = jest.fn()

const setup = (override = {}) => {
  const props = {
    source: source,
    addFlashMessage: () => {},
    kapacitor,
    router: {
      push: () => {},
      replace: () => {},
    },
    location: {pathname: '', hash: ''},
    params: {id: '', hash: ''},
    ...override,
  }

  const wrapper = shallow(<KapacitorPage {...props} />)

  return {
    wrapper,
    props,
  }
}

describe('Kapacitor.Containers.KapacitorPage', () => {
  describe('rendering', () => {
    it('renders the KapacitorPage', () => {
      const {wrapper} = setup()
      expect(wrapper.exists()).toBe(true)
    })

    it('renders the <KapacitorForm/>', () => {
      const {wrapper} = setup()
      const form = wrapper.find(KapacitorForm)

      expect(form.exists()).toBe(true)
    })
  })

  describe('instance methods', () => {
    describe('componentDidMount', () => {
      describe('if there is no id params', () => {
        it('does not get the kapacitor', () => {
          expect(apis.getKapacitor).not.toHaveBeenCalled()
        })
      })
    })
  })
})
