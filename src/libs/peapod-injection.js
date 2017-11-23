import select from 'select-dom';

export default cb => {
	if (!cb) {
		throw new Error('Missing argument callback');
	}

	if (typeof cb !== 'function') {
		throw new TypeError('Callback is not a function');
	}

	const observer = new MutationObserver(mutations => {
		mutations.forEach(mutation => {
			mutation.addedNodes.forEach(node => {
				if (node.nodeType === Node.ELEMENT_NODE) {
					cb();
				}
			});
		});
	});

	for (const el of select.all('aside')) {
		observer.observe(el, {
			childList: true,
			subtree: true
		});
	}
};
