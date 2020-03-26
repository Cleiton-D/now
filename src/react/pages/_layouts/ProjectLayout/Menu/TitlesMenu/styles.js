import styled from 'styled-components';
import Btn from '~/react/components/Form/Button';

import { NMenu } from '~/react/components/Menu/styles';

const { Item } = NMenu;

export const BtnItem = styled(Item)`
	height: 35px;
	display: flex;
	flex: 1;
	align-items: center;
	justify-content: center;
`;

export const ItemTitle = styled.div`
	display: flex;
	margin-left: ${props => (props.level === 'one' ? '16%' : 'auto')};
`;

export const BtnAddSubtitle = styled(Btn).attrs({
	containerStyle: {
		marginBottom: 'auto',
	},
})`
	border: none;
	margin-top: auto;
`;

export const ActionButtons = styled.div`
	margin-left: 15px;
	> button {
		border: none;
		margin: 0;
		margin-right: 5px;
		padding: 0;
		width: auto;
		overflow: visible;
		color: inherit;
		font: inherit;
		-webkit-font-smoothing: inherit;
		-moz-osx-font-smoothing: inherit;
		-webkit-appearance: none;
	}
`;

export const ActionButton = styled.button`
	&:hover {
		color: ${props => (props.action === 'delete' ? '#ff0000' : '#E47833')};
	}
`;
