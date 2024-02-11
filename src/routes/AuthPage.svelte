<script>
	import { Section, Register } from "flowbite-svelte-blocks";
	import { Button, Card, Label, Input } from "flowbite-svelte";
	import { EnvelopeSolid, UserCircleSolid } from 'flowbite-svelte-icons';

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
				<UserCircleSolid class="text-white h-24 w-24"/>
			</svelte:fragment>
			<div class="p-6 space-y-4 md:space-y-6 sm:p-8 bg-stone-800 rounded-lg shadow-lg">
			  <form class="flex flex-col space-y-6" on:submit|preventDefault={submit}>
				<h3 class="text-4xl font-medium dark:text-white p-0 text-center">Sign In <span class="text-fuchsia-800">/</span> Register</h3>
				<Label class="space-y-2">
				  <span>Your email</span>
				  <Input size="lg" type="email" name="email" placeholder="name@company.com" class='dark:bg-transparent' required bind:value={email}>
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
