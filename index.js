// remove "Please enable Javascript" notice ASAP
const eventText = document.getElementsByClassName('eventText')[0];
eventText.textContent = " ";


//  List of events
const events = Object.freeze({
	none         : "NONE",
	AdventSeason : "ITS ADVENT",
	Christmas    : "ITS CHRISTMAS",
	NewYearsEve  : "ITS NEW YEARS",
})


// region: Main functionality
// Get all elements that need changing at some point
const title = document.getElementsByTagName('title')[0];
const yearText = document.getElementsByClassName('yearText')[0];
const loadingBar = document.getElementsByClassName('loadingBar')[0];
const progressPercentage = document.getElementsByClassName('progressPercentage')[0];
// Set current event to none by default
var currentEventEffect = events.none


function update() {
	// Update vars
	let currentDate = new Date();
	let currentYear = currentDate.getFullYear();
	let startDate = new Date(currentDate.getFullYear(), 0, 1);
	let endDate = new Date(currentDate.getFullYear(), 11, 31);
	// Calculate year progress
	let progress = (currentDate - startDate) / (endDate - startDate) * 100;
	// Edit elements with new values
	title.textContent = "Year " + currentYear + " (" + Math.floor(progress) + "%)";
	yearText.textContent = currentYear;
	loadingBar.style.width = progress + "%"
	progressPercentage.textContent = Math.floor(progress)
	// Check for special events
	eventDetection(currentDate);
}


// region: Special events (Update logic)
function eventDetection(currentDate) {
	let isAdvent = (currentDate.getMonth() == 11 && currentDate.getDate() >= 1 && currentDate.getDate() <= 24);
	let isChristmas = (currentDate.getMonth() == 11 && currentDate.getDate() >= 25 && currentDate.getDate() <= 26);
	let isNewYears = (currentDate.getMonth() == 0 && currentDate.getDate() == 1);
	// TODO | Add more events
	if (isAdvent && currentEventEffect != events.AdventSeason) {
		// If its advent the only active effect can be christmas
		if (currentEventEffect == events.Christmas) {
			changeColors("black", "white");
			removeFallingThings()
		}
		// Now that we have a clean slate, we can add the advent decoration
		currentEventEffect = events.AdventSeason
		addFallingThings(["❄", "❅", "❆"], 40, "white");
		eventText.textContent = "Happy Advent Season!";
	} else if (isChristmas && currentEventEffect != events.Christmas) {
		// If its christmas the only active effect can be advent
		if (currentEventEffect == events.AdventSeason) {
			changeColors("black", "white");
			removeFallingThings()
		}
		// Now that we have a clean slate, we can add the advent decoration
		currentEventEffect = events.Christmas
		changeColors("#BD0827", "gold");
		addFallingThings(["🎄", "🎁", "🎅","🎄", "🎁", "🎅", "❄", "❅", "❆"], 60, "white");
		eventText.textContent = "Merry Christmas!";
	} else if (isNewYears && currentEventEffect != events.NewYearsEve) {
		// If its new years eve the only active effect can be advent
		if (currentEventEffect == events.AdventSeason) {
			changeColors("black", "white");
			removeFallingThings()
		}
		// Now that we have a clean slate, we can add the advent decoration
		currentEventEffect = events.NewYearsEve
		addFireworks()
		eventText.textContent = "Happy New Year!";
		// reset case
	} else if (!isAdvent && !isChristmas && !isNewYears && currentEventEffect != events.none) {
		try {
			changeColors("black", "white");
			removeFallingThings()
			removeFireworks()
			currentEventEffect = events.none
		} catch (error) {
			console.log("YO LOOK AT THIS IDIOT CALLED SIMON WHO MADE A MISTAKE AHAHAHAHAHHAHA")
		}
	}
}

// region: Special events (event logic)
function addFallingThings(things,amount,color) {
	for (let i = 0; i < amount; i++) {
		const fallingContainer = document.createElement('div');
		fallingContainer.className = 'fallingThing';
		fallingContainer.style.animationDelay = Math.random() * 3 + 's';
		fallingContainer.style.left = Math.floor(Math.random() * 100) + '%';
		const fallingCore = document.createElement('div');
		fallingCore.style.animationDelay = Math.random() * 10 + 's';
		fallingCore.style.color = color;
		fallingCore.className = 'fallingThingCore';
		fallingCore.textContent = things[Math.floor(Math.random() * things.length)];
		fallingContainer.appendChild(fallingCore);
		document.body.appendChild(fallingContainer);
	}
}

function removeFallingThings() {
	fallingThings = document.getElementsByClassName('fallingThing');
	while (fallingThings.length > 0) {
		fallingThings[0].remove();
	}
}

function changeColors(backgroundColor,accentColor) {
	// change color in css :root
	document.documentElement.style.setProperty('--background-color', backgroundColor);
	document.documentElement.style.setProperty('--accent-color', accentColor);
}

function addFireworks() {
	const pyro = document.createElement('div');
	pyro.className = 'pyro';
	const before = document.createElement('div');
	before.className = 'before';
	const after = document.createElement('div');
	after.className = 'after';
	pyro.appendChild(before);
	pyro.appendChild(after);
	document.body.appendChild(pyro);
}

function removeFireworks() {
	fireworks = document.getElementsByClassName('pyro');
	while (fireworks.length > 0) {
		fireworks[0].remove();
	}
}

// region: general Update
(function(){
	update();
	setTimeout(arguments.callee, 1000);
})();