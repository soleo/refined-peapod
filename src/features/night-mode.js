import OptionsSync from 'webext-options-sync';

const NIGHT_MODE_INVERT_FILTER_CSS = 'brightness(80%) invert(100%) hue-rotate(180deg)';

const NIGHT_MODE_STYLESHEET = `html {
  -webkit-filter: hue-rotate(180deg) invert(100%) !important;
}
img,video {
  -webkit-filter: ${NIGHT_MODE_INVERT_FILTER_CSS} !important;
}`;

var styleElement;

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
  parentNode.querySelectorAll('[style*="background"]').forEach(function(el) {
    if ((el.style.backgroundImage || '').startsWith('url')) {
      applyInvertFilterToElement(el);
    }
  });
}
function applyInvertFilterToElement(el) {
  invertedBackgroundImageElements.push(el);
  el.__RefinedPeapod__NightMode_originalFilter = el.style.webkitFilter;
  el.style.webkitFilter = NIGHT_MODE_INVERT_FILTER_CSS;
}

function removeInvertFilterFromElement(el) {
  el.style.webkitFilter = el.__RefinedPeapod__NightMode_originalFilter;
  delete el.__RefinedPeapod__NightMode_originalFilter;
}

var invertedBackgroundImageElements = null;

// Create a `MutationObserver` that checks for new elements
// added that have a `background-image` in their `style`
// property/attribute.
var observer = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    mutation.addedNodes.forEach(function(node) {
      if (node.nodeType === Node.ELEMENT_NODE) {
        applyInvertFilterToChildBackgroundImageElements(node);
      }
    });
  });
});

export default () => {
	new OptionsSync().getAll().then(options => {
		if(options.enableNightMode) {
			document.documentElement.classList.add('refined-peapod_night-mode-enabled');
			var styleElement = getStyleElement();
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
		}
		// Stop observing for future elements in the document.
		observer.disconnect();

		// Remove the "invert" CSS class name from all elements
	    // it was previously applied to.
	    invertedBackgroundImageElements.forEach(removeInvertFilterFromElement);

	    // Remove the NightMode CSS from the document.
	    var styleElementParentNode = styleElement.parentNode;
	    if (styleElementParentNode) {
	      styleElementParentNode.removeChild(styleElement);
	    }

	    invertedBackgroundImageElements = null;
	});
};
