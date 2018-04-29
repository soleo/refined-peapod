import browser from 'webextension-polyfill';
import OptionsSync from 'webext-options-sync';
import dynamicContentScripts from 'webext-dynamic-content-scripts';

// Define defaults
new OptionsSync().define({
	defaults: {
		'logging': false,
		'nightMode': true,
		'customCss': true,
		'pastPurchaseIndication': true,
		'saveForLater': true,
		'addShortcutLinks': true
	},
	migrations: [
		OptionsSync.migrations.removeUnused
	]
});

browser.runtime.onMessage.addListener(async message => {
	if (!message || message.action !== 'openAllInTabs') {
		return;
	}
	const [currentTab] = await browser.tabs.query({currentWindow: true, active: true});
	for (const [i, url] of message.urls.entries()) {
		browser.tabs.create({
			url,
			index: currentTab.index + i + 1,
			active: false
		});
	}
});

// Custom domain support
dynamicContentScripts.addToFutureTabs();
