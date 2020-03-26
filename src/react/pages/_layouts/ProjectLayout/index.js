import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import AppContext from '~/react/components/Context/AppContext';
import Header from '~/react/components/Header';
import Menu from './Menu';

import { unselectProject } from '~/react/store/modules/project/actions';

import { AppContainer, Wrapper, MainContainer } from '../Default/styles';
// import { Container } from './styles';

export default function ProjectLayout({ children }) {
	const history = useHistory();
	const dispatch = useDispatch();
	const [title, setTitle] = useState('');

	const changeTitle = useCallback(value => {
		setTitle(value);
	}, []);

	function onBack() {
		dispatch(unselectProject());
		history.push('/');
	}

	return (
		<AppContext.Provider value={{ changeTitle }}>
			<AppContainer>
				<Menu />
				<Wrapper>
					<Header onBack={onBack} title={title} subtitle="" />
					<MainContainer>{children}</MainContainer>
				</Wrapper>
			</AppContainer>
		</AppContext.Provider>
	);
}
