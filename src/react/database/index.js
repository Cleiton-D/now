import RxDB from 'rxdb';
import adapter from 'pouchdb-adapter-idb';

import Project from './models/Project';
import Title from './models/Title';

const models = [Project, Title];

RxDB.plugin(adapter);

class Database {
	db;

	constructor() {
		return new Promise(async (resolve, reject) => {
			try {
				await this.init();
			} catch (err) {
				reject(err);
			}
			resolve(this);
		});
	}

	async init() {
		await this.loadDB();
		await this.loadSchemas();
	}

	async loadSchemas() {
		await Promise.all(
			models.map(async Model => {
				await this.db.collection({
					name: String(Model.modelName).toLowerCase(),
					schema: Model.getSchema(),
				});
			})
		);
	}

	async loadDB() {
		this.db = await RxDB.create({
			name: 'abnt',
			adapter: 'idb',
			password: 'abntpass',
			multiInstance: false,
		});
	}

	getSchema(name) {
		return this.db[name];
	}
}

export default new Database();
