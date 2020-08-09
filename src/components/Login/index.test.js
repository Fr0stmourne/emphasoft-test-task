import React from 'react';
import renderer from 'react-test-renderer';
import Login from '.';

describe('Friend component', () => {
  test('should render the component correctly when no props are provided', () => {
    const tree = renderer.create(<Login />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('should render the component with custom props correctly', () => {
    const tree = renderer
      .create(<Login title="Auth" buttonText="Log in" />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
