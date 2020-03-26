import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { upsertTitle } from '~/react/store/modules/project/actions';

import Form from '~/react/components/Form';
import Input from '~/react/components/Form/Input';
import Button, { Positions } from '~/react/components/Form/Button';

import { Container, Header, Content, Buttons } from './styles';

export default function AddEdit({ onCancel, onSave, parent, data }) {
	const dispatch = useDispatch();

	const project = useSelector(state => state.project);

	function handleSubmit(formData) {
		const { _id: project_id } = project;

		const id = data ? data._id : null;

		dispatch(upsertTitle({ ...formData, parent, project_id, id }));
		onSave();
	}

	return (
		<Container>
			<Header title="Adicionar Título" />
			<Content>
				<Form onFinish={handleSubmit} initialValues={data}>
					<Input
						name="title"
						label="Título"
						rules={[
							{
								required: true,
								message: 'Este campo é obrigatório',
							},
						]}
					/>
					<Input
						textArea
						rows={4}
						name="content"
						label="Conteúdo"
						rules={[{ required: true, message: 'Este campo é obrigatório' }]}
					/>

					<Buttons>
						<Button
							position={Positions.CENTER}
							type="ghost"
							htmlType="button"
							label="Cancelar"
							onClick={onCancel}
						/>
						<Button
							position={Positions.RIGHT}
							type="primary"
							htmlType="submit"
							label="Adicionar"
						/>
					</Buttons>
				</Form>
			</Content>
		</Container>
	);
}
