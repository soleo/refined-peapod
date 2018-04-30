import {h} from 'dom-chef';
import select from 'select-dom';
import api from '../libs/api';
import {observeEl} from '../libs/utils';

const pastPurchaseProductIds = new Set();

export default async () => {
	const label = (
		<div class="filters_refine-summary_filter highlighted past-purchase-flag">
			<span class="filters_filter-text">Past Purchase</span>
		</div>
	);

	const pastPurchases = await api(
		'v3.0/user/products?extendedInfo=true&facet=singleRootCat,brands,nutrition,specials,newArrivals,privateLabel&facetExcludeFilter=true&filter=pastPurchases&flags=true&hkInclude=true&nutrition=true&rows=120&sort=itemsPurchased+desc,+name+asc&start=0&substitute=true');
	if (pastPurchases.response && pastPurchases.response.products.length > 0) {
		pastPurchases.response.products.forEach(product => {
			pastPurchaseProductIds.add(product.prodId);
		});

		observeEl(select('main'), () => {
			pastPurchaseProductIds.forEach(prodId => {
				const productImageNode = select(`img[data-product-id='${prodId}']`);
				if(productImageNode) {
					productImageNode.after(label);
				}
			});
		});
	}
};
