import 'babel-polyfill';
import 'styles';

import { React, ReactDOM } from 'appReact';

import App from 'components/app/App';

import './index.css';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
