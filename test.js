import test from 'ava'
import React from 'react'
import { create as render } from 'react-test-renderer'
import { shallow } from 'enzyme'
import { createProvider, connect } from './src'

const App = props => (
  <h1>Hello</h1>
)

const Container = props => (
  <h2>Container</h2>
)

let Provider
let Sub

test('exports functions', t => {
  t.is(typeof createProvider, 'function')
  t.is(typeof connect, 'function')
})

test('creates a provider', t => {
  t.notThrows(() => {
    const init = { count: 1 }
    Provider = createProvider(init)(App)
  })
  const wrapper = shallow(<Provider />) //.first().shallow()
  t.is(wrapper.props().count, 1)
  t.is(typeof wrapper.props().update, 'function')
})

test('connects subcomponents', t => {
  t.notThrows(() => {
    Sub = connect()(Container)
  })
  const wrapper = shallow(<Sub />, {
    context: {
      update: () => {},
      state: {}
    }
  })
  t.is(typeof wrapper.context('update'), 'function')
  t.is(typeof wrapper.context('state'), 'object')
  t.is(typeof wrapper.props().update, 'function')
})

test('connect maps state to props', t => {
  Sub = connect(state => ({ count: state.count }))(Container)
  const wrapper = shallow(<Sub />, {
    context: {
      update: () => {},
      state: {
        count: 3,
        color: 'tomato'
      }
    }
  })
  t.is(wrapper.props().count, 3)
  t.falsy(wrapper.props().color)
})

test('Provider.update() sets state', t => {
  const wrapper = shallow(<Provider />)
  wrapper.instance().update(state => ({
    count: 32
  }))
  t.is(wrapper.state().count, 32)
})
