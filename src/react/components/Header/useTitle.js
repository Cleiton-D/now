import { useContext, useEffect } from 'react';

import AppContext from '../Context/AppContext';

export default function useTitle(title = null) {
	const { changeTitle } = useContext(AppContext);

	useEffect(() => {
		if (title) {
			changeTitle(title);
		}
	}, [title, changeTitle]);

	return { changeTitle };
}
