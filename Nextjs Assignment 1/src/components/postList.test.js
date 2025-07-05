import { render, screen } from '@testing-library/react';
import PostList from './postList';

const mockPosts = [
  { id: 1, title: 'Test Post', content: 'Hello',description:"test description" },
];

test('renders post titles', () => {
  render(<PostList data={mockPosts} onPostClick={() => {}} />);
  expect(screen.getByText('Test Post')).toBeInTheDocument();
});