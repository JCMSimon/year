// Get all elements that need changing
const title = document.getElementsByTagName('title')[0];
const mainText = document.getElementsByClassName('mainText')[0];
const loadingBar = document.getElementsByClassName('loadingBar')[0];

function update() {
	// Update vars
	let currentYear = new Date().getFullYear();
	let currentDate = new Date();
	let startDate = new Date(currentDate.getFullYear(), 0, 1);
	let endDate = new Date(currentDate.getFullYear(), 11, 31);
	// Calculate progress
	let progress = (currentDate - startDate) / (endDate - startDate)	;
	// Edit elements with new values
	title.innerHTML = "Year " + currentYear + " (" + Math.floor(progress * 100) / 100 + "%)";
	mainText.innerHTML = currentYear;
	loadingBar.style.width = progress + "%"
	// Some info for myself in the console
	console.clear()
	console.log(
		'Year = '+currentYear+ '\n' +
		'Date = '+currentDate+  '\n' +
		'Progress = '+progress+  '\n' +
		'Clean Progress = '+Math.floor(progress * 100) / 100 + '%');
	}

// Call the update Function every Second
(function(){
    update();
    setTimeout(arguments.callee, 1000);
})();
