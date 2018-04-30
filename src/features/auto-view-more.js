import select from 'select-dom';
import debounce from 'debounce-fn';
import {observeEl} from '../libs/utils';

let btn;
let productListObserver;

const loadMore = debounce(() => {
	btn.click();

	// If Peapod hasn't loaded the JS, the click will not load anything.
	// We can detect if it worked by looking at the button's state,
	// and then trying again (auto-debounced)
	if (!btn.disabled) {
		loadMore();
	}
}, {wait: 200});

const inView = new IntersectionObserver(([{isIntersecting}]) => {
	if (isIntersecting) {
		loadMore();
	}
});

const findButton = () => {
	// If the old button is still there, leave
	if (btn && document.contains(btn)) {
		return;
	}

	// Forget the old button
	inView.disconnect();

	// Watch the new button, or stop everything
	btn = select('.product-view--load-more button');
	if (btn) {
		inView.observe(btn);
	} else if (productListObserver) {
		productListObserver.disconnect();
	}
};

export default () => {
	productListObserver = observeEl('main', findButton);
};
