import Schema from './';

class ProjectSchema extends Schema {
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
			subtitle: {
				type: 'string',
			},
			city: {
				type: 'string',
			},
			course: {
				type: 'string',
			},
			members: {
				type: 'array',
				items: {
					_id: {
						type: 'string',
					},
					name: {
						type: 'string',
					},
				},
			},
			subjects: {
				type: 'array',
				items: {
					_id: {
						type: 'string',
					},
					name: {
						type: 'string',
					},
				},
			},
			titles: {
				type: 'array',
				items: {
					_id: {
						type: 'string',
					},
				},
			},
		};

		this.required = ['title', 'city'];
	}
}

export default new ProjectSchema();
