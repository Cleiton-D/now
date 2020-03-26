import Schema from './';

class ProjectTitlesSchema extends Schema {
	constructor() {
		super();

		this.properties = {
			_id: {
				type: 'string',
				primary: true,
			},
			title: {
				type: 'string',
			},
			content: {
				type: 'string',
			},

			childrens: {
				type: 'array',
				items: {
					_id: {
						type: 'string',
					},
				},
			},
		};

		this.required = ['title'];
	}
}

export default new ProjectTitlesSchema();
