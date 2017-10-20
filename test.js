import test from 'ava'
import React from 'react'
import { create as render } from 'react-test-renderer'
import { shallow } from 'enzyme'
import connect from './src'
import Refunk from './src/component'

const App = props => (
  <h1>Hello</h1>
)

const Container = props => (
  <h2>Container</h2>
)

let Provider
let Sub

test('exports a function', t => {
  t.is(typeof connect, 'function')
})

test('creates a provider', t => {
  t.notThrows(() => {
    Provider = connect(App)
  })
  const state = { count: 1 }
  const wrapper = shallow(<Provider {...state} />)
  t.is(wrapper.props().count, 1)
  t.is(typeof wrapper.props().update, 'function')
})

test('connects child components', t => {
  t.notThrows(() => {
    Sub = connect(Container)
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

test('Provider.update() sets state', t => {
  const wrapper = shallow(<Provider />)
  wrapper.instance().update(state => ({
    count: 32
  }))
  t.is(wrapper.state().count, 32)
})

test('Provider adds props to initial state', t => {
  const wrapper = shallow(<Provider foo='hello' />)
  t.is(wrapper.state().foo, 'hello')
})

test('Component renders', t => {
  const json = render(<Refunk children={() => <div>Hello</div>} />).toJSON()
  t.snapshot(json)
})
