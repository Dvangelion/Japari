import React from 'react';
import { fireEvent, render, getByTestId, queryByPlaceholderText } from '@testing-library/react';
import LoginPage from '../components/LoginPage';


// It's better to render the corresponding DOM node, not the whole component
test('renders user name form', () => {
  const { getByPlaceholderText } = render(<LoginPage />);
  const linkElement = getByPlaceholderText('enter your username');
  expect(linkElement).toBeInTheDocument();
});

// After click enter, password form should show up
test('show password form', () => {
  const { getByTestId, queryByPlaceholderText } = render(<LoginPage />);
  const enter = getByTestId('enter');
  fireEvent.click(enter);
  expect(queryByPlaceholderText('password')).toBeTruthy();
});