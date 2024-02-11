<script lang="ts">
	export let data;

	import '../../../app.css';
	import type { LatLngExpression } from 'leaflet';
	import Leaflet from '$lib/Leaflet.svelte';

	const initialView: LatLngExpression = [55, -100];
</script>

<div class="w-full h-full">
	<Leaflet view={initialView} dbmap={data.map} zoom={4}>
		<div class='bg-red w-full h-40 fixed'>
		</div>
	</Leaflet>
</div>
