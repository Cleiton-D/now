import React from 'react';
import { Form as AntForm } from 'antd';

import { Container } from './styles';

const layout = {
	labelCol: {
		span: 4,
	},
	wrapperCol: {
		span: 16,
	},
};

export default function Form({ children, ...rest }) {
	const [form] = AntForm.useForm();

	return (
		<Container>
			<AntForm {...layout} {...rest} form={form}>
				{children}
			</AntForm>
		</Container>
	);
}
