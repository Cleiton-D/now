import React from 'react';

import useTitle from '~/react/components/Header/useTitle';

function Home() {
	useTitle('NOW');

	return <h1>HOME</h1>;
}

export default Home;
