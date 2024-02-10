<script lang="ts">
	import '../app.css';
	import HomePage from './HomePage.svelte';
	import AuthPage from './AuthPage.svelte';
	import db from './db.js';

	let user = db.user;
</script>

{#if $user}
	<HomePage/>
{:else}
	<AuthPage/>
{/if}
