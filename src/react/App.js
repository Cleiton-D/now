import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';

import '../config/ReactotronConfig';
import './database';

import Routes from './Routes';

import { store } from './store';

import GlobalStyle from './styles/global';

function App() {
	return (
		<Provider store={store}>
			<HashRouter>
				<Routes />
				<GlobalStyle />
			</HashRouter>
		</Provider>
	);
}

export default App;
