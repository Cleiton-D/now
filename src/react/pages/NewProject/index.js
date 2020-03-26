import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Divider } from 'antd';

import useTitle from '~/react/components/Header/useTitle';

import { updateProjectsRequest } from '~/react/store/modules/app/actions';

import Form from '~/react/components/Form';
import Input from '~/react/components/Form/Input';
import { Positions } from '~/react/components/Form/Button';

import { Container, SaveButton } from './styles';

import Project from '~/react/database/models/Project';

export default function NewProject() {
	const dispatch = useDispatch();

	useTitle('Novo Projeto');
	const history = useHistory();

	async function handleSubmit(data) {
		const project = new Project(data);
		await project.save();

		dispatch(updateProjectsRequest());

		history.push('/');
	}

	return (
		<Container>
			<Form onFinish={handleSubmit}>
				<Input
					name="title"
					label="Título"
					rules={[
						{
							required: true,
							message: 'Dê um título ao seu projeto',
						},
					]}
				/>
				<Input name="subtitle" label="Subtítulo" />
				<Divider />
				<Input name="course" label="Curso" />
				<Input
					name="city"
					label="Cidade"
					rules={[{ required: true, message: 'Este campo é obrigatório' }]}
				/>

				<SaveButton
					position={Positions.RIGHT}
					type="primary"
					htmlType="submit"
					label="Criar Projeto"
				/>
			</Form>
		</Container>
	);
}
