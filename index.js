// region: Main functionality
// Get all elements that need changing at some point
const title = document.getElementsByTagName('title')[0];
const yearText = document.getElementsByClassName('yearText')[0];
const loadingBar = document.getElementsByClassName('loadingBar')[0];
const progressPercentage = document.getElementsByClassName('progressPercentage')[0];
const eventText = document.getElementsByClassName('eventText')[0];

// remove "Please enable Javascript" notice
eventText.textContent = " ";

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

// region: Special events

// Flag indicating that a decoratiion is active
let decorated = false

function eventDetection(currentDate) {
	// Advent season check (December 1st to 24th)
	let isAdvent = (currentDate.getMonth() == 11 && currentDate.getDate() >= 1 && currentDate.getDate() <= 23 || currentDate.getMonth() == 11 && currentDate.getDate() >= 1 && currentDate.getDate() >= 26);
	// Christmas check (December 26th)
	let isChristmas = (currentDate.getMonth() == 11 && currentDate.getDate() == 26);
	// New years event check (January 1st)
	let isNewYears = (currentDate.getMonth() == 0 && currentDate.getDate() == 1);

	if (!decorated) {
		if (isAdvent) {
			eventText.textContent = "Happy Advent Season!";
			decorated = true;
			addFallingThings(["❄", "❅", "❆"], 40, "white");
		}

		if (isChristmas) {
			eventText.textContent = "Merry Christmas!";
			decorated = true;
			addFallingThings(["🎄", "🎁", "🎅", "❄", "❅", "❆"], 40, "white");
			changeColors("#BD0827", "gold");
		}

		if (isNewYears) {
			eventText.textContent = "Happy New Year!";
			decorated = true;
			addFireworks();

		}

	} else if (decorated) {
		if (!isAdvent && !isChristmas && !isNewYears) {
			removeFallingThings();
			changeColors("black", "white");
			removeFireworks();
			decorated = false;
		}

	}
}

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

// region: Update
(function(){
	update();
	setTimeout(arguments.callee, 1000);
})();