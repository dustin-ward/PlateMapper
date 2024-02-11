<script>
import { onMount } from 'svelte';
import db from '../db';
import { Listgroup, ListgroupItem } from 'flowbite-svelte';
import { PlusSolid } from 'flowbite-svelte-icons';
import { goto } from '$app/navigation';

let maps = [];
let user;

onMount(async () => {
//	user = db.user;
//	if (!$user) {
//		goto("/login");
//	}
	maps = await db.maps.all();
});

let fmtTimestamp = (iso) => {
	let date = new Date(iso);
	return date.getFullYear()+'-' + (date.getMonth()+1) + '-'+date.getDate();
}
let getScore = (map) => {
	if (map.states) {
		return map.states.length;
	}
	return 0;
}
</script>

<div class="wrapper flex flex-col items-center justify-center h-screen">
	<h3 class="mb-10 text-center text-5xl font-medium dark:text-white">Your <span class='text-fuchsia-800'>Maps</span></h3>
	<Listgroup active class="dark:bg-stone-800 border-none shadow-lg w-3/5">
		{#each maps as map}
			<ListgroupItem class="text-base font-semibold gap-2 dark:hover:bg-fuchsia-900" on:click={() => goto(`/map/${map.id}`)}>
				<div class="w-full flex flex-row justify-between">
					<div class="p-3 flex flex-row gap-4 items-center">
						<span class="material-symbols-outlined w-8 h-8">map</span>
						<h2 class="text-white text-3xl self-center">{map.name}</h2>
						<p>({getScore(map)} / 63)</p>
					</div>
					<p>{fmtTimestamp(map.created_at)}</p>
				</div>
			</ListgroupItem>
		{/each}
		<a href="/map/new" class="flex items-center pl-5 p-3 text-lg font-medium dark:bg-stone-800 dark:hover:bg-stone-700 dark:text-fuchsia-800 rounded-b-lg">
			<PlusSolid class="w-6 h-6 ms-1 me-2" />
			New Map
		</a>
	</Listgroup>
</div>

<style>
.material-symbols-outlined {
  font-variation-settings:
  'FILL' 0,
  'wght' 600,
  'GRAD' 0,
  'opsz' 48;
  font-size: 32px;
}
</style>
