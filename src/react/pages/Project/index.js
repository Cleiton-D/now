import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { loadProject as loadProjectApi } from '~/react/api';

import { channels } from '~/shared/constants';

import useTitle from '~/react/components/Header/useTitle';

const { ipcRenderer } = window;

export default function Project(props) {
	const params = useParams();
	const [project, setProject] = useState();
	const [loading, setLoading] = useState(false);

	const { changeTitle } = useTitle();

	useEffect(() => {
		async function loadProject() {
			const { id } = params;

			const proj = await loadProjectApi(id);
			setProject(proj);
			changeTitle(proj.title);
		}
		loadProject();
	}, [changeTitle, params]);

	function handleClick() {
		setLoading(true);
		ipcRenderer.send(channels.project.EXPORT, { title: project.title });
		ipcRenderer.on(channels.project.EXPORT, (_, args) => {
			const { filePath, canceled } = args;

			if (canceled) {
				setLoading(false);
				return;
			}

			ipcRenderer.send(channels.project.GENERATE_REQUEST, {
				filePath,
				project,
			});
			ipcRenderer.on(channels.project.GENERATE_SUCCESS, (event, args) => {
				ipcRenderer.removeAllListeners(channels.project.GENERATE_SUCCESS);
				setLoading(false);
			});
		});
	}

	return (
		<div>
			<button onClick={handleClick}>
				{loading ? 'Exportando...' : 'Exportar projeto'}
			</button>
		</div>
	);
}
