import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import AppContext from '~/react/components/Context/AppContext';
import Menu from '~/react/components/Menu';
import Header from '~/react/components/Header';

import { updateProjectsRequest } from '~/react/store/modules/app/actions';

import { AppContainer, Wrapper, MainContainer } from './styles';

export default function DefaultLayout({ children }) {
	const dispatch = useDispatch();

	const [title, setTitle] = useState('');

	useEffect(() => {
		dispatch(updateProjectsRequest());
	}, [dispatch]);

	const changeTitle = useCallback(value => {
		setTitle(value);
	}, []);

	return (
		<AppContext.Provider value={{ changeTitle }}>
			<AppContainer>
				<Menu />
				<Wrapper>
					<Header title={title} subTitle="" />
					<MainContainer>{children}</MainContainer>
				</Wrapper>
			</AppContainer>
		</AppContext.Provider>
	);
}
