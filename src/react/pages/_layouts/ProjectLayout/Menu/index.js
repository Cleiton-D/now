import React from 'react';
import { MdSubject, MdPersonOutline, MdTitle } from 'react-icons/md';

import DynamicMenu from './DynamicMenu';
import TitlesMenu from './TitlesMenu';

import {
	upsertMemberRequest,
	removeMemberRequest,
	upsertSubjectRequest,
	removeSubjectRequest,
} from '~/react/store/modules/project/actions';

import { Container, NMenu, MenuTitle } from '~/react/components/Menu/styles';

const { SubMenu } = NMenu;

export default function Menu() {
	return (
		<Container>
			<NMenu onClick={() => {}} mode="inline">
				<SubMenu
					key="disciplinas"
					title={
						<MenuTitle>
							<MdSubject size={16} />
							<span style={{ marginLeft: 10 }}>Disciplinas</span>
						</MenuTitle>
					}
				>
					<DynamicMenu
						label="Disciplina"
						onChange={upsertSubjectRequest}
						onDelete={removeSubjectRequest}
						data="subjects"
					/>
				</SubMenu>

				<SubMenu
					key="integrantes"
					title={
						<MenuTitle>
							<MdPersonOutline size={16} />
							<span style={{ marginLeft: 10 }}>Integrantes</span>
						</MenuTitle>
					}
				>
					<DynamicMenu
						label="Integrante"
						onChange={upsertMemberRequest}
						onDelete={removeMemberRequest}
						data="members"
					/>
				</SubMenu>

				<SubMenu
					key="titulos"
					title={
						<MenuTitle>
							<MdTitle size={16} />
							<span style={{ marginLeft: 10 }}>Títulos</span>
						</MenuTitle>
					}
				>
					<TitlesMenu label="Título" />
				</SubMenu>
			</NMenu>
		</Container>
	);
}
