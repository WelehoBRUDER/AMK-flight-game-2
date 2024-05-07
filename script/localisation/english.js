const english = {
	code: "english",
	name: "English",
	// Stats
	screen_name: "Name",
	co2_consumed: "CO2 Consumption",
	location: "Location",
	money: "Money",
	time: "Date",
	real_time: "Playtime",
	distance_traveled: "Distance traveled",
	screen_name_tt: "Current player's name",
	co2_consumed_tt: "CO2 Consumption",
	location_tt: "Current location (airport)",
	money_tt: "Your money",
	time_tt: "Current date",
	real_time_tt: "Playtime",
	distance_traveled_tt: "Total distance traveled",
	flights_tt: "Flight points",
	score: "Score",
	// Floating texts
	not_enough_flight_points: "§<c>red<c>Not enough flight points!§",
	too_far: "§<c>red<c>That port is too far away!§<c>orange<c> (4300km+)§",
	too_poor: "§<c>red<c>You can't afford that!§",
	// Characters
	narrator: "Narrator",
	granfather: "Grandfather",
	ronald: "Ronald",
	// Settings
	gameplay: "Gameplay",
	flightSpeed: "Flight speed",
	animationSpeed: "Animation speed",
	sound: "Sound",
	musicVolume: "Music volume",
	soundVolume: "Sound effect volume",
	game_language: "Game language",
	flight_speed_tt: "How fast the plane moves when flying between airports.",
	animation_speed_tt: "How quickly in-game animations should be played",
	music_volume_tt: "Music volume",
	sound_volume_tt: "Sound effects volume",
	// UI
	lost_sauce: "Grandpa's Lost Sauce",
	distance: "Distance",
	flight_cost: "Flight cost",
	fly_to_airport: "Fly to this port",
	new_turn: "Beginning new turn",
	turn: "Turn",
	player: "Player",
	quest_title: "Grandpa's travels",
	end_turn: "End turn",
	player_got_item_win:
		"You won! Congratulations are in order,\n you have definitely earned §<v>translate(game.currentMinigameItem.id)<v>§.",
	player_got_item_loss:
		"You've lost, and must pay up to get your item. §<c>red<c>(-3000€)§. \nAt least you got §<v>translate(game.currentMinigameItem.id)<v>§.",
	// Minigames UI
	hangman_win: "You're worthy! You clever, clever boeh. Here's your §<v>translate(game.currentMinigameItem.id)<v>§",
	hangman_loss:
		"Not worthy! §<v>translate(game.currentMinigameItem.id)<v>>§ is gonna cost ya now! Slide me my money and get out of my sight half-wit!",
	ahmed_dice_loss:
		"HAA NO ONE CAN BEAT AHMED! Show me the moneyyy... That is, if you want your grandpa's §<v>translate(game.currentMinigameItem.id)<v>§, because it's gonna cost ya.",
	ahmed_dice_win:
		"Congratulations I guess... You've beaten me with your lucky a** roll§<c>green<c>[total].§\nPromise is a promise. Here's your grandpa's §<v>translate(game.currentMinigameItem.id)<v>§</br>",

	flying_hint1: "§<c>violet<c>Grandpa§ thinks he might have lost his §<c>[itmCol]<c>[item]§ while hiking in §<c>gold<c>[city]§.",
	flying_hint2: "According to §<c>violet<c>Grandpa§, he accidentally dropped his §<c>[itmCol]<c>[item]§ somewhere in §<c>gold<c>[city]§.",
	flying_hint3: "<c>violet<c>Grandpa§ says he forgot his §<c>[itmCol]<c>[item]§ at §<c>gold<c>[city]§.",
	flying_hint4: "<c>violet<c>Grandpa§ might have lost his §<c>[itmCol]<c>[item]§ during his trip to §<c>gold<c>[city]§.",
	flying_hint5: "Seems like <c>violet<c>Grandpa§ lost his §<c>[itmCol]<c>[item]§ during his adventures in §<c>gold<c>[city]§.",
	flying_hint6: "<c>violet<c>Grandpa§ must have lost his §<c>[itmCol]<c>[item]§ while he was bar hopping in §<c>gold<c>[city]§.",
	flying_hint7: "Apparently, <c>violet<c>Grandpa§ forgor his §<c>[itmCol]<c>[item]§ while sunbathing in §<c>gold<c>[city]§.",
	flying_hint8: "Somehow <c>violet<c>Grandpa§ dropped his §<c>[itmCol]<c>[item]§ in the middle of §<c>gold<c>[city]§.",
	// Options
	options: "Options",
	new_game: "Start a new game",
	start_game: "Start game",
	load_save: "Load / Save game",
	load_game: "Load game",
	save_game: "Save game",
	read_help: "Help",
	read_story: "Story",
	leaderboards: "Leaderboards",
	settings: "Settings",
	close: "Close",
	// Menus
	click_anywhere: "Click anywhere to begin!",
	difficulty_select: "Select difficulty",
	easy: "Easy",
	medium: "Medium",
	hard: "Hard",
	player_amount: "Player amount",
	enter_name: "Enter your name",
	// Game
	flying_hint_1: "§<c>violet<c>Grandpa§ thinks he might have lost his §<c>[itmCol]<c>[item]§ while hiking in §<c>gold<c>[city]§.",
	flying_hint_2: "§<c>violet<c>Grandpa§ believes he lost his §<c>[itmCol]<c>[item]§ while haggling in §<c>gold<c>[city]§.",
	help_text1:
		"§<c>orange<c>Grandpa's Lost Sauce§ is a game where you have to fly around the world to collect your grandpa's §<c>lightblue<c>lost items§. There are §<c>lightblue<c>four items§ randomly scattered throughout the world.",
	help_text2:
		"You start off at a randomly selected airport, with §<c>lightblue<c>10000€§ in hand. To make your way towards an item, you must select an airport to fly to. Each flight costs §<c>lightblue<c>money§, and adds to your §<c>lightblue<c>CO2 emissions§.",
	help_text3:
		"At every item you will encounter a §<c>lightblue<c>challenging minigame§, that you have to win in order to collect your prize.",
	help_text4: "§<c>red<c>Running out of money during your trip means losing the game, so be careful!§",
	help_text5: "Once you have collected all of the items, §<c>green<c>return to your starting airport to win the game!§",
	help_text6:
		"Your score will be calculated based on your amount of §<c>lightblue<c>CO2 emissions§, §<c>lightblue<c>spent money§ and §<c>lightblue<c>time§.",
	coin: "The Coin",
	photo: "The Photo",
	watch: "The Watch",
	sauce: "The Sauce",
	item1: "§<c>lightblue<c>The Coin§",
	item2: "§<c>lightblue<c>The Photo§",
	item3: "§<c>lightblue<c>The Watch§",
	item4: "§<c>lightblue<c>The Sauce§",
	item1_text:
		"Grandpa's favourite coin. Grandpa grew up poor, he had never owned a single cent to his name until he found his first coin. He has held on to it for his entire life.",
	item2_text: "A photograph of grandpa's wife. Her beauty radiates through the photograph so powerfully it makes you sick.",
	item3_text:
		"Grandpa's old favourite watch he always used to wear. It no longer works but it still has a home on top of grandpa's dresser.",
	item4_text:
		"The sauce made with grandpa's secret recipe. No one knows what it contains, what it tastes like, or if it even actually is sauce.",
	// Dialog
	story_intro_1: "§<c>yellow<c>Ronald§ hasn't seen his grandfather in 20 years and was pretty anxious about the visit.",
	story_intro_2:
		"He remembers his grandfather as a sweet guy, always ready to share \n with him life advice and wisdom, that he learned the hard way in life.",
	story_intro_3: " §<c>yellow<c>Ronald§ knocks at the door, and there was his grandfather, §<c>lime<c>a grin on his face.§",
	story_intro_4: "Hey §<c>yellow<c>Ronald§, long time.",
	story_intro_5: "Hello.",
	story_intro_6: "They sat face to face in his grandfather's personal study.",
	story_intro_7: "You wanted to see me... here I am. How are you?",
	story_intro_8: "Let's skip the pleasantries and all the boring stuff, eh?",
	story_intro_9: "§<c>red<c>I'm about to die.§",
	story_intro_10: "Ok.",
	story_intro_11:
		"So... because you are practically my only family left, I am\nleaving everything I own, and the money I saved for you, but there is a catch...",
	story_intro_12: "I am giving it all to you if you complete a few tasks.",
	story_intro_13: "Which tasks would those be?",
	story_intro_14:
		"I am giving you §<c>gold<c>20000€§ for flight tickets. I need you to §<c>green<c>retrieve 4 items for me from around the world.§",
	story_intro_15: "Accomplish this and you can have everything, which is considerable by the way.",
	story_intro_16:
		"If you don't make it, §<c>crimson<c>I'm liquidating everything I own§, and giving the money to charity, my savings included.",
	story_intro_17: "Well, I guess I need to pack my things then!",
	story_intro_18: "§<c>silver<c>*grandfather grins*§ Brave lad! Here's the 20000€ in cash.",
	story_intro_19: "Good luck!",
	story_coin_1: "§<c>violet<c>Grandfather§ looks at the coin through your crappy phone camera and smiles.",
	story_coin_2: "That is surely §<c>gold<c>The Coin§! I'd recognize it anywhere!",
	story_coin_3: "I had to take part in a weird challenge to get it.",
	story_coin_4: "Then it sounds like you've well earned it! Good work lad!",
	story_coin_5: "Why is this coin so important to you anyway?",
	story_coin_6: "It holds a great amount of sentimental value to me. It is what made me the man I am today.",
	story_coin_7: "I earned that coin with my hard work and sweat, it is surely magical!",
	story_coin_8: "Uh huh.",
	// Languages
	english: "English",
	finnish: "Suomi",
	// Minigames
	// Adolf's Hangman
	guitar: "guitar",
	guitar_hint: "A musical instrument with strings.",
	oxygen: "oxygen",
	oxygen_hint: "A colorless, odorless gas essential for life.",
	mountain: "mountain",
	mountain_hint: "A large natural elevation of the Earth's surface.",
	painting: "painting",
	painting_hint: "An art form using colors on a surface to create images or expression.",
	astronomy: "astronomy",
	astronomy_hint: "The scientific study of celestial objects and phenomena.",
	football: "football",
	football_hint: "A popular sport played with a spherical ball.",
	chocolate: "chocolate",
	chocolate_hint: "A sweet treat made from cocoa beans.",
	butterfly: "butterfly",
	butterfly_hint: "An insect with colorful wings and a slender body.",
	history: "history",
	history_hint: "The study of past events and human civilization.",
	pizza: "pizza",
	pizza_hint: "A savory dish consisting of a round, flattened base with toppings.",
	jazz: "jazz",
	jazz_hint: "A genre of music characterized by improvisation and syncopation.",
	camera: "camera",
	camera_hint: "A device used to capture and record images or videos.",
	diamond: "diamond",
	diamond_hint: "A precious gemstone known for its brilliance and hardness.",
	adventure: "adventure",
	adventure_hint: "An exciting or daring experience.",
	science: "science",
	science_hint: "The systematic study of the structure and behavior of the physical and natural world.",
	bicycle: "bicycle",
	bicycle_hint: "A human-powered vehicle with two wheels.",
	sunset: "sunset",
	sunset_hint: "The daily disappearance of the sun below the horizon.",
	coffee: "coffee",
	coffee_hint: "A popular caffeinated beverage made from roasted coffee beans.",
	dance: "dance",
	dance_hint: "A rhythmic movement of the body often performed to music.",
	galaxy: "galaxy",
	galaxy_hint: "A vast system of stars, gas, and dust held together by gravity.",
	orchestra: "orchestra",
	orchestra_hint: "A large ensemble of musicians playing various instruments.",
	volcano: "volcano",
	volcano_hint: "A mountain or hill with a vent through which lava, rock fragments, hot vapor, and gas are ejected.",
	novel: "novel",
	novel_hint: "A long work of fiction, typically with a complex plot and characters.",
	sculpture: "sculpture",
	sculpture_hint: "A three-dimensional art form created by shaping or combining materials.",
	symphony: "symphony",
	symphony_hint: "A long musical composition for a full orchestra, typically in multiple movements.",
	architecture: "architecture",
	architecture_hint: "The art and science of designing and constructing buildings.",
	ballet: "ballet",
	ballet_hint: "A classical dance form characterized by precise and graceful movements.",
	astronaut: "astronaut",
	astronaut_hint: "A person trained to travel and work in space.",
	waterfall: "waterfall",
	waterfall_hint: "A cascade of water falling from a height.",
	technology: "technology",
	technology_hint: "The application of scientific knowledge for practical purposes.",
	rainbow: "rainbow",
	rainbow_hint: "A meteorological phenomenon that is caused by reflection, refraction, and dispersion of light.",
	universe: "universe",
	universe_hint: "All existing matter, space, and time as a whole.",
	piano: "piano",
	piano_hint: "A musical instrument played by pressing keys that cause hammers to strike strings.",
	vacation: "vacation",
	vacation_hint: "A period of time devoted to pleasure, rest, or relaxation.",
	rainforest: "rainforest",
	rainforest_hint: "A dense forest characterized by high rainfall and biodiversity.",
	theater: "theater",
	theater_hint: "A building or outdoor area in which plays, movies, or other performances are staged.",
	telephone: "telephone",
	telephone_hint: "A device used to transmit sound over long distances.",
	language: "language",
	language_hint: "A system of communication consisting of words, gestures, and syntax.",
	desert: "desert",
	desert_hint: "A barren or arid land with little or no precipitation.",
	sunflower: "sunflower",
	sunflower_hint: "A tall plant with a large yellow flower head.",
	fantasy: "fantasy",
	fantasy_hint: "A genre of imaginative fiction involving magic and supernatural elements.",
	telescope: "telescope",
	telescope_hint: "An optical instrument used to view distant objects in space.",
	breeze: "breeze",
	breeze_hint: "A gentle wind.",
	oasis: "oasis",
	oasis_hint: "A fertile spot in a desert where water is found.",
	photography: "photography",
	photography_hint: "The art, process, or practice of creating images by recording light or other electromagnetic radiation.",
	safari: "safari",
	safari_hint: "An expedition or journey, typically to observe wildlife in their natural habitat.",
	planet: "planet",
	planet_hint: "A celestial body that orbits a star and does not produce light of its own.",
	river: "river",
	river_hint: "A large natural stream of water flowing in a channel to the sea, a lake, or another such stream.",
	tropical: "tropical",
	tropical_hint: "Relating to or situated in the region between the Tropic of Cancer and the Tropic of Capricorn.",
	mysterious: "mysterious",
	mysterious_hint: "Difficult or impossible to understand, explain, or identify.",
	enigma: "enigma",
	enigma_hint: "Something that is mysterious, puzzling, or difficult to understand.",
	paradox: "paradox",
	paradox_hint: "A statement or situation that contradicts itself or defies intuition.",
	puzzle: "puzzle",
	puzzle_hint: "A game, toy, or problem designed to test ingenuity or knowledge.",
	whisper: "whisper",
	whisper_hint: "To speak very softly or quietly, often in a secretive manner.",
	shadow: "shadow",
	shadow_hint: "A dark area or shape produced by an object blocking the light.",
	secret: "secret",
	secret_hint: "Something kept hidden or unknown to others.",
	curiosity: "curiosity",
	curiosity_hint: "A strong desire to know or learn something.",
	unpredictable: "unpredictable",
	unpredictable_hint: "Not able to be foreseen or known beforehand; uncertain.",
	obfuscate: "obfuscate",
	obfuscate_hint: "To confuse or bewilder someone; to make something unclear or difficult to understand.",
	unveil: "unveil",
	unveil_hint: "To make known or reveal something previously secret or unknown.",
	illusion: "illusion",
	illusion_hint: "A false perception or belief; a deceptive appearance or impression.",
	moonlight: "moonlight",
	moonlight_hint: "The light from the moon.",
	vibrant: "vibrant",
	vibrant_hint: "Full of energy, brightness, and life.",
	nostalgia: "nostalgia",
	nostalgia_hint: "A sentimental longing or wistful affection for the past.",
	brilliant: "brilliant",
	brilliant_hint: "Exceptionally clever, talented, or impressive.",
};
