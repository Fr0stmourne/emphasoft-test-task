import React from 'react';
import renderer from 'react-test-renderer';
import Preloader from '.';

describe('Preloader component', () => {
  test('should render the component correctly when no props are provided', () => {
    const tree = renderer.create(<Preloader />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
