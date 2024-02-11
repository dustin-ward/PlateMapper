<script>
import { goto } from "$app/navigation";
import { Button, FloatingLabelInput } from "flowbite-svelte";
import { onMount } from 'svelte';
import db from '../../db.js';

var name;
var date;
var today;
var email;

db.user.subscribe((value) => {
	email = value.email;
});

onMount(() => {
	let curDate = new Date();
	var dd = String(curDate.getDate()).padStart(2, '0');
	var mm = String(curDate.getMonth() + 1).padStart(2, '0');
	var yyyy = curDate.getFullYear();

	today = yyyy + '-' + mm + '-' + dd;
	date = today;
});

let submit = async () => {
	let ret = await db.maps.create({
		email: email,
		name: name,
		start_date: date,
	});
	goto("/map");
}
</script>

<div class="w-full h-full flex flex-col items-center justify-center">
	<div class="p-6 space-y-4 md:space-y-6 sm:p-8 bg-stone-800 rounded-lg shadow-lg">
		<form class="flex flex-col space-y-6" on:submit|preventDefault={submit}>
			<h3 class="text-4xl font-medium dark:text-white p-0 text-center">New Map</h3>
			<FloatingLabelInput id="floating_standard" name="name" type="text" bind:value={name} required>
				Map Name
			</FloatingLabelInput>
			<FloatingLabelInput id="floating_standard" name="date" type="date" min={today} bind:value={date} required>
				Start Date
			</FloatingLabelInput>
			<Button type="submit" class="w-full dark:bg-fuchsia-800">Create</Button>
		</form>
	</div>
</div>
