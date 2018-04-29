import OptionsSync from 'webext-options-sync';

const NIGHT_MODE_INVERT_FILTER_CSS = 'brightness(80%) invert(100%) hue-rotate(180deg)';

const NIGHT_MODE_STYLESHEET = `html {
  -webkit-filter: hue-rotate(180deg) invert(100%) !important;
}
img,video {
  -webkit-filter: ${NIGHT_MODE_INVERT_FILTER_CSS} !important;
}`;

let styleElement;

function getStyleElement() {
	if (styleElement) {
		return styleElement;
	}

	styleElement = document.createElement('style');
	styleElement.type = 'text/css';
	styleElement.appendChild(document.createTextNode(NIGHT_MODE_STYLESHEET));

	return styleElement;
}

function applyInvertFilterToChildBackgroundImageElements(parentNode) {
	parentNode.querySelectorAll('[style*="background"]').forEach(el => {
		if ((el.style.backgroundImage || '').startsWith('url')) {
			applyInvertFilterToElement(el);
		}
	});
}

let invertedBackgroundImageElements = null;

function applyInvertFilterToElement(el) {
	invertedBackgroundImageElements.push(el);
	el.refinedPeapodNightModeOriginalFilter = el.style.webkitFilter;
	el.style.webkitFilter = NIGHT_MODE_INVERT_FILTER_CSS;
}

function removeInvertFilterFromElement(el) {
	el.style.webkitFilter = el.refinedPeapodNightModeOriginalFilter;
	delete el.refinedPeapodNightModeOriginalFilter;
}

// Create a `MutationObserver` that checks for new elements
// added that have a `background-image` in their `style`
// property/attribute.
const observer = new MutationObserver(mutations => {
	mutations.forEach(mutation => {
		mutation.addedNodes.forEach(node => {
			if (node.nodeType === Node.ELEMENT_NODE) {
				applyInvertFilterToChildBackgroundImageElements(node);
			}
		});
	});
});

export default async () => {
	const options = await new OptionsSync().getAll();
	const styleElement = getStyleElement();
	if (options.nightMode) {
		document.documentElement.classList.add('refined-peapod_night-mode-enabled');

		invertedBackgroundImageElements = [];

		// Apply the NightMode CSS to the document.
		document.documentElement.appendChild(styleElement);

		// Add the "invert" CSS class name to all elements with a
		// `background-image` in their `style` property/attribute.
		applyInvertFilterToChildBackgroundImageElements(document);

		// Observe for future elements in the document containing
		// `background-image` in their `style` property/attribute
		// so that we can also apply the "invert" CSS class name
		// to them as they are added.
		observer.observe(document.documentElement, {
			childList: true,
			subtree: true
		});
		return;
	} else {

		// Stop observing for future elements in the document.
		observer.disconnect();

		// Remove the "invert" CSS class name from all elements
		// it was previously applied to.
		if(invertedBackgroundImageElements) {
			invertedBackgroundImageElements.forEach(removeInvertFilterFromElement);
		}

		// Remove the NightMode CSS from the document.
		const styleElementParentNode = styleElement.parentNode;
		if (styleElementParentNode) {
			styleElementParentNode.removeChild(styleElement);
		}

		invertedBackgroundImageElements = null;
	}
};
