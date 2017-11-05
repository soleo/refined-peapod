import 'webext-dynamic-content-scripts';
import select from 'select-dom';
import domLoaded from 'dom-loaded';

import linkifyItemDetail from './features/linkify-urls-in-item-detail';

import {safeElementReady, safely} from './libs/utils';
import onAjaxedPages from './libs/peapod-injection';

// Add globals for easier debugging
window.$ = $;
window.select = select;

async function init() {
	await safeElementReady('body');

	if (select.exists('html.refined-peapod')) {
		console.count('Refined Peapod was loaded multiple times.');
		return;
	}

	document.documentElement.classList.add('refined-peapod');

	domLoaded.then(onDomReady);
}

function onDomReady() {
	onAjaxedPages(ajaxedPagesHandler);
}

function ajaxedPagesHandler() {
	// Format Item Detail Modal .manufacturer-information
	safely(linkifyItemDetail);
}

init();
