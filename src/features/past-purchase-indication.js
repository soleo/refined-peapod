import {h} from 'dom-chef';
import select from 'select-dom';
import api from '../libs/api';
import {observeEl, safeElementReady} from '../libs/utils';

let pastPurchaseProductIds = new Set();

export default async () => {

	const pastPurchases = await api(
		'v3.0/user/products?extendedInfo=true&facet=singleRootCat,brands,nutrition,specials,newArrivals,privateLabel&facetExcludeFilter=true&filter=pastPurchases&flags=true&hkInclude=true&nutrition=true&rows=120&sort=itemsPurchased+desc,+name+asc&start=0&substitute=true');
	if(pastPurchases.response && pastPurchases.response.products.length > 0) {
		await safeElementReady('site-subheader-management');
		pastPurchases.response.products.forEach(function(product) {
			pastPurchaseProductIds.add(product.prodId);

			observeEl(select('.product-list li.product-cell').parentNode, () => {
				const productImageNode = select(`.product-list li.product-cell img[data-product-id='${product.prodId}']`);
				if (productImageNode && productImageNode.parentNode) {
					productImageNode.parentNode.classList.add('past-purchase');
				}
			});
		});


	}
	console.log(pastPurchaseProductIds);
};
