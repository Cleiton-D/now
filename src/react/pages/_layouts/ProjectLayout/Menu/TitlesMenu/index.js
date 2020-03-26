import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Tooltip, Modal } from 'antd';
import {
	MinusCircleOutlined,
	EditOutlined,
	PlusOutlined,
	ExclamationCircleOutlined,
} from '@ant-design/icons';

import useWidow from '~/react/components/Window/useWindow';
import AddEdit from './AddEdit';

import { Button, Text } from '../DynamicMenu/styles';
import { NMenu } from '~/react/components/Menu/styles';
import { Positions } from '~/react/components/Form/Button';

import {
	ActionButtons,
	BtnItem,
	BtnAddSubtitle,
	ActionButton,
	ItemTitle,
} from './styles';

import { deleteTitle as deleteTitleAction } from '~/react/store/modules/project/actions';

const { confirm } = Modal;

export default function TitlesMenu({ label }) {
	const dispatch = useDispatch();

	const project = useSelector(state => state.project);

	const { openPortal, closePortal, isOpen, Portal, setContent } = useWidow();

	// aqui que vai rolar a brincadeira
	function addTitle(parentId) {
		setContent(
			<AddEdit onCancel={closePortal} onSave={closePortal} parent={parentId} />
		);
		openPortal();
	}

	function editTitle(data, parentId) {
		setContent(
			<AddEdit
				onCancel={closePortal}
				onSave={closePortal}
				parent={parentId}
				data={data}
			/>
		);
		openPortal();
	}

	function deleteTitle(data) {
		confirm({
			title: `Deseja remover ${data.title}?`,
			icon: <ExclamationCircleOutlined />,
			content:
				'Tem certeza de que deseja remover este título e todos os seus subtítulos?',
			okText: 'Sim',
			okType: 'danger',
			cancelText: 'Não',
			onOk() {
				dispatch(deleteTitleAction(data, project._id));
				return;
			},
			onCancel() {
				return;
			},
		});
	}

	const Submenu = ({ item, ...rest }) => (
		<NMenu.SubMenu
			key={`sub${item._id}`}
			title={
				<ItemTitle level={item.parent ? 'sub' : 'one'}>
					<Text>{item.title}</Text>
					<ActionButtons>
						<Tooltip title="Editar">
							<ActionButton
								action="edit"
								onClick={() => editTitle(item, item.parent)}
							>
								<EditOutlined />
							</ActionButton>
						</Tooltip>

						<Tooltip title="Excluir">
							<ActionButton action="delete" onClick={() => deleteTitle(item)}>
								<MinusCircleOutlined />
							</ActionButton>
						</Tooltip>
					</ActionButtons>
				</ItemTitle>
			}
			{...rest}
		>
			{item.childrens.map(children => (
				<Submenu item={children} key={children._id} />
			))}

			<BtnItem disabled={true} key="addTitle">
				<BtnAddSubtitle
					position={Positions.CENTER}
					onClick={() => addTitle(item._id)}
					type="default"
					label={
						<span>
							<PlusOutlined /> Adicionar {label}
						</span>
					}
				/>
			</BtnItem>
		</NMenu.SubMenu>
	);

	return (
		<>
			<NMenu key="mTitle" mode="vertical">
				{project &&
					project.titles.map(item => <Submenu key={item._id} item={item} />)}
				<BtnItem disabled={true} key="addTitle">
					<Button
						position={Positions.CENTER}
						onClick={() => addTitle()}
						type="dashed"
						label={
							<span>
								<PlusOutlined /> Adicionar {label}
							</span>
						}
					/>
				</BtnItem>
			</NMenu>
			{isOpen && <Portal />}
		</>
	);
}
