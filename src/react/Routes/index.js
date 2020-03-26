import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import Home from '~/react/pages/Home';
import NewProject from '~/react/pages/NewProject';
import Project from '~/react/pages/Project';

export default function Routes() {
	return (
		<Switch>
			<Route path="/" exact component={Home} />
			<Route path="/newProject" component={NewProject} />
			<Route path="/project/:id" component={Project} />
		</Switch>
	);
}
