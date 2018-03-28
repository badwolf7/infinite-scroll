import { React, _ } from 'appReact';
import { storiesOf } from '@storybook/react';
import InfiniteScrollContainer from 'components/infiniteScroll/InfiniteScrollContainer';

storiesOf('Infinite Scroll', module).add('Default', () => (
  <InfiniteScrollContainer />
));