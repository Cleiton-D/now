import styled from 'styled-components';
import { Typography } from 'antd';

import Btn from '~/react/components/Form/Button';

import { NMenu } from '~/react/components/Menu/styles';

const { Item } = NMenu;
const { Text: AntText } = Typography;

export const ListItem = styled(Item)`
	margin-left: 20%;
	margin-right: 10%;
	height: 35px;
	display: flex;
	align-items: center;
	justify-content: space-between;

	> button {
		border: none;
		margin: 0;
		padding: 0;
		width: auto;
		overflow: visible;
		background: transparent;
		color: inherit;
		font: inherit;
		-webkit-font-smoothing: inherit;
		-moz-osx-font-smoothing: inherit;
		-webkit-appearance: none;

		&:hover {
			cursor: pointer;
			color: red;
		}
	}
`;

export const Text = styled(AntText)``;

export const Button = styled(Btn)`
	margin-top: 15px;
`;
