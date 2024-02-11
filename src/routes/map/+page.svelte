<script>
import { onMount } from 'svelte';
import db from '../db';
import { Listgroup, ListgroupItem, Dropdown, DropdownItem } from 'flowbite-svelte';
import { PlusSolid, DotsHorizontalSolid, TrashBinSolid } from 'flowbite-svelte-icons';
import { goto } from '$app/navigation';

let maps = [];
let selected;

onMount(async () => {
	maps = await db.maps.all();
});

let getScore = (map) => {
	if (map.states) {
		return map.states.length;
	}
	return 0;
}

let deleteMap = async () => {
	let error = await db.maps.delete(selected);
	if (error) {
		console.error(error);
		return;
	}

	maps = maps.filter((m) => m.id != selected);
	return;
}
</script>

<div class="wrapper flex flex-col items-center justify-center h-screen">
	<h3 class="mb-10 text-center text-5xl font-medium dark:text-white">Your <span class='text-fuchsia-800'>Maps</span></h3>
	<Listgroup class="bg-transparent border-none shadow-lg w-1/2 dark:bg-stone-800">
		{#each maps as map}
			<div class='flex flex-row items-center'>
				<ListgroupItem class="text-base font-semibold gap-2" >
					<div class="w-full flex flex-row justify-between items-center">
						<!-- svelte-ignore a11y-click-events-have-key-events -->
						<!-- svelte-ignore a11y-no-static-element-interactions -->
						<div class="p-3 flex flex-row gap-4 items-center cursor-pointer" on:click={() => goto(`/map/${map.id}`)}>
							<span class="material-symbols-outlined w-8 h-8">map</span>
							<h2 class="text-white text-3xl self-center">{map.name}</h2>
							<p>({getScore(map)} / 63)</p>
						</div>
						<div>
							<p>{map.start_date}</p>
						</div>
					</div>
				</ListgroupItem>
				<DotsHorizontalSolid class='dots-menu dark:text-white mr-4 cursor-pointer w-8 h-8' on:click={() => selected = map.id}/>
				<Dropdown triggeredBy='.dots-menu' class='dark:bg-stone-900 w-24 rounded-lg shadow-lg overflow-hidden'>
					<DropdownItem on:click={deleteMap} class='flex flex-row items-center justify-center text-fuchsia-800'> Delete <TrashBinSolid class='ml-2'/></DropdownItem>
				</Dropdown>
			</div>
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
