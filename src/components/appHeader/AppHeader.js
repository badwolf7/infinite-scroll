import { Component, React, styled } from 'appReact';

import { colors, pxToEm } from 'styles/util';

import logo from './Netflix_Logo_RGB.svg';

class AppHeader extends Component {
  render() {
    return (
      <AppHeaderContainer>
        <img src={logo} className='App-logo' alt='logo' />
      </AppHeaderContainer>
    );
  }
}

const AppHeaderContainer = styled.header`
  background-color: ${colors.grey.hex};
  border-bottom: 30px solid ${colors.red.hex};
  color: white;
  padding: ${pxToEm(30)};
  text-align: center;

  .App-logo {
    height: ${pxToEm(80)};
  }
`;

export default AppHeader;