import React from 'react';
import renderer from 'react-test-renderer';
import Friend from '.';

describe('Friend component', () => {
  test('should render the component correctly when no props are provided', () => {
    const tree = renderer.create(<Friend />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('should render the component with custom props correctly ', () => {
    const tree = renderer
      .create(<Friend firstName="Иван" lastName="Иванов" />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
