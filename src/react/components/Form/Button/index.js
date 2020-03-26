import React from 'react';

import { Container, Button as SButton } from './styles';

export const Positions = {
	RIGHT: 'flex-end',
	CENTER: 'center',
	LEFT: 'flex-start',
};

export default function Button({ label, position, containerStyle, ...rest }) {
	return (
		<Container position={position} style={containerStyle}>
			<SButton {...rest}>{label}</SButton>
		</Container>
	);
}
