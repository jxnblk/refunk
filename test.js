import test from 'ava'
import React from 'react'
import { create as render } from 'react-test-renderer'
import ShallowRenderer from 'react-test-renderer/shallow'
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

test.afterEach(() => {
  Provider = null
  Sub = null
})

test('exports a function', t => {
  t.is(typeof connect, 'function')
})

test('creates a provider', t => {
  const shallow = new ShallowRenderer()
  t.notThrows(() => {
    Provider = connect(App)
  })
  const state = { count: 1 }
  shallow.render(<Provider {...state} />)
  const provider = shallow.getRenderOutput()
  t.is(provider.props.count, 1)
  t.is(typeof provider.props.update, 'function')
})

test('connects child components', t => {
  const shallow = new ShallowRenderer()
  t.notThrows(() => {
    Sub = connect(Container)
  })
  shallow.render(<Sub />)
  const sub = shallow.getRenderOutput()
    /*
  const wrapper = shallow(<Sub />, {
    context: {
      update: () => {},
      state: {}
    }
  })
  t.is(typeof wrapper.context('update'), 'function')
  t.is(typeof wrapper.context('state'), 'object')
  t.is(typeof wrapper.props().update, 'function')
  */
})

test.skip('Provider.update() sets state', t => {
  const shallow = new ShallowRenderer()
  // const wrapper = shallow(<Provider />)
  // wrapper.instance().update(state => ({
  //   count: 32
  // }))
  // t.is(wrapper.state().count, 32)
})

test.skip('Provider adds props to initial state', t => {
  const shallow = new ShallowRenderer()
  Provider = connect(App)
  const wrapper = shallow.render(<Provider foo='hello' />)
  const instance = shallow.getRenderOutput()
  t.is(instance.state.foo, 'hello')
})

test('Component renders', t => {
  const json = render(<Refunk render={() => <div>Hello</div>} />).toJSON()
  t.snapshot(json)
})

test('Maps state', t => {
  const shallow = new ShallowRenderer()
  Provider = connect(App)
  const state = { count: 0 }
  const mapState = state => ({
    ...state,
    addition: state.count + 32,
  })
  shallow.render(<Provider {...state} mapState={mapState} />)
  const provider = shallow.getRenderOutput()
  t.is(provider.props.count, 0)
  t.is(provider.props.addition, 32)
})
