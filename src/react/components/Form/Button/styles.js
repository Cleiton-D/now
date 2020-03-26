import styled from 'styled-components';
import { Form, Button as AntButton } from 'antd';

const { Item } = Form;

export const Container = styled(Item)`
	justify-content: center;

	.ant-form-item-control-input-content {
		display: flex;
		justify-content: ${props => props.position};
	}
`;

export const Button = styled(AntButton)`
	margin-right: 8px;
`;
