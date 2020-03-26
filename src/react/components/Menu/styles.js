import styled from 'styled-components';
import { Menu as AntMenu } from 'antd';

export const Container = styled.div`
	border: 1px solid rgb(235, 237, 240);
	display: flex;
	flex-direction: column;
	position: relative;
`;

export const NMenu = styled(AntMenu)`
	width: 256px;
	border: none;
`;

export const MenuTitle = styled.span`
	display: flex;
	flex: 1;
	align-items: center;
`;
