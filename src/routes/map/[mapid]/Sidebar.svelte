<script>
export let state;
export let drawer_hidden;

import { CloseSolid } from 'flowbite-svelte-icons';
</script>

<div class="flex flex-col items-center h-full dark:text-white dark:bg-stone-900 w-1/4" hidden={drawer_hidden}>
	{#await import(`../../../lib/data/${state}/info.json`)}
		<h1 class="text-5xl m-4">...</h1>
		<h2 class="text-stone-400 text-2xl m-4">...</h2>
	{:then info}
		<h1 class="text-5xl m-4">{info.name}</h1>
		<h2 class="text-stone-400 text-2xl m-4">{info.CNTRY}</h2>
	{/await}
	{#await import(`../../../lib/data/${state}/plates.jpg`) then { default: src }}
		<img {src} alt="plates" class="w-4/5 m-4" />
	{/await}
	<CloseSolid class="w-8 h-8 cursor-pointer" on:click={() => drawer_hidden = true}/>
</div>
