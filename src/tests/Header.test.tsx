import { render, screen } from '@testing-library/react';
import Header from '../components/Header';

test('renders header with text "Parking Management"', () => {
  render(<Header />);
  const headerElement = screen.getByText(/Parking Management/i);
  expect(headerElement).toBeInTheDocument();
});
