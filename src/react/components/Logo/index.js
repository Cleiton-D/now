import React from 'react';
import { Link } from 'react-router-dom';

import { Container } from './styles';

import logo from '~/assets/images/logo.png';

export default function Logo(props) {
	return (
		<Container>
			<Link to="/">
				<img src={logo} {...props} alt="Logotipo Now" />
			</Link>
		</Container>
	);
}
