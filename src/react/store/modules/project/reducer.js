import produce from 'immer';

const INITIAL_STATE = {
	_id: null,
	title: null,
	subtitle: null,
	city: null,
	course: null,
	members: [],
	subjects: [],
	titles: [],
};

export default function projects(state = INITIAL_STATE, action) {
	return produce(state, draft => {
		switch (action.type) {
			case '@project/SELECT_SUCCESS': {
				const data = action.payload;
				Object.assign(draft, data);
				break;
			}

			case '@project/UNSELECT': {
				Object.assign(draft, INITIAL_STATE);
				break;
			}

			case '@project/UPSERT_MEMBER_SUCCESS': {
				const { member } = action.payload;

				const memberExist = draft.members.findIndex(
					item => item._id === member._id
				);

				if (memberExist !== -1) {
					draft.members.splice(memberExist, 1, member);
				} else {
					draft.members.push(member);
				}

				break;
			}

			case '@project/REMOVE_MEMBER_SUCCESS': {
				const { id } = action.payload;
				draft.members = draft.members.filter(item => item._id !== id);
				break;
			}

			case '@project/UPSERT_SUBJECT_SUCCESS': {
				const { subject } = action.payload;

				const subjectExist = draft.subjects.findIndex(
					item => item._id === subject._id
				);

				if (subjectExist !== -1) {
					draft.subjects.splice(subjectExist, 1, subject);
				} else {
					draft.subjects.push(subject);
				}

				break;
			}

			case '@project/REMOVE_SUBJECT_SUCCESS': {
				const { id } = action.payload;
				draft.subjects = draft.subjects.filter(item => item._id !== id);
				break;
			}

			case '@project/UPDATE_TITLES': {
				const { titles } = action.payload;
				draft.titles = titles;
				break;
			}

			default:
				break;
		}
	});
}
