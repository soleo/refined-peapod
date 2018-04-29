import {h} from 'dom-chef';
import select from 'select-dom';
import elementReady from 'element-ready';
import domLoaded from 'dom-loaded';
import OptionsSync from 'webext-options-sync';

const options = new OptionsSync().getAll();
/**
 * Prevent fn's errors from blocking the remaining tasks.
 * https://github.com/sindresorhus/refined-github/issues/678
 * The code looks weird but it's synchronous and fn is called without args.
 */
export const safely = async fn => fn();

export const enableFeature = async fn => {
	const {disabledFeatures = '', logging = false} = await options;
	const log = logging ? console.log : () => {};

	const filename = fn.name.replace(/_/g, '-');
	if (/^$|^anonymous$/.test(filename)) {
		console.warn('This feature is nameless', fn);
	} else if (disabledFeatures.includes(filename)) {
		log('↩️', 'Skipping', filename);
		return;
	}
	try {
		fn();
		log('✅', filename);
	} catch (err) {
		console.log('❌', filename);
		console.error(err);
	}
};
export const groupBy = (array, grouper) => array.reduce((map, item) => {
	const key = grouper(item);
	map[key] = map[key] || [];
	map[key].push(item);
	return map;
}, {});

export const emptyElement = element => {
	// https://stackoverflow.com/a/3955238/288906
	while (element.firstChild) {
		element.firstChild.remove();
	}
};

/**
 * Automatically stops checking for an element to appear once the DOM is ready.
 */
export const safeElementReady = selector => {
	const waiting = elementReady(selector);
	domLoaded.then(() => requestAnimationFrame(() => waiting.cancel()));
	return waiting;
};

export const observeEl = (el, listener, options = {childList: true}) => {
	if (typeof el === 'string') {
		el = select(el);
	}

	if (!el) {
		return;
	}

	// Run first
	listener([]);

	// Run on updates
	const observer = new MutationObserver(listener);
	observer.observe(el, options);
	return observer;
};

// Concats arrays but does so like a zipper instead of appending them
// [[0, 1, 2], [0, 1]] => [0, 0, 1, 1, 2]
// Like lodash.zip
export const flatZip = (table, limit = Infinity) => {
	const maxColumns = Math.max(...table.map(row => row.length));
	const zipped = [];
	for (let col = 0; col < maxColumns; col++) {
		for (const row of table) {
			if (row[col]) {
				zipped.push(row[col]);
				if (limit !== Infinity && zipped.length === limit) {
					return zipped;
				}
			}
		}
	}
	return zipped;
};

/**
 * Camelize a string, cutting the string by multiple separators like
 * hyphens, underscores and spaces.
 *
 * @param {text} string Text to camelize
 * @return string Camelized text
 */
export const camelize = text => {
	return text.replace(/^([A-Z])|[\s-_]+(\w)/g, (match, p1, p2) => {
		if (p2) {
			return p2.toUpperCase();
		}
		return p1.toLowerCase();
	});
};
