import React from 'react';
import renderer from 'react-test-renderer';
import StatusIcon from '.';

describe('StatusIcon component', () => {
  test('should render the component correctly when no props are provided', () => {
    const tree = renderer.create(<StatusIcon />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('should render the component with custom props correctly', () => {
    const tree = renderer.create(<StatusIcon online={true} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
