const path = require('path');

let java;
let basePath;
if (path.extname(process.env.SOURCE_PATH) === '.asar') {
	java = require(path.join(
		process.env.SOURCE_PATH,
		'../app.asar.unpacked/node_modules/java'
	));

	basePath = path.join(process.env.SOURCE_PATH, '../app.asar.unpacked');
} else {
	java = require('java');
	basePath = process.env.SOURCE_PATH;
}

java.classpath.push(
	path.join(basePath, 'java_dependencies/hiperion-0.0.3.jar')
);

const File = java.import('java.io.File');
const FileInputStream = java.import('java.io.FileInputStream');
const IOException = java.import('java.io.IOException');
const InputStream = java.import('java.io.InputStream');
const ArrayList = java.import('java.util.ArrayList');
const JavaDate = java.import('java.util.Date');

const CoverBuilder = java.import(
	'br.com.cleitonkiper.hiperion.builders.CoverBuilder'
);
const ProjectBuilder = java.import(
	'br.com.cleitonkiper.hiperion.builders.ProjectBuilder'
);
const ContentBean = java.import(
	'br.com.cleitonkiper.hiperion.Beans.ContentBean'
);

function saveProject(data) {
	const { filePath, project } = data;

	const template = new FileInputStream(
		new File(path.join(basePath, 'templates/template01.docx'))
	);

	const { members, subjects } = project;

	const autores = new ArrayList();
	members.forEach(member => autores.addSync(member.name));

	function loadTitles(titles) {
		const items = new ArrayList();

		for (item of titles) {
			const bean = new ContentBean();
			bean.setNameSync(item.title);
			bean.setContentSync(item.content);
			bean.setChildrensSync(loadTitles(item.childrens));

			items.addSync(bean);
		}

		return items;
	}
	const contents = new ArrayList();
	contents.addAllSync(loadTitles(project.titles));

	const pr = new ProjectBuilder()
		.withTemplateSync(template)
		.withCoverSync(
			new CoverBuilder()
				.withCitySync(project.city)
				.withStateSync('RO')
				.withDateSync(new JavaDate())
		)
		.withTitleSync(project.title)
		.withSubTitleSync(project.subtitle)
		.withIntegrantsListSync(autores)
		.withContentsSync(contents)
		.buildSync();

	pr.saveSync(filePath);
}

module.exports = {
	saveProject,
};
