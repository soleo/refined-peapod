import OptionsSync from 'webext-options-sync';

export default async () => {
	const options = await new OptionsSync().getAll();
	if (options.customCss) {
		document.documentElement.classList.add('refined-peapod_custom-css-enabled');
	}
};
