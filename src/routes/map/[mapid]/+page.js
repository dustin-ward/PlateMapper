import db from '../../db.js';

export async function load({ params }) {
	return {
		map: await db.maps.get(params.mapid),
	}
}
