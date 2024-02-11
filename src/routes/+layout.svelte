<script>
	import { Navbar, NavBrand, NavLi, NavUl, NavHamburger } from 'flowbite-svelte';
	import db from "./db.js";

	async function logout() {
		await db.signOut();
	}
</script>

<div class='w-full h-full flex flex-col'>
	<Navbar class='fixed dark:bg-transparent text-white m-3'>
	  <NavBrand href="/" class="self-center whitespace-nowrap text-4xl font-semibold">
		<span class="material-symbols-outlined m-3">no_crash</span>
		<span><span class='text-fuchsia-800'>Plate</span>Mapper</span>
	  </NavBrand>
	  <NavHamburger/>
	  <NavUl>
		<NavLi class='text-2xl' href="/">Home</NavLi>
		<NavLi class='text-2xl' href="/map">Maps</NavLi>
		<NavLi class='text-2xl' href="/" on:click={logout}>Logout</NavLi>
	  </NavUl>
	</Navbar>
	<div class='bg-gradient-to-r from-stone-900 to-stone-800 w-full h-screen'>
		<slot/>
	</div>
</div>

<svelte:head>
	<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
</svelte:head>

<style>
.material-symbols-outlined {
  font-variation-settings:
  'FILL' 0,
  'wght' 600,
  'GRAD' 0,
  'opsz' 48;
  font-size: 36px;
}
</style>
