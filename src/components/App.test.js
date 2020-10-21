import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
window.gapi = {};
gapi = window.gapi
// gapi.auth2 = {}
// gapi.client = {}
// gapi.auth2.getAuthInstance = () => {isSignedIn : {get : () => true, listen; }};
// gapi.client.init = (v) => true;
// gapi.load = (a, f) => f();
gapi.client.request = gapi.client.request || function() {};

test('renders learn react link', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
