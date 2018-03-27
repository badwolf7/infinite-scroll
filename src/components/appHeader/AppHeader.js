import { Component, React, styled } from 'appReact';

import { colors, pxToEm } from 'styles/util';

import logo from './logo.svg';

class AppHeader extends Component {
  render() {
    return (
      <AppHeaderContainer>
        <img src={logo} className='App-logo' alt='logo' />
        <h1 className='App-title'>Welcome to React</h1>
      </AppHeaderContainer>
    );
  }
}

const AppHeaderContainer = styled.header`
  background-color: ${colors.grey.hex};
  color: white;
  height: ${pxToEm(150)};
  padding: ${pxToEm(20)};
  text-align: center;

  .App-logo {
    animation: App-logo-spin infinite 20s linear;
    height: ${pxToEm(80)};
  }

  @keyframes App-logo-spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

export default AppHeader;