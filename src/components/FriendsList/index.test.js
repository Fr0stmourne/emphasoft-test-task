import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import FriendsList from '.';

describe('FriendsList component', () => {
  test('should render the component correctly when no props are provided', () => {
    const renderer = new ShallowRenderer();
    const tree = renderer.render(<FriendsList />);
    expect(tree).toMatchSnapshot();
  });

  test('should render the component with custom props correctly', () => {
    const renderer = new ShallowRenderer();
    const tree = renderer.render(<FriendsList title="My friends:" />);
    expect(tree).toMatchSnapshot();
  });
});
