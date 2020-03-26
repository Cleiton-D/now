import React from 'react';
import { useSelector } from 'react-redux';
import { Route } from 'react-router-dom';

import DefaultLayout from '~/react/pages/_layouts/Default';
import ProjectLayout from '~/react/pages/_layouts/ProjectLayout';

export default function RouteWrapper({ component: Component, ...rest }) {
	const selected = useSelector(state => state.project);

	const Layout = selected._id ? ProjectLayout : DefaultLayout;

	return (
		<Route
			{...rest}
			render={props => (
				<Layout>
					<Component {...props} />
				</Layout>
			)}
		></Route>
	);
}
