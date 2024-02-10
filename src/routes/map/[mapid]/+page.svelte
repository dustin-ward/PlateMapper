<script lang="ts">
	export let data;

	import '../../../app.css';
	import type { LatLngExpression } from 'leaflet';
	import Leaflet from '$lib/Leaflet.svelte';

	const initialView: LatLngExpression = [55, -100];
</script>

<div class="w-full h-screen">
	<Leaflet view={initialView} completed={data.completed} zoom={4}>
	</Leaflet>
</div>
