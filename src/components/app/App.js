import { Component, React, styled } from 'appReact';

import AppHeader from 'components/appHeader/AppHeader';
import data from 'data/data.json';

class App extends Component {
  render() {
    return (
      <div>
        <AppHeader />
        <AppIntro>To get started, edit <code>{data.path}</code> and save to reload.</AppIntro>
      </div>
    );
  }
}

const AppIntro = styled.p`
  font-size: large;
  text-align: center;
`;

export default App;