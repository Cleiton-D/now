import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { FileAddOutlined } from '@ant-design/icons';
import { MdLibraryBooks } from 'react-icons/md';

import Logo from '~/react/components/Logo';

// import Project from '~/react/database/models/Project';
import { selectProjectRequest } from '~/react/store/modules/project/actions';

import { Container, NMenu, MenuTitle } from './styles';

const { SubMenu } = NMenu;

export default function Menu({ onClick }) {
	const dispatch = useDispatch();
	const history = useHistory();

	const projects = useSelector(state => state.app.projectList);

	const [selected, setSelected] = useState([]);

	function handleClick(e) {
		setSelected(e.key);
		if (onClick) onClick(e);
	}
	function handleSelectProj(e) {
		dispatch(selectProjectRequest(e.key));
	}

	return (
		<Container>
			<Logo onClick={() => setSelected([])} />
			<NMenu
				onClick={handleClick}
				defaultOpenKeys={['sub1']}
				mode="inline"
				selectedKeys={selected}
			>
				<SubMenu
					key="sub1"
					title={
						<MenuTitle>
							<MdLibraryBooks size={16} />
							<span style={{ marginLeft: 10 }}>Projetos</span>
						</MenuTitle>
					}
				>
					<NMenu.ItemGroup key="g1" title="Novo">
						<NMenu.Item
							key="addProj"
							onClick={() => history.push('/newProject')}
						>
							<span>
								<FileAddOutlined />
								<span>Novo Projeto</span>
							</span>
						</NMenu.Item>
					</NMenu.ItemGroup>
					<NMenu.ItemGroup key="g2" title="Meus Projetos">
						{projects.map(project => (
							<NMenu.Item key={project._id} onClick={handleSelectProj}>
								{project.title}
							</NMenu.Item>
						))}
					</NMenu.ItemGroup>
				</SubMenu>
			</NMenu>
		</Container>
	);
}
