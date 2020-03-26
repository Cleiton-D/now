export function selectProjectRequest(id) {
	return {
		type: '@project/SELECT_REQUEST',
		payload: { id },
	};
}

export function selectProjectSuccess(project) {
	return {
		type: '@project/SELECT_SUCCESS',
		payload: project,
	};
}

export function unselectProject() {
	return {
		type: '@project/UNSELECT',
	};
}

export function upsertMemberRequest(data) {
	return {
		type: '@project/UPSERT_MEMBER_REQUEST',
		payload: data,
	};
}

export function upsertMemberSuccess(member) {
	return {
		type: '@project/UPSERT_MEMBER_SUCCESS',
		payload: { member },
	};
}

export function removeMemberRequest(project_id, id) {
	return {
		type: '@project/REMOVE_MEMBER_REQUEST',
		payload: { project_id, id },
	};
}

export function removeMemberSuccess(id) {
	return {
		type: '@project/REMOVE_MEMBER_SUCCESS',
		payload: { id },
	};
}

export function upsertSubjectRequest(data) {
	return {
		type: '@project/UPSERT_SUBJECT_REQUEST',
		payload: data,
	};
}

export function upsertSubjectSuccess(subject) {
	return {
		type: '@project/UPSERT_SUBJECT_SUCCESS',
		payload: { subject },
	};
}

export function removeSubjectRequest(project_id, id) {
	return {
		type: '@project/REMOVE_SUBJECT_REQUEST',
		payload: { project_id, id },
	};
}

export function removesubjectSuccess(id) {
	return {
		type: '@project/REMOVE_SUBJECT_SUCCESS',
		payload: { id },
	};
}

export function upsertTitle(data) {
	return {
		type: '@project/UPSERT_TITLE',
		payload: data,
	};
}

export function updateTitles(titles) {
	return {
		type: '@project/UPDATE_TITLES',
		payload: { titles },
	};
}

export function deleteTitle(title, project_id) {
	return {
		type: '@project/DELETE_TITLE',
		payload: { title, project_id },
	};
}
