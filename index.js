// Get all elements that need changing
const title = document.getElementsByTagName('title')[0];
const mainText = document.getElementsByClassName('mainText');
const loadinBar = document.getElementsByClassName('loadingBar');

function update() {
	// Update vars
	let currentYear = new Date().getFullYear();
	let currentDate = new Date();
	let startDate = new Date(currentDate.getFullYear(), 0, 1);
	let endDate = new Date(currentDate.getFullYear(), 11, 31);
	// Calculate progress
	let progress = (currentDate - startDate) / (endDate - startDate)	;
	// Edit elements with new values
	title.innerHTML = "Year " + currentYear + " (" + progress.toFixed(2) + "%)";
	mainText[0].innerHTML = currentYear;
	loadinBar[0].style.width = progress + "%"
	// Some info for myself in the console
	console.clear()
	console.log(
		'Year = '+currentYear+ '\n' +
		'Date = '+currentDate+  '\n' +
		'Progress = '+progress+  '\n' +
		'Clean Progress = '+progress.toFixed(2) + '%');
	}

// Call the update Function every Second
(function(){
    update();
    setTimeout(arguments.callee, 1000);
})();