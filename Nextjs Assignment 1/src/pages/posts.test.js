import { getStaticProps } from '@/pages/posts';

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve([{ id: 1, title: 'Mock Post', content: 'Hello' ,description:"test description" }]),
  })
);

test('fetches posts statically', async () => {
  const result = await getStaticProps();

  expect(result).toEqual({
    props: {
      data: [{ id: 1, title: 'Mock Post', content: 'Hello' ,description:'test description' }],
    },
  });

  expect(fetch).toHaveBeenCalledWith('http://localhost:3001/api/posts');
});
