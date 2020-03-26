import styled from 'styled-components';
import { Form, PageHeader } from 'antd';

const { Item } = Form;

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	flex: 1;
`;

export const Header = styled(PageHeader)`
	border: 1px solid rgb(235, 237, 240);
`;

export const Content = styled.div`
	margin-top: 30px;
`;

export const Buttons = styled(Item)`
	display: flex;
	justify-content: center;

	.ant-form-item-control-input-content {
		display: flex;
		justify-content: flex-end;
	}
`;
