export function copyStyles(sourceDoc, targetDoc) {
	Array.from(sourceDoc.styleSheets).forEach(style => {
		if (style.cssRules) {
			const newStyle = sourceDoc.createElement('style');

			Array.from(style.cssRules).forEach(rule => {
				newStyle.appendChild(sourceDoc.createTextNode(rule.cssText));
			});

			targetDoc.head.appendChild(newStyle);
		} else if (style.href) {
			const newLink = sourceDoc.createElement('link');

			newLink.rel = 'stylesheet';
			newLink.href = style.href;
			targetDoc.head.appendChild(newLink);
		}
	});
}
