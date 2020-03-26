import { all, takeLatest, put } from 'redux-saga/effects';

import Project from '~/react/database/models/Project';
import Member from '~/react/database/models/Member';
import Subject from '~/react/database/models/Subject';
import Title from '~/react/database/models/Title';

import {
	loadProject,
	loadTitles,
	deleteTitle as deleteTitleApi,
} from '~/react/api';

import {
	selectProjectSuccess,
	upsertMemberSuccess,
	removeMemberSuccess,
	upsertSubjectSuccess,
	removesubjectSuccess,
	updateTitles,
} from './actions';

export function* selectProject({ payload }) {
	const { id } = payload;

	const project = yield loadProject(id);

	yield put(selectProjectSuccess(project));

	window.location.hash = `/project/${id}`;
}

export function* upsertMember({ payload }) {
	const { project_id, id, str } = payload;

	const project = yield Project.findById(project_id);

	const member = new Member({ _id: id, name: str });

	if (id) {
		const index = project.members.findIndex(item => item._id === id);
		project.members.splice(index, 1, member);
	} else {
		project.members.push(member);
	}

	yield Project.update(project);

	yield put(upsertMemberSuccess(member));
}

export function* removeMember({ payload }) {
	const { project_id, id } = payload;

	const project = yield Project.findById(project_id);
	const members = project.members.filter(item => item._id !== id);

	project.members = members;
	yield Project.update(project);

	yield put(removeMemberSuccess(id));
}

export function* upsertSubject({ payload }) {
	const { project_id, id, str } = payload;

	const project = yield Project.findById(project_id);

	const subject = new Subject({ _id: id, name: str });

	if (id) {
		const index = project.subjects.findIndex(item => item._id === id);
		project.subjects.splice(index, 1, subject);
	} else {
		project.subjects.push(subject);
	}

	yield Project.update(project);

	yield put(upsertSubjectSuccess(subject));
}

export function* removeSubject({ payload }) {
	const { project_id, id } = payload;

	const project = yield Project.findById(project_id);
	const subjects = project.subjects.filter(item => item._id !== id);

	project.subjects = subjects;
	yield Project.update(project);

	yield put(removesubjectSuccess(id));
}

export function* upsertTitle({ payload }) {
	const { project_id, parent: parentId, id, title, content } = payload;
	const project = yield Project.findById(project_id);

	let titleModel;
	if (id) {
		titleModel = yield Title.findById(id);
		Object.assign(titleModel, { title, content });

		yield Title.update(titleModel);
	} else {
		titleModel = new Title({ title, content });
		yield titleModel.save();
	}

	if (parentId && !id) {
		const parent = yield Title.findById(parentId);
		parent.childrens.push(titleModel._id);
		yield Title.update(parent);
	} else if (!id) {
		project.titles.push(titleModel._id);
		yield Project.update(project);
	}

	const newTitles = yield loadTitles(project_id);
	yield put(updateTitles(newTitles));
}

export function* deleteTitle({ payload }) {
	const { title, project_id } = payload;

	console.log(payload);

	yield deleteTitleApi(title._id, title.parent, project_id);
	const newTitles = yield loadTitles(project_id);
	yield put(updateTitles(newTitles));
}

export default all([
	takeLatest('@project/SELECT_REQUEST', selectProject),
	takeLatest('@project/UPSERT_MEMBER_REQUEST', upsertMember),
	takeLatest('@project/REMOVE_MEMBER_REQUEST', removeMember),
	takeLatest('@project/UPSERT_SUBJECT_REQUEST', upsertSubject),
	takeLatest('@project/REMOVE_SUBJECT_REQUEST', removeSubject),
	takeLatest('@project/UPSERT_TITLE', upsertTitle),
	takeLatest('@project/DELETE_TITLE', deleteTitle),
]);
