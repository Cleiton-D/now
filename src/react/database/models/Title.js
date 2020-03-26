import ProjectTitlesSchema from '../schemas/ProjectTitlesSchema';
import Database from '../';

export default class Title {
	static #schema = ProjectTitlesSchema;
	static modelName = 'project_title';
	static collection;

	db;

	_id;
	title;
	content;

	constructor(data) {
		this.childrens = [];

		Object.assign(this, data);
	}

	static async loadModel() {
		Title.db = await Database;
		Title.loadCollection();
	}

	static async loadCollection() {
		Title.collection = this.db.getSchema(Title.modelName);
	}

	static getSchema() {
		return Title.#schema;
	}

	async save() {
		await Title.loadModel();
		const doc = await Title.collection.insert(this);

		Object.assign(this, doc.toJSON());
	}

	static async getAll() {
		await Title.loadModel();
		const docs = await Title.collection.find().exec();

		const data = docs.map(doc => new Title(doc.toJSON()));
		return data;
	}

	static async findById(id) {
		await Title.loadModel();
		const data = await Title.collection.findOne(id).exec();

		return new Title(data.toJSON());
	}

	static async update(data) {
		await Title.loadModel();

		let doc = await Title.collection.findOne(data._id).exec();
		doc = await doc.atomicUpdate(() => data);

		return new Title(doc.toJSON());
	}

	static async remove(id) {
		await Title.loadModel();

		const removedDoc = await Title.collection.findOne(id).remove();
		return removedDoc;
	}
}
