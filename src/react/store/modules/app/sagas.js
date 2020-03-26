import { all, takeLatest, put } from 'redux-saga/effects';

import Project from '~/react/database/models/Project';

import { updateProjectsSuccess } from './actions';

export function* updateProjects() {
	const data = yield Project.getAll();

	yield put(updateProjectsSuccess(data));
}

export default all([takeLatest('@app/UPDATE_PROJECT_REQUEST', updateProjects)]);
