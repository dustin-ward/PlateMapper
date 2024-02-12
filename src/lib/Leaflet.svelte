<script lang="ts">
	import { onMount, onDestroy, setContext, createEventDispatcher, tick } from 'svelte';
	import L from 'leaflet';
	import 'leaflet/dist/leaflet.css';
	import db from '../routes/db.js';
	import { states } from './states-provinces';

	export let bounds: L.LatLngBoundsExpression | undefined = undefined;
	export let view: L.LatLngExpression | undefined = undefined;
	export let zoom: number | undefined = undefined;
	export let dbmap;

	const dispatch = createEventDispatcher();

	let map: L.Map | undefined;
	let mapElement: HTMLElement;

	onMount(() => {
		if (!bounds && (!view || !zoom)) {
			throw new Error('Must set either bounds, or view and zoom.');
		}

		map = L.map(mapElement)
			// example to expose map events to parent components:
			.on('zoom', (e) => dispatch('zoom', e))
			.on('popupopen', async (e) => {
				await tick();
				e.popup.update();
			});

		L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png', {
			attribution: `&copy;<a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>,&copy;<a href="https://carto.com/attributions" target="_blank">CARTO</a>`
		}).addTo(map);

		geojson = L.geoJson(states, {style: style, onEachFeature: onEachFeature}).addTo(map);
	});

	onDestroy(() => {
		map?.remove();
		map = undefined;
	});

	setContext('map', {
		getMap: () => map
	});

	$: if (map) {
		if (bounds) {
			map.fitBounds(bounds);
		} else if (view && zoom) {
			map.setView(view, zoom);
		}
	}

	// Style Functions
	let style = (f) => {
		return {
			fillColor: getColour(f),
			weight: 2,
			opacity: 1,
			color: '#222222',
			dashArray: '3',
			fillOpacity: 0.7
		};
	}

	let getColour = (f) => {
		if (dbmap.states === null || dbmap.states.indexOf(f.id) == -1) {
			return "#666666";
		} else {
			return "#61b531";
		}
	}

	let highlightFeature = (e) => {
		var layer = e.target;

		layer.setStyle({
			weight: 5,
			color: '#BBBBBB',
			dashArray: '',
			fillOpacity: 0.7
		});

		layer.bringToFront();
	}

	var geojson;
	let resetHighlight = (e) => {
		geojson.resetStyle(e.target);
	}

	let zoomToFeature = (e) => {
		let f = e.target.feature
		if (dbmap.states === null) {
			dbmap.states = [f.id];
		} else {
			let idx = dbmap.states.indexOf(f.id);
			if (idx != -1) {
				dbmap.states.splice(idx,1);
			} else {
				dbmap.states = [...dbmap.states, f.id];
			}
		}
		db.maps.update(dbmap);

		dispatch('selectState', {
			state: f.id,
		});

		map.fitBounds(e.target.getBounds());
	}

	let onEachFeature = (feature, layer) => {
		layer.on({
			mouseover: highlightFeature,
			mouseout: resetHighlight,
			click: zoomToFeature
		});
	}

</script>

<!--<div class="w-full h-[calc(100vh-7rem)] relative mt-28" bind:this={mapElement}>-->
<div class="w-full h-full" bind:this={mapElement}>
	{#if map}
		<slot />
	{/if}
</div>
