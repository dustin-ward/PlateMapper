<script>
	import { Section, Register } from "flowbite-svelte-blocks";
	import { Button, Card, Label, Input } from "flowbite-svelte";
	import { EnvelopeSolid } from 'flowbite-svelte-icons';

	import { fly, fade } from 'svelte/transition';
	import db from './db';

	let email,
		sent = false;

	async function submit() {
		console.log("SUBMIT", email)
		await db.signIn(email);
		sent = true;
	}
</script>

<svelte:head>
	<title>Login</title>
</svelte:head>

<div class="wrapper flex items-center justify-center h-screen">
	{#if sent}
		<Card class="dark:bg-stone-800 dark:text-white dark:border-none">
			<div in:fly class="notification flex flex-col items-center justify-center">
				<svg
					class="icon m-2 text-fuchsia-800"
					height="32"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
				/>
				</svg>
				<h2>Sent you a link, check your email</h2>
			</div>
		</Card>
	{:else}
		<Section name="login">
		  <Register href="/">
			<svelte:fragment slot="top">
			  <span class="material-symbols-outlined m-8 w-8 h-8">no_crash</span>
			</svelte:fragment>
			<div class="p-6 space-y-4 w-80 md:space-y-6 sm:p-8 bg-stone-800 rounded-lg shadow-lg">
			  <form class="flex flex-col space-y-6" on:submit|preventDefault={submit}>
				<h3 class="text-xl font-medium dark:text-white p-0 text-center">Send me a sign-in link:</h3>
				<Label class="space-y-2">
				  <span>Your email</span>
				  <Input type="email" name="email" placeholder="name@company.com" class='dark:bg-transparent' required bind:value={email}>
					 <EnvelopeSolid slot="left" class="w-5 h-5" />
				  </Input>
				</Label>
				<Button type="submit" class="w-full dark:bg-fuchsia-800">Sign in</Button>
			  </form>
			</div>
		  </Register>
		</Section>
	{/if}
</div>

<style>
.material-symbols-outlined {
  font-variation-settings:
  'FILL' 0,
  'wght' 600,
  'GRAD' 0,
  'opsz' 48;
  font-size: 48px;
}
</style>
