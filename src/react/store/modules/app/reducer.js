import producer from 'immer';

const INITIAL_STATE = {
	projectList: [],
};

export default function app(state = INITIAL_STATE, action) {
	return producer(state, draft => {
		switch (action.type) {
			case '@app/UPDATE_PROJECT_SUCCESS': {
				const { projects } = action.payload;
				draft.projectList = projects;
				break;
			}
			default:
				break;
		}
	});
}
