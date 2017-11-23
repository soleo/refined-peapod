import 'webext-dynamic-content-scripts';
import select from 'select-dom';
import domLoaded from 'dom-loaded';

import linkifyItemDetail from './features/linkify-urls-in-item-detail';
import nightMode from './features/night-mode';

import {safely} from './libs/utils';
import onModalChanges from './libs/peapod-injection';

// Add globals for easier debugging
window.$ = $;
window.select = select;

function init() {
	if (select.exists('html.refined-peapod')) {
		console.count('Refined Peapod was loaded multiple times.');
		return;
	}

	document.documentElement.classList.add('refined-peapod');

	domLoaded.then(onDomReady);
}

function onDomReady() {
	// Night mode switch
	safely(nightMode);

	onModalChanges(ajaxedPagesHandler);
}

function ajaxedPagesHandler() {
	// Format Item Detail Modal .manufacturer-information
	safely(linkifyItemDetail);
}

init();
