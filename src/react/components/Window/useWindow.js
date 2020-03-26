import React, { useState, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { StyleSheetManager } from 'styled-components';

import { copyStyles } from '~/react/utils';

export default function useWindow({
	isOpen: defaultIsOpen = false,
	onOpen,
	onClose,
} = {}) {
	const [isOpen, makeOpen] = useState(defaultIsOpen);
	const [content, setContent] = useState(null);

	const open = useRef(isOpen);

	const setOpen = useCallback(v => {
		open.current = v;
		makeOpen(v);
	}, []);

	const portal = useRef(null);

	const openPortal = useCallback(
		e => {
			if (!portal.current) {
				portal.current = window.open('', 'modal');
			}
			setOpen(true);
		},
		[portal, setOpen]
	);

	const closePortal = useCallback(
		e => {
			if (open.current) {
				portal.current.close();
				portal.current = null;
				setOpen(false);
			}
		},
		[setOpen]
	);

	const Portal = useCallback(() => {
		if (portal.current !== null && content) {
			copyStyles(document, portal.current.document);

			return createPortal(
				<StyleSheetManager target={portal.current.document.head}>
					{content}
				</StyleSheetManager>,
				portal.current.document.body
			);
		}
		return null;
	}, [portal, content]);

	return Object.assign(
		[openPortal, closePortal, open.current, Portal, portal],
		{
			isOpen: open.current,
			openPortal,
			closePortal,
			setContent,
			Portal,
			portalRef: portal,
		}
	);
}
