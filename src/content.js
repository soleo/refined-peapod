import 'webext-dynamic-content-scripts';
import select from 'select-dom';
import domLoaded from 'dom-loaded';
import {safeElementReady} from './libs/utils';


// Add globals for easier debugging
window.$ = $;
window.select = select;

async function init() {
	await safeElementReady('body');
	if (document.body.classList.contains('logged-out')) {
		return;
	}

	if (select.exists('html.refined-peapod')) {
		console.count('Refined Peapod was loaded multiple times.');
		return;
	}

	document.documentElement.classList.add('refined-peapod');

	domLoaded.then(onDomReady);
}

function onDomReady() {
	// do more changes when everything is loaded.
}

init();
