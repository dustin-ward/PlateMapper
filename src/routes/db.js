import { createClient } from '@supabase/supabase-js';
import { writable } from 'svelte/store';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_KEY } from '$env/static/public';

export const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_KEY);

const userStore = writable();

supabase.auth.getSession().then(({ data }) => {
	userStore.set(data.session?.user);
});

supabase.auth.onAuthStateChange((event, session) => {
	if (event == 'SIGNED_IN' && session) {
		userStore.set(session.user);
	} else if (event == 'SIGNED_OUT') {
		userStore.set(null);
	}
});

export default {
	get user() {
		return userStore;
	},
	signIn(email) {
		return supabase.auth.signInWithOtp({ email });
	},
	signOut() {
		return supabase.auth.signOut();
	},
	maps: {
		async all() {
			const { data } = await supabase.from('maps').select('*').order('created_at');

			return data;
		},

		async get(mapid) {
			const { data } = await supabase
				.from('maps')
				.select('*')
				.eq('id', mapid)
				.single();

			return data;
		},

		async create(map) {
			const { data } = await supabase.from('maps').insert(map).select().maybeSingle();
			return data;
		},

		async update(map) {
			const { data } = await supabase
				.from('maps')
				.update({
					name: map.name,
					states: map.states,
				})
				.match({ id: map.id })
				.select()
				.maybeSingle();

			return data;
		},

		// async sort(board) {
		// 	const { data } = await supabase.rpc('sort_board', {
		// 		board_id: board.id,
		// 		list_ids: board.lists.map((list) => list.id)
		// 	});

		// 	return data;
		// }
	},

	// lists: {
	// 	async create(board, listData) {
	// 		const { data } = await supabase
	// 			.from('lists')
	// 			.insert({ board_id: board.id, ...listData })
	// 			.select()
	// 			.maybeSingle();

	// 		const list = data;

	// 		return { ...list, cards: [] };
	// 	},

	// 	async update(list) {
	// 		const { data } = await supabase
	// 			.from('lists')
	// 			.update({ title: list.title })
	// 			.match({ id: list.id })
	// 			.select()
	// 			.maybeSingle();

	// 		return data;
	// 	},

	// 	async sort(list) {
	// 		const { data } = await supabase.rpc('sort_list', {
	// 			new_list_id: list.id,
	// 			card_ids: list.cards.map((card) => card.id)
	// 		});

	// 		return data;
	// 	}
	// },

	// cards: {
	// 	async create(list, listData) {
	// 		const { data } = await supabase
	// 			.from('cards')
	// 			.insert({ list_id: list.id, ...listData })
	// 			.select()
	// 			.maybeSingle();

	// 		return data;
	// 	},

	// 	async update(card) {
	// 		const { data } = await supabase
	// 			.from('cards')
	// 			.update({ description: card.description })
	// 			.match({ id: card.id })
	// 			.select()
	// 			.maybeSingle();

	// 		return data;
	// 	}
	// }
};
