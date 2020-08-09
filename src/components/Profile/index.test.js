import React from 'react';
import renderer from 'react-test-renderer';
import Profile from '.';
import { fakeProfile } from '../../utils/fakeData';

describe('Profile component', () => {
  test('should render the component correctly when no props are provided', () => {
    const tree = renderer.create(<Profile />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('should render the component with custom props correctly', () => {
    const resource = {
      read() {
        return fakeProfile;
      },
    };
    const tree = renderer
      .create(<Profile profileResource={resource} buttonText="Log out" />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
