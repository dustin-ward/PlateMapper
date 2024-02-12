<script lang="ts">
	export let data;

	import '../../../app.css';
	import type { LatLngExpression } from 'leaflet';
	import Leaflet from '$lib/Leaflet.svelte';
	import Sidebar from './Sidebar.svelte';

	const initialView: LatLngExpression = [55, -100];

	var drawer_hidden = true;
	var selected_state;
</script>

<div class="w-full h-full flex flex-row">
	<Sidebar drawer_hidden={drawer_hidden} state={selected_state}/>
	<Leaflet view={initialView} dbmap={data.map} zoom={4} on:selectState={(e) => {drawer_hidden = false; selected_state = e.detail.state}}>
	</Leaflet>
</div>
