import ProjectSchema from '../schemas/ProjectSchema';
import Database from '../';

export default class Project {
	static #schema = ProjectSchema;
	static modelName = 'project';
	static collection;

	db;

	_id;
	title;
	subtitle;
	city;
	course;

	constructor(data) {
		this.members = [];
		this.subjects = [];
		this.titles = [];

		Object.assign(this, data);
	}

	static async loadModel() {
		Project.db = await Database;
		Project.loadCollection();
	}

	static async loadCollection() {
		Project.collection = this.db.getSchema(Project.modelName);
	}

	static getSchema() {
		return Project.#schema;
	}

	async save() {
		await Project.loadModel();
		await Project.collection.insert(this);
	}

	static async getAll() {
		await Project.loadModel();
		const docs = await Project.collection.find().exec();

		const data = docs.map(doc => new Project(doc.toJSON()));
		return data;
	}

	static async findById(id) {
		await Project.loadModel();
		const data = await Project.collection.findOne(id).exec();

		return new Project(data.toJSON());
	}

	static async update(data) {
		await Project.loadModel();

		let doc = await Project.collection.findOne(data._id).exec();
		doc = await doc.atomicUpdate(() => data);

		return new Project(doc.toJSON());
	}
}
