import { React, ReactDOM } from 'appReact';
import InfiniteScrollContainer from './InfiniteScrollContainer';

it('renders InfiniteScrollContainer without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<InfiniteScrollContainer />, div);
  ReactDOM.unmountComponentAtNode(div);
});