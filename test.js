import test from 'ava'
import React from 'react'
import { create as render } from 'react-test-renderer'
import ShallowRenderer from 'react-test-renderer/shallow'
import {
  connect,
  Provider,
  Consumer
} from './src'

test('exports a connect function', t => {
  t.is(typeof connect, 'function')
})

test('exports Provider component', t => {
  t.is(typeof Provider, 'function')
})

test('exports Consumer component', t => {
  t.is(typeof Consumer, 'function')
})

test('Provider derives state from props', t => {
  const root = render(<Provider count={1} />).root
  t.is(root.instance.state.count, 1)
})

test('Provider.update() sets state', t => {
  const root = render(<Provider count={1} />).root
  const instance = root.instance
  instance.update(state => ({ count: 2 }))
  t.is(instance.state.count, 2)
})

test('Nested components get state from parent', t => {
  const Nested = connect(props => <pre>{props.count}</pre>)
  const json = render(
    <Provider count={1}>
      <Nested count={3} />
    </Provider>
  ).toJSON()
  t.is(json.children[0], '1')
})

test('Unnested components create their own Provider', t => {
  const Unnested = connect(props => <pre>{props.count}</pre>)
  const json = render(
    <Unnested count={3} />
  ).toJSON()
  t.is(json.children[0], '3')
})

