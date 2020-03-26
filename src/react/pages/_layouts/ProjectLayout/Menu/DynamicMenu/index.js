import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

import { Positions } from '~/react/components/Form/Button';
import { NMenu } from '~/react/components/Menu/styles';

import { ListItem, Text, Button } from './styles';

export default function DynamicMenu({
	label,
	onChange,
	onDelete,
	data,
	addEvent,
}) {
	const dispatch = useDispatch();

	const [list, setList] = useState([]);
	const project = useSelector(state => state.project);

	useEffect(() => {
		setList(project[data]);
	}, [data, project]);

	function addField() {
		setList([...list, { _id: String(0), editing: true }]);
	}
	function removeField(id) {
		const newData = list.filter(item => item._id !== id);

		dispatch(onDelete(project._id, id));
		setList(newData);
	}

	function handleChange(id, str) {
		if (!str) {
			removeField(id);
			return;
		}
		if (parseInt(id) === 0) id = null;

		dispatch(onChange({ project_id: project._id, id, str }));
	}

	function handleEdit(id) {
		const newData = list.map(item =>
			item._id === id
				? {
						...item,
						editing: true,
				  }
				: item
		);

		setList(newData);
	}

	return (
		<>
			{list.map(item => (
				<ListItem disabled={true} key={item._id}>
					<div>
						<Text
							editable={{
								onStart: () => handleEdit(item._id),
								onChange: str => handleChange(item._id, str),
								editing: item.editing,
							}}
						>
							{item.name}
						</Text>
					</div>
					{!item.editing && (
						<button onClick={() => removeField(item._id)}>
							<MinusCircleOutlined />
						</button>
					)}
				</ListItem>
			))}
			<NMenu.Item disabled={true} key="addCourse">
				<Button
					position={Positions.CENTER}
					onClick={addEvent || addField}
					type="dashed"
					label={
						<span>
							<PlusOutlined /> Adicionar {label}
						</span>
					}
				/>
			</NMenu.Item>
		</>
	);
}
