const characters = {
	ronald: {
		id: "Ronald",
		color: "yellow",
		image: "ronald.webp",
	},
	grandfather: {
		id: "Grandfather",
		color: "violet",
		image: "grandpa.webp",
	},
};

const dialogScenes = {
	intro: [
		{
			character: null,
			text: "story_intro_1",
		},
		{
			character: null,
			text: "story_intro_2",
		},
		{
			character: null,
			text: "story_intro_3",
		},
		{
			character: characters.grandfather,
			text: "story_intro_4",
		},
		{
			character: characters.ronald,
			text: "story_intro_5",
		},
		{
			character: null,
			text: "story_intro_6",
		},
		{
			character: characters.ronald,
			text: "story_intro_7",
		},
		{
			character: characters.grandfather,
			text: "story_intro_8",
		},
		{
			character: characters.grandfather,
			text: "story_intro_9",
		},
		{
			character: characters.ronald,
			text: "story_intro_10",
		},
		{
			character: characters.grandfather,
			text: "story_intro_11",
		},
		{
			character: characters.grandfather,
			text: "story_intro_12",
		},
		{
			character: characters.ronald,
			text: "story_intro_13",
		},
		{
			character: characters.grandfather,
			text: "story_intro_14",
		},
		{
			character: characters.grandfather,
			text: "story_intro_15",
		},
		{
			character: characters.grandfather,
			text: "story_intro_16",
		},
		{
			character: characters.ronald,
			text: "story_intro_17",
		},
		{
			character: characters.grandfather,
			text: "story_intro_18",
		},
		{
			character: characters.grandfather,
			text: "story_intro_19",
		},
	],
	coin: [
		{
			character: null,
			text: "story_coin_1",
		},
		{
			character: characters.grandfather,
			text: "story_coin_2",
		},
		{
			character: characters.ronald,
			text: "story_coin_3",
		},
		{
			character: characters.grandfather,
			text: "story_coin_4",
		},
		{
			character: characters.ronald,
			text: "story_coin_5",
		},
		{
			character: characters.grandfather,
			text: "story_coin_6",
		},
		{
			character: characters.grandfather,
			text: "story_coin_7",
		},
		{
			character: characters.ronald,
			text: "story_coin_8",
		},
	],
};
