export function updateProjectsRequest() {
	return {
		type: '@app/UPDATE_PROJECT_REQUEST',
	};
}

export function updateProjectsSuccess(projects) {
	return {
		type: '@app/UPDATE_PROJECT_SUCCESS',
		payload: { projects },
	};
}
