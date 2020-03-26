import { all } from 'redux-saga/effects';

import app from './app/sagas';
import project from './project/sagas';

export default function* rootSaga() {
	return yield all([project, app]);
}
