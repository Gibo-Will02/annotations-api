import { render, screen, fireEvent, getByTestId } from '@testing-library/react';
import {GibsonComponent} from "../src/views/TestPage.jsx";

test('renders learn react link', () => {
  render(<GibsonComponent />);
  const checkListText = screen.getByText("Reading 1");

  fireEvent.click(screen.getAllByRole('checkbox')[0])

  expect(checkListText).toBeInTheDocument();
  expect(screen.getAllByRole('checkbox')[0]).toBeChecked();
  expect(checkListText).toHaveClass('checked-item')
});
