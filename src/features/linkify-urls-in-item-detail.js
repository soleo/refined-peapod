import select from 'select-dom';
import linkifyUrls from 'linkify-urls';
import getTextNodes from '../libs/get-text-nodes';

const linkifiedURLClass = 'refined-peapod-linkified-detail';

const options = {
	type: 'dom',
	baseUrl: '',
	attrs: {
		target: '_blank'
	}
};

export const editTextNodes = (fn, el) => {
	// Spread required because the elements will change and the TreeWalker will break
	for (const textNode of [...getTextNodes(el)]) {
		if (fn === linkifyUrls && textNode.textContent.length < 11) { // Shortest url: http://j.mp
			continue;
		}
		const linkified = fn(textNode.textContent, options);
		if (linkified.children.length > 0) { // Children are <a>
			textNode.replaceWith(linkified);
		}
	}
};

export default () => {
	const wrappers = select.all(`.manufacturer-information p:not(.${linkifiedURLClass})`);

	// Don't linkify any already linkified code
	if (wrappers.length === 0) {
		return;
	}

	// Linkify full URLs
	// `.manufacturer-information p` in item detail
	for (const el of select.all('.manufacturer-information p', wrappers)) {
		editTextNodes(linkifyUrls, el);
	}

	// Mark code block as touched
	for (const el of wrappers) {
		el.classList.add(linkifiedURLClass);
	}
};
