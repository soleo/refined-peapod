'use strict';

export default cb => {
	if (!cb) {
		throw new Error('Missing argument callback');
	}

	if (typeof cb !== 'function') {
		throw new TypeError('Callback is not a function');
	}

	document.addEventListener('ppdLoadingActionFinish', cb);
	cb();
};
