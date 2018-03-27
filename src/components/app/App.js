import { Component, React } from 'appReact';

import AppHeader from 'components/appHeader/AppHeader';
import InfiniteScrollContainer from 'components/infiniteScroll/InfiniteScrollContainer';

class App extends Component {
  render() {
    return (
      <div>
        <AppHeader />
        <InfiniteScrollContainer />
      </div>
    );
  }
}

export default App;