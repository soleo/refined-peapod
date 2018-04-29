import {h} from 'dom-chef';
import select from 'select-dom';
import {safeElementReady} from '../libs/utils';

export default async () => {
	await safeElementReady('site-subheader-management');
	if (!select.exists('.navigation-bar_item .dropdown_menu')) {
		return false;
	}
	const position = select('.navigation-bar_item .dropdown_menu > :nth-child(2)');
	const link = (
		<a class="menu-item_link--small menu-item_link--bold" href="/modal/my-account/history/invoice">
			<span class="menu-item_link_text">My invoices</span>
		</a>
	);

	// GHE doesn't wrap links in <li> yet
	position.after(position.tagName === 'LI' ? <li class="menu-item menu-item--light">{link}</li> : link);
};
