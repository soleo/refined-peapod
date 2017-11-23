import select from 'select-dom';

export default cb => {
	if (!cb) {
		throw new Error('Missing argument callback');
	}

	if (typeof cb !== 'function') {
		throw new TypeError('Callback is not a function');
	}

	var observer = new MutationObserver(function(mutations) {
		mutations.forEach(function(mutation) {
			mutation.addedNodes.forEach(function(node) {
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
