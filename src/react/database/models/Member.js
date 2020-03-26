import { v4 as uuid } from 'uuid';

export default class Member {
	constructor(data) {
		this._id = null;
		this.name = null;

		if (data) Object.assign(this, data);

		if (!this._id) this._id = uuid();
	}
}
