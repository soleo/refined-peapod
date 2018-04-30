import 'webext-dynamic-content-scripts';
import select from 'select-dom';
import domLoaded from 'dom-loaded';

import nightMode from './features/night-mode';
import customCss from './features/custom-css';
import addShortcutLinks from './features/add-shortcut-links';
import pastPurchaseIndication from './features/past-purchase-indication';
import saveForLater from './features/save-for-later';
import autoViewMore from './features/auto-view-more';

import {safeElementReady, enableFeature} from './libs/utils';

// Add globals for easier debugging
window.select = select;

async function init() {
	await safeElementReady('body:not(.ng-cloak)');

	if (select.exists('html.refined-peapod')) {
		console.warn('Refined Peapod was loaded multiple times.');
		return;
	}

	document.documentElement.classList.add('refined-peapod');

	await domLoaded;
	onDomReady();
}

async function onDomReady() {
	enableFeature(nightMode);
	enableFeature(customCss);
	enableFeature(autoViewMore);
	enableFeature(addShortcutLinks);
	enableFeature(pastPurchaseIndication);
	enableFeature(saveForLater);

	await Promise.resolve();
}

init();
