import Project from '~/react/database/models/Project';
import Title from '~/react/database/models/Title';

export async function loadProject(id) {
	const project = await Project.findById(id);
	const titles = await loadTitlesFromProject(project);

	return { ...project, titles };
}

export async function loadTitles(projectId) {
	const project = await Project.findById(projectId);
	return await loadTitlesFromProject(project);
}

export async function deleteTitle(titleId, parent, project_id) {
	async function deleteT(id) {
		const title = await Title.findById(id);

		await Promise.all(
			title.childrens.map(async children => await deleteT(children))
		);

		await Title.remove(id);
	}

	deleteT(titleId);
	// console.log('parent', parent);

	if (parent) {
		const parentTitle = await Title.findById(parent);

		// console.log(parentTitle.childrens);
		parentTitle.childrens = parentTitle.childrens.filter(
			children => children !== titleId
		);

		// console.log(parentTitle.childrens);

		await Title.update(parentTitle);
	} else if (project_id) {
		const project = await Project.findById(project_id);

		project.titles = project.titles.filter(item => item !== titleId);

		await Project.update(project);
	}
}

// draft.members = draft.members.filter(item => item._id !== id);

async function loadTitlesFromProject(project) {
	const { titles } = project;

	async function loadTitles(parentId, titles) {
		const newData = await Promise.all(
			titles.map(async titleId => {
				const title = await Title.findById(titleId);
				const childrens =
					title.childrens.length > 0
						? await loadTitles(titleId, title.childrens)
						: [];

				return { ...title, childrens, parent: parentId };
			})
		);

		return newData;
	}

	return await loadTitles(null, titles);
}
