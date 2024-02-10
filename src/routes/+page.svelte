<script lang="ts">
	export let data;

	import '../app.css';
	import type { LatLngExpression } from 'leaflet';
	import Leaflet from '$lib/Leaflet.svelte';
	import Marker from '$lib/Marker.svelte';
	import Popup from '$lib/Popup.svelte';

	const initialView: LatLngExpression = [49.328325, -100.283634];
</script>

<div class="w-full h-screen">
	<Leaflet view={initialView} completed={data.completed} zoom={5}>
	</Leaflet>
</div>
