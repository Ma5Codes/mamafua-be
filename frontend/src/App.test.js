import { render, screen } from '@testing-library/react';
import App from './App';

test('renders laundry app', () => {
  render(<App />);
  const linkElement = screen.getByText(/WashCycle/i);
  expect(linkElement).toBeInTheDocument();
});
