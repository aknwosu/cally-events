import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';
import ReactDOM from 'react-dom'

import GoogleAuth from '../Authorization/GoogleAuth';

it('Charts renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe('GoogleAuth renders without crashing', () => {
  test('renders without crashing', () => {
    render(<GoogleAuth setColorToSummary={jest.fn()} setCalendars={jest.fn()} />)
  });
})
