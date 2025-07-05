import { render, screen } from '@testing-library/react';
import PostDetails from './postDetails';

test('renders post content', () => {
  render(<PostDetails blog={{ title: 'Test', content: 'Full post here.',description:"test description" }} />);
  expect(screen.getByText('Full post here.')).toBeInTheDocument();
});