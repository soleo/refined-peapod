const cache = new Map();

export default async endpoint => {
	if (cache.has(endpoint)) {
		return cache.get(endpoint);
	}
	const api = 'https://www.peapod.com/api/';
	const response = await fetch(api + endpoint, {credentials: 'include'});
	const json = await response.json();
	cache.set(endpoint, json);
	return json;
};
